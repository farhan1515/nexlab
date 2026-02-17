import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';

// WhatsApp Automation — Chat interface with bot replying automatically
export const WhatsAppVideo = () => {
  const frame = useCurrentFrame();

  // Phone entrance
  const phoneY = interpolate(frame, [0, 40], [50, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const phoneOpacity = interpolate(frame, [0, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Messages — realistic chat flow (extended for 210 frames)
  const messages = [
    { text: 'Hi! I need help ordering 👋', delay: 25, isUser: true },
    { text: 'Welcome! 🤖 What would you like to order?', delay: 45, isUser: false },
    { text: 'Your Premium Package', delay: 65, isUser: true },
    { text: 'Great choice! ✅ Processing...', delay: 85, isUser: false },
    { text: 'Order #1234 confirmed! 🎉', delay: 105, isUser: false },
    { text: 'You\'ll receive tracking details shortly 📦', delay: 130, isUser: false },
  ];

  // Bot status indicator
  const typingDots = [0, 1, 2].map(i => ({
    opacity: interpolate(frame, [40 + i * 3, 43 + i * 3, 46 + i * 3], [0.3, 1, 0.3], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    }),
  }));

  // Automation flow diagram
  const flowNodes = [
    { emoji: '📩', label: 'Receive', delay: 140, color: '#25D366' },
    { emoji: '🤖', label: 'Process', delay: 150, color: '#FFB800' },
    { emoji: '✅', label: 'Respond', delay: 160, color: '#00B894' },
  ];

  const lineProgress = interpolate(frame, [145, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Notification badge
  const notifScale = interpolate(frame, [155, 167], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) });

  // Stats badges
  const stats = [
    { label: '24/7 Active', delay: 170 },
    { label: '< 1s Response', delay: 180 },
    { label: '99% Accuracy', delay: 190 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(160deg, #061F15 0%, #041510 50%, #071E13 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Ambient glow */}
      <div style={{ position: 'absolute', width: '50%', height: '50%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,211,102,0.1) 0%, transparent 70%)', top: '15%', left: '25%' }} />

      {/* Phone mockup */}
      <div
        style={{
          width: '32%', minWidth: 85, maxWidth: 130,
          aspectRatio: '9/17',
          background: '#0B141A', borderRadius: 18,
          border: '2px solid rgba(37,211,102,0.35)',
          boxShadow: '0 0 40px rgba(37,211,102,0.12), 0 20px 60px rgba(0,0,0,0.5)',
          transform: `translateY(${phoneY}px)`,
          opacity: phoneOpacity,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* WhatsApp header */}
        <div style={{
          height: 36, background: '#075E54',
          display: 'flex', alignItems: 'center',
          padding: '0 8px', gap: 6, flexShrink: 0,
        }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" /></svg>
          <div style={{
            width: 24, height: 24, borderRadius: '50%',
            background: 'linear-gradient(135deg, #25D366, #00B894)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 10 }}>🤖</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: 'white' }}>NexBot</div>
            <div style={{ fontSize: 7, color: '#25D366' }}>● online</div>
          </div>
        </div>

        {/* Chat area */}
        <div style={{
          flex: 1, background: '#0B141A', padding: 6,
          display: 'flex', flexDirection: 'column',
          gap: 4, overflow: 'hidden', justifyContent: 'flex-end',
        }}>
          {messages.map((msg, i) => {
            const msgOpacity = interpolate(frame, [msg.delay, msg.delay + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const msgX = interpolate(frame, [msg.delay, msg.delay + 10], [msg.isUser ? 15 : -15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) });
            return (
              <div key={i} style={{
                alignSelf: msg.isUser ? 'flex-end' : 'flex-start',
                maxWidth: '82%', padding: '4px 7px',
                borderRadius: msg.isUser ? '8px 8px 2px 8px' : '8px 8px 8px 2px',
                background: msg.isUser ? '#005C4B' : '#1F2C34',
                color: 'white', fontSize: 'clamp(7px, 1.5vw, 9px)',
                opacity: msgOpacity,
                transform: `translateX(${msgX}px)`,
                lineHeight: 1.3,
              }}>
                {msg.text}
                {!msg.isUser && i === messages.length - 1 && (
                  <span style={{ fontSize: 6, color: '#53BDEB', marginLeft: 3 }}>✓✓</span>
                )}
              </div>
            );
          })}

          {/* Typing indicator (shows during bot "thinking") */}
          <div style={{
            alignSelf: 'flex-start', padding: '5px 10px',
            background: '#1F2C34', borderRadius: '8px 8px 8px 2px',
            display: 'flex', gap: 2,
            opacity: interpolate(frame, [35, 38, 68, 70], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          }}>
            {typingDots.map((dot, i) => (
              <div key={i} style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.5)', opacity: dot.opacity }} />
            ))}
          </div>
        </div>

        {/* Input bar */}
        <div style={{
          height: 28, background: '#1F2C34',
          display: 'flex', alignItems: 'center', padding: '0 6px', gap: 4, flexShrink: 0,
        }}>
          <div style={{ flex: 1, height: 18, background: '#2A3942', borderRadius: 10, padding: '0 6px', display: 'flex', alignItems: 'center' }}>
            <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.3)' }}>Type a message...</div>
          </div>
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#00A884', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
          </div>
        </div>
      </div>

      {/* Automation flow — right side */}
      <div style={{
        position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
      }}>
        {flowNodes.map((node, i) => (
          <div key={i}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: `${node.color}15`, border: `1px solid ${node.color}60`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12,
              opacity: interpolate(frame, [node.delay, node.delay + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
              transform: `scale(${interpolate(frame, [node.delay, node.delay + 10], [0.5, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.ease) })})`,
              boxShadow: `0 0 12px ${node.color}30`,
            }}>
              {node.emoji}
            </div>
            <div style={{
              fontSize: 7, color: node.color, textAlign: 'center', marginTop: 2,
              opacity: interpolate(frame, [node.delay + 5, node.delay + 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            }}>{node.label}</div>
            {i < flowNodes.length - 1 && (
              <div style={{ width: 1, height: 10, background: `${node.color}40`, margin: '2px auto', transform: `scaleY(${lineProgress})`, transformOrigin: 'top' }} />
            )}
          </div>
        ))}
      </div>

      {/* Notification *badge — top right */}
      <div style={{
        position: 'absolute', top: '15%', right: '12%',
        width: 20, height: 20, borderRadius: '50%', background: '#EF4444',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontSize: 10, fontWeight: 800,
        transform: `scale(${notifScale})`,
        boxShadow: '0 0 12px rgba(239,68,68,0.5)',
      }}>
        5
      </div>

      {/* Stats strip */}
      <div style={{
        position: 'absolute', bottom: '8%', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 6,
      }}>
        {stats.map((stat, i) => (
          <div key={i} style={{
            padding: '3px 8px', background: 'rgba(37,211,102,0.1)',
            border: '1px solid rgba(37,211,102,0.25)', borderRadius: 10,
            fontSize: 7, color: '#25D366', fontWeight: 600, whiteSpace: 'nowrap',
            opacity: interpolate(frame, [stat.delay, stat.delay + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `translateY(${interpolate(frame, [stat.delay, stat.delay + 10], [8, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
          }}>
            {stat.label}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
