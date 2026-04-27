import React from 'react';
import { 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate, 
  Easing, 
  AbsoluteFill 
} from 'remotion';

// =============================================================================
// COMPOSITION CONFIGURATION
// =============================================================================
export const compositionConfig = {
  id: 'BridgeToCeltaPromo',
  durationInSeconds: 34,
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

// =============================================================================
// KINETIC DATA
// =============================================================================
const WORDS = [
  // Segment 1: Bridge to CELTA — 8 днів, 48 годин практики.
  { t: "Bridge", f: 0, dur: 20, s: 100, c: COLORS.accentOrange, glow: 'rgba(255, 92, 0, 0.4)', x: -120, y: -100, rot: -4, anim: 'pop' },
  { t: "to", f: 10, dur: 15, s: 70, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: 60, y: -120, rot: 5, anim: 'pop' },
  { t: "CELTA", f: 20, dur: 35, s: 180, c: COLORS.accentYellow, glow: 'rgba(250, 204, 21, 0.4)', x: 0, y: 0, rot: -2, anim: 'slam' },
  
  { t: "8 ДНІВ", f: 60, dur: 30, s: 130, c: COLORS.accentPink, glow: 'rgba(224, 112, 162, 0.4)', x: -60, y: -120, rot: -3, anim: 'slideUp' },
  { t: "48 ГОДИН", f: 80, dur: 30, s: 140, c: COLORS.accentCyan, glow: 'rgba(6, 182, 212, 0.4)', x: 40, y: -20, rot: 2, anim: 'slideLeft' },
  { t: "ПРАКТИКИ", f: 100, dur: 30, s: 150, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.2)', x: 0, y: 80, rot: 0, anim: 'overshoot' },

  // Segment 2: Після курсу ти будеш розуміти як будувати урок так щоб він працював
  { t: "Після", f: 135, dur: 20, s: 80, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -140, y: -150, rot: -2, anim: 'pop' },
  { t: "курсу", f: 145, dur: 20, s: 80, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.05)', x: 0, y: -150, rot: 0, anim: 'pop' },
  { t: "ти будеш", f: 155, dur: 25, s: 90, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -80, y: -80, rot: 3, anim: 'slideRight' },
  { t: "РОЗУМІТИ", f: 170, dur: 30, s: 120, c: COLORS.accentYellow, glow: 'rgba(250, 204, 21, 0.4)', x: 40, y: -10, rot: -4, anim: 'scaleUp' },
  
  { t: "як будувати", f: 200, dur: 25, s: 90, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -80, y: -120, rot: -2, anim: 'slideUp' },
  { t: "УРОК", f: 215, dur: 30, s: 180, c: COLORS.accentOrange, glow: 'rgba(255, 92, 0, 0.4)', x: 0, y: -20, rot: 5, anim: 'slam' },
  { t: "так щоб", f: 235, dur: 20, s: 80, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -120, y: 80, rot: 0, anim: 'pop' },
  { t: "ВІН", f: 245, dur: 20, s: 80, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.05)', x: -20, y: 80, rot: 0, anim: 'pop' },
  { t: "ПРАЦЮВАВ", f: 255, dur: 35, s: 130, c: COLORS.accentGreen, glow: 'rgba(16, 185, 129, 0.4)', x: 0, y: 160, rot: -2, anim: 'overshoot' },

  // Segment 3: Від структури до фідбеку. Не теорія з підручника, а те що реально тримає клас.
  { t: "Від", f: 295, dur: 20, s: 80, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -140, y: -140, rot: -3, anim: 'pop' },
  { t: "СТРУКТУРИ", f: 305, dur: 30, s: 110, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 40, y: -120, rot: 2, anim: 'slideLeft' },
  { t: "до", f: 320, dur: 20, s: 80, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -120, y: -40, rot: 0, anim: 'pop' },
  { t: "ФІДБЕКУ", f: 330, dur: 35, s: 160, c: COLORS.accentPink, glow: 'rgba(224, 112, 162, 0.4)', x: 0, y: 40, rot: -4, anim: 'slam' },

  { t: "НЕ ТЕОРІЯ", f: 370, dur: 25, s: 100, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: 0, y: -120, rot: -2, anim: 'slideDown' },
  { t: "з підручника", f: 385, dur: 25, s: 90, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.05)', x: 0, y: -50, rot: 2, anim: 'slideUp' },
  { t: "а те що", f: 400, dur: 20, s: 80, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -100, y: 30, rot: -5, anim: 'pop' },
  { t: "РЕАЛЬНО", f: 410, dur: 25, s: 120, c: COLORS.accentCyan, glow: 'rgba(6, 182, 212, 0.4)', x: 40, y: 90, rot: 3, anim: 'scaleUp' },
  { t: "ТРИМАЄ", f: 425, dur: 25, s: 140, c: COLORS.accentYellow, glow: 'rgba(250, 204, 21, 0.4)', x: 0, y: 170, rot: -2, anim: 'overshoot' },
  { t: "КЛАС!", f: 440, dur: 40, s: 220, c: COLORS.accentGreen, glow: 'rgba(16, 185, 129, 0.5)', x: 0, y: 280, rot: 5, anim: 'slam' },

  // Segment 4: International House — мережа яка навчає вчителів англійської по всьому світу вже понад 70 років.
  { t: "INTERNATIONAL", f: 490, dur: 30, s: 100, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 0, y: -100, rot: -2, anim: 'slideDown' },
  { t: "HOUSE", f: 510, dur: 40, s: 190, c: COLORS.accentOrange, glow: 'rgba(255, 92, 0, 0.4)', x: 0, y: 0, rot: 3, anim: 'slam' },
  
  { t: "мережа", f: 555, dur: 20, s: 80, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -100, y: -140, rot: -2, anim: 'pop' },
  { t: "яка навчає", f: 565, dur: 25, s: 80, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.05)', x: 60, y: -140, rot: 2, anim: 'slideLeft' },
  { t: "ВЧИТЕЛІВ", f: 580, dur: 30, s: 140, c: COLORS.accentYellow, glow: 'rgba(250, 204, 21, 0.4)', x: 0, y: -50, rot: -3, anim: 'overshoot' },
  
  { t: "по всьому", f: 615, dur: 20, s: 80, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -120, y: -120, rot: -4, anim: 'slideRight' },
  { t: "СВІТУ", f: 625, dur: 30, s: 150, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.2)', x: 40, y: -40, rot: 3, anim: 'pop' },
  { t: "вже понад", f: 645, dur: 20, s: 80, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -100, y: 60, rot: -2, anim: 'pop' },
  { t: "70 РОКІВ", f: 655, dur: 40, s: 180, c: COLORS.accentPink, glow: 'rgba(224, 112, 162, 0.5)', x: 0, y: 160, rot: 0, anim: 'slam' },

  // Segment 5: Більше тисячі випускників тільки в Україні.
  { t: "Більше", f: 700, dur: 25, s: 90, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -120, y: -100, rot: -3, anim: 'slideRight' },
  { t: "1000", f: 715, dur: 30, s: 180, c: COLORS.accentYellow, glow: 'rgba(250, 204, 21, 0.4)', x: 40, y: -50, rot: 4, anim: 'slam' },
  { t: "ВИПУСКНИКІВ", f: 735, dur: 30, s: 110, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.1)', x: 0, y: 50, rot: -2, anim: 'slideUp' },
  { t: "тільки в", f: 755, dur: 20, s: 80, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -100, y: 130, rot: 0, anim: 'pop' },
  { t: "УКРАЇНІ", f: 765, dur: 40, s: 160, c: COLORS.accentCyan, glow: 'rgba(6, 182, 212, 0.4)', x: 40, y: 200, rot: -3, anim: 'overshoot' },

  // Segment 6: Курс стартує 1 червня, онлайн. Якщо хочеш деталі — залишай заявку або просто пиши “BRIDGE” в коментарях
  { t: "Курс", f: 815, dur: 20, s: 90, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.05)', x: -100, y: -150, rot: -2, anim: 'pop' },
  { t: "СТАРТУЄ", f: 825, dur: 25, s: 110, c: COLORS.accentOrange, glow: 'rgba(255, 92, 0, 0.4)', x: 60, y: -150, rot: 3, anim: 'scaleUp' },
  { t: "1 ЧЕРВНЯ", f: 840, dur: 40, s: 200, c: COLORS.accentYellow, glow: 'rgba(250, 204, 21, 0.5)', x: 0, y: -30, rot: -4, anim: 'slam' },
  { t: "ОНЛАЙН", f: 870, dur: 35, s: 130, c: COLORS.accentGreen, glow: 'rgba(16, 185, 129, 0.4)', x: 0, y: 80, rot: 2, anim: 'overshoot' },

  { t: "Якщо цікаво", f: 915, dur: 25, s: 80, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -100, y: -100, rot: -3, anim: 'slideDown' },
  { t: "просто пиши", f: 930, dur: 25, s: 90, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.05)', x: 40, y: -50, rot: 2, anim: 'slideLeft' },
  { t: "BRIDGE", f: 945, dur: 60, s: 240, c: COLORS.accentPink, glow: 'rgba(224, 112, 162, 0.6)', x: 0, y: 50, rot: -5, anim: 'slam' },
  { t: "в коментарях", f: 975, dur: 45, s: 80, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: 0, y: 180, rot: 0, anim: 'slideUp' },
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

const KineticWord: React.FC<{ word: typeof WORDS[0] }> = ({ word }) => {
  const frame = useCurrentFrame();
  const relFrame = frame - word.f;
  
  if (relFrame < 0 || relFrame > word.dur) return null;
  
  const opacityIn = interpolate(relFrame, [0, 5], [0, 1], { 
    easing: EASINGS.easeOut, 
    extrapolateLeft: 'clamp', 
    extrapolateRight: 'clamp' 
  });
  const opacityOut = interpolate(relFrame, [word.dur - 5, word.dur], [1, 0], { 
    easing: EASINGS.easeIn, 
    extrapolateLeft: 'clamp', 
    extrapolateRight: 'clamp' 
  });
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
  const finalY = curY + interpolate(exitProgress, [0, 1], [0, 40]);
  const exitBlur = interpolate(exitProgress, [0, 1], [0, 15]);

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
      letterSpacing: '-2px',
      textTransform: 'uppercase',
      filter: `blur(${enterBlur + exitBlur}px) drop-shadow(0 10px 30px ${word.glow})`,
      whiteSpace: 'nowrap',
      margin: 0,
      lineHeight: 1,
      zIndex: 3,
    }}>
      {word.t}
    </div>
  );
};

