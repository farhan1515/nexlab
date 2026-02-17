import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';

// Custom AI Solutions — Shows a business dashboard with AI automating tasks
export const CustomAIVideo = () => {
  const frame = useCurrentFrame();

  // Dashboard entrance
  const dashScale = interpolate(frame, [0, 35], [0.85, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const dashOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Card reveal stagger
  const cardReveal = (delay: number) => interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });
  const cardSlide = (delay: number) => interpolate(frame, [delay, delay + 15], [15, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  // Counter animations
  const emailCount = Math.floor(interpolate(frame, [45, 90], [0, 847], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const savedHours = Math.floor(interpolate(frame, [50, 95], [0, 32], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }));
  const accuracy = interpolate(frame, [55, 100], [0, 98.5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Automation flow dots
  const flowProgress = interpolate(frame, [60, 120], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Task list items being auto-completed
  const tasks = [
    { text: 'Sort customer emails', delay: 40 },
    { text: 'Generate weekly report', delay: 55 },
    { text: 'Update inventory data', delay: 70 },
    { text: 'Send follow-up emails', delay: 85 },
    { text: 'Analyze sales trends', delay: 100 },
  ];

  // Pulse for AI indicator
  const aiPulse = 0.5 + Math.sin(frame * 0.08) * 0.3;

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(160deg, #1A0D28 0%, #0D0618 50%, #150A22 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', width: '60%', height: '60%', borderRadius: '50%',
        background: `radial-gradient(circle, rgba(224,64,251,${aiPulse * 0.12}) 0%, transparent 70%)`,
      }} />

      {/* Main Dashboard Panel */}
      <div style={{
        width: '88%', maxWidth: 400,
        background: '#0F0920',
        borderRadius: 12, border: '1px solid rgba(224,64,251,0.2)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        transform: `scale(${dashScale})`,
        opacity: dashOpacity,
        overflow: 'hidden',
      }}>
        {/* Header bar */}
        <div style={{
          height: 24, background: '#1A0D30',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 10px',
          borderBottom: '1px solid rgba(224,64,251,0.15)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: `linear-gradient(135deg, #E040FB, #7C4DFF)`,
              boxShadow: `0 0 ${6 + aiPulse * 4}px rgba(224,64,251,${aiPulse})`,
            }} />
            <span style={{ fontSize: 7, fontWeight: 700, color: 'white' }}>AI Dashboard</span>
          </div>
          <div style={{
            fontSize: 5.5, color: '#E040FB', fontWeight: 600,
            padding: '1px 5px', background: 'rgba(224,64,251,0.1)',
            borderRadius: 4,
          }}>
            ● Live
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 8 }}>
          {/* Stats row */}
          <div style={{ display: 'flex', gap: 5, marginBottom: 6 }}>
            {/* Emails processed */}
            <div style={{
              flex: 1, padding: 6, borderRadius: 8,
              background: 'rgba(224,64,251,0.06)',
              border: '1px solid rgba(224,64,251,0.12)',
              opacity: cardReveal(30),
              transform: `translateY(${cardSlide(30)}px)`,
            }}>
              <div style={{ fontSize: 5, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>Emails Processed</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#E040FB', fontFamily: 'monospace' }}>
                {emailCount}
              </div>
              <div style={{ fontSize: 5, color: '#00D4AA', marginTop: 1 }}>↑ Auto-sorted</div>
            </div>

            {/* Hours saved */}
            <div style={{
              flex: 1, padding: 6, borderRadius: 8,
              background: 'rgba(0,212,170,0.06)',
              border: '1px solid rgba(0,212,170,0.12)',
              opacity: cardReveal(35),
              transform: `translateY(${cardSlide(35)}px)`,
            }}>
              <div style={{ fontSize: 5, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>Hours Saved</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#00D4AA', fontFamily: 'monospace' }}>
                {savedHours}h
              </div>
              <div style={{ fontSize: 5, color: '#00D4AA', marginTop: 1 }}>↑ This week</div>
            </div>

            {/* Accuracy */}
            <div style={{
              flex: 1, padding: 6, borderRadius: 8,
              background: 'rgba(255,184,0,0.06)',
              border: '1px solid rgba(255,184,0,0.12)',
              opacity: cardReveal(40),
              transform: `translateY(${cardSlide(40)}px)`,
            }}>
              <div style={{ fontSize: 5, color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>Accuracy</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#FFB800', fontFamily: 'monospace' }}>
                {accuracy.toFixed(1)}%
              </div>
              <div style={{ fontSize: 5, color: '#FFB800', marginTop: 1 }}>↑ Improving</div>
            </div>
          </div>

          {/* Automated Tasks Section */}
          <div style={{
            borderRadius: 8, background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            padding: 6,
            opacity: cardReveal(45),
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 5,
            }}>
              <div style={{ fontSize: 6, fontWeight: 700, color: 'white' }}>
                ⚡ Automated Tasks
              </div>
              <div style={{ fontSize: 5, color: 'rgba(255,255,255,0.3)' }}>Today</div>
            </div>

            {/* Task list */}
            {tasks.map((task, i) => {
              const isComplete = frame > task.delay + 10;
              const taskOpacity = interpolate(frame, [task.delay, task.delay + 8], [0, 1], {
                extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
              });
              const checkScale = interpolate(frame, [task.delay + 8, task.delay + 14], [0, 1], {
                extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
                easing: Easing.out(Easing.back(2)),
              });

              return (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 4,
                  padding: '3px 0',
                  borderBottom: i < tasks.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                  opacity: taskOpacity,
                }}>
                  {/* Checkbox */}
                  <div style={{
                    width: 10, height: 10, borderRadius: 3,
                    background: isComplete ? 'linear-gradient(135deg, #00D4AA, #00B894)' : 'rgba(255,255,255,0.05)',
                    border: isComplete ? 'none' : '1px solid rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transform: `scale(${isComplete ? checkScale : 1})`,
                  }}>
                    {isComplete && (
                      <svg width="6" height="6" viewBox="0 0 12 12" fill="white">
                        <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  {/* Task text */}
                  <div style={{
                    fontSize: 6, flex: 1,
                    color: isComplete ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.7)',
                    textDecoration: isComplete ? 'line-through' : 'none',
                  }}>
                    {task.text}
                  </div>
                  {/* AI badge */}
                  {isComplete && (
                    <div style={{
                      fontSize: 4.5, color: '#E040FB', fontWeight: 600,
                      padding: '1px 4px', background: 'rgba(224,64,251,0.1)',
                      borderRadius: 3,
                      opacity: checkScale,
                    }}>
                      AI ✓
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Automation flow bar at bottom */}
          <div style={{
            marginTop: 6, padding: '4px 6px',
            borderRadius: 6, background: 'rgba(224,64,251,0.05)',
            border: '1px solid rgba(224,64,251,0.1)',
            display: 'flex', alignItems: 'center', gap: 4,
            opacity: cardReveal(90),
          }}>
            <div style={{ fontSize: 5.5, color: 'rgba(255,255,255,0.4)', whiteSpace: 'nowrap' as const }}>
              AI Progress:
            </div>
            <div style={{
              flex: 1, height: 4, borderRadius: 2,
              background: 'rgba(255,255,255,0.05)',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', borderRadius: 2,
                background: 'linear-gradient(90deg, #E040FB, #7C4DFF, #00D4AA)',
                width: `${flowProgress * 100}%`,
                transition: 'width 0.1s',
              }} />
            </div>
            <div style={{ fontSize: 5.5, color: '#E040FB', fontWeight: 600, whiteSpace: 'nowrap' as const }}>
              {Math.floor(flowProgress * 100)}%
            </div>
          </div>
        </div>
      </div>

      {/* Bottom badges */}
      <div style={{
        position: 'absolute', bottom: '7%', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 5, flexWrap: 'wrap' as const, justifyContent: 'center',
      }}>
        {[
          { icon: '⚡', label: 'Save Time', delay: 105 },
          { icon: '📊', label: 'Smart Reports', delay: 112 },
          { icon: '🤖', label: 'Auto-Tasks', delay: 119 },
        ].map((f, i) => (
          <div key={i} style={{
            padding: '3px 8px', background: 'rgba(224,64,251,0.1)',
            border: '1px solid rgba(224,64,251,0.25)', borderRadius: 10,
            fontSize: 7, color: '#E040FB', fontWeight: 600,
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
