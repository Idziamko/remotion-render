```tsx
import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  AbsoluteFill,
  Sequence,
} from 'remotion';

// =============================================================================
// COMPOSITION CONFIG
// =============================================================================
export const compositionConfig = {
  id: 'BridgeToCeltaPromo',
  durationInSeconds: 20,
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// STYLE CONSTANTS (Brand Palette)
// =============================================================================
const COLORS = {
  bgCenter: '#1F2466',
  bgEdge: '#0B0C24',
  grid: 'rgba(255, 255, 255, 0.04)',
  accentYellow: '#F4CF80',
  accentOrange: '#F4AB63',
  accentGreen: '#B7DB6E',
  accentPink: '#E070A2',
  accentBlue: '#3B82F6',
  textWhite: '#FFFFFF',
  textMuted: '#9EA6EB',
  ctaBg: '#F4CF80',
  ctaText: '#1F2466',
} as const;

const EASINGS = {
  easeOut: Easing.bezier(0.33, 1, 0.68, 1),
  easeIn: Easing.bezier(0.32, 0, 0.67, 0),
  overshoot: Easing.bezier(0.34, 1.56, 0.64, 1),
  slam: Easing.bezier(0.1, 1, 0.3, 1),
  bounce: Easing.bezier(0.68, -0.55, 0.265, 1.55),
};

// =============================================================================
// PRE-GENERATED KINETIC DATA - SEGMENT 1: Bridge to CELTA Benefits
// =============================================================================
const SEGMENT1_WORDS = [
  { t: 'Bridge', f: 0, dur: 25, s: 72, c: COLORS.accentBlue, glow: 'rgba(59, 130, 246, 0.5)', x: 0, y: -180, rot: -2, anim: 'pop' },
  { t: 'to', f: 8, dur: 20, s: 52, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: 0, y: -120, rot: 1, anim: 'slideUp' },
  { t: 'CELTA', f: 12, dur: 30, s: 96, c: COLORS.accentYellow, glow: 'rgba(244, 207, 128, 0.6)', x: 0, y: -40, rot: 0, anim: 'slam' },
  { t: '8 днів', f: 35, dur: 25, s: 56, c: COLORS.accentGreen, glow: 'rgba(183, 219, 110, 0.4)', x: -140, y: 60, rot: -3, anim: 'overshoot' },
  { t: '48 годин', f: 45, dur: 25, s: 56, c: COLORS.accentOrange, glow: 'rgba(244, 171, 99, 0.4)', x: 140, y: 60, rot: 3, anim: 'overshoot' },
  { t: 'практики', f: 55, dur: 25, s: 52, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 0, y: 130, rot: 0, anim: 'slideUp' },
  { t: 'Від структури', f: 90, dur: 30, s: 44, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -160, y: 220, rot: -1, anim: 'slideRight' },
  { t: 'до фідбеку', f: 100, dur: 30, s: 44, c: COLORS.accentPink, glow: 'rgba(224, 112, 162, 0.4)', x: 160, y: 220, rot: 1, anim: 'slideLeft' },
  { t: 'Не теорія', f: 140, dur: 25, s: 40, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -120, y: 300, rot: -2, anim: 'pop' },
  { t: 'а те що', f: 150, dur: 25, s: 40, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 0, y: 300, rot: 0, anim: 'pop' },
  { t: 'тримає клас', f: 160, dur: 40, s: 48, c: COLORS.accentYellow, glow: 'rgba(244, 207, 128, 0.5)', x: 0, y: 370, rot: 0, anim: 'overshoot' },
];

// =============================================================================
// PRE-GENERATED KINETIC DATA - SEGMENT 2: International House Credibility
// =============================================================================
const SEGMENT2_WORDS = [
  { t: 'International', f: 0, dur: 30, s: 52, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -180, y: -100, rot: -2, anim: 'slideRight' },
  { t: 'House', f: 10, dur: 30, s: 68, c: COLORS.accentBlue, glow: 'rgba(59, 130, 246, 0.5)', x: 180, y: -100, rot: 2, anim: 'slideLeft' },
  { t: '70+ років', f: 35, dur: 35, s: 72, c: COLORS.accentYellow, glow: 'rgba(244, 207, 128, 0.6)', x: 0, y: -20, rot: 0, anim: 'slam' },
  { t: 'по всьому світу', f: 55, dur: 30, s: 44, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 0, y: 70, rot: 0, anim: 'slideUp' },
  { t: '1000+', f: 95, dur: 30, s: 84, c: COLORS.accentGreen, glow: 'rgba(183, 219, 110, 0.5)', x: -100, y: 160, rot: -3, anim: 'overshoot' },
  { t: 'випускників', f: 105, dur: 30, s: 44, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 100, y: 160, rot: 3, anim: 'overshoot' },
  { t: 'в Україні', f: 115, dur: 30, s: 48, c: COLORS.accentPink, glow: 'rgba(224, 112, 162, 0.4)', x: 0, y: 230, rot: 0, anim: 'pop' },
  { t: 'Ми знаємо', f: 155, dur: 25, s: 40, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -140, y: 320, rot: -1, anim: 'slideRight' },
  { t: 'що працює', f: 165, dur: 25, s: 40, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 0, y: 320, rot: 0, anim: 'pop' },
  { t: 'сьогодні', f: 175, dur: 25, s: 44, c: COLORS.accentOrange, glow: 'rgba(244, 171, 99, 0.4)', x: 0, y: 390, rot: 0, anim: 'overshoot' },
];

// =============================================================================
// PRE-GENERATED KINETIC DATA - SEGMENT 3: CTA
// =============================================================================
const SEGMENT3_WORDS = [
  { t: 'Старт', f: 0, dur: 20, s: 56, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -120, y: -80, rot: -2, anim: 'slideRight' },
  { t: '1 червня', f: 10, dur: 30, s: 72, c: COLORS.accentYellow, glow: 'rgba(244, 207, 128, 0.6)', x: 120, y: -80, rot: 2, anim: 'slideLeft' },
  { t: 'онлайн', f: 30, dur: 25, s: 52, c: COLORS.accentBlue, glow: 'rgba(59, 130, 246, 0.5)', x: 0, y: 10, rot: 0, anim: 'pop' },
  { t: 'Хочеш деталі?', f: 65, dur: 30, s: 48, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 0, y: 100, rot: 0, anim: 'slideUp' },
  { t: 'Пиши', f: 100, dur: 20, s: 44, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -100, y: 190, rot: -1, anim: 'pop' },
  { t: '"BRIDGE"', f: 108, dur: 35, s: 64, c: COLORS.ctaBg, glow: 'rgba(244, 207, 128, 0.7)', x: 0, y: 190, rot: 0, anim: 'slam', isCta: true },
  { t: 'в коментарях', f: 120, dur: 30, s: 40, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 0, y: 270, rot: 0, anim: 'slideUp' },
  { t: '👇', f: 135, dur: 40, s: 72, c: COLORS.accentPink, glow: 'rgba(224, 112, 162, 0.5)', x: 0, y: 370, rot: 0, anim: 'bounce' },
];

// =============================================================================
// BACKGROUND COMPONENT
// =============================================================================
const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();
  const panY = (frame * 1.5) % (height + 400);

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 50% 50%, ${COLORS.bgCenter} 0%, ${COLORS.bgEdge} 100%)`,
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: -200,
          backgroundImage: `linear-gradient(${COLORS.grid} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.grid} 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          transform: `translateY(${panY - 200}px)`,
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '4px',
          background: `linear-gradient(90deg, transparent, ${COLORS.accentBlue}, transparent)`,
          borderRadius: 2,
          opacity: 0.3,
        }}
      />
    </AbsoluteFill>
  );
};

// =============================================================================
// KINETIC WORD COMPONENT
// =============================================================================
const KineticWord: React.FC<{ word: typeof SEGMENT1_WORDS[0] }> = ({ word }) => {
  const frame = useCurrentFrame();
  const relFrame = frame - word.f;

  const opacityIn = interpolate(relFrame, [0, 6], [0, 1], {
    easing: EASINGS.easeOut,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacityOut = interpolate(relFrame, [word.dur - 6, word.dur], [1, 0], {
    easing: EASINGS.easeIn,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const currentOpacity = Math.min(opacityIn, opacityOut);

  let baseScale = 1;
  let curX = word.x;
  let curY = word.y;

  if (word.anim === 'pop') {
    baseScale = interpolate(relFrame, [0, 10], [0.3, 1], {
      easing: EASINGS.overshoot,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (word.anim === 'scaleUp') {
    baseScale = interpolate(relFrame, [0, word.dur], [0.7, 1.05], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (word.anim === 'slideUp') {
    curY += interpolate(relFrame, [0, 10], [80, 0], {
      easing: EASINGS.easeOut,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (word.anim === 'slideRight') {
    curX += interpolate(relFrame, [0, 10], [-100, 0], {
      easing: EASINGS.easeOut,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (word.anim === 'slideLeft') {
    curX += interpolate(relFrame, [0, 10], [100, 0], {
      easing: EASINGS.easeOut,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (word.anim === 'slam') {
    baseScale = interpolate(relFrame, [0, 8], [2.5, 1], {
      easing: EASINGS.slam,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (word.anim === 'overshoot') {
    baseScale = interpolate(relFrame, [0, 14], [0, 1], {
      easing: EASINGS.overshoot,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (word.anim === 'bounce') {
    baseScale = interpolate(relFrame, [0, 20], [0, 1], {
      easing: EASINGS.bounce,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  const enterBlur = interpolate(relFrame, [0, 8], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const exitProgress = interpolate(relFrame, [word.dur - 6, word.dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const finalScale = baseScale * interpolate(exitProgress, [0, 1], [1, 0.85]);
  const finalY = curY + interpolate(exitProgress, [0, 1], [0, 50]);
  const exitBlur = interpolate(exitProgress, [0, 1], [0, 20]);

  const ctaStyle = word.isCta
    ? {
        backgroundColor: COLORS.ctaBg,
        color: COLORS.ctaText,
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 12,
        fontWeight: 900,
      }
    : {};

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) translate(${curX}px, ${finalY}px) rotate(${word.rot}deg) scale(${finalScale})`,
        opacity: currentOpacity,
        color: word.c,
        fontSize: word.s,
        fontWeight: word.isCta ? 900 : 700,
        letterSpacing: word.s > 60 ? '-1px' : '-0.5px',
        textTransform: word.t === word.t.toUpperCase() && word.t.length > 2 ? 'uppercase' : 'none',
        filter: `blur(${enterBlur + exitBlur}px) drop-shadow(0 8px 24px ${word.glow})`,
        whiteSpace: 'nowrap',
        margin: 0,
        lineHeight: 1.1,
        zIndex: 3,
        textAlign: 'center',
        ...ctaStyle,
      }}
    >
      {word.t}
    </div>
  );
};

