import React from 'react';
import {
  useCurrentFrame,
  interpolate,
  Easing,
  AbsoluteFill,
} from 'remotion';
import { evolvePath } from '@remotion/paths';

// =============================================================================
// COMPOSITION CONFIGURATION
// =============================================================================
export const compositionConfig = {
  id: 'CeltaPartOne',
  durationInSeconds: 5,
  fps: 30, // 150 frames total
  width: 1080,
  height: 1920,
};

// =============================================================================
// STYLES & THEME
// =============================================================================
const COLORS = {
  bgCenter: '#1F2466',
  bgEdge: '#0B0C24',
  grid: 'rgba(255, 255, 255, 0.04)',

  accentYellow: '#FACC15',
  accentOrange: '#FF5C00',
  accentGreen: '#10B981',
  accentPink: '#E070A2',
  accentCyan: '#06B6D4',

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
// ICONS PATHS (24x24 viewBox)
// =============================================================================
const ICON_PATHS = {
  calendar: [
    "M16 2v4", 
    "M8 2v4", 
    "M3 10h18", 
    "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
  ],
  clock: [
    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", 
    "M12 6v6l4 2"
  ],
};

// =============================================================================
// KINETIC DATA (Fully Re-calculated Grid)
// =============================================================================
const WORDS = [
  // Блок 1: Верх (Разнесены по X и Y, чтобы не слипались)
  { t: "Bridge", f: 0, dur: 150, s: 90, c: COLORS.accentOrange, glow: 'rgba(255, 92, 0, 0.4)', x: -160, y: -420, rot: -3, anim: 'pop' },
  { t: "to", f: 5, dur: 145, s: 70, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: 120, y: -420, rot: 5, anim: 'pop' },
  
  // Блок 2: Огромный заголовок по центру-сверху
  { t: "CELTA", f: 15, dur: 135, s: 200, c: COLORS.accentYellow, glow: 'rgba(250, 204, 21, 0.4)', x: 0, y: -250, rot: -1, anim: 'slam' },

  // Блок 3: Связка
  { t: "це", f: 35, dur: 115, s: 70, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 0, y: -60, rot: 0, anim: 'pop' },

  // Блок 4: Раздвинуты максимально по краям X (-240 и +240)
  { t: "8 ДНІВ", f: 60, dur: 90, s: 80, c: COLORS.accentPink, glow: 'rgba(224, 112, 162, 0.4)', x: -240, y: 260, rot: -2, anim: 'slideUp' },
  { t: "48 ГОДИН", f: 75, dur: 75, s: 80, c: COLORS.accentCyan, glow: 'rgba(6, 182, 212, 0.4)', x: 240, y: 260, rot: 2, anim: 'slideUp' },

  // Блок 5: Низ
  { t: "ПРАКТИКИ", f: 100, dur: 50, s: 130, c: COLORS.accentGreen, glow: 'rgba(16, 185, 129, 0.5)', x: 0, y: 440, rot: 0, anim: 'overshoot' },
];

const ICONS = [
  // Иконки висят ровно над текстом "8 днів" и "48 годин"
  { paths: ICON_PATHS.calendar, colors: [COLORS.accentPink, COLORS.accentPink, COLORS.accentPink, COLORS.accentPink], f: 55, dur: 95, x: -240, y: 120, s: 3.5, glow: 'rgba(224, 112, 162, 0.4)' },
  { paths: ICON_PATHS.clock, colors: [COLORS.accentCyan, COLORS.accentCyan], f: 70, dur: 80, x: 240, y: 120, s: 3.5, glow: 'rgba(6, 182, 212, 0.4)' }
];

const LINES = [
  // Линии аккуратно огибают текст, не перечеркивая его
  { d: "M 0 -20 Q -240 40 -240 80", c: COLORS.accentPink, f: 60, dur: 90 }, // От "це" к календарю
  { d: "M 0 -20 Q 240 40 240 80", c: COLORS.accentCyan, f: 75, dur: 75 },   // От "це" к часам
  { d: "M -240 320 Q 0 360 0 390", c: COLORS.accentGreen, f: 105, dur: 45 }, // От "8 дней" к практике
  { d: "M 240 320 Q 0 360 0 390", c: COLORS.accentGreen, f: 105, dur: 45 },  // От "48 часов" к практике
];

// =============================================================================
// COMPONENTS
// =============================================================================

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const panY = (frame * 1.5) % 120;

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
          backgroundImage: `linear-gradient(${COLORS.grid} 2px, transparent 2px), linear-gradient(90deg, ${COLORS.grid} 2px, transparent 2px)`,
          backgroundSize: '120px 120px',
          transform: `translateY(${panY}px)`,
        }}
      />
    </AbsoluteFill>
  );
};

