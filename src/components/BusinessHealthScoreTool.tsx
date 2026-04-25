import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import {
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Send,
  Loader2,
  Share2,
  Calendar,
  Eye,
  Users,
  Zap,
  TrendingUp,
  Target,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

// ── Webhook URL — fill this in later ──────────────────────────────
const WEBHOOK_URL = '';

// ── Question definitions ──────────────────────────────────────────
const questions = [
  {
    id: 'q1',
    question: 'What type of business do you run?',
    options: [
      'Restaurant or Café',
      'Clinic or Healthcare',
      'Retail or Shop',
      'Contractor or Trades',
      'Real Estate',
      'Other',
    ],
  },
  {
    id: 'q2',
    question: 'How do most new customers find you right now?',
    options: [
      'Word of mouth',
      'Google Search',
      'Social Media',
      'Walk-ins',
      "Honestly, I'm not sure",
    ],
  },
  {
    id: 'q3',
    question: 'Do you have a website?',
    options: [
      'Yes, and it actively brings me leads',
      "Yes, but it doesn't really do much",
      "No, I don't have one",
    ],
  },
  {
    id: 'q4',
    question: 'How do you follow up with potential customers?',
    options: [
      'I call or message them manually',
      "I don't really follow up",
      'I have an automated system',
      'It depends on the situation',
    ],
  },
  {
    id: 'q5',
    question:
      'How many hours per week does your team spend on repetitive tasks — answering the same questions, scheduling, data entry, etc.?',
    options: [
      'Less than 5 hours',
      '5 to 15 hours',
      '15 to 30 hours',
      'More than 30 hours',
    ],
  },
  {
    id: 'q6',
    question: 'Do you collect customer contact info for future marketing?',
    options: [
      'Yes, and we actively use it',
      'We collect it but never really use it',
      "No, we don't collect it at all",
    ],
  },
  {
    id: 'q7',
    question: 'How are your online reviews?',
    options: [
      'Great — mostly 4 and 5 stars',
      'Mixed — some good, some bad',
      'Poor — or almost no reviews',
      "I don't know what my reviews look like",
    ],
  },
  {
    id: 'q8',
    question: 'What is your biggest challenge right now?',
    options: [
      'Getting more new customers',
      'Keeping existing customers coming back',
      'Saving time on daily operations',
      'Standing out from competitors',
    ],
  },
];

// ── Scoring Logic ─────────────────────────────────────────────────
function calculateScores(answers: Record<string, string>) {
  // Online Visibility (Q2, Q3, Q7)
  let onlineVisibility = 0;
  // Q2
  if (answers.q2 === 'Google Search') onlineVisibility += 40;
  else if (answers.q2 === 'Social Media') onlineVisibility += 25;
  else if (answers.q2 === 'Walk-ins' || answers.q2 === 'Word of mouth')
    onlineVisibility += 10;
  // Q3
  if (answers.q3 === 'Yes, and it actively brings me leads')
    onlineVisibility += 40;
  else if (answers.q3 === "Yes, but it doesn't really do much")
    onlineVisibility += 20;
  // Q7
  if (answers.q7 === 'Great — mostly 4 and 5 stars')
    onlineVisibility += 20;
  else if (answers.q7 === 'Mixed — some good, some bad')
    onlineVisibility += 10;

  onlineVisibility = Math.min(100, onlineVisibility);

  // Lead Capture & Follow-up (Q4, Q6)
  let leadCapture = 0;
  if (answers.q4 === 'I have an automated system') leadCapture += 50;
  else if (answers.q4 === 'I call or message them manually')
    leadCapture += 25;
  else if (answers.q4 === 'It depends on the situation')
    leadCapture += 15;

  if (answers.q6 === 'Yes, and we actively use it') leadCapture += 50;
  else if (answers.q6 === 'We collect it but never really use it')
    leadCapture += 25;

  leadCapture = Math.min(100, leadCapture);

  // Operational Efficiency (Q5)
  let operationalEfficiency = 0;
  if (answers.q5 === 'Less than 5 hours') operationalEfficiency = 100;
  else if (answers.q5 === '5 to 15 hours') operationalEfficiency = 65;
  else if (answers.q5 === '15 to 30 hours') operationalEfficiency = 35;
  else if (answers.q5 === 'More than 30 hours')
    operationalEfficiency = 10;

  // Customer Retention (Q4, Q6, Q8)
  let customerRetention = 0;
  if (answers.q6 === 'Yes, and we actively use it')
    customerRetention += 50;
  else if (answers.q6 === 'We collect it but never really use it')
    customerRetention += 25;

  if (answers.q8 === 'Keeping existing customers coming back')
    customerRetention += 20;

  if (answers.q4 === 'I have an automated system')
    customerRetention += 30;
  else if (answers.q4 === 'I call or message them manually')
    customerRetention += 15;

  customerRetention = Math.min(100, customerRetention);

  // Growth Potential (composite weighted average)
  const growthPotential = Math.round(
    onlineVisibility * 0.25 +
      leadCapture * 0.25 +
      operationalEfficiency * 0.2 +
      customerRetention * 0.15 +
      // Boost from Q8 awareness
      (answers.q8 === 'Getting more new customers' ? 15 : 0) +
      // Boost from having a website
      (answers.q3 === 'Yes, and it actively brings me leads' ? 10 : 0) +
      // Boost from good reviews
      (answers.q7 === 'Great — mostly 4 and 5 stars' ? 5 : 0)
  );

  const growthCapped = Math.min(100, growthPotential);

  const overall = Math.round(
    (onlineVisibility +
      leadCapture +
      operationalEfficiency +
      customerRetention +
      growthCapped) /
      5
  );

  return {
    onlineVisibility,
    leadCapture,
    operationalEfficiency,
    customerRetention,
    growthPotential: growthCapped,
    overall,
  };
}

function getScoreLabel(score: number) {
  if (score <= 40)
    return { label: 'Needs Urgent Attention', color: '#EF4444' };
  if (score <= 65) return { label: 'Room to Grow', color: '#F59E0B' };
  if (score <= 85)
    return { label: 'Good — But Gaps Exist', color: '#00D4AA' };
  return { label: 'High Performer', color: '#22C55E' };
}

interface CategoryScore {
  name: string;
  score: number;
  icon: React.ElementType;
}

function generateInsights(categories: CategoryScore[]): {
  title: string;
  cost: string;
  solution: string;
}[] {
  const sorted = [...categories].sort((a, b) => a.score - b.score);
  const lowest = sorted.slice(0, 3);

  return lowest.map((cat) => {
    switch (cat.name) {
      case 'Online Visibility':
        return {
          title: 'Low Online Visibility',
          cost: "Potential customers can't find you online. You're likely losing 40-60% of local search traffic to competitors who rank higher on Google and appear in AI search results.",
          solution:
            'SEO optimization combined with review management and an AI-optimized web presence typically doubles organic inquiries within 60-90 days.',
        };
      case 'Lead Capture & Follow-up':
        return {
          title: 'Weak Lead Capture',
          cost: "Without automated follow-up, 78% of leads go to the first business that responds. If you're replying manually hours later, you're handing customers to your competitors.",
          solution:
            'Automated WhatsApp and SMS follow-up systems respond in under 30 seconds, capturing leads 24/7 and booking them before they move on.',
        };
      case 'Operational Efficiency':
        return {
          title: 'Operational Overhead',
          cost: 'Your team is spending significant hours on tasks that can be automated. For a 5-person team, that\'s roughly $1,500–3,000/month in wasted labor.',
          solution:
            'AI automation typically fixes this within 30 days — handling scheduling, data entry, and repetitive customer inquiries automatically.',
        };
      case 'Customer Retention':
        return {
          title: 'Customer Retention Gap',
          cost: "Acquiring a new customer costs 5-7x more than keeping an existing one. Without active retention systems, you're leaving significant recurring revenue on the table.",
          solution:
            'Automated re-engagement campaigns, loyalty triggers, and personalized follow-ups bring customers back and increase lifetime value by 25-40%.',
        };
      case 'Growth Potential':
        return {
          title: 'Untapped Growth Potential',
          cost: "Your business has room to scale, but foundational gaps in digital presence and automation are limiting how fast you can grow.",
          solution:
            'A comprehensive digital strategy combining web presence, lead automation, and operational efficiency typically unlocks 2-3x growth within 6 months.',
        };
      default:
        return {
          title: 'Improvement Area',
          cost: 'This area is holding back your business growth potential.',
          solution:
            'Targeted improvements in this area can yield measurable results within 30-60 days.',
        };
    }
  });
}

// ── Main Component ────────────────────────────────────────────────
const BusinessHealthScoreTool = () => {
  const [screen, setScreen] = useState<
    'intro' | 'questions' | 'leadCapture' | 'loading' | 'results'
  >('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [leadInfo, setLeadInfo] = useState({
    name: '',
    businessName: '',
    whatsapp: '',
    city: '',
  });
  const [loadingText, setLoadingText] = useState(0);
  const [scores, setScores] = useState<ReturnType<
    typeof calculateScores
  > | null>(null);
  const [copied, setCopied] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const gaugeRef = useRef<SVGCircleElement>(null);
  const scoreCounterRef = useRef<HTMLSpanElement>(null);

  // ── Screen transitions ────────────────────────────────────────
  const animateIn = useCallback(() => {
    if (!containerRef.current) return;
    gsap.fromTo(
      containerRef.current.querySelector('.screen-content'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out' }
    );
  }, []);

  useEffect(() => {
    animateIn();
  }, [screen, animateIn]);

  // ── Question transition ───────────────────────────────────────
  const animateQuestion = useCallback(
    (direction: 'next' | 'prev') => {
      if (!questionRef.current) return;
      const xStart = direction === 'next' ? 60 : -60;
      gsap.fromTo(
        questionRef.current,
        { opacity: 0, x: xStart },
        { opacity: 1, x: 0, duration: 0.4, ease: 'expo.out' }
      );
    },
    []
  );

  // ── Answer selection ──────────────────────────────────────────
  const selectAnswer = (value: string) => {
    const qId = questions[currentQuestion].id;
    setAnswers((prev) => ({ ...prev, [qId]: value }));

    // Brief delay then advance
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1);
        animateQuestion('next');
      } else {
        setScreen('leadCapture');
      }
    }, 300);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      animateQuestion('prev');
    } else {
      setScreen('intro');
    }
  };

  // ── Loading texts cycle ───────────────────────────────────────
  const loadingTexts = [
    'Analyzing your online visibility...',
    'Calculating lead capture efficiency...',
    'Measuring operational gaps...',
  ];

  useEffect(() => {
    if (screen !== 'loading') return;

    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx < loadingTexts.length) {
        setLoadingText(idx);
      }
    }, 1000);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      const calculated = calculateScores(answers);
      setScores(calculated);
      setScreen('results');
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [screen]);

  // ── Results animation ─────────────────────────────────────────
  useEffect(() => {
    if (screen !== 'results' || !scores) return;

    // Animate gauge
    const circumference = 2 * Math.PI * 54;
    const offset =
      circumference - (scores.overall / 100) * circumference;

    setTimeout(() => {
      if (gaugeRef.current) {
        gsap.fromTo(
          gaugeRef.current,
          { strokeDashoffset: circumference },
          {
            strokeDashoffset: offset,
            duration: 2,
            ease: 'expo.out',
          }
        );
      }

      // Animate counter
      if (scoreCounterRef.current) {
        gsap.fromTo(
          { val: 0 },
          {
            val: scores.overall,
            duration: 2,
            ease: 'expo.out',
            onUpdate: function () {
              if (scoreCounterRef.current) {
                scoreCounterRef.current.textContent = String(
                  Math.round(this.targets()[0].val)
                );
              }
            },
          }
        );
      }

      // Animate category bars
      gsap.fromTo(
        '.category-bar-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'expo.out',
          delay: 0.5,
        }
      );

      // Animate insight cards
      gsap.fromTo(
        '.insight-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: 'expo.out',
          delay: 1.5,
        }
      );
    }, 200);
  }, [screen, scores]);

  // ── Submit lead form ──────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setScreen('loading');

    const calculated = calculateScores(answers);

    const payload = {
      name: leadInfo.name,
      businessName: leadInfo.businessName,
      whatsapp: leadInfo.whatsapp,
      city: leadInfo.city,
      answers: {
        q1: answers.q1 || '',
        q2: answers.q2 || '',
        q3: answers.q3 || '',
        q4: answers.q4 || '',
        q5: answers.q5 || '',
        q6: answers.q6 || '',
        q7: answers.q7 || '',
        q8: answers.q8 || '',
      },
      scores: {
        onlineVisibility: calculated.onlineVisibility,
        leadCapture: calculated.leadCapture,
        operationalEfficiency: calculated.operationalEfficiency,
        customerRetention: calculated.customerRetention,
        growthPotential: calculated.growthPotential,
        overall: calculated.overall,
      },
      timestamp: new Date().toISOString(),
      source: 'nexlab-health-score',
    };

    if (WEBHOOK_URL) {
      try {
        await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {
        // silently continue
      }
    }
  };

  // ── Share handler ─────────────────────────────────────────────
  const handleShare = async () => {
    const text = `I just scored ${scores?.overall}/100 on the NexLab Business Health Score. Find out how your business scores → nexlab.solutions/score`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // ── Progress bar ──────────────────────────────────────────────
  const progress =
    screen === 'questions'
      ? ((currentQuestion + 1) / questions.length) * 100
      : screen === 'leadCapture'
        ? 100
        : 0;

  // ── Category data for results ─────────────────────────────────
  const categoryData: CategoryScore[] = scores
    ? [
        {
          name: 'Online Visibility',
          score: scores.onlineVisibility,
          icon: Eye,
        },
        {
          name: 'Lead Capture & Follow-up',
          score: scores.leadCapture,
          icon: Target,
        },
        {
          name: 'Operational Efficiency',
          score: scores.operationalEfficiency,
          icon: Zap,
        },
        {
          name: 'Customer Retention',
          score: scores.customerRetention,
          icon: Users,
        },
        {
          name: 'Growth Potential',
          score: scores.growthPotential,
          icon: TrendingUp,
        },
      ]
    : [];

  const scoreInfo = scores ? getScoreLabel(scores.overall) : null;
  const insights = scores ? generateInsights(categoryData) : [];
  const circumference = 2 * Math.PI * 54;

  return (
    <div
      ref={containerRef}
      className="w-full max-w-2xl mx-auto px-4 sm:px-6"
    >
      {/* ── SCREEN 1: INTRO ──────────────────────────────────── */}
      {screen === 'intro' && (
        <div className="screen-content text-center py-12 md:py-20">
          {/* Decorative glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-gray-300">
                FREE TOOL — 2 Minute Assessment
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              Is Your Business{' '}
              <span className="gradient-text">
                Leaving Money on the Table?
              </span>
            </h2>

            <p className="text-lg text-gray-400 max-w-lg mx-auto mb-10 leading-relaxed">
              Get your free NexLab Business Health Score in 2 minutes.
              No fluff. Just an honest report sent to your WhatsApp.
            </p>

            <button
              onClick={() => setScreen('questions')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:scale-105 hover:shadow-glow transition-all duration-300 group text-lg"
            >
              Get My Free Score
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      )}

      {/* ── SCREEN 2: QUESTIONS ──────────────────────────────── */}
      {screen === 'questions' && (
        <div className="screen-content py-8 md:py-12">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Back button */}
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* Question */}
          <div ref={questionRef}>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white mb-8 leading-tight">
              {questions[currentQuestion].question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option) => {
                const isSelected =
                  answers[questions[currentQuestion].id] === option;
                return (
                  <button
                    key={option}
                    onClick={() => selectAnswer(option)}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 group flex items-center justify-between ${
                      isSelected
                        ? 'bg-primary/10 border-primary/50 text-white'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span className="font-medium">{option}</span>
                    <ChevronRight
                      className={`w-4 h-4 transition-all duration-300 ${
                        isSelected
                          ? 'text-primary opacity-100'
                          : 'opacity-0 group-hover:opacity-50'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── SCREEN 3: LEAD CAPTURE ───────────────────────────── */}
      {screen === 'leadCapture' && (
        <div className="screen-content py-8 md:py-12">
          {/* Back button */}
          <button
            onClick={() => {
              setCurrentQuestion(questions.length - 1);
              setScreen('questions');
            }}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="glass rounded-3xl p-6 sm:p-8 md:p-10">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 shadow-glow">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                Your report is ready.
              </h3>
              <p className="text-gray-400 max-w-sm mx-auto">
                Enter your details and we'll send your personalized
                report to your WhatsApp in under 2 minutes.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={leadInfo.name}
                  onChange={(e) =>
                    setLeadInfo((p) => ({
                      ...p,
                      name: e.target.value,
                    }))
                  }
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={`form-input ${focusedField === 'name' ? 'border-primary shadow-glow' : ''}`}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  required
                  value={leadInfo.businessName}
                  onChange={(e) =>
                    setLeadInfo((p) => ({
                      ...p,
                      businessName: e.target.value,
                    }))
                  }
                  onFocus={() => setFocusedField('business')}
                  onBlur={() => setFocusedField(null)}
                  className={`form-input ${focusedField === 'business' ? 'border-primary shadow-glow' : ''}`}
                  placeholder="Your Business"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  WhatsApp Number
                </label>
                <input
                  type="tel"
                  required
                  value={leadInfo.whatsapp}
                  onChange={(e) =>
                    setLeadInfo((p) => ({
                      ...p,
                      whatsapp: e.target.value,
                    }))
                  }
                  onFocus={() => setFocusedField('whatsapp')}
                  onBlur={() => setFocusedField(null)}
                  className={`form-input ${focusedField === 'whatsapp' ? 'border-primary shadow-glow' : ''}`}
                  placeholder="+1 519..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={leadInfo.city}
                  onChange={(e) =>
                    setLeadInfo((p) => ({
                      ...p,
                      city: e.target.value,
                    }))
                  }
                  onFocus={() => setFocusedField('city')}
                  onBlur={() => setFocusedField(null)}
                  className={`form-input ${focusedField === 'city' ? 'border-primary shadow-glow' : ''}`}
                  placeholder="Windsor"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:scale-105 hover:shadow-glow transition-all duration-300 group"
              >
                <Send className="w-5 h-5" />
                Send My Free Report
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-4">
              No spam. No sales pressure. Just your report.
            </p>
          </div>
        </div>
      )}

      {/* ── SCREEN 4: LOADING ────────────────────────────────── */}
      {screen === 'loading' && (
        <div className="screen-content py-20 md:py-32 text-center">
          <div className="relative inline-block mb-8">
            {/* Spinning ring */}
            <div className="w-20 h-20 rounded-full border-2 border-white/10 border-t-primary animate-spin mx-auto" />
            {/* Inner glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 animate-pulse" />
            </div>
          </div>

          <p className="text-lg font-display font-semibold text-white mb-2 transition-opacity duration-300">
            {loadingTexts[loadingText]}
          </p>
          <p className="text-sm text-gray-500">
            This will only take a moment...
          </p>
        </div>
      )}

      {/* ── SCREEN 5: RESULTS ────────────────────────────────── */}
      {screen === 'results' && scores && scoreInfo && (
        <div className="screen-content py-8 md:py-12">
          {/* Score Gauge */}
          <div className="text-center mb-10">
            <div className="relative inline-block mb-6">
              <svg
                width="140"
                height="140"
                viewBox="0 0 120 120"
                className="transform -rotate-90"
              >
                {/* Background circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="8"
                />
                {/* Score circle */}
                <circle
                  ref={gaugeRef}
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke={scoreInfo.color}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference}
                  style={{
                    filter: `drop-shadow(0 0 8px ${scoreInfo.color}60)`,
                  }}
                />
              </svg>
              {/* Score number */}
              <div className="absolute inset-0 flex flex-col items-center justify-center transform rotate-0">
                <span
                  ref={scoreCounterRef}
                  className="text-4xl font-display font-bold text-white"
                >
                  0
                </span>
                <span className="text-sm text-gray-400">/100</span>
              </div>
            </div>

            <h3
              className="text-xl sm:text-2xl font-display font-bold mb-2"
              style={{ color: scoreInfo.color }}
            >
              {scoreInfo.label}
            </h3>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Here's how your business scores across 5 key categories
            </p>
          </div>

          {/* Category Bars */}
          <div className="space-y-4 mb-10">
            {categoryData.map((cat) => {
              const Icon = cat.icon;
              const barColor =
                cat.score <= 40
                  ? '#EF4444'
                  : cat.score <= 65
                    ? '#F59E0B'
                    : cat.score <= 85
                      ? '#00D4AA'
                      : '#22C55E';

              return (
                <div
                  key={cat.name}
                  className="glass rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Icon
                        className="w-4 h-4"
                        style={{ color: barColor }}
                      />
                      <span className="text-sm font-medium text-white">
                        {cat.name}
                      </span>
                    </div>
                    <span
                      className="text-sm font-bold"
                      style={{ color: barColor }}
                    >
                      {cat.score}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="category-bar-fill h-full rounded-full origin-left"
                      style={{
                        backgroundColor: barColor,
                        width: `${cat.score}%`,
                        boxShadow: `0 0 8px ${barColor}40`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Insight Cards */}
          <div className="space-y-4 mb-10">
            <h4 className="text-lg font-display font-bold text-white mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-accent" />
              Key Insights
            </h4>
            {insights.map((insight, i) => (
              <div
                key={i}
                className="insight-card glass rounded-2xl p-5 sm:p-6 border border-white/5 hover:border-primary/20 transition-all duration-300"
              >
                <h5 className="text-base font-display font-bold text-white mb-2">
                  {insight.title}
                </h5>
                <p className="text-sm text-gray-400 leading-relaxed mb-3">
                  <span className="text-gray-300 font-medium">
                    What it's costing you:{' '}
                  </span>
                  {insight.cost}
                </p>
                <p className="text-sm leading-relaxed">
                  <span className="text-primary font-medium">
                    The fix:{' '}
                  </span>
                  <span className="text-gray-300">
                    {insight.solution}
                  </span>
                </p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="glass rounded-3xl p-6 sm:p-8 text-center border border-primary/20">
            <h4 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
              Want us to close these gaps for you?
            </h4>
            <p className="text-gray-400 mb-6">
              Free 15-minute call. No commitment.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector('#contact')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl hover:scale-105 hover:shadow-glow transition-all duration-300 group w-full sm:w-auto justify-center"
              >
                <Calendar className="w-5 h-5" />
                Book Free Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white hover:text-dark hover:border-white transition-all duration-300 w-full sm:w-auto justify-center"
              >
                <Share2 className="w-5 h-5" />
                {copied ? 'Copied!' : 'Share My Score'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessHealthScoreTool;
