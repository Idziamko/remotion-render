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
// STYLE CONSTANTS
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
// DATA SEGMENTS
// =============================================================================
const SEGMENT1_WORDS = [
  { t: 'Bridge', f: 0, dur: 25, s: 72, c: COLORS.accentBlue, glow: COLORS.accentBlue, x: 0, y: -180, rot: -2, anim: 'pop' },
  { t: 'to', f: 8, dur: 20, s: 52, c: COLORS.textMuted, glow: 'transparent', x: 0, y: -120, rot: 1, anim: 'slideUp' },
  { t: 'CELTA', f: 12, dur: 30, s: 96, c: COLORS.accentYellow, glow: COLORS.accentYellow, x: 0, y: -40, rot: 0, anim: 'slam' },
  { t: '8 днів', f: 35, dur: 25, s: 56, c: COLORS.accentGreen, glow: COLORS.accentGreen, x: -140, y: 60, rot: -3, anim: 'overshoot' },
  { t: '48 годин', f: 45, dur: 25, s: 56, c: COLORS.accentOrange, glow: COLORS.accentOrange, x: 140, y: 60, rot: 3, anim: 'overshoot' },
  { t: 'практики', f: 55, dur: 25, s: 52, c: COLORS.textWhite, glow: 'transparent', x: 0, y: 130, rot: 0, anim: 'slideUp' },
  { t: 'Від структури', f: 90, dur: 30, s: 44, c: COLORS.textMuted, glow: 'transparent', x: -160, y: 220, rot: -1, anim: 'slideRight' },
  { t: 'до фідбеку', f: 100, dur: 30, s: 44, c: COLORS.accentPink, glow: COLORS.accentPink, x: 160, y: 220, rot: 1, anim: 'slideLeft' },
  { t: 'Не теорія', f: 140, dur: 25, s: 40, c: COLORS.textMuted, glow: 'transparent', x: -120, y: 300, rot: -2, anim: 'pop' },
  { t: 'а те що', f: 150, dur: 25, s: 40, c: COLORS.textWhite, glow: 'transparent', x: 0, y: 300, rot: 0, anim: 'pop' },
  { t: 'тримає клас', f: 160, dur: 40, s: 48, c: COLORS.accentYellow, glow: COLORS.accentYellow, x: 0, y: 370, rot: 0, anim: 'overshoot' },
];

const SEGMENT2_WORDS = [
  { t: 'International', f: 0, dur: 30, s: 52, c: COLORS.textMuted, glow: 'transparent', x: -180, y: -100, rot: -2, anim: 'slideRight' },
  { t: 'House', f: 10, dur: 30, s: 68, c: COLORS.accentBlue, glow: COLORS.accentBlue, x: 180, y: -100, rot: 2, anim: 'slideLeft' },
  { t: '70+ років', f: 35, dur: 35, s: 72, c: COLORS.accentYellow, glow: COLORS.accentYellow, x: 0, y: -20, rot: 0, anim: 'slam' },
  { t: 'по всьому світу', f: 55, dur: 30, s: 44, c: COLORS.textWhite, glow: 'transparent', x: 0, y: 70, rot: 0, anim: 'slideUp' },
  { t: '1000+', f: 95, dur: 30, s: 84, c: COLORS.accentGreen, glow: COLORS.accentGreen, x: -100, y: 160, rot: -3, anim: 'overshoot' },
  { t: 'випускників', f: 105, dur: 30, s: 44, c: COLORS.textWhite, glow: 'transparent', x: 100, y: 160, rot: 3, anim: 'overshoot' },
  { t: 'в Україні', f: 115, dur: 30, s: 48, c: COLORS.accentPink, glow: COLORS.accentPink, x: 0, y: 230, rot: 0, anim: 'pop' },
  { t: 'Ми знаємо', f: 155, dur: 25, s: 40, c: COLORS.textMuted, glow: 'transparent', x: -140, y: 320, rot: -1, anim: 'slideRight' },
  { t: 'що працює', f: 165, dur: 25, s: 40, c: COLORS.textWhite, glow: 'transparent', x: 0, y: 320, rot: 0, anim: 'pop' },
  { t: 'сьогодні', f: 175, dur: 25, s: 44, c: COLORS.accentOrange, glow: COLORS.accentOrange, x: 0, y: 390, rot: 0, anim: 'overshoot' },
];

const SEGMENT3_WORDS = [
  { t: 'Старт', f: 0, dur: 20, s: 56, c: COLORS.textMuted, glow: 'transparent', x: -120, y: -80, rot: -2, anim: 'slideRight' },
  { t: '1 червня', f: 10, dur: 30, s: 72, c: COLORS.accentYellow, glow: COLORS.accentYellow, x: 120, y: -80, rot: 2, anim: 'slideLeft' },
  { t: 'онлайн', f: 30, dur: 25, s: 52, c: COLORS.accentBlue, glow: COLORS.accentBlue, x: 0, y: 10, rot: 0, anim: 'pop' },
  { t: 'Хочеш деталі?', f: 65, dur: 30, s: 48, c: COLORS.textWhite, glow: 'transparent', x: 0, y: 100, rot: 0, anim: 'slideUp' },
  { t: 'Пиши', f: 100, dur: 20, s: 44, c: COLORS.textMuted, glow: 'transparent', x: -100, y: 190, rot: -1, anim: 'pop' },
  { t: '"BRIDGE"', f: 108, dur: 35, s: 64, c: COLORS.ctaBg, glow: 'transparent', x: 0, y: 190, rot: 0, anim: 'slam', isCta: true },
  { t: 'в коментарях', f: 120, dur: 30, s: 40, c: COLORS.textWhite, glow: 'transparent', x: 0, y: 270, rot: 0, anim: 'slideUp' },
  { t: '👇', f: 135, dur: 40, s: 72, c: COLORS.accentPink, glow: 'transparent', x: 0, y: 370, rot: 0, anim: 'bounce' },
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
    </AbsoluteFill>
  );
};

