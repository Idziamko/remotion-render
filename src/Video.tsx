import React from 'react';
import {
  useCurrentFrame,
  interpolate,
  Easing,
  AbsoluteFill,
  Sequence,
} from 'remotion';
import { evolvePath } from '@remotion/paths';

// =============================================================================
// COMPOSITION CONFIGURATION
// =============================================================================
export const compositionConfig = {
  id: 'CeltaNeonPromoFixed',
  durationInSeconds: 46,
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
  accentRed: '#FF3366', // Для перечеркивания
  
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
  calendar: ["M16 2v4", "M8 2v4", "M3 10h18", "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"],
  book: ["M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5v13z", "M4 19.5v-13"],
  cross: ["M 2 2 L 22 22", "M 22 2 L 2 22"], // Крест
};

// =============================================================================
// DATA: SCENE 1 (Bridge to CELTA...)
// =============================================================================
const WORDS_1 = [
  // Размеры (s) уменьшены, x/y сдвинуты к центру
  { t: "Bridge", f: 0, dur: 60, s: 80, c: COLORS.accentOrange, glow: 'rgba(255, 92, 0, 0.4)', x: -60, y: -90, rot: -4, anim: 'pop' },
  { t: "to", f: 10, dur: 50, s: 60, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: 40, y: -100, rot: 5, anim: 'pop' },
  { t: "CELTA", f: 20, dur: 60, s: 130, c: COLORS.accentYellow, glow: 'rgba(250, 204, 21, 0.4)', x: 0, y: 0, rot: -2, anim: 'slam' },

  { t: "8 ДНІВ", f: 70, dur: 60, s: 90, c: COLORS.accentPink, glow: 'rgba(224, 112, 162, 0.4)', x: -60, y: -80, rot: -3, anim: 'slideUp' },
  { t: "48 ГОДИН", f: 90, dur: 50, s: 100, c: COLORS.accentCyan, glow: 'rgba(6, 182, 212, 0.4)', x: 50, y: 0, rot: 2, anim: 'slideLeft' },
  { t: "ПРАКТИКИ", f: 110, dur: 60, s: 110, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.2)', x: 0, y: 90, rot: 0, anim: 'overshoot' },

  { t: "Після", f: 160, dur: 40, s: 70, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -90, y: -120, rot: -2, anim: 'pop' },
  { t: "курсу", f: 170, dur: 40, s: 70, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.05)', x: 10, y: -120, rot: 0, anim: 'pop' },
  { t: "ти будеш", f: 185, dur: 40, s: 70, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -60, y: -60, rot: 3, anim: 'slideRight' },
  { t: "РОЗУМІТИ", f: 200, dur: 50, s: 100, c: COLORS.accentYellow, glow: 'rgba(250, 204, 21, 0.4)', x: 30, y: 0, rot: -4, anim: 'scaleUp' },

  { t: "як будувати", f: 240, dur: 45, s: 70, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -60, y: -100, rot: -2, anim: 'slideUp' },
  { t: "УРОК", f: 255, dur: 60, s: 140, c: COLORS.accentOrange, glow: 'rgba(255, 92, 0, 0.4)', x: 0, y: -20, rot: 5, anim: 'slam' },
  { t: "так щоб", f: 275, dur: 45, s: 65, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -80, y: 60, rot: 0, anim: 'pop' },
  { t: "він працював", f: 290, dur: 60, s: 90, c: COLORS.accentGreen, glow: 'rgba(16, 185, 129, 0.4)', x: 0, y: 130, rot: -2, anim: 'overshoot' },

  { t: "Від структури", f: 340, dur: 50, s: 80, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 0, y: -70, rot: -2, anim: 'slideDown' },
  { t: "ДО ФІДБЕКУ", f: 360, dur: 60, s: 120, c: COLORS.accentPink, glow: 'rgba(224, 112, 162, 0.4)', x: 0, y: 20, rot: 3, anim: 'slam' },

  { t: "не теорія", f: 420, dur: 40, s: 70, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -80, y: -120, rot: -3, anim: 'slideRight' },
  { t: "з підручника", f: 435, dur: 40, s: 75, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 20, y: -60, rot: 2, anim: 'slideLeft' },
  { t: "а те що", f: 455, dur: 35, s: 65, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -90, y: 20, rot: 0, anim: 'pop' },
  { t: "РЕАЛЬНО", f: 470, dur: 50, s: 100, c: COLORS.accentCyan, glow: 'rgba(6, 182, 212, 0.4)', x: -20, y: 90, rot: -2, anim: 'scaleUp' },
  { t: "ТРИМАЄ КЛАС", f: 490, dur: 70, s: 120, c: COLORS.accentGreen, glow: 'rgba(16, 185, 129, 0.5)', x: 0, y: 180, rot: 4, anim: 'slam' },
];

