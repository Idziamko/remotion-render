import React from 'react';
import {
  useCurrentFrame,
  interpolate,
  Easing,
  AbsoluteFill,
} from 'remotion';

// =============================================================================
// COMPOSITION CONFIGURATION
// =============================================================================
export const compositionConfig = {
  id: 'GroundhogDayAi',
  durationInSeconds: 5,
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// STYLES & THEME
// =============================================================================
const COLORS = {
  bgCenter: '#1E3A8A',
  bgEdge: '#020617',
  grid: 'rgba(255, 255, 255, 0.06)',
  accentYellow: '#FACC15',
  textWhite: '#FFFFFF',
  textGray: '#94A3B8',
  glassBg: 'rgba(15, 23, 42, 0.65)',
  glassBorder: 'rgba(250, 204, 21, 0.5)',
  neonGlow: 'rgba(250, 204, 21, 0.4)',
  errorRed: '#EF4444',
} as const;

const EASINGS = {
  overshoot: Easing.bezier(0.34, 1.56, 0.64, 1),
  easeOut: Easing.bezier(0.33, 1, 0.68, 1),
  bounce: Easing.bezier(0.68, -0.55, 0.265, 1.55),
};

const TASKS = [
  { icon: '📝', title: 'Для структуры постов', sub: 'Ctrl+C -> Ctrl+V -> Молиться' },
  { icon: '💬', title: 'Для ответов клиентам', sub: '"Действуй как вежливый менеджер..."' },
  { icon: '🎨', title: 'Для генерации картинок', sub: '"Добавь больше неона, я сказал!"' },
];

// =============================================================================
// COMPONENTS
// =============================================================================

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const panY = (frame * 3) % 100;

  return (
    <AbsoluteFill
      style={{
        background: 'radial-gradient(circle at 50% 30%, ' + COLORS.bgCenter + ' 0%, ' + COLORS.bgEdge + ' 100%)',
        zIndex: 1,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: -200,
          backgroundImage: 'linear-gradient(' + COLORS.grid + ' 2px, transparent 2px), linear-gradient(90deg, ' + COLORS.grid + ' 2px, transparent 2px)',
          backgroundSize: '120px 120px',
          transform: 'translateY(' + panY + 'px)',
        }}
      />
    </AbsoluteFill>
  );
};

const HeaderTitles: React.FC = () => {
  const frame = useCurrentFrame();

  const slideDown = interpolate(frame, [0, 15], [-150, 0], {
    easing: EASINGS.overshoot,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const counter = Math.floor(
    interpolate(frame, [15, 45], [1, 23], {
      easing: EASINGS.easeOut,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  const shakeX = interpolate(frame, [45, 47, 49, 51, 53], [0, -10, 10, -10, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const currentShakeX = frame > 45 && frame < 55 ? shakeX : 0;

  return (
    <div style={{
      position: 'absolute',
      top: 200,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      zIndex: 2,
      opacity: opacity,
      transform: 'translateY(' + slideDown + 'px)',
    }}>
      <div style={{
        color: COLORS.textWhite,
        fontSize: 40,
        fontWeight: 800,
        letterSpacing: '4px',
        textTransform: 'uppercase',
        opacity: 0.9,
        margin: 0,
        background: COLORS.errorRed,
        padding: '10px 30px',
        borderRadius: '20px',
        transform: 'rotate(-3deg)',
        marginBottom: '30px',
      }}>
        ДЕНЬ СУРКА: AI ВЕРСИЯ
      </div>

      <div style={{
        color: COLORS.accentYellow,
        fontSize: 90,
        fontWeight: 900,
        textTransform: 'uppercase',
        lineHeight: 1.1,
        letterSpacing: '2px',
        textShadow: '0 10px 40px ' + COLORS.neonGlow,
        margin: 0,
        textAlign: 'center',
        transform: 'translateX(' + currentShakeX + 'px)',
      }}>
        ПЕРЕПИСАЛ ПРОМПТ<br />
        {counter} РАЗА
      </div>
    </div>
  );
};

const TaskCards: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{
      position: 'absolute',
      top: 750,
      left: '50%',
      marginLeft: -450,
      width: 900,
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      zIndex: 3,
    }}>
      {TASKS.map((task, index) => {
        const startFrame = 30 + index * 20;
        const endFrame = startFrame + 25;

        const slideX = interpolate(frame, [startFrame, endFrame], [200, 0], {
          easing: EASINGS.overshoot,
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const opacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const scale = interpolate(frame, [startFrame, endFrame], [0.8, 1], {
          easing: EASINGS.bounce,
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div
            key={index}
            style={{
              background: COLORS.glassBg,
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              borderRadius: 30,
              border: '3px solid ' + COLORS.glassBorder,
              boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px ' + COLORS.neonGlow,
              padding: '40px 50px',
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
              opacity: opacity,
              transform: 'translateX(' + slideX + 'px) scale(' + scale + ')',
            }}
          >
            <div style={{
              fontSize: 80,
              lineHeight: 1,
              filter: 'drop-shadow(0 0 20px ' + COLORS.accentYellow + ')',
            }}>
              {task.icon}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{
                color: COLORS.textWhite,
                fontSize: 46,
                fontWeight: 700,
                letterSpacing: '1px',
                margin: 0,
              }}>
                {task.title}
              </div>
              <div style={{
                color: COLORS.textGray,
                fontSize: 32,
                fontWeight: 500,
                fontFamily: 'monospace',
                margin: 0,
              }}>
                {task.sub}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// =============================================================================
// MAIN COMPOSITION
// =============================================================================
const GroundhogDayAi: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Background />
      <HeaderTitles />
      <TaskCards />
    </AbsoluteFill>
  );
};

export default GroundhogDayAi;
