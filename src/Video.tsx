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
  id: 'CeltaInternationalHouseFixed',
  durationInSeconds: 7, 
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
  globe: [
    "M12 2 C 17.52 2 22 6.48 22 12 C 22 17.52 17.52 22 12 22 C 6.48 22 2 17.52 2 12 C 2 6.48 6.48 2 12 2 Z", 
    "M2 12 L22 12", 
    "M12 2 C 16 2 16 22 12 22 C 8 22 8 2 12 2 Z" 
  ],
};

// =============================================================================
// KINETIC DATA (Strict Vertical Layout - NO Overlaps)
// =============================================================================
const WORDS = [
  // Блок 1: Верх (Разнесены по высоте)
  { t: "INTERNATIONAL", f: 0, dur: 210, s: 75, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 0, y: -650, rot: -2, anim: 'slideDown' },
  { t: "HOUSE", f: 10, dur: 200, s: 160, c: COLORS.accentOrange, glow: 'rgba(255, 92, 0, 0.4)', x: 0, y: -500, rot: 3, anim: 'slam' },

  // Блок 2: Лесенка вместо одной строки
  { t: "це мережа,", f: 35, dur: 175, s: 65, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -100, y: -320, rot: -2, anim: 'slideRight' },
  { t: "яка навчає", f: 45, dur: 165, s: 65, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.05)', x: 100, y: -220, rot: 1, anim: 'slideLeft' },

  // Блок 3: Центр
  { t: "ВЧИТЕЛІВ", f: 65, dur: 145, s: 130, c: COLORS.accentYellow, glow: 'rgba(250, 204, 21, 0.4)', x: 0, y: -60, rot: -3, anim: 'overshoot' },
  { t: "АНГЛІЙСЬКОЇ", f: 80, dur: 130, s: 90, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 0, y: 80, rot: 2, anim: 'slideUp' },

  // Блок 4: Чуть ниже центра
  { t: "по всьому світу", f: 110, dur: 100, s: 80, c: COLORS.accentCyan, glow: 'rgba(6, 182, 212, 0.4)', x: 0, y: 260, rot: -1, anim: 'pop' },

  // Блок 5: Низ экрана
  { t: "вже понад", f: 150, dur: 60, s: 60, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -100, y: 440, rot: -2, anim: 'slideRight' },
  { t: "70 РОКІВ", f: 165, dur: 45, s: 180, c: COLORS.accentPink, glow: 'rgba(224, 112, 162, 0.6)', x: 20, y: 600, rot: 4, anim: 'slam' },
];

const ICONS = [
  // Глобус сильно заглушен по opacity и увеличен, чтобы стать просто легкой фоновой текстурой
  { paths: ICON_PATHS.globe, colors: ['rgba(6, 182, 212, 0.15)', 'rgba(6, 182, 212, 0.15)', 'rgba(6, 182, 212, 0.15)'], f: 100, dur: 110, x: 0, y: 260, s: 15, glow: 'transparent' }
];

const LINES = [
  // Линии адаптированы под новые Y координаты, чтобы элегантно связывать блоки
  { d: "M 0 -420 Q -250 -370 -100 -320", c: COLORS.accentPink, f: 40, dur: 170 }, 
  { d: "M 100 -220 Q 250 -140 0 -60", c: COLORS.accentYellow, f: 60, dur: 150 },
  { d: "M 0 80 Q -200 170 0 260", c: COLORS.accentCyan, f: 100, dur: 110 },
  { d: "M 0 260 Q 250 350 -100 440", c: COLORS.accentGreen, f: 140, dur: 70 },
];

// =============================================================================
// COMPONENTS
// =============================================================================

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const panY = (frame * 1.5) % 120;

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

  const progress = interpolate(relFrame, [0, 40], [0, 1], { easing: EASINGS.easeOut, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const opacity = interpolate(relFrame, [0, 20, dur - 10, dur], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rotate = interpolate(relFrame, [0, dur], [-10, 10]);

  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${s}) rotate(${rotate}deg)`,
      opacity,
      filter: `drop-shadow(0 0 10px ${glow})`,
      zIndex: 2, 
    }}>
      <svg viewBox="0 0 24 24" width="24" height="24" style={{ overflow: 'visible' }}>
        {paths.map((p, i) => {
          const { strokeDasharray, strokeDashoffset } = evolvePath(progress, p);
          return (
            <path key={i} d={p} fill="none" stroke={colors[i] || colors[0]} strokeWidth={0.6} strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} strokeLinecap="round" strokeLinejoin="round" />
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
    <svg viewBox="-540 -960 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 3, overflow: 'visible', opacity }}>
      <path d={d} fill="none" stroke={color} strokeWidth={3} strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 10px ${color})` }} />
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
  } else if (word.anim === 'slideDown') {
    curY += interpolate(relFrame, [0, 8], [-60, 0], { easing: EASINGS.easeOut, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  }

  const enterBlur = interpolate(relFrame, [0, 6], [15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const exitProgress = interpolate(relFrame, [word.dur - 5, word.dur], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const finalScale = baseScale * interpolate(exitProgress, [0, 1], [1, 0.8]);
  const finalY = curY + interpolate(exitProgress, [0, 1], [0, 30]);
  const exitBlur = interpolate(exitProgress, [0, 1], [0, 10]);

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

const CeltaInternationalHouseFixed: React.FC = () => {
  const frame = useCurrentFrame();
  const segmentZoom = interpolate(frame, [0, 210], [1.02, 0.98], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  let shakeX = 0;
  if (frame >= 10 && frame <= 16) {
    shakeX = interpolate(frame, [10, 12, 14, 16], [0, -15, 15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (frame >= 165 && frame <= 172) {
    shakeX = interpolate(frame, [165, 167, 169, 172], [0, -20, 20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
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

export default CeltaInternationalHouseFixed;
