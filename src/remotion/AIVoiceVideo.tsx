import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';

// AI Voice Calling Agent — Shows a call interface with voice waveforms
export const AIVoiceVideo = () => {
  const frame = useCurrentFrame();

  // Phone entrance
  const phoneScale = interpolate(frame, [0, 40], [0.75, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const phoneOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Sound wave bars — organic, live-feeling animation
  const waveBars = Array.from({ length: 14 }, (_, i) => {
    const baseHeight = 12 + Math.sin(frame * 0.12 + i * 0.5) * 10 + Math.cos(frame * 0.08 + i * 0.3) * 5;
    return {
      height: Math.max(3, baseHeight),
      opacity: 0.5 + Math.sin(frame * 0.06 + i * 0.3) * 0.3,
    };
  });

  // Orb pulse
  const orbScale = interpolate(frame, [15, 35, 55, 75], [0.8, 1.1, 0.95, 1.05], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const orbGlow = 0.4 + Math.sin(frame * 0.06) * 0.3;

  // Call duration
  const seconds = Math.min(Math.floor(frame / 30), 99);
  const displayTime = `00:${String(seconds).padStart(2, '0')}`;

  // Status text progression — extended for 210 frames
  const statuses = [
    { text: '🎙️ Listening...', color: '#FFB800', start: 30, end: 70 },
    { text: '🧠 Processing...', color: '#00D4AA', start: 70, end: 105 },
    { text: '💬 Responding...', color: '#FFB800', start: 105, end: 155 },
    { text: '✅ Booked!', color: '#00D4AA', start: 155, end: 200 },
  ];

  // Conversation transcript lines — extended
  const transcriptLines = [
    { text: '"Hi, I\'d like to book a consultation"', delay: 50, speaker: 'caller' },
    { text: '"Sure! Let me check availability..."', delay: 80, speaker: 'ai' },
    { text: '"Thursday at 3 PM works perfectly"', delay: 115, speaker: 'ai' },
    { text: '"Booked! You\'ll get a confirmation SMS ✓"', delay: 150, speaker: 'ai' },
  ];

  // Feature badges — customer-friendly language
  const features = [
    { icon: '📞', label: 'Answers Calls', delay: 160 },
    { icon: '📅', label: 'Auto-booking', delay: 170 },
    { icon: '🔄', label: '24/7 Active', delay: 180 },
  ];

  // Ring animation
  const ring1 = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ring2 = interpolate(frame, [15, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(160deg, #1A1500 0%, #0D0D00 50%, #151200 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Ambient glow */}
      <div style={{ position: 'absolute', width: '60%', height: '60%', borderRadius: '50%', background: `radial-gradient(circle, rgba(255,184,0,${orbGlow * 0.15}) 0%, transparent 70%)` }} />

      {/* Phone call interface */}
      <div style={{
        width: '30%', minWidth: 80, maxWidth: 120,
        aspectRatio: '9/16',
        background: 'linear-gradient(180deg, #0D1A2A, #061020)',
        borderRadius: 20, border: '2px solid rgba(255,184,0,0.3)',
        boxShadow: `0 0 ${30 + orbGlow * 20}px rgba(255,184,0,${0.1 + orbGlow * 0.1}), 0 20px 60px rgba(0,0,0,0.5)`,
        transform: `scale(${phoneScale})`,
        opacity: phoneOpacity,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', padding: '10%',
        position: 'relative',
      }}>
        {/* AI Orb with rings */}
        <div style={{ position: 'relative', width: '55%', aspectRatio: '1', marginBottom: '8%' }}>
          {/* Pulsing rings */}
          <div style={{ position: 'absolute', inset: '-15%', borderRadius: '50%', border: '1px solid rgba(255,184,0,0.2)', opacity: ring1, transform: `scale(${1 + orbGlow * 0.1})` }} />
          <div style={{ position: 'absolute', inset: '-30%', borderRadius: '50%', border: '1px solid rgba(255,184,0,0.1)', opacity: ring2, transform: `scale(${1 + orbGlow * 0.15})` }} />
          {/* Main orb */}
          <div style={{
            width: '100%', height: '100%', borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transform: `scale(${orbScale})`,
            boxShadow: `0 0 ${15 + orbGlow * 15}px rgba(255,184,0,${orbGlow})`,
          }}>
            <svg width="45%" height="45%" viewBox="0 0 24 24" fill="white">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </div>
        </div>

        {/* Caller info */}
        <div style={{ fontSize: 'clamp(9px, 2vw, 12px)', fontWeight: 700, color: 'white', marginBottom: 2 }}>AI Assistant</div>
        <div style={{ fontSize: 'clamp(8px, 1.5vw, 10px)', color: '#FFB800', fontFamily: 'monospace', marginBottom: '8%' }}>{displayTime}</div>

        {/* Sound wave */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 1.5, height: 30, marginBottom: '8%' }}>
          {waveBars.map((bar, i) => (
            <div key={i} style={{
              width: 2.5, height: bar.height,
              background: `linear-gradient(180deg, #FFB800, #FF8C00)`,
              borderRadius: 2, opacity: bar.opacity,
            }} />
          ))}
        </div>

        {/* Call controls */}
        <div style={{ display: 'flex', gap: 10, marginTop: 'auto' }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
            </svg>
          </div>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
              <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z" />
            </svg>
          </div>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
              <path d="M15.5 1h-8A2.5 2.5 0 0 0 5 3.5v17A2.5 2.5 0 0 0 7.5 23h8a2.5 2.5 0 0 0 2.5-2.5v-17A2.5 2.5 0 0 0 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Status indicators */}
      {statuses.map((status, i) => {
        const statusOpacity = interpolate(frame, [status.start, status.start + 8, status.end - 5, status.end], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        return (
          <div key={i} style={{
            position: 'absolute', top: '18%', left: '8%',
            padding: '4px 10px', background: `${status.color}15`,
            border: `1px solid ${status.color}60`, borderRadius: 12,
            fontSize: 8, color: status.color, fontWeight: 600,
            opacity: statusOpacity,
          }}>
            {status.text}
          </div>
        );
      })}

      {/* Transcript — right side */}
      <div style={{
        position: 'absolute', right: '5%', top: '35%',
        width: '30%', minWidth: 80,
        display: 'flex', flexDirection: 'column', gap: 5,
      }}>
        {transcriptLines.map((line, i) => (
          <div key={i} style={{
            padding: '4px 8px',
            background: line.speaker === 'ai' ? 'rgba(255,184,0,0.08)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${line.speaker === 'ai' ? 'rgba(255,184,0,0.2)' : 'rgba(255,255,255,0.05)'}`,
            borderRadius: 6, fontSize: 7, color: 'rgba(255,255,255,0.6)',
            fontStyle: 'italic', lineHeight: 1.3,
            opacity: interpolate(frame, [line.delay, line.delay + 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `translateX(${interpolate(frame, [line.delay, line.delay + 12], [10, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
          }}>
            {line.text}
          </div>
        ))}
      </div>

      {/* Feature badges — bottom */}
      <div style={{
        position: 'absolute', bottom: '8%', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 5,
      }}>
        {features.map((f, i) => (
          <div key={i} style={{
            padding: '3px 8px', background: 'rgba(255,184,0,0.1)',
            border: '1px solid rgba(255,184,0,0.25)', borderRadius: 10,
            fontSize: 7, color: '#FFB800', fontWeight: 600, whiteSpace: 'nowrap',
            display: 'flex', gap: 3, alignItems: 'center',
            opacity: interpolate(frame, [f.delay, f.delay + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `translateY(${interpolate(frame, [f.delay, f.delay + 10], [8, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
          }}>
            <span>{f.icon}</span> {f.label}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
