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
  id: 'CeltaStructureScheme',
  durationInSeconds: 2, // Отрезок короткий (1.78с), берем 2 секунды
  fps: 30,
  width: 1080,
  height: 1920,
};

const COLORS = {
  bgCenter: '#1F2466',
  bgEdge: '#0B0C24',
  grid: 'rgba(255, 255, 255, 0.04)',

  accentYellow: '#FACC15',
  accentOrange: '#FF5C00',
  accentCyan: '#06B6D4',
  accentPink: '#E070A2',

  textWhite: '#FFFFFF',
  textMuted: '#9EA6EB',
} as const;

const EASINGS = {
  easeOut: Easing.bezier(0.33, 1, 0.68, 1),
  overshoot: Easing.bezier(0.34, 1.56, 0.64, 1),
  slam: Easing.bezier(0.1, 1, 0.3, 1),
};

// =============================================================================
// SCHEME DATA
// =============================================================================
const WORDS = [
  // Первый узел (Верх)
  { t: "ВІД", f: 0, dur: 60, s: 60, c: COLORS.textMuted, x: -180, y: -350, rot: -5, anim: 'pop' },
  { t: "СТРУКТУРИ", f: 5, dur: 55, s: 130, c: COLORS.accentCyan, glow: 'rgba(6, 182, 212, 0.5)', x: 0, y: -220, rot: 0, anim: 'slam' },

  // Второй узел (Низ)
  { t: "ДО", f: 25, dur: 35, s: 60, c: COLORS.textMuted, x: 180, y: 100, rot: 5, anim: 'pop' },
  { t: "ФІДБЕКУ", f: 30, dur: 30, s: 150, c: COLORS.accentPink, glow: 'rgba(224, 112, 162, 0.5)', x: 0, y: 250, rot: 0, anim: 'slam' },
];

// Линия, соединяющая два понятия
const CONNECTOR_PATH = "M 0 -120 Q 200 0 0 120"; 

// =============================================================================
// COMPONENTS
// =============================================================================

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const panY = (frame * 2) % 120;
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% 50%, ${COLORS.bgCenter} 0%, ${COLORS.bgEdge} 100%)` }}>
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

const NeonConnector: React.FC = () => {
  const frame = useCurrentFrame();
  // Линия начинает рисоваться после появления первого слова и заканчивается перед вторым
  const progress = interpolate(frame, [15, 35], [0, 1], {
    easing: EASINGS.easeOut,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const { strokeDasharray, strokeDashoffset } = evolvePath(progress, CONNECTOR_PATH);

  return (
    <svg viewBox="-540 -960 1080 1920" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', zIndex: 2 }}>
      <path
        d={CONNECTOR_PATH}
        fill="none"
        stroke={COLORS.accentYellow}
        strokeWidth={8}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 15px ${COLORS.accentYellow})` }}
      />
      {/* Точка-курсор на конце линии */}
      {progress > 0 && progress < 1 && (
        <circle
            cx={0} cy={0} r={12}
            fill={COLORS.textWhite}
            style={{ 
                offsetPath: `path("${CONNECTOR_PATH}")`,
                offsetDistance: `${progress * 100}%`,
                filter: `drop-shadow(0 0 10px ${COLORS.textWhite})`
            }}
        />
      )}
    </svg>
  );
};

const KineticWord: React.FC<{ word: typeof WORDS[0] }> = ({ word }) => {
  const frame = useCurrentFrame();
  const relFrame = frame - word.f;
  if (relFrame < 0 || relFrame > word.dur) return null;

  const opacity = interpolate(relFrame, [0, 5, word.dur - 5, word.dur], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  let scale = 1;
  if (word.anim === 'pop') {
    scale = interpolate(relFrame, [0, 10], [0.5, 1], { easing: EASINGS.overshoot, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (word.anim === 'slam') {
    scale = interpolate(relFrame, [0, 8], [3, 1], { easing: EASINGS.slam, extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  }

  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: `translate(-50%, -50%) translate(${word.x}px, ${word.y}px) rotate(${word.rot}deg) scale(${scale})`,
      opacity,
      color: word.c,
      fontSize: word.s,
      fontWeight: 900,
      textTransform: 'uppercase',
      filter: word.glow ? `drop-shadow(0 0 20px ${word.glow})` : 'none',
      whiteSpace: 'nowrap',
      zIndex: 3,
    }}>
      {word.t}
    </div>
  );
};

export const CeltaStructureScheme: React.FC = () => {
  const frame = useCurrentFrame();
  const cameraZoom = interpolate(frame, [0, 60], [1, 1.1]);

  return (
    <AbsoluteFill style={{ backgroundColor: '#000', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Background />
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${cameraZoom})`, zIndex: 2 }}>
        <NeonConnector />
        {WORDS.map((w, i) => <KineticWord key={i} word={w} />)}
      </div>
    </AbsoluteFill>
  );
};

export default CeltaStructureScheme;
