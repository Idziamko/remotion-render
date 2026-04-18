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
  id: 'AiCheatCodeGems',
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
  successGreen: '#22C55E',
} as const;

const EASINGS = {
  overshoot: Easing.bezier(0.34, 1.56, 0.64, 1),
};

const CHECKLIST = [
  { icon: '⚙️', text: 'НАСТРОИЛ 1 РАЗ' },
  { icon: '💾', text: 'СОХРАНИЛ В GEMS' },
  { icon: '🍹', text: 'ВООБЩЕ ЗАБЫЛ' },
];

// =============================================================================
// COMPONENTS
// =============================================================================

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const panY = (frame * 4) % 100;

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

const FunnyHeader: React.FC = () => {
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

  return (
    <div style={{
      position: 'absolute',
      top: 150, 
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
        fontSize: 36, 
        fontWeight: 800,
        letterSpacing: '4px',
        textTransform: 'uppercase',
        opacity: 0.9,
        margin: 0,
        background: COLORS.errorRed,
        padding: '10px 30px',
        borderRadius: '20px',
        transform: 'rotate(-2deg)',
        marginBottom: '20px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
      }}>
        ЛЕГАЛЬНЫЙ ЧИТ-КОД
      </div>
      
      <div style={{
        color: COLORS.accentYellow,
        fontSize: 85, 
        fontWeight: 900,
        textTransform: 'uppercase',
        lineHeight: 1.1,
        letterSpacing: '2px',
        textShadow: '0 10px 40px ' + COLORS.neonGlow,
        margin: 0,
        textAlign: 'center',
      }}>
        СИСТЕМА ПРОТИВ<br />РУТИНЫ
      </div>
    </div>
  );
};

const Checklist: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{
      position: 'absolute',
      top: 550, 
      left: '50%',
      marginLeft: -450,
      width: 900,
      display: 'flex',
      flexDirection: 'column',
      gap: '35px',
      zIndex: 3,
    }}>
      {CHECKLIST.map((item, index) => {
        // Стартуем карточки с 15-го кадра, так как летящих слов больше нет
        const startFrame = 15 + index * 20; 
        
        const relFrame = frame - startFrame;
        // Возвращаем старую добрую логику, которая у тебя работала!
        if (relFrame < 0) return null;

        // Card Slide In
        const slideX = interpolate(relFrame, [0, 15], [300, 0], {
          easing: EASINGS.overshoot,
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        
        const opacity = interpolate(relFrame, [0, 10], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        // Checkbox "Pop" animation
        const checkScale = interpolate(relFrame, [10, 20], [0, 1], {
          easing: EASINGS.overshoot,
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
              padding: '30px 40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: opacity,
              transform: 'translateX(' + slideX + 'px)',
            }}
          >
            {/* Left Side: Icon & Text */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
              <div style={{
                fontSize: 65,
                lineHeight: 1,
                filter: 'drop-shadow(0 0 15px ' + COLORS.accentYellow + ')',
              }}>
                {item.icon}
              </div>
              <div style={{
                color: COLORS.textWhite,
                fontSize: 48,
                fontWeight: 800,
                letterSpacing: '1px',
                margin: 0,
                textTransform: 'uppercase',
              }}>
                {item.text}
              </div>
            </div>

            {/* Right Side: Animated Checkbox */}
            <div style={{
              width: 80,
              height: 80,
              border: '4px solid ' + COLORS.glassBorder,
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.3)',
              boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)',
            }}>
               <div style={{
                 fontSize: 60,
                 transform: 'scale(' + checkScale + ')',
                 filter: 'drop-shadow(0 0 15px ' + COLORS.successGreen + ')',
               }}>
                 ✅
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
const AiCheatCodeGems: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Background />
      <FunnyHeader />
      <Checklist />
    </AbsoluteFill>
  );
};

export default AiCheatCodeGems;
