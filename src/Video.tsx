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
// BRAND THEME (Exact match to KineticAudioSync example)
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
} as const;

const EASINGS = {
  easeOut: Easing.bezier(0.33, 1, 0.68, 1),
  easeIn: Easing.bezier(0.32, 0, 0.67, 0),
  overshoot: Easing.bezier(0.34, 1.56, 0.64, 1),
  slam: Easing.bezier(0.1, 1, 0.3, 1),
};

// =============================================================================
// BLOCK 1: Bridge to CELTA — Benefits (Frames 0–199)
// "8 днів, 48 годин практики… від структури до фідбеку"
// =============================================================================
const BLOCK1_WORDS = [
  { t: 'Bridge', f: 0, dur: 20, s: 72, c: COLORS.accentBlue, glow: 'rgba(59, 130, 246, 0.4)', x: 0, y: -200, rot: -3, anim: 'pop' },
  { t: 'to', f: 8, dur: 15, s: 48, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: 0, y: -140, rot: 2, anim: 'slideUp' },
  { t: 'CELTA', f: 12, dur: 28, s: 100, c: COLORS.accentYellow, glow: 'rgba(244, 207, 128, 0.5)', x: 0, y: -60, rot: 0, anim: 'slam' },
  
  { t: '8 днів', f: 45, dur: 22, s: 64, c: COLORS.accentGreen, glow: 'rgba(183, 219, 110, 0.4)', x: -150, y: 40, rot: -4, anim: 'overshoot' },
  { t: '48 годин', f: 55, dur: 22, s: 64, c: COLORS.accentOrange, glow: 'rgba(244, 171, 99, 0.4)', x: 150, y: 40, rot: 4, anim: 'overshoot' },
  { t: 'практики', f: 65, dur: 25, s: 52, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 0, y: 120, rot: 0, anim: 'slideUp' },
  
  { t: 'Від структури', f: 100, dur: 28, s: 44, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -170, y: 210, rot: -2, anim: 'slideRight' },
  { t: 'до фідбеку', f: 112, dur: 28, s: 44, c: COLORS.accentPink, glow: 'rgba(224, 112, 162, 0.4)', x: 170, y: 210, rot: 2, anim: 'slideLeft' },
  
  { t: 'Не теорія', f: 145, dur: 20, s: 40, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -130, y: 300, rot: -2, anim: 'pop' },
  { t: 'а практика', f: 155, dur: 20, s: 40, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 0, y: 300, rot: 0, anim: 'pop' },
  { t: 'що тримає клас', f: 165, dur: 34, s: 48, c: COLORS.accentYellow, glow: 'rgba(244, 207, 128, 0.5)', x: 0, y: 370, rot: 0, anim: 'overshoot' },
];

// =============================================================================
// BLOCK 2: International House — Credibility (Frames 200–399)
// "70 років • 1000+ випускників • знаємо що працює"
// =============================================================================
const BLOCK2_WORDS = [
  { t: 'International', f: 0, dur: 25, s: 48, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -190, y: -120, rot: -3, anim: 'slideRight' },
  { t: 'House', f: 10, dur: 25, s: 72, c: COLORS.accentBlue, glow: 'rgba(59, 130, 246, 0.4)', x: 190, y: -120, rot: 3, anim: 'slideLeft' },
  
  { t: '70+ років', f: 40, dur: 32, s: 80, c: COLORS.accentYellow, glow: 'rgba(244, 207, 128, 0.5)', x: 0, y: -30, rot: 0, anim: 'slam' },
  { t: 'по всьому світу', f: 60, dur: 28, s: 42, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 0, y: 60, rot: 0, anim: 'slideUp' },
  
  { t: '1000+', f: 100, dur: 28, s: 92, c: COLORS.accentGreen, glow: 'rgba(183, 219, 110, 0.5)', x: -110, y: 150, rot: -4, anim: 'overshoot' },
  { t: 'випускників', f: 110, dur: 28, s: 42, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 110, y: 150, rot: 4, anim: 'overshoot' },
  { t: 'в Україні', f: 120, dur: 25, s: 46, c: COLORS.accentPink, glow: 'rgba(224, 112, 162, 0.4)', x: 0, y: 220, rot: 0, anim: 'pop' },
  
  { t: 'Ми знаємо', f: 155, dur: 20, s: 38, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -140, y: 310, rot: -2, anim: 'slideRight' },
  { t: 'що працює', f: 165, dur: 20, s: 38, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 0, y: 310, rot: 0, anim: 'pop' },
  { t: 'сьогодні', f: 175, dur: 25, s: 44, c: COLORS.accentOrange, glow: 'rgba(244, 171, 99, 0.4)', x: 0, y: 380, rot: 0, anim: 'overshoot' },
];

// =============================================================================
// BLOCK 3: CTA — Call to Action (Frames 400–599)
// "Старт 1 червня • пиши 'BRIDGE' в коментарях"
// =============================================================================
const BLOCK3_WORDS = [
  { t: 'Старт', f: 0, dur: 18, s: 56, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -130, y: -90, rot: -3, anim: 'slideRight' },
  { t: '1 червня', f: 8, dur: 28, s: 76, c: COLORS.accentYellow, glow: 'rgba(244, 207, 128, 0.5)', x: 130, y: -90, rot: 3, anim: 'slideLeft' },
  { t: 'онлайн', f: 28, dur: 22, s: 52, c: COLORS.accentBlue, glow: 'rgba(59, 130, 246, 0.4)', x: 0, y: 0, rot: 0, anim: 'pop' },
  
  { t: 'Хочеш деталі?', f: 60, dur: 28, s: 46, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 0, y: 90, rot: 0, anim: 'slideUp' },
  
  { t: 'Пиши', f: 95, dur: 18, s: 42, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -110, y: 180, rot: -2, anim: 'pop' },
  { t: '"BRIDGE"', f: 102, dur: 38, s: 68, c: COLORS.accentYellow, glow: 'rgba(244, 207, 128, 0.6)', x: 0, y: 180, rot: 0, anim: 'slam', isCta: true },
  { t: 'в коментарях', f: 120, dur: 28, s: 40, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 0, y: 260, rot: 0, anim: 'slideUp' },
  
  { t: '👇', f: 145, dur: 40, s: 80, c: COLORS.accentPink, glow: 'rgba(224, 112, 162, 0.5)', x: 0, y: 370, rot: 0, anim: 'overshoot' },
];

