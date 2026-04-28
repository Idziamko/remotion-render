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
  id: 'CeltaStartDate',
  durationInSeconds: 3, // Короткий отрезок ~3 секунды (90 кадров)
  fps: 30,
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

const ICON_PATHS = {
  // Минималистичный календарь с галочкой
  calendarCheck: [
    "M16 2v4", 
    "M8 2v4", 
    "M3 10h18", 
    "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
    "M9 16l2 2 4-4" // Галочка внутри
  ],
};

// =============================================================================
// KINETIC DATA (Strict Vertical Layout - NO Overlaps)
// =============================================================================
const WORDS = [
  // Intro (Верх)
  { t: "Курс", f: 0, dur: 90, s: 70, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: 0, y: -350, rot: 0, anim: 'pop' },
  
  // Title (Чуть ниже, разнесено по X)
  { t: "BRIDGE", f: 10, dur: 80, s: 90, c: COLORS.accentOrange, glow: 'rgba(255, 92, 0, 0.4)', x: -100, y: -200, rot: -2, anim: 'slideRight' },
  { t: "TO", f: 15, dur: 75, s: 60, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 120, y: -200, rot: 2, anim: 'slideLeft' },
  { t: "CELTA", f: 25, dur: 65, s: 180, c: COLORS.accentYellow, glow: 'rgba(250, 204, 21, 0.5)', x: 0, y: -40, rot: -3, anim: 'slam' },

  // Action
  { t: "СТАРТУЄ", f: 45, dur: 45, s: 80, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: 0, y: 120, rot: 1, anim: 'pop' },

  // The Date (Самый массивный блок снизу)
  { t: "1 ЧЕРВНЯ", f: 60, dur: 30, s: 160, c: COLORS.accentGreen, glow: 'rgba(16, 185, 129, 0.6)', x: 0, y: 280, rot: 0, anim: 'slam' },
];

const ICONS = [
  // Иконка календаря рядом с датой
  { paths: ICON_PATHS.calendarCheck, colors: [COLORS.accentGreen, COLORS.accentGreen, COLORS.accentGreen, COLORS.accentGreen, COLORS.accentYellow], f: 55, dur: 35, x: 0, y: 440, s: 3.5, glow: 'rgba(16, 185, 129, 0.4)' }
];

const LINES = [
  // Динамичная зигзаг-линия, связывающая блоки
  { d: "M 0 -40 Q -180 40 0 120", c: COLORS.accentOrange, f: 35, dur: 55 },
  { d: "M 0 120 Q 180 200 0 280", c: COLORS.accentCyan, f: 50, dur: 40 },
];

// =============================================================================
// COMPONENTS
// =============================================================================

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const panY = (frame * 2.5) % 120; // Чуть быстрее для динамики

  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 50%, ${COLORS.bgCenter} 0%, ${COLORS.bgEdge} 100%)`, zIndex: 1 }}>
      <div style={{
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

  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${s})`,
      opacity,
      filter: `drop-shadow(0 0 15px ${glow})`,
      zIndex: 2, 
    }}>
      <svg viewBox="0 0 24 24" width="24" height="24" style={{ overflow: 'visible' }}>
        {paths.map((p, i) => {
          const { strokeDasharray, strokeDashoffset } = evolvePath(progress, p);
          return (
            <path key={i} d={p} fill="none" stroke={colors[i] || colors[0]} strokeWidth={1.5} strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} strokeLinecap="round" strokeLinejoin="round" />
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

  const progress = interpolate(relFrame, [0, 15], [0, 1], { easing: EASINGS.easeOut, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const opacity = interpolate(relFrame, [dur - 10, dur], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const { strokeDasharray, strokeDashoffset } = evolvePath(progress, d);

  return (
    <svg viewBox="-540 -960 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 3, overflow: 'visible', opacity }}>
      <path d={d} fill="none" stroke={color} strokeWidth={4} strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 10px ${color})` }} />
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
  } else if (word.anim === 'slideRight') {
    curX += interpolate(relFrame, [0, 8], [-80, 0], { easing: EASINGS.easeOut, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (word.anim === 'slideLeft') {
    curX += interpolate(relFrame, [0, 8], [80, 0], { easing: EASINGS.easeOut, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (word.anim === 'slam') {
    baseScale = interpolate(relFrame, [0, 6], [2.5, 1], { easing: EASINGS.slam, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  }

  const enterBlur = interpolate(relFrame, [0, 6], [15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const exitProgress = interpolate(relFrame, [word.dur - 5, word.dur], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const finalScale = baseScale * interpolate(exitProgress, [0, 1], [1, 0.8]);
  const finalY = curY + interpolate(exitProgress, [0, 1], [0, 20]);
  const exitBlur = interpolate(exitProgress, [0, 1], [0, 15]);

  return (
    <div style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: `translate(-50%, -50%) translate(${curX}px, ${finalY}px) rotate(${word.rot}deg) scale(${finalScale})`,
      opacity: currentOpacity, color: word.c, fontSize: word.s, fontWeight: 900,
      letterSpacing: '-1px', textTransform: 'uppercase',
      filter: `blur(${enterBlur + exitBlur}px) drop-shadow(0 10px 25px ${word.glow})`,
      whiteSpace: 'nowrap', margin: 0, lineHeight: 1, zIndex: 4,
    }}>
      {word.t}
    </div>
  );
};

// =============================================================================
// MAIN COMPOSITION
// =============================================================================
const CeltaStartDate: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Динамичный зум
  const segmentZoom = interpolate(frame, [0, 90], [1, 1.08], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  // Жесткие встряски камеры при появлении CELTA (кадр 25) и 1 ЧЕРВНЯ (кадр 60)
  let shakeX = 0;
  let shakeY = 0;
  
  if (frame >= 25 && frame <= 31) {
    shakeX = interpolate(frame, [25, 27, 29, 31], [0, -15, 15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (frame >= 60 && frame <= 68) {
    shakeY = interpolate(frame, [60, 62, 64, 66, 68], [0, -20, 20, -10, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Background />
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${segmentZoom}) translate(${shakeX}px, ${shakeY}px)`, zIndex: 2 }}>
        {ICONS.map((icon, i) => <NeonIcon key={`icon-${i}`} {...icon} />)}
        {LINES.map((line, i) => <NeonPath key={`line-${i}`} d={line.d} color={line.c} f={line.f} dur={line.dur} />)}
        {WORDS.map((word, i) => <KineticWord key={`word-${i}`} word={word} />)}
      </div>
    </AbsoluteFill>
  );
};

export default CeltaStartDate;
