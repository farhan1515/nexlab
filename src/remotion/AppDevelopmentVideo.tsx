import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';

// App Development Service Video — Shows a phone being built with UI elements assembling
export const AppDevelopmentVideo = () => {
  const frame = useCurrentFrame();

  // Phone entrance
  const phoneY = interpolate(frame, [0, 35], [80, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const phoneScale = interpolate(frame, [0, 35], [0.7, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const phoneOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Floating elements
  const float1 = Math.sin(frame * 0.08) * 5;
  const float2 = Math.cos(frame * 0.06 + 1) * 4;

  // UI elements sliding into the phone screen
  const headerWidth = interpolate(frame, [25, 50], [0, 100], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // App screen elements
  const screenElements = [
    { delay: 35, height: 14, color: 'rgba(0, 212, 170, 0.3)' },
    { delay: 42, height: 10, color: 'rgba(255,255,255,0.08)' },
    { delay: 49, height: 10, color: 'rgba(255,255,255,0.08)' },
    { delay: 56, height: 22, color: 'rgba(0, 212, 170, 0.15)' },
    { delay: 63, height: 10, color: 'rgba(255,255,255,0.06)' },
  ];

  // Features floating around
  const featureBadges = [
    { label: '🎨 Beautiful', x: -55, y: -40, delay: 60 },
    { label: '⚡ Fast', x: 55, y: -25, delay: 68 },
    { label: '✨ Smooth UX', x: -50, y: 40, delay: 76 },
    { label: '🚀 App Store', x: 50, y: 45, delay: 84 },
  ];

  // Success pulse
  const pulseScale = interpolate(frame, [100, 120, 140], [0, 1.2, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pulseOpacity = interpolate(frame, [100, 120], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Notification badge bounce
  const notifScale = interpolate(frame, [90, 105], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(160deg, #0B1D32 0%, #061220 50%, #0A1628 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
      }}
    >
      {/* Subtle dot matrix background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(0, 212, 170, 0.08) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Ambient glows */}
      <div style={{ position: 'absolute', width: '60%', height: '60%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 212, 170, 0.12) 0%, transparent 70%)', top: '20%', left: '20%', transform: `translateY(${float1}px)` }} />
      <div style={{ position: 'absolute', width: '40%', height: '40%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255, 184, 0, 0.08) 0%, transparent 70%)', bottom: '10%', right: '5%', transform: `translateY(${float2}px)` }} />

      {/* Phone Mockup */}
      <div
        style={{
          position: 'relative',
          width: '35%',
          maxWidth: 160,
          minWidth: 100,
          aspectRatio: '9/18',
          background: 'linear-gradient(180deg, #1A2940, #0D1A2A)',
          borderRadius: 20,
          border: '2px solid rgba(0, 212, 170, 0.4)',
          boxShadow: '0 0 40px rgba(0, 212, 170, 0.2), 0 20px 60px rgba(0,0,0,0.5)',
          transform: `translateY(${phoneY}px) scale(${phoneScale})`,
          opacity: phoneOpacity,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Dynamic Island */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0 4px' }}>
          <div style={{ width: '35%', height: 14, background: '#000', borderRadius: 10 }} />
        </div>

        {/* Screen */}
        <div style={{ flex: 1, margin: '0 6px 6px', borderRadius: 12, overflow: 'hidden', background: '#0A1628', position: 'relative' }}>
          {/* Header bar */}
          <div style={{ height: 18, background: 'linear-gradient(90deg, rgba(0,212,170,0.3), rgba(255,184,0,0.2))', display: 'flex', alignItems: 'center', padding: '0 8px', width: `${headerWidth}%`, overflow: 'hidden' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.5)', marginRight: 4 }} />
            <div style={{ width: 30, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.3)' }} />
          </div>

          {/* UI elements being built */}
          <div style={{ padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
            {screenElements.map((el, i) => {
              const elOpacity = interpolate(frame, [el.delay, el.delay + 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              const elX = interpolate(frame, [el.delay, el.delay + 12], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
              return (
                <div key={i} style={{ height: el.height, background: el.color, borderRadius: 4, opacity: elOpacity, transform: `translateX(${elX}px)` }} />
              );
            })}
          </div>

          {/* Bottom tab bar */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 22,
            background: 'rgba(0,0,0,0.5)', borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '0 12px',
            opacity: interpolate(frame, [70, 85], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          }}>
            {[0, 1, 2, 3].map(i => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: i === 0 ? '50%' : 2, background: i === 0 ? '#00D4AA' : 'rgba(255,255,255,0.2)' }} />
            ))}
          </div>

          {/* Success checkmark overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.6)',
            opacity: pulseOpacity,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'linear-gradient(135deg, #00D4AA, #00B894)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transform: `scale(${pulseScale})`,
              boxShadow: '0 0 20px rgba(0,212,170,0.6)',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
        </div>

        {/* Home indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3px 0 6px' }}>
          <div style={{ width: '40%', height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 2 }} />
        </div>
      </div>

      {/* Floating feature badges */}
      {featureBadges.map((badge, i) => {
        const badgeOpacity = interpolate(frame, [badge.delay, badge.delay + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const badgeY = interpolate(frame, [badge.delay, badge.delay + 15], [15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const floatOffset = Math.sin(frame * 0.04 + i) * 3;
        return (
          <div key={i} style={{
            position: 'absolute',
            left: `calc(50% + ${badge.x}px)`,
            top: `calc(50% + ${badge.y}px)`,
            transform: `translate(-50%, calc(-50% + ${badgeY + floatOffset}px))`,
            opacity: badgeOpacity,
            padding: '4px 10px',
            background: 'rgba(0, 212, 170, 0.12)',
            border: '1px solid rgba(0, 212, 170, 0.3)',
            borderRadius: 12,
            fontSize: 10,
            color: 'white',
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(8px)',
          }}>
            {badge.label}
          </div>
        );
      })}

      {/* Notification badge */}
      <div style={{
        position: 'absolute',
        top: 'calc(50% - 90px)',
        left: 'calc(50% + 55px)',
        width: 18, height: 18, borderRadius: '50%',
        background: '#EF4444',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontSize: 9, fontWeight: 800,
        transform: `scale(${notifScale})`,
        boxShadow: '0 0 12px rgba(239,68,68,0.6)',
      }}>
        3
      </div>
    </AbsoluteFill>
  );
};