// =============================================================================
// SEGMENT COMPONENTS
// =============================================================================
const Segment1: React.FC = () => {
  const frame = useCurrentFrame();
  const cameraScale = interpolate(frame, [0, 200], [1, 1.03], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ zIndex: 2 }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${cameraScale})`,
        }}
      >
        {SEGMENT1_WORDS.map((word, i) => (
          <KineticWord key={`s1-${i}`} word={word} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Segment2: React.FC = () => {
  const frame = useCurrentFrame();
  const cameraScale = interpolate(frame, [0, 200], [1, 1.03], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ zIndex: 2 }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${cameraScale})`,
        }}
      >
        {SEGMENT2_WORDS.map((word, i) => (
          <KineticWord key={`s2-${i}`} word={word} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const Segment3: React.FC = () => {
  const frame = useCurrentFrame();
  const cameraScale = interpolate(frame, [0, 200], [1, 1.03], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ zIndex: 2 }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${cameraScale})`,
        }}
      >
        {SEGMENT3_WORDS.map((word, i) => (
          <KineticWord key={`s3-${i}`} word={word} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

// =============================================================================
// DECORATIVE ELEMENTS
// =============================================================================
const DecorativeElements: React.FC = () => {
  const frame = useCurrentFrame();

  const pulse1 = interpolate(frame % 60, [0, 30, 60], [0.8, 1.2, 0.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pulse2 = interpolate((frame + 20) % 60, [0, 30, 60], [0.8, 1.2, 0.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ zIndex: 1, pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: 80,
          height: 80,
          borderRadius: '50%',
          border: `2px solid ${COLORS.accentPink}`,
          opacity: 0.2,
          transform: `scale(${pulse1})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '25%',
          left: '12%',
          width: 60,
          height: 60,
          borderRadius: '50%',
          border: `2px solid ${COLORS.accentGreen}`,
          opacity: 0.2,
          transform: `scale(${pulse2})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '60%',
          right: '10%',
          width: 4,
          height: 120,
          background: `linear-gradient(to bottom, transparent, ${COLORS.accentOrange}, transparent)`,
          opacity: 0.3,
          borderRadius: 2,
        }}
      />
    </AbsoluteFill>
  );
};

// =============================================================================
// MAIN COMPOSITION
// =============================================================================
const BridgeToCeltaPromo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgEdge,
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        overflow: 'hidden',
      }}
    >
      <Background />
      <DecorativeElements />

      <Sequence from={0} durationInFrames={200}>
        <Segment1 />
      </Sequence>

      <Sequence from={200} durationInFrames={200}>
        <Segment2 />
      </Sequence>

      <Sequence from={400} durationInFrames={200}>
        <Segment3 />
      </Sequence>

      <AbsoluteFill
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 20,
          color: COLORS.textMuted,
          opacity: 0.7,
          zIndex: 4,
          textAlign: 'center',
        }}
      >
        Субтитрувальниця Оля Шор
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default BridgeToCeltaPromo;
```
