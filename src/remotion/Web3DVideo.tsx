import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';

// 3D Web Development — Shows a real website with interactive 3D product showcase
export const Web3DVideo = () => {
  const frame = useCurrentFrame();

  // Browser window entrance
  const browserScale = interpolate(frame, [0, 30], [0.85, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const browserOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // 3D shoe rotation (represents interactive product)
  const shoeAngle = frame * 1.5;
  const shoeY = Math.sin(frame * 0.04) * 3;

  // Website content reveal
  const contentReveal = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  // Interactive cursor that moves around the 3D object
  const cursorX = interpolate(frame, [40, 60, 80, 100, 120], [30, 55, 70, 45, 30], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const cursorY = interpolate(frame, [40, 60, 80, 100, 120], [60, 40, 55, 65, 60], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const cursorOpacity = interpolate(frame, [40, 48], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Drag indicator
  const dragShow = interpolate(frame, [55, 65, 90, 98], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Color options
  const colors = ['#6C63FF', '#FF6B6B', '#00D4AA', '#FFB800'];
  const activeColor = colors[Math.floor(frame / 30) % colors.length];

  // Nav items
  const navItems = ['Home', 'Products', '3D View', 'Cart'];

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(160deg, #0D0A1A 0%, #1A1035 50%, #0D0A1A 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', width: '50%', height: '50%', borderRadius: '50%',
        background: `radial-gradient(circle, ${activeColor}15 0%, transparent 70%)`,
        transition: 'background 0.5s ease',
      }} />

      {/* Browser Window */}
      <div style={{
        width: '85%', maxWidth: 380, aspectRatio: '16/11',
        background: '#0F0B1E',
        borderRadius: 12, border: '1px solid rgba(108,99,255,0.3)',
        boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${activeColor}10`,
        transform: `scale(${browserScale})`,
        opacity: browserOpacity,
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column' as const,
      }}>
        {/* Browser chrome */}
        <div style={{
          height: 22, background: '#1A1530',
          display: 'flex', alignItems: 'center', padding: '0 8px',
          borderBottom: '1px solid rgba(108,99,255,0.15)',
        }}>
          <div style={{ display: 'flex', gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF5F56' }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFBD2E' }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#27CA40' }} />
          </div>
          <div style={{
            flex: 1, margin: '0 8px', height: 13, borderRadius: 4,
            background: '#0D0A1A', display: 'flex', alignItems: 'center',
            padding: '0 6px', fontSize: 6, color: 'rgba(255,255,255,0.3)',
          }}>
            🔒 nexlab.solutions/3d-showcase
          </div>
        </div>

        {/* Website navbar */}
        <div style={{
          height: 20, background: '#14102A',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 10px', borderBottom: '1px solid rgba(108,99,255,0.1)',
          opacity: contentReveal,
        }}>
          <div style={{ fontSize: 7, fontWeight: 700, color: 'white' }}>
            <span style={{ color: '#6C63FF' }}>●</span> ShoeVault
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {navItems.map((item, i) => (
              <div key={i} style={{
                fontSize: 5.5, color: item === '3D View' ? '#6C63FF' : 'rgba(255,255,255,0.5)',
                fontWeight: item === '3D View' ? 700 : 400,
              }}>{item}</div>
            ))}
          </div>
        </div>

        {/* Website content area */}
        <div style={{
          flex: 1, display: 'flex', position: 'relative',
          padding: 10,
        }}>
          {/* Left - Product Info */}
          <div style={{
            width: '40%', display: 'flex', flexDirection: 'column' as const,
            justifyContent: 'center', gap: 5,
            opacity: contentReveal,
          }}>
            <div style={{ fontSize: 5, color: '#6C63FF', fontWeight: 600, letterSpacing: '0.1em' }}>
              NEW ARRIVAL
            </div>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'white', lineHeight: 1.1 }}>
              Air Max{'\n'}Pro 360
            </div>
            <div style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.4)', lineHeight: 1.3 }}>
              Experience comfort like never before with our interactive 3D preview
            </div>

            {/* Price */}
            <div style={{ fontSize: 10, fontWeight: 700, color: '#6C63FF', marginTop: 2 }}>
              $249.99
            </div>

            {/* Color picker */}
            <div style={{ display: 'flex', gap: 4, marginTop: 2 }}>
              {colors.map((c, i) => (
                <div key={i} style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: c,
                  border: c === activeColor ? '2px solid white' : '1px solid rgba(255,255,255,0.2)',
                  transform: c === activeColor ? 'scale(1.2)' : 'scale(1)',
                  transition: 'all 0.3s',
                }} />
              ))}
            </div>

            {/* Add to cart button */}
            <div style={{
              marginTop: 4, padding: '4px 8px',
              background: 'linear-gradient(135deg, #6C63FF, #3B82F6)',
              borderRadius: 6, fontSize: 6, fontWeight: 600, color: 'white',
              textAlign: 'center' as const, width: 'fit-content',
              opacity: interpolate(frame, [60, 72], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            }}>
              Add to Cart →
            </div>
          </div>

          {/* Right - 3D Product Area */}
          <div style={{
            width: '60%', position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* 3D rotation platform */}
            <div style={{
              position: 'relative', width: '90%', height: '80%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {/* Rotation ring */}
              <div style={{
                position: 'absolute', width: '85%', height: '20%', bottom: '5%',
                borderRadius: '50%',
                border: '1px solid rgba(108,99,255,0.2)',
                transform: 'perspective(200px) rotateX(70deg)',
              }} />

              {/* 3D Shoe representation using CSS shapes */}
              <div style={{
                transform: `rotateY(${shoeAngle}deg) translateY(${shoeY}px)`,
                transformStyle: 'preserve-3d' as const,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                {/* Shoe body */}
                <div style={{
                  width: 70, height: 28, borderRadius: '35px 30px 8px 15px',
                  background: `linear-gradient(135deg, ${activeColor}, ${activeColor}CC)`,
                  boxShadow: `0 8px 25px ${activeColor}40, inset 0 -3px 8px rgba(0,0,0,0.3)`,
                  position: 'relative',
                  transition: 'background 0.5s ease, box-shadow 0.5s ease',
                }}>
                  {/* Sole */}
                  <div style={{
                    position: 'absolute', bottom: -4, left: 2, right: 2,
                    height: 6, borderRadius: '0 0 8px 12px',
                    background: 'rgba(255,255,255,0.9)',
                  }} />
                  {/* Swoosh */}
                  <div style={{
                    position: 'absolute', top: '35%', left: '15%',
                    width: '55%', height: 2, borderRadius: 2,
                    background: 'rgba(255,255,255,0.7)',
                    transform: 'rotate(-8deg)',
                  }} />
                  {/* Heel tab */}
                  <div style={{
                    position: 'absolute', right: -2, top: -2,
                    width: 12, height: 15, borderRadius: '0 5px 3px 0',
                    background: `${activeColor}DD`,
                    transition: 'background 0.5s ease',
                  }} />
                </div>
              </div>

              {/* 360° label */}
              <div style={{
                position: 'absolute', bottom: 0, right: 5,
                fontSize: 5.5, color: 'rgba(255,255,255,0.3)', fontWeight: 600,
              }}>
                360°
              </div>
            </div>

            {/* Interactive cursor */}
            <div style={{
              position: 'absolute',
              left: `${cursorX}%`, top: `${cursorY}%`,
              opacity: cursorOpacity,
              pointerEvents: 'none' as const,
            }}>
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                <path d="M2 2L9 18L12 10L20 7L2 2Z" fill="white" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
              </svg>
            </div>

            {/* Drag to rotate tooltip */}
            <div style={{
              position: 'absolute', top: '15%', right: '5%',
              padding: '3px 6px', background: 'rgba(108,99,255,0.15)',
              border: '1px solid rgba(108,99,255,0.3)', borderRadius: 6,
              fontSize: 5, color: '#6C63FF', fontWeight: 600,
              opacity: dragShow, whiteSpace: 'nowrap' as const,
            }}>
              ↻ Drag to rotate
            </div>
          </div>
        </div>
      </div>

      {/* Feature badges */}
      <div style={{
        position: 'absolute', bottom: '8%', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 5, flexWrap: 'wrap' as const, justifyContent: 'center',
      }}>
        {[
          { icon: '🖱️', label: 'Interactive', delay: 80 },
          { icon: '🔄', label: '360° View', delay: 88 },
          { icon: '✨', label: 'Real-time', delay: 96 },
        ].map((f, i) => (
          <div key={i} style={{
            padding: '3px 8px', background: 'rgba(108,99,255,0.1)',
            border: '1px solid rgba(108,99,255,0.25)', borderRadius: 10,
            fontSize: 7, color: '#6C63FF', fontWeight: 600,
            display: 'flex', gap: 3, alignItems: 'center', whiteSpace: 'nowrap' as const,
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