const ICONS_1 = [
  // Календарь появляется вместе с "8 днів"
  { paths: ICON_PATHS.calendar, colors: [COLORS.accentYellow], f: 75, dur: 95, x: -220, y: -80, s: 3.5, glow: 'rgba(250, 204, 21, 0.4)' },
  // Учебник, который перечеркивается
  { paths: [...ICON_PATHS.book, ...ICON_PATHS.cross], 
    colors: [COLORS.accentOrange, COLORS.accentOrange, COLORS.accentRed, COLORS.accentRed], 
    f: 435, dur: 60, x: 240, y: -60, s: 3.5, glow: 'rgba(255, 92, 0, 0.4)' }
];

const LINES_1 = [
  { d: "M -60 -80 Q -10 -120 40 0", c: COLORS.accentPink, f: 80, dur: 60 },
  { d: "M 40 0 Q 80 50 0 90", c: COLORS.accentCyan, f: 100, dur: 70 },
  { d: "M 0 -20 Q 80 60 0 130", c: COLORS.accentOrange, f: 275, dur: 75 },
];

// =============================================================================
// DATA: SCENE 2 (International House...)
// =============================================================================
const WORDS_2 = [
  { t: "INTERNATIONAL", f: 0, dur: 60, s: 70, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 0, y: -80, rot: -2, anim: 'slideDown' },
  { t: "HOUSE", f: 20, dur: 60, s: 130, c: COLORS.accentOrange, glow: 'rgba(255, 92, 0, 0.4)', x: 0, y: 0, rot: 3, anim: 'slam' },

  { t: "мережа", f: 90, dur: 40, s: 70, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -80, y: -120, rot: -2, anim: 'slideRight' },
  { t: "яка навчає", f: 105, dur: 45, s: 70, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.05)', x: 40, y: -80, rot: 2, anim: 'slideLeft' },
  { t: "ВЧИТЕЛІВ", f: 125, dur: 60, s: 110, c: COLORS.accentYellow, glow: 'rgba(250, 204, 21, 0.4)', x: 0, y: 0, rot: -3, anim: 'overshoot' },

  { t: "по всьому світу", f: 180, dur: 60, s: 80, c: COLORS.accentCyan, glow: 'rgba(6, 182, 212, 0.4)', x: 0, y: -90, rot: -2, anim: 'slideUp' },
  { t: "вже понад", f: 200, dur: 50, s: 65, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -70, y: -10, rot: 0, anim: 'pop' },
  { t: "70 РОКІВ", f: 215, dur: 70, s: 140, c: COLORS.accentPink, glow: 'rgba(224, 112, 162, 0.5)', x: 0, y: 80, rot: 4, anim: 'slam' },

  { t: "Більше", f: 290, dur: 40, s: 70, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -90, y: -110, rot: -3, anim: 'slideRight' },
  { t: "1000", f: 305, dur: 60, s: 150, c: COLORS.accentYellow, glow: 'rgba(250, 204, 21, 0.4)', x: 20, y: -20, rot: 4, anim: 'slam' },
  { t: "ВИПУСКНИКІВ", f: 330, dur: 50, s: 80, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 0, y: 70, rot: -2, anim: 'slideUp' },
  { t: "тільки в Україні", f: 350, dur: 80, s: 70, c: COLORS.accentCyan, glow: 'rgba(6, 182, 212, 0.4)', x: 0, y: 150, rot: 0, anim: 'pop' },
];

const ICONS_2: any[] = []; // Без иконок для этой сцены, только геометрия

const LINES_2 = [
  { d: "M 0 0 Q 80 -40 -10 -90", c: COLORS.accentYellow, f: 160, dur: 80 },
  { d: "M 20 -20 Q -60 30 0 70 T 0 150", c: COLORS.accentCyan, f: 320, dur: 110 },
];