// =============================================================================
// SAFE GLOW LAYER (Replaces CSS filter drop-shadow)
// =============================================================================
const GlowLayer: React.FC<{ color: string; x: number; y: number; blur: number; opacity: number }> = ({
  color,
  x,
  y,
  blur,
  opacity,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
        color: color,
        fontSize: '200px', // Large font for glow spread
        fontWeight: 900,
        opacity: opacity,
        filter: `blur(${blur}px)`,
        zIndex: 0,
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      •
    </div>
  );
};

// =============================================================================
// KINETIC WORD COMPONENT (Safe Version)
// =============================================================================
const KineticWord: React.FC<{ word: typeof SEGMENT1_WORDS[0] }> = ({ word }) => {
  const frame = useCurrentFrame();
  const relFrame = frame - word.f;

  // Safe interpolation helper
  const safeInterpolate = (val: number, input: [number, number], output: [number, number], ease?: any) => {
    if (input[0] === input[1]) return output[0];
    return interpolate(val, input, output, {
      easing: ease,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  };

  const opacityIn = safeInterpolate(relFrame, [0, 6], [0, 1], EASINGS.easeOut);
  const opacityOut = safeInterpolate(relFrame, [word.dur - 6, word.dur], [1, 0], EASINGS.easeIn);
  const currentOpacity = Math.min(opacityIn, opacityOut);

  let baseScale = 1;
  let curX = word.x;
  let curY = word.y;

  // Animation Logic
  if (word.anim === 'pop') {
    baseScale = safeInterpolate(relFrame, [0, 10], [0.3, 1], EASINGS.overshoot);
  } else if (word.anim === 'slam') {
    baseScale = safeInterpolate(relFrame, [0, 8], [2.5, 1], EASINGS.slam);
  } else if (word.anim === 'overshoot') {
    baseScale = safeInterpolate(relFrame, [0, 14], [0, 1], EASINGS.overshoot);
  } else if (word.anim === 'slideUp') {
    curY += safeInterpolate(relFrame, [0, 10], [80, 0], EASINGS.easeOut);
  } else if (word.anim === 'slideRight') {
    curX += safeInterpolate(relFrame, [0, 10], [-100, 0], EASINGS.easeOut);
  } else if (word.anim === 'slideLeft') {
    curX += safeInterpolate(relFrame, [0, 10], [100, 0], EASINGS.easeOut);
  } else if (word.anim === 'bounce') {
    baseScale = safeInterpolate(relFrame, [0, 20], [0, 1], EASINGS.bounce);
  }

  // Exit animation
  const exitProgress = safeInterpolate(relFrame, [word.dur - 6, word.dur], [0, 1]);
  const finalScale = baseScale * (1 - exitProgress * 0.15);
  const finalY = curY + exitProgress * 50;

  // Glow opacity calculation
  const glowOpacity = interpolate(currentOpacity, [0, 1], [0, 0.4]);

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
    <>
      {/* Separate Glow Layer for Rendering Safety */}
      {word.glow !== 'transparent' && (
        <GlowLayer
          color={word.glow}
          x={curX}
          y={finalY}
          blur={40}
          opacity={glowOpacity}
        />
      )}
      
      {/* Main Text Layer */}
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
          letterSpacing: '-0.5px',
          textTransform: word.t === word.t.toUpperCase() && word.t.length > 2 ? 'uppercase' : 'none',
          whiteSpace: 'nowrap',
          margin: 0,
          lineHeight: 1.1,
          zIndex: 2,
          textAlign: 'center',
          textShadow: '0 2px 10px rgba(0,0,0,0.3)', // Safe simple shadow
          fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          ...ctaStyle,
        }}
      >
        {word.t}
      </div>
    </>
  );
};

// =============================================================================
// SEGMENT WRAPPERS
// =============================================================================
const createSegment = (words: typeof SEGMENT1_WORDS) => {
  return () => {
    const frame = useCurrentFrame();
    const cameraScale = interpolate(frame, [0, 200], [1, 1.03], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    return (
      <AbsoluteFill style={{ zIndex: 2 }}>
        <div style={{ position: 'absolute', inset: 0, transform: `scale(${cameraScale})` }}>
          {words.map((word, i) => (
            <KineticWord key={`${word.t}-${i}`} word={word} />
          ))}
        </div>
      </AbsoluteFill>
    );
  };
};

const Segment1 = createSegment(SEGMENT1_WORDS);
const Segment2 = createSegment(SEGMENT2_WORDS);
const Segment3 = createSegment(SEGMENT3_WORDS);

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
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        Субтитрувальниця Оля Шор
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default BridgeToCeltaPromo;
