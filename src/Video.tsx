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
  id: 'KineticAudioSync',
  durationInSeconds: 5,
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// STYLES & THEME (Based on Brand Palette)
// =============================================================================
const COLORS = {
  // Darkened version of Knowledge Blue (#3B44B5) for the background
  bgCenter: '#1F2466', 
  bgEdge: '#0B0C24',   
  grid: 'rgba(255, 255, 255, 0.04)',
  
  // Brand Palette Accents
  accentYellow: '#F4CF80', // Joy Yellow
  accentOrange: '#F4AB63', // Light Orange
  accentGreen: '#B7DB6E',  // Youth Green
  accentPink: '#E070A2',   // Pink
  
  textWhite: '#FFFFFF',
  textMuted: '#9EA6EB',    // Soft tinted blue for unaccented words
} as const;

const EASINGS = {
  easeOut: Easing.bezier(0.33, 1, 0.68, 1),
  easeIn: Easing.bezier(0.32, 0, 0.67, 0),
  overshoot: Easing.bezier(0.34, 1.56, 0.64, 1),
  slam: Easing.bezier(0.1, 1, 0.3, 1),
};

// =============================================================================
// KINETIC DATA (with explicitly safe RGBA shadows)
// =============================================================================
const WORDS = [
  // Scene 1: "Do you ever feel" (Frames 0-30)
  { t: "Do", f: 0, dur: 30, s: 80, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -160, y: -120, rot: -4, anim: 'pop' },
  { t: "you", f: 5, dur: 25, s: 80, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.05)', x: 120, y: -90, rot: 4, anim: 'pop' },
  { t: "ever", f: 10, dur: 20, s: 130, c: COLORS.accentPink, glow: 'rgba(224, 112, 162, 0.4)', x: 0, y: -10, rot: 0, anim: 'scaleUp' },
  { t: "feel", f: 15, dur: 15, s: 110, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.05)', x: 0, y: 100, rot: 2, anim: 'slideUp' },

  // Scene 2: "like you're" (Frames 30-43)
  { t: "like", f: 30, dur: 13, s: 90, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -120, y: -20, rot: -6, anim: 'slideRight' },
  { t: "you're", f: 35, dur: 8, s: 100, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.05)', x: 100, y: 20, rot: 6, anim: 'slideLeft' },

  // Scene 3: "WORKING HARDER" (Frames 43-70)
  { t: "WORKING", f: 43, dur: 27, s: 150, c: COLORS.accentOrange, glow: 'rgba(244, 171, 99, 0.4)', x: 0, y: -50, rot: -3, anim: 'slam' },
  { t: "HARDER", f: 53, dur: 17, s: 190, c: COLORS.accentYellow, glow: 'rgba(244, 207, 128, 0.4)', x: 0, y: 40, rot: 4, anim: 'slam' },

  // Scene 4: "than your students" (Frames 70-104)
  { t: "than", f: 70, dur: 34, s: 70, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -150, y: -130, rot: -5, anim: 'pop' },
  { t: "your", f: 76, dur: 28, s: 70, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.05)', x: 0, y: -110, rot: 0, anim: 'pop' },
  { t: "STUDENTS", f: 82, dur: 22, s: 160, c: COLORS.accentGreen, glow: 'rgba(183, 219, 110, 0.4)', x: 0, y: 10, rot: -2, anim: 'overshoot' },

  // Scene 5: "in class?" (Frames 104-150)
  { t: "in", f: 104, dur: 46, s: 80, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: 0, y: -120, rot: 0, anim: 'slideDown' },
  { t: "CLASS?", f: 110, dur: 40, s: 180, c: COLORS.accentYellow, glow: 'rgba(244, 207, 128, 0.4)', x: 0, y: 20, rot: 0, anim: 'pop' },
];

// =============================================================================
// COMPONENTS
// =============================================================================

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const panY = (frame * 2) % 120;

  return (
    <AbsoluteFill
      style={{
        background: 'radial-gradient(circle at 50% 50%, ' + COLORS.bgCenter + ' 0%, ' + COLORS.bgEdge + ' 100%)',
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

const KineticWord: React.FC<{ word: typeof WORDS[0] }> = ({ word }) => {
  const frame = useCurrentFrame();
  const relFrame = frame - word.f;
  
  // Opacity handling
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

  // Entrance animations
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

  // Blurs
  const enterBlur = interpolate(relFrame, [0, 6], [15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  
  // Exit animations
  const exitProgress = interpolate(relFrame, [word.dur - 5, word.dur], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const finalScale = baseScale * interpolate(exitProgress, [0, 1], [1, 0.8]);
  const finalY = curY + interpolate(exitProgress, [0, 1], [0, 40]);
  const exitBlur = interpolate(exitProgress, [0, 1], [0, 15]);

  return (
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%) translate(' + curX + 'px, ' + finalY + 'px) rotate(' + word.rot + 'deg) scale(' + finalScale + ')',
      opacity: currentOpacity,
      color: word.c,
      fontSize: word.s,
      fontWeight: 900,
      letterSpacing: '-2px',
      textTransform: 'uppercase',
      filter: 'blur(' + (enterBlur + exitBlur) + 'px) drop-shadow(0 10px 30px ' + word.glow + ')',
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

  // Dynamic Camera Shakes on heavy words
  let shakeX = 0;
  if (frame >= 43 && frame <= 48) {
    shakeX = interpolate(frame, [43, 44, 46, 48], [0, -8, 8, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (frame >= 53 && frame <= 60) {
    shakeX = interpolate(frame, [53, 54, 56, 58, 60], [0, -20, 20, -10, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  }

  // Slow continuous zoom
  const cameraScale = interpolate(frame, [0, 150], [1, 1.08], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      transform: 'scale(' + cameraScale + ') translateX(' + shakeX + 'px)',
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
const KineticAudioSync: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000', fontFamily: 'Aptos, Open Sans, system-ui, sans-serif' }}>
      <Background />
      <MainScene />
    </AbsoluteFill>
  );
};

export default KineticAudioSync;