// =============================================================================
// DATA: SCENE 3 (Курс стартує...)
// =============================================================================
const WORDS_3 = [
  { t: "Курс", f: 0, dur: 40, s: 70, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.05)', x: -80, y: -130, rot: -2, anim: 'pop' },
  { t: "СТАРТУЄ", f: 15, dur: 50, s: 90, c: COLORS.accentOrange, glow: 'rgba(255, 92, 0, 0.4)', x: 40, y: -130, rot: 3, anim: 'scaleUp' },
  { t: "1 ЧЕРВНЯ", f: 35, dur: 70, s: 160, c: COLORS.accentYellow, glow: 'rgba(250, 204, 21, 0.5)', x: 0, y: -30, rot: -4, anim: 'slam' },
  { t: "ОНЛАЙН", f: 65, dur: 60, s: 100, c: COLORS.accentGreen, glow: 'rgba(16, 185, 129, 0.4)', x: 0, y: 80, rot: 2, anim: 'overshoot' },

  { t: "Якщо хочеш деталі", f: 140, dur: 50, s: 70, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: 0, y: -110, rot: -2, anim: 'slideDown' },
  { t: "залишай заявку", f: 160, dur: 50, s: 80, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 0, y: -40, rot: 2, anim: 'slideLeft' },
  { t: "або просто пиши", f: 185, dur: 45, s: 65, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: 0, y: 20, rot: -1, anim: 'pop' },
  { t: "BRIDGE", f: 210, dur: 100, s: 180, c: COLORS.accentPink, glow: 'rgba(224, 112, 162, 0.6)', x: 0, y: 120, rot: -4, anim: 'slam' },
  { t: "в коментарях", f: 240, dur: 70, s: 60, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: 0, y: 220, rot: 0, anim: 'slideUp' },
];

const ICONS_3: any[] = [];

const LINES_3 = [
  { d: "M 40 -130 Q 120 -80 0 -30 T 0 80", c: COLORS.accentOrange, f: 25, dur: 100 },
];

// =============================================================================
// COMPONENTS
// =============================================================================

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const panY = (frame * 1.5) % 120;

  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 50%, ${COLORS.bgCenter} 0%, ${COLORS.bgEdge} 100%)`, zIndex: 1 }}>
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

  // Плавная прорисовка пути
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
          // Если это крест (последние 2 пути для книги), рисуем его с задержкой (после появления книги)
          const isCross = colors[i] === COLORS.accentRed;
          const pathProgress = isCross ? 
            interpolate(relFrame, [10, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 
            progress;

          const { strokeDasharray, strokeDashoffset } = evolvePath(pathProgress, p);
          
          return (
            <path
              key={i}
              d={p}
              fill="none"
              stroke={colors[i] || colors[0]}
              strokeWidth={isCross ? 2.5 : 1.5}
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
        strokeWidth={5} 
        strokeDasharray={strokeDasharray} 
        strokeDashoffset={strokeDashoffset} 
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 10px ${color})` }} 
      />
    </svg>
  );
};

const KineticWord: React.FC<{ word: any }> = ({ word }) => {
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

const Scene: React.FC<{ words: any[], lines: any[], icons: any[] }> = ({ words, lines, icons }) => {
  const frame = useCurrentFrame();
  const segmentZoom = interpolate(frame, [0, 600], [1, 1.05], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{ position: 'absolute', inset: 0, transform: `scale(${segmentZoom})`, zIndex: 2 }}>
      {icons.map((icon, i) => <NeonIcon key={`icon-${i}`} {...icon} />)}
      {lines.map((line, i) => <NeonPath key={`line-${i}`} d={line.d} color={line.c} f={line.f} dur={line.dur} />)}
      {words.map((word, i) => <KineticWord key={`word-${i}`} word={word} />)}
    </div>
  );
};

// =============================================================================
// MAIN COMPOSITION
// =============================================================================
const CeltaNeonPromoFixed: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Background />
      
      {/* SCENE 1 */}
      <Sequence from={0} durationInFrames={580}>
        <Scene words={WORDS_1} lines={LINES_1} icons={ICONS_1} />
      </Sequence>

      {/* SCENE 2 */}
      <Sequence from={580} durationInFrames={450}>
        <Scene words={WORDS_2} lines={LINES_2} icons={ICONS_2} />
      </Sequence>

      {/* SCENE 3 */}
      <Sequence from={1030} durationInFrames={350}>
        <Scene words={WORDS_3} lines={LINES_3} icons={ICONS_3} />
      </Sequence>
    </AbsoluteFill>
  );
};

export default CeltaNeonPromoFixed;