// =============================================================================
// BACKGROUND (Animated Grid + Gradient)
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
        }}
      />
    </AbsoluteFill>
  );
};

// =============================================================================
// KINETIC WORD (Exact logic from KineticAudioSync example)
// =============================================================================
const KineticWord: React.FC<{ word: typeof BLOCK1_WORDS[0] }> = ({ word }) => {
  const frame = useCurrentFrame();
  const relFrame = frame - word.f;

  // Opacity fade in/out
  const opacityIn = interpolate(relFrame, [0, 5], [0, 1], {
    easing: EASINGS.easeOut,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacityOut = interpolate(relFrame, [word.dur - 5, word.dur], [1, 0], {
    easing: EASINGS.easeIn,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = Math.min(opacityIn, opacityOut);

  // Animation entrance
  let scale = 1;
  let x = word.x;
  let y = word.y;

  if (word.anim === 'pop') {
    scale = interpolate(relFrame, [0, 8], [0.4, 1], {
      easing: EASINGS.overshoot,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (word.anim === 'slam') {
    scale = interpolate(relFrame, [0, 6], [2.5, 1], {
      easing: EASINGS.slam,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (word.anim === 'overshoot') {
    scale = interpolate(relFrame, [0, 12], [0, 1], {
      easing: EASINGS.overshoot,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (word.anim === 'slideUp') {
    y += interpolate(relFrame, [0, 8], [60, 0], {
      easing: EASINGS.easeOut,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (word.anim === 'slideRight') {
    x += interpolate(relFrame, [0, 8], [-90, 0], {
      easing: EASINGS.easeOut,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  } else if (word.anim === 'slideLeft') {
    x += interpolate(relFrame, [0, 8], [90, 0], {
      easing: EASINGS.easeOut,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }

  // Exit animation
  const exit = interpolate(relFrame, [word.dur - 5, word.dur], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const finalScale = scale * interpolate(exit, [0, 1], [1, 0.85]);
  const finalY = y + interpolate(exit, [0, 1], [0, 40]);

  // Blur for smooth entry/exit
  const blurIn = interpolate(relFrame, [0, 5], [12, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const blurOut = interpolate(relFrame, [word.dur - 5, word.dur], [0, 12], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // CTA badge style
  const ctaStyle = word.isCta
    ? {
        backgroundColor: COLORS.accentYellow,
        color: COLORS.bgCenter,
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 10,
        fontWeight: 900,
      }
    : {};

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) translate(${x}px, ${finalY}px) rotate(${word.rot}deg) scale(${finalScale})`,
        opacity,
        color: word.c,
        fontSize: word.s,
        fontWeight: word.isCta ? 900 : 700,
        letterSpacing: '-1px',
        textTransform: word.t === word.t.toUpperCase() && word.t.length > 3 ? 'uppercase' : 'none',
        filter: `blur(${blurIn + blurOut}px) drop-shadow(0 10px 25px ${word.glow})`,
        whiteSpace: 'nowrap',
        margin: 0,
        lineHeight: 1,
        zIndex: 3,
        textAlign: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
        ...ctaStyle,
      }}
    >
      {word.t}
    </div>
  );
};

// =============================================================================
// BLOCK COMPONENTS (3 clear blocks)
// =============================================================================
const Block1: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 199], [1, 1.04], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ zIndex: 2 }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${zoom})` }}>
        {BLOCK1_WORDS.map((w, i) => <KineticWord key={`b1-${i}`} word={w} />)}
      </div>
    </AbsoluteFill>
  );
};

const Block2: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 199], [1, 1.04], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ zIndex: 2 }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${zoom})` }}>
        {BLOCK2_WORDS.map((w, i) => <KineticWord key={`b2-${i}`} word={w} />)}
      </div>
    </AbsoluteFill>
  );
};

const Block3: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 199], [1, 1.04], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ zIndex: 2 }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${zoom})` }}>
        {BLOCK3_WORDS.map((w, i) => <KineticWord key={`b3-${i}`} word={w} />)}
      </div>
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
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden',
      }}
    >
      <Background />

      {/* BLOCK 1: Benefits */}
      <Sequence from={0} durationInFrames={200}>
        <Block1 />
      </Sequence>

      {/* BLOCK 2: Credibility */}
      <Sequence from={200} durationInFrames={200}>
        <Block2 />
      </Sequence>

      {/* BLOCK 3: CTA */}
      <Sequence from={400} durationInFrames={200}>
        <Block3 />
      </Sequence>

      {/* Footer credit */}
      <AbsoluteFill
        style={{
          position: 'absolute',
          bottom: '6%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 18,
          color: COLORS.textMuted,
          opacity: 0.6,
          zIndex: 4,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        Субтитрувальниця Оля Шор
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default BridgeToCeltaPromo;
