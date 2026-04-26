// ── Vercel Serverless Function: Health Score Webhook Proxy ────
// Keeps the Make.com webhook URL server-side only.
// Validates, sanitizes, and rate-limits submissions.

// ── In-memory rate limiter (per serverless cold-start cycle) ──
const ipSubmissions = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const WINDOW_MS = 60 * 60 * 1000; // 1 hour
  const MAX_REQUESTS = 3;

  const record = ipSubmissions.get(ip);
  if (!record) {
    ipSubmissions.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  // Reset window if expired
  if (now - record.firstRequest > WINDOW_MS) {
    ipSubmissions.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count++;
  return false;
}

// ── Sanitize string: strip HTML tags, scripts, unusual chars ──
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '')           // Strip HTML tags
    .replace(/[<>'"`;\\]/g, '')        // Strip dangerous chars
    .trim()
    .slice(0, 500);                     // Max length cap
}

// ── Validate WhatsApp number format ──
function isValidWhatsApp(num) {
  // Allow +, digits, spaces, dashes, parens — min 7 chars
  const cleaned = num.replace(/[\s\-()]/g, '');
  return /^\+?\d{7,15}$/.test(cleaned);
}

// ── Validate name ──
function isValidName(name) {
  return typeof name === 'string' && name.trim().length >= 2 && name.trim().length <= 100;
}

// ── Validate city ──
function isValidCity(city) {
  return typeof city === 'string' && city.trim().length >= 2 && city.trim().length <= 100;
}

export default async function handler(req, res) {
  // ── CORS: only allow our own domain ──
  const allowedOrigins = [
    'https://www.nexlab.solutions',
    'https://nexlab.solutions',
  ];

  // In development, also allow localhost
  if (process.env.NODE_ENV !== 'production') {
    allowedOrigins.push('http://localhost:5173', 'http://localhost:4173');
  }

  const origin = req.headers.origin || '';
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only POST allowed
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Rate limit by IP ──
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
    || req.headers['x-real-ip']
    || req.socket?.remoteAddress
    || 'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: 'Too many submissions. Please try again later.',
    });
  }

  try {
    const body = req.body;

    // ── Honeypot check: if this field has a value, it's a bot ──
    if (body.website && body.website.trim() !== '') {
      // Silently accept but don't forward (bots won't know they failed)
      return res.status(200).json({ success: true });
    }

    // ── Field validation ──
    const errors = [];

    if (!isValidName(body.name)) {
      errors.push('Name must be between 2 and 100 characters.');
    }
    if (!isValidName(body.businessName)) {
      errors.push('Business name must be between 2 and 100 characters.');
    }
    if (!body.whatsapp || !isValidWhatsApp(body.whatsapp)) {
      errors.push('Please enter a valid WhatsApp number (e.g. +1 519...).');
    }
    if (!isValidCity(body.city)) {
      errors.push('City must be between 2 and 100 characters.');
    }

    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(' ') });
    }

    // ── Sanitize all string fields ──
    const sanitizedPayload = {
      name: sanitize(body.name),
      businessName: sanitize(body.businessName),
      whatsapp: sanitize(body.whatsapp),
      city: sanitize(body.city),
      answers: body.answers || {},
      scores: body.scores || {},
      timestamp: new Date().toISOString(),
      source: 'nexlab-health-score',
    };

    // ── Forward to webhook ──
    const webhookUrl = process.env.WEBHOOK_URL;
    if (!webhookUrl) {
      // No webhook configured — still return success to user
      return res.status(200).json({ success: true });
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sanitizedPayload),
      signal: AbortSignal.timeout(8000), // 8s timeout
    });

    if (!webhookResponse.ok) {
      // Log server-side only, never expose to client
      console.error(`Webhook responded ${webhookResponse.status}`);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    // Log server-side only
    console.error('Webhook proxy error:', err?.message || err);
    // Still return success — user should see their results regardless
    return res.status(200).json({ success: true });
  }
}