const NeonIcon: React.FC<{ paths: string[], colors: string[], f: number, dur: number, x: number, y: number, s: number, glow: string }> = ({ paths, colors, f, dur, x, y, s, glow }) => {
  const frame = useCurrentFrame();
  const relFrame = frame - f;

  if (relFrame < 0 || relFrame > dur) return null;

  const progress = interpolate(relFrame, [0, 15], [0, 1], { easing: EASINGS.easeOut, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const opacity = interpolate(relFrame, [dur - 10, dur], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const enterBlur = interpolate(relFrame, [0, 8], [15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${s})`,
      opacity,
      filter: `blur(${enterBlur}px) drop-shadow(0 0 10px ${glow})`,
      zIndex: 3,
    }}>
      <svg viewBox="0 0 24 24" width="24" height="24" style={{ overflow: 'visible' }}>
        {paths.map((p, i) => {
          const { strokeDasharray, strokeDashoffset } = evolvePath(progress, p);
          return (
            <path
              key={i}
              d={p}
              fill="none"
              stroke={colors[i] || colors[0]}
              strokeWidth={1.5}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}
      </svg>
    </div>
  );
};

const NeonPath: React.FC<{ d: string, color: string, f: number, dur: number }> = ({ d, color, f, dur }) => {
  const frame = useCurrentFrame();
  const relFrame = frame - f;

  if (relFrame < 0 || relFrame > dur) return null;

  const progress = interpolate(relFrame, [0, 20], [0, 1], { easing: EASINGS.easeOut, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const opacity = interpolate(relFrame, [dur - 10, dur], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const { strokeDasharray, strokeDashoffset } = evolvePath(progress, d);

  return (
    <svg viewBox="-540 -960 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2, overflow: 'visible', opacity }}>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 10px ${color})` }}
      />
    </svg>
  );
};

const KineticWord: React.FC<{ word: typeof WORDS[0] }> = ({ word }) => {
  const frame = useCurrentFrame();
  const relFrame = frame - word.f;

  if (relFrame < 0 || relFrame > word.dur) return null;

  const opacityIn = interpolate(relFrame, [0, 5], [0, 1], { easing: EASINGS.easeOut, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const opacityOut = interpolate(relFrame, [word.dur - 5, word.dur], [1, 0], { easing: EASINGS.easeIn, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const currentOpacity = Math.min(opacityIn, opacityOut);

  let baseScale = 1;
  let curX = word.x;
  let curY = word.y;

  if (word.anim === 'pop') {
    baseScale = interpolate(relFrame, [0, 8], [0.4, 1], { easing: EASINGS.overshoot, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (word.anim === 'scaleUp') {
    baseScale = interpolate(relFrame, [0, word.dur], [0.8, 1.1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (word.anim === 'slideUp') {
    curY += interpolate(relFrame, [0, 8], [60, 0], { easing: EASINGS.easeOut, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (word.anim === 'slideRight') {
    curX += interpolate(relFrame, [0, 8], [-80, 0], { easing: EASINGS.easeOut, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (word.anim === 'slideLeft') {
    curX += interpolate(relFrame, [0, 8], [80, 0], { easing: EASINGS.easeOut, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (word.anim === 'slam') {
    baseScale = interpolate(relFrame, [0, 6], [3, 1], { easing: EASINGS.slam, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (word.anim === 'overshoot') {
    baseScale = interpolate(relFrame, [0, 12], [0, 1], { easing: EASINGS.overshoot, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  }

  const enterBlur = interpolate(relFrame, [0, 6], [15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const exitProgress = interpolate(relFrame, [word.dur - 5, word.dur], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const finalScale = baseScale * interpolate(exitProgress, [0, 1], [1, 0.8]);
  const finalY = curY + interpolate(exitProgress, [0, 1], [0, 30]);
  const exitBlur = interpolate(exitProgress, [0, 1], [0, 10]);

  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `translate(-50%, -50%) translate(${curX}px, ${finalY}px) rotate(${word.rot}deg) scale(${finalScale})`,
      opacity: currentOpacity,
      color: word.c,
      fontSize: word.s,
      fontWeight: 900,
      letterSpacing: '-1px',
      textTransform: 'uppercase',
      filter: `blur(${enterBlur + exitBlur}px) drop-shadow(0 10px 25px ${word.glow})`,
      whiteSpace: 'nowrap',
      margin: 0,
      lineHeight: 1,
      zIndex: 4,
    }}>
      {word.t}
    </div>
  );
};

// =============================================================================
// MAIN COMPOSITION
// =============================================================================
const CeltaPartOne: React.FC = () => {
  const frame = useCurrentFrame();

  // Плавный зум камеры всей сцены
  const segmentZoom = interpolate(frame, [0, 150], [1, 1.05], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  // Тряска камеры при ударе слова CELTA
  let shakeX = 0;
  if (frame >= 18 && frame <= 24) {
    shakeX = interpolate(frame, [18, 20, 22, 24], [0, -15, 15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Background />
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${segmentZoom}) translateX(${shakeX}px)`, zIndex: 2 }}>
        {ICONS.map((icon, i) => <NeonIcon key={`icon-${i}`} {...icon} />)}
        {LINES.map((line, i) => <NeonPath key={`line-${i}`} d={line.d} color={line.c} f={line.f} dur={line.dur} />)}
        {WORDS.map((word, i) => <KineticWord key={`word-${i}`} word={word} />)}
      </div>
    </AbsoluteFill>
  );
};

export default CeltaPartOne;
