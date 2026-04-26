import { useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';

// Get Found on Google & AI Search — Search bar types a query, your business
// ranks #1 in Google results AND gets cited across AI assistants.
export const GoogleAISearchVideo = () => {
  const frame = useCurrentFrame();

  // Search bar entrance
  const barY = interpolate(frame, [0, 22], [25, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const barOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Typed query — characters revealed by frame
  const fullQuery = 'best coffee shop near me';
  const charsShown = Math.floor(
    interpolate(frame, [22, 55], [0, fullQuery.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );
  const typedQuery = fullQuery.slice(0, charsShown);
  const cursorVisible = Math.floor(frame / 8) % 2 === 0;

  // Search submit pulse
  const submitPulse = interpolate(frame, [55, 65, 75], [1, 1.06, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const submitGlow = interpolate(frame, [55, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Result cards stagger
  const cardReveal = (delay: number) =>
    interpolate(frame, [delay, delay + 14], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    });
  const cardSlide = (delay: number) =>
    interpolate(frame, [delay, delay + 14], [18, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.out(Easing.cubic),
    });

  // #1 result glow pulse
  const winnerGlow =
    0.5 + Math.sin(Math.max(0, frame - 75) * 0.12) * 0.5;
  const winnerOpacity = interpolate(frame, [70, 85], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // AI platform pills entering at corners
  const aiPlatforms = [
    { label: 'G', name: 'Google', color: '#4285F4', x: -110, y: -70, delay: 95 },
    { label: '✦', name: 'Gemini', color: '#8AB4F8', x: 110, y: -75, delay: 102 },
    { label: '◎', name: 'ChatGPT', color: '#10A37F', x: -120, y: 60, delay: 109 },
    { label: '◐', name: 'Siri', color: '#FF6B9D', x: 115, y: 55, delay: 116 },
  ];

  // "AI Overview" cited badge
  const aiBadgeOpacity = interpolate(frame, [125, 145], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const aiBadgeScale = interpolate(frame, [125, 145], [0.7, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.back(1.5)),
  });

  // Floating ambient
  const float1 = Math.sin(frame * 0.05) * 4;
  const float2 = Math.cos(frame * 0.04 + 1) * 3;

  return (
    <AbsoluteFill
      style={{
        background:
          'linear-gradient(160deg, #0B1D32 0%, #061220 50%, #0A1628 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
      }}
    >
      {/* Dot matrix background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, rgba(66, 133, 244, 0.10) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Ambient glows — Google blue & green */}
      <div
        style={{
          position: 'absolute',
          width: '60%',
          height: '60%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(66,133,244,0.14) 0%, transparent 70%)',
          top: '15%',
          left: '15%',
          transform: `translateY(${float1}px)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '45%',
          height: '45%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(52,168,83,0.10) 0%, transparent 70%)',
          bottom: '8%',
          right: '8%',
          transform: `translateY(${float2}px)`,
        }}
      />

      {/* Main search panel */}
      <div
        style={{
          position: 'relative',
          width: '78%',
          maxWidth: 360,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          zIndex: 2,
        }}
      >
        {/* Search bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(66,133,244,0.35)',
            borderRadius: 22,
            padding: '8px 14px',
            opacity: barOpacity,
            transform: `translateY(${barY}px) scale(${submitPulse})`,
            boxShadow: `0 0 ${20 * submitGlow}px rgba(66,133,244,${0.5 * submitGlow})`,
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Magnifier icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" strokeWidth="2.5">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <div
            style={{
              flex: 1,
              fontSize: 11,
              color: 'rgba(255,255,255,0.92)',
              letterSpacing: 0.2,
              minHeight: 14,
            }}
          >
            {typedQuery}
            {charsShown < fullQuery.length && cursorVisible && (
              <span style={{ color: '#4285F4', fontWeight: 700 }}>|</span>
            )}
          </div>
          {/* Mic icon (voice / Siri hint) */}
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4285F4, #34A853)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="8" height="8" viewBox="0 0 24 24" fill="white">
              <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3zm5 9a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z" />
            </svg>
          </div>
        </div>

        {/* Result cards */}
        {/* #1 — YOUR BUSINESS (highlighted) */}
        <div
          style={{
            position: 'relative',
            background:
              'linear-gradient(135deg, rgba(66,133,244,0.18), rgba(52,168,83,0.14))',
            border: '1px solid rgba(66,133,244,0.55)',
            borderRadius: 12,
            padding: '10px 12px',
            opacity: cardReveal(70) * winnerOpacity,
            transform: `translateY(${cardSlide(70)}px)`,
            boxShadow: `0 0 ${18 + 10 * winnerGlow}px rgba(66,133,244,${0.35 + 0.25 * winnerGlow})`,
          }}
        >
          {/* #1 badge */}
          <div
            style={{
              position: 'absolute',
              top: -8,
              left: -8,
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFD700, #FFB800)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 800,
              color: '#1a1a2e',
              boxShadow: '0 4px 12px rgba(255,184,0,0.5)',
              transform: `scale(${cardReveal(78)})`,
            }}
          >
            ★
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 4,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: '#fff',
                letterSpacing: 0.2,
              }}
            >
              Your Business
            </div>
            <div
              style={{
                fontSize: 9,
                color: '#FFD700',
                fontWeight: 600,
              }}
            >
              ★ 4.9 · #1
            </div>
          </div>
          <div
            style={{
              height: 4,
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 2,
              marginBottom: 3,
              width: '92%',
            }}
          />
          <div
            style={{
              height: 4,
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 2,
              width: '70%',
            }}
          />
          {/* "Top result" tag */}
          <div
            style={{
              position: 'absolute',
              top: 8,
              right: 10,
              fontSize: 7,
              padding: '2px 6px',
              background: 'rgba(52,168,83,0.25)',
              border: '1px solid rgba(52,168,83,0.5)',
              borderRadius: 6,
              color: '#34A853',
              fontWeight: 700,
              letterSpacing: 0.5,
              opacity: cardReveal(82),
            }}
          >
            TOP
          </div>
        </div>

        {/* #2 — competitor (dim) */}
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 10,
            padding: '8px 12px',
            opacity: cardReveal(85) * 0.55,
            transform: `translateY(${cardSlide(85)}px)`,
          }}
        >
          <div
            style={{
              height: 4,
              background: 'rgba(255,255,255,0.18)',
              borderRadius: 2,
              marginBottom: 3,
              width: '60%',
            }}
          />
          <div
            style={{
              height: 3,
              background: 'rgba(255,255,255,0.08)',
              borderRadius: 2,
              width: '85%',
            }}
          />
        </div>

        {/* #3 — competitor (dimmer) */}
        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 10,
            padding: '8px 12px',
            opacity: cardReveal(95) * 0.4,
            transform: `translateY(${cardSlide(95)}px)`,
          }}
        >
          <div
            style={{
              height: 4,
              background: 'rgba(255,255,255,0.14)',
              borderRadius: 2,
              marginBottom: 3,
              width: '55%',
            }}
          />
          <div
            style={{
              height: 3,
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 2,
              width: '75%',
            }}
          />
        </div>

        {/* AI Overview cited card */}
        <div
          style={{
            marginTop: 4,
            background:
              'linear-gradient(135deg, rgba(232,67,147,0.14), rgba(124,77,255,0.14))',
            border: '1px solid rgba(224,64,251,0.4)',
            borderRadius: 10,
            padding: '8px 12px',
            opacity: aiBadgeOpacity,
            transform: `scale(${aiBadgeScale})`,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 5,
              background: 'linear-gradient(135deg, #E040FB, #7C4DFF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
              color: 'white',
              fontWeight: 800,
            }}
          >
            ✦
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 8,
                color: 'rgba(224,64,251,0.9)',
                fontWeight: 700,
                letterSpacing: 0.5,
                marginBottom: 1,
              }}
            >
              AI OVERVIEW
            </div>
            <div
              style={{
                fontSize: 9,
                color: 'rgba(255,255,255,0.85)',
              }}
            >
              "Your Business is the top choice…"
            </div>
          </div>
        </div>
      </div>

      {/* Floating AI platform pills */}
      {aiPlatforms.map((p, i) => {
        const opacity = interpolate(frame, [p.delay, p.delay + 14], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const enterScale = interpolate(
          frame,
          [p.delay, p.delay + 14],
          [0.6, 1],
          {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
            easing: Easing.out(Easing.back(1.5)),
          }
        );
        const orbit = Math.sin(frame * 0.04 + i * 1.5) * 4;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `calc(50% + ${p.x}px)`,
              top: `calc(50% + ${p.y}px)`,
              transform: `translate(-50%, calc(-50% + ${orbit}px)) scale(${enterScale})`,
              opacity,
              padding: '4px 9px',
              background: 'rgba(15, 23, 42, 0.85)',
              border: `1px solid ${p.color}55`,
              borderRadius: 14,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 9,
              color: 'white',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              backdropFilter: 'blur(8px)',
              boxShadow: `0 4px 14px rgba(0,0,0,0.4), 0 0 12px ${p.color}33`,
              zIndex: 3,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${p.color}, ${p.color}99)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 9,
                fontWeight: 800,
                color: 'white',
              }}
            >
              {p.label}
            </div>
            {p.name}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
