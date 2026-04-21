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
  id: 'KineticSecret',
  durationInSeconds: 5,
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// STYLES & THEME (Brand Palette)
// =============================================================================
const COLORS = {
  bgCenter: '#1F2466', 
  bgEdge: '#0B0C24',   
  grid: 'rgba(255, 255, 255, 0.04)',
  
  accentYellow: '#F4CF80', 
  accentOrange: '#F4AB63', 
  accentGreen: '#B7DB6E',  
  accentPink: '#E070A2',   
  
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
// KINETIC DATA (Safe RGBA shadows)
// =============================================================================
// Audio: "The secret is to stop teaching and start guiding."
const WORDS = [
  // Scene 1: "The secret is" (Frames 0-30)
  { t: "The", f: 0, dur: 28, s: 80, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -140, y: -100, rot: -5, anim: 'pop' },
  { t: "SECRET", f: 5, dur: 23, s: 150, c: COLORS.accentPink, glow: 'rgba(224, 112, 162, 0.4)', x: 0, y: -10, rot: 2, anim: 'scaleUp' },
  { t: "is", f: 12, dur: 16, s: 70, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.05)', x: 120, y: 80, rot: 5, anim: 'slideUp' },

  // Scene 2: "to stop TEACHING" (Frames 30-65)
  { t: "to", f: 30, dur: 25, s: 80, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -140, y: -60, rot: -3, anim: 'slideRight' },
  { t: "stop", f: 35, dur: 20, s: 100, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.05)', x: -40, y: -30, rot: -2, anim: 'pop' },
  { t: "TEACHING", f: 42, dur: 25, s: 160, c: COLORS.accentOrange, glow: 'rgba(244, 171, 99, 0.4)', x: 0, y: 40, rot: 3, anim: 'slam' },

  // Scene 3: "and start GUIDING" (Frames 65-120)
  { t: "and", f: 67, dur: 30, s: 80, c: COLORS.textMuted, glow: 'rgba(255,255,255,0.05)', x: -120, y: -100, rot: -4, anim: 'pop' },
  { t: "start", f: 72, dur: 25, s: 100, c: COLORS.textWhite, glow: 'rgba(255,255,255,0.05)', x: 0, y: -60, rot: 0, anim: 'slideDown' },
  { t: "GUIDING", f: 80, dur: 45, s: 170, c: COLORS.accentGreen, glow: 'rgba(183, 219, 110, 0.4)', x: 0, y: 30, rot: -2, anim: 'overshoot' },
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

  // Dynamic Camera Shakes on heavy words ("TEACHING" and "GUIDING")
  let shakeX = 0;
  if (frame >= 42 && frame <= 48) {
    shakeX = interpolate(frame, [42, 43, 45, 48], [0, -12, 12, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  } else if (frame >= 80 && frame <= 88) {
    shakeX = interpolate(frame, [80, 82, 84, 86, 88], [0, -18, 18, -10, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  }

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
const KineticSecret: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000', fontFamily: 'Aptos, Open Sans, system-ui, sans-serif' }}>
      <Background />
      <MainScene />
    </AbsoluteFill>
  );
};

export default KineticSecret;
