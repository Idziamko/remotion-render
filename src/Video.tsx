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
  id: 'PsychoCyberneticsGraphics',
  durationInSeconds: 188, // 3 минуты 8 секунд
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// STYLE CONSTANTS (Glassmorphism + Cyberpunk hints)
// =============================================================================
const COLORS = {
  primary: 'rgba(255, 255, 255, 0.1)', // Glass card
  secondary: 'rgba(168, 85, 247, 0.8)', // Purple glow
  accent: '#06B6D4', // Cyan text
  background: 'transparent', // Transparent to overlay on real video
  text: '#FFFFFF',
} as const;

const TYPOGRAPHY = {
  fontFamily: 'Inter, system-ui, sans-serif',
} as const;

const EASINGS = {
  easeOut: Easing.bezier(0.33, 1, 0.68, 1),
  easeIn: Easing.bezier(0.32, 0, 0.67, 0),
};

// =============================================================================
// ANIMATED CARD COMPONENT
// =============================================================================
interface CardProps {
  title: string;
  subtitle: string;
  description: string;
  delay: number;
}

const GlassCard: React.FC<CardProps> = ({ title, subtitle, description, delay }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Animations
  const fadeIn = interpolate(frame, [delay, delay + 15], [0, 1], {
    easing: EASINGS.easeOut,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const slideUp = interpolate(frame, [delay, delay + 20], [50, 0], {
    easing: EASINGS.easeOut,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    {
      easing: EASINGS.easeIn,
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <div
      style={{
        position: 'absolute',
        top: '15%', // Upper part of screen
        left: '50%',
        transform: `translate(-50%, ${slideUp}px)`,
        width: '85%',
        padding: '60px',
        borderRadius: '32px',
        backgroundColor: COLORS.primary,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.3), 0 0 40px ${COLORS.secondary}`,
        opacity,
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        fontFamily: TYPOGRAPHY.fontFamily,
        color: COLORS.text,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: '48px',
          fontWeight: 700,
          color: COLORS.accent,
          textTransform: 'uppercase',
          letterSpacing: '2px',
        }}
      >
        {title}
      </h2>
      <h1
        style={{
          margin: 0,
          fontSize: '72px',
          fontWeight: 900,
          lineHeight: '1.1',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)',
        }}
      >
        {subtitle}
      </h1>
      <p
        style={{
          margin: 0,
          fontSize: '36px',
          fontWeight: 400,
          lineHeight: '1.4',
          color: 'rgba(255, 255, 255, 0.85)',
        }}
      >
        {description}
      </p>
    </div>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
const PsychoCyberneticsGraphics: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      
      {/* 0:00 - 0:12 | HOOK */}
      <Sequence from={0} durationInFrames={12 * fps}>
        <GlassCard 
          title="Психокибернетика"
          subtitle="Марафоны желаний — чушь"
          description="Ты притягиваешь не то, чего хочешь, а то, кем ты являешься. 5 жестких уроков."
          delay={10}
        />
      </Sequence>

      {/* 0:12 - 0:30 | CONTEXT */}
      <Sequence from={12 * fps} durationInFrames={18 * fps}>
        <GlassCard 
          title="История создания"
          subtitle="Максвелл Мальц"
          description="Пластический хирург понял: новое лицо не делает счастливым, если внутренний образ остался старым."
          delay={5}
        />
      </Sequence>

      {/* 0:30 - 0:59 | LESSON 1 */}
      <Sequence from={30 * fps} durationInFrames={29 * fps}>
        <GlassCard 
          title="Урок 1"
          subtitle="Отражение Self-Image"
          description="Нервная система автоматически ведет тебя к тому, кем ты себя считаешь внутри."
          delay={5}
        />
      </Sequence>

      {/* 1:00 - 1:26 | LESSON 2 */}
      <Sequence from={59 * fps} durationInFrames={27 * fps}>
        <GlassCard 
          title="Урок 2"
          subtitle="Хватит пытаться"
          description="Чрезмерное усилие включает сопротивление мозга. Расслабься и воплощай энергию будущего «я»."
          delay={5}
        />
      </Sequence>

      {/* 1:27 - 1:44 | LESSON 3 */}
      <Sequence from={86 * fps} durationInFrames={18 * fps}>
        <GlassCard 
          title="Урок 3"
          subtitle="Подсознание — сервомеханизм"
          description="Слепо ведет к цели. Если установка «я недостоин» — ты сам сольешь все свои шансы."
          delay={5}
        />
      </Sequence>

      {/* 1:45 - 1:56 | LESSON 4 */}
      <Sequence from={104 * fps} durationInFrames={12 * fps}>
        <GlassCard 
          title="Урок 4"
          subtitle="Кинотеатр воображения"
          description="Мозг не видит разницы между реальностью и ярким воображением. 30 минут в день проживай себя новым."
          delay={5}
        />
      </Sequence>

      {/* 1:57 - 3:08 | LESSON 5 & OUTRO */}
      <Sequence from={116 * fps} durationInFrames={72 * fps}>
        <GlassCard 
          title="Урок 5"
          subtitle="Правило 21 дня"
          description="Действуй так, будто желаемое уже есть. Перейми темп и спокойствие. А для ускорения — смени окружение."
          delay={5}
        />
      </Sequence>

    </AbsoluteFill>
  );
};

export default PsychoCyberneticsGraphics;