const MainScene: React.FC = () => {
  const frame = useCurrentFrame();

  let shakeX = 0;
  
  // SLAM shake animations
  if (frame >= 20 && frame <= 26) {
    shakeX = interpolate(frame, [20, 22, 24, 26], [0, -15, 15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (frame >= 215 && frame <= 221) {
    shakeX = interpolate(frame, [215, 217, 219, 221], [0, -18, 18, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (frame >= 330 && frame <= 336) {
    shakeX = interpolate(frame, [330, 332, 334, 336], [0, -15, 15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (frame >= 440 && frame <= 448) {
    shakeX = interpolate(frame, [440, 442, 444, 446, 448], [0, -25, 25, -10, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (frame >= 510 && frame <= 516) {
    shakeX = interpolate(frame, [510, 512, 514, 516], [0, -20, 20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (frame >= 655 && frame <= 661) {
    shakeX = interpolate(frame, [655, 657, 659, 661], [0, -15, 15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (frame >= 840 && frame <= 848) {
    shakeX = interpolate(frame, [840, 842, 844, 846, 848], [0, -20, 20, -10, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (frame >= 945 && frame <= 953) {
    shakeX = interpolate(frame, [945, 947, 949, 951, 953], [0, -30, 30, -15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  }

  // Continuous subtle zoom per segment
  const segmentZoom = interpolate(
    frame % 150, 
    [0, 150], 
    [1, 1.05], 
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      transform: `scale(${segmentZoom}) translateX(${shakeX}px)`,
      zIndex: 2,
    }}>
      {WORDS.map((word, i) => (
        <KineticWord key={i} word={word} />
      ))}
    </div>
  );
};

// =============================================================================
// MAIN COMPOSITION
// =============================================================================
const BridgeToCeltaPromo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Background />
      <MainScene />
    </AbsoluteFill>
  );
};

export default BridgeToCeltaPromo;
