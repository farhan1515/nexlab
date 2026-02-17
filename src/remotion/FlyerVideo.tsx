import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';

// Flyer Creation — Shows a design canvas with elements being placed
export const FlyerVideo = () => {
  const frame = useCurrentFrame();

  // Canvas entrance
  const canvasScale = interpolate(frame, [0, 40], [0.5, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
  const canvasOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Background gradient reveal
  const bgOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Title text slide
  const titleOpacity = interpolate(frame, [30, 48], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const titleX = interpolate(frame, [30, 48], [-25, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  // Image area
  const imageOpacity = interpolate(frame, [40, 58], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const imageScale = interpolate(frame, [40, 58], [0.7, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });

  // CTA button
  const ctaOpacity = interpolate(frame, [52, 68], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ctaY = interpolate(frame, [52, 68], [12, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Star ratings
  const starOpacity = interpolate(frame, [60, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Paint brush cursor
  const cursorX = interpolate(frame, [10, 50, 80, 120], [10, 50, 70, 85], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cursorY = interpolate(frame, [10, 50, 80, 120], [10, 30, 55, 70], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const cursorOpacity = interpolate(frame, [8, 18, 115, 130], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Color palette
  const colors = ['#FF6B6B', '#FFB800', '#00D4AA', '#6C63FF', '#E040FB'];
  const paletteOpacity = interpolate(frame, [75, 92], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Sparkle animations
  const sparkles = Array.from({ length: 5 }, (_, i) => ({
    x: 20 + (i * 16) % 65,
    y: 15 + (i * 23) % 60,
    scale: interpolate(frame, [85 + i * 5, 98 + i * 5], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.ease),
    }),
    rotation: frame * 2 + i * 30,
  }));

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(160deg, #1A0A0A 0%, #0D0505 50%, #150808 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Background glow */}
      <div style={{ position: 'absolute', width: '50%', height: '50%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,107,0.12) 0%, transparent 70%)', top: '10%', right: '10%' }} />
      <div style={{ position: 'absolute', width: '40%', height: '40%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,184,0,0.08) 0%, transparent 70%)', bottom: '10%', left: '5%' }} />

      {/* Design Canvas — the flyer being built */}
      <div style={{
        width: '38%', minWidth: 100, maxWidth: 150,
        aspectRatio: '3/4',
        background: 'white', borderRadius: 8,
        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
        transform: `scale(${canvasScale})`,
        opacity: canvasOpacity,
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Gradient background */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #FF6B6B 0%, #EE5A24 50%, #FFB800 100%)', opacity: bgOpacity }} />

        {/* Flyer content */}
        <div style={{ position: 'relative', padding: '12%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          {/* Brand name */}
          <div style={{
            fontSize: 'clamp(12px, 3vw, 16px)', fontWeight: 900, color: 'white',
            textTransform: 'uppercase', letterSpacing: '0.05em',
            opacity: titleOpacity, transform: `translateX(${titleX}px)`,
            textShadow: '0 2px 8px rgba(0,0,0,0.3)', lineHeight: 1.1,
          }}>
            YOUR<br />BRAND<br />
            <span style={{ fontSize: 'clamp(7px, 1.5vw, 9px)', fontWeight: 400, letterSpacing: '0.1em' }}>CAMPAIGN 2025</span>
          </div>

          {/* Hero image area */}
          <div style={{
            flex: 1, margin: '10% 0',
            background: 'rgba(255,255,255,0.2)', borderRadius: 6,
            opacity: imageOpacity, transform: `scale(${imageScale})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}>
            <div style={{ width: '40%', height: '40%', borderRadius: '50%', background: 'rgba(255,255,255,0.3)', boxShadow: '0 0 20px rgba(255,255,255,0.2)' }} />
          </div>

          {/* Star rating */}
          <div style={{ display: 'flex', gap: 2, marginBottom: 6, opacity: starOpacity }}>
            {[0, 1, 2, 3, 4].map(i => (
              <span key={i} style={{ fontSize: 10, color: '#FFD700', textShadow: '0 0 4px rgba(255,215,0,0.6)' }}>★</span>
            ))}
          </div>

          {/* CTA Button */}
          <div style={{
            background: 'white', color: '#FF6B6B', padding: '6% 10%',
            borderRadius: 14, fontSize: 'clamp(8px, 1.8vw, 11px)', fontWeight: 800,
            textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em',
            opacity: ctaOpacity, transform: `translateY(${ctaY}px)`,
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          }}>
            Learn More →
          </div>
        </div>

        {/* Sparkles */}
        {sparkles.map((s, i) => (
          <div key={i} style={{
            position: 'absolute', left: `${s.x}%`, top: `${s.y}%`,
            transform: `scale(${s.scale}) rotate(${s.rotation}deg)`,
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#FFD700">
              <path d="M12 0L14 10L24 12L14 14L12 24L10 14L0 12L10 10L12 0Z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Design cursor */}
      <div style={{
        position: 'absolute',
        left: `${cursorX}%`, top: `${cursorY}%`,
        opacity: cursorOpacity,
        transform: 'rotate(-15deg)',
        fontSize: 16,
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
      }}>
        🖌️
      </div>

      {/* Color palette strip */}
      <div style={{
        position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 5, opacity: paletteOpacity,
      }}>
        {colors.map((color, i) => (
          <div key={color} style={{
            width: 14, height: 14, borderRadius: '50%', background: color,
            border: '2px solid rgba(255,255,255,0.2)',
            transform: `translateY(${interpolate(frame, [75 + i * 4, 90 + i * 4], [12, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
            opacity: interpolate(frame, [75 + i * 4, 90 + i * 4], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            boxShadow: `0 0 10px ${color}60`,
          }} />
        ))}
      </div>

      {/* Design tool badge */}
      <div style={{
        position: 'absolute', bottom: '4%', left: '50%', transform: 'translateX(-50%)',
        fontSize: 9, color: 'rgba(255,107,107,0.6)', fontWeight: 600,
        opacity: interpolate(frame, [100, 118], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
      }}>
        ✨ Premium Design
      </div>
    </AbsoluteFill>
  );
};
