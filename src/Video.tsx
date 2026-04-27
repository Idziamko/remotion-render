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
// CONFIGURATION
// =============================================================================
export const compositionConfig = {
  id: 'BridgeToCeltaPro',
  durationInSeconds: 50,
  fps: 30,
  width: 1080,
  height: 1920,
};

const COLORS = {
  bg: '#050510',
  primary: '#3B44B5', // Knowledge Blue
  accentYellow: '#F4CF80',
  accentOrange: '#F4AB63',
  accentGreen: '#B7DB6E',
  accentPink: '#E070A2',
  textWhite: '#FFFFFF',
};

const EASINGS = {
  out: Easing.bezier(0.33, 1, 0.68, 1),
  overshoot: Easing.bezier(0.34, 1.56, 0.64, 1),
  slam: Easing.bezier(0.1, 1, 0.3, 1),
};

// =============================================================================
// ICONS (Hand-drawn SVG Paths)
// =============================================================================
const ICONS = {
  clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  globe: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z M3.6 9h16.8 M3.6 15h16.8 M12 3a15 15 0 000 18",
  book: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  message: "M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
};

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

const IconBox: React.FC<{ path: string; color: string; delay: number }> = ({ path, color, delay }) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame - delay, [0, 15], [0, 1], { easing: EASINGS.overshoot, extrapolateLeft: 'clamp' });
  
  return (
    <div style={{ transform: `scale(${progress})`, opacity: progress, marginBottom: 20 }}>
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={path} />
      </svg>
    </div>
  );
};

const FloatingParticle: React.FC<{ seed: number }> = ({ seed }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const x = (seed * 12345) % width;
  const startY = (seed * 67890) % height;
  const y = startY - (frame * (1 + seed));
  const opacity = interpolate(y, [0, 200], [0, 0.3], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 4,
      height: 4,
      backgroundColor: COLORS.textWhite,
      borderRadius: '50%',
      opacity,
    }} />
  );
};

// =============================================================================
// SCENES
// =============================================================================

const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const spring = interpolate(frame, [0, 20], [0, 1], { easing: EASINGS.overshoot, extrapolateLeft: 'clamp' });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 60 }}>
      <div style={{ transform: `scale(${spring})`, textAlign: 'center' }}>
        <h1 style={{ fontSize: 120, color: COLORS.accentOrange, margin: 0, fontWeight: 900 }}>BRIDGE TO CELTA</h1>
        <div style={{ height: 10, width: 400, backgroundColor: COLORS.accentOrange, margin: '20px auto', borderRadius: 5 }} />
        <div style={{ display: 'flex', gap: 40, marginTop: 40 }}>
          <div>
            <IconBox path={ICONS.calendar} color={COLORS.accentPink} delay={10} />
            <h2 style={{ fontSize: 60, color: COLORS.textWhite, margin: 0 }}>8 ДНІВ</h2>
          </div>
          <div>
            <IconBox path={ICONS.clock} color={COLORS.accentCyan || '#00E5FF'} delay={20} />
            <h2 style={{ fontSize: 60, color: COLORS.textWhite, margin: 0 }}>48 ГОДИН</h2>
          </div>
        </div>
        <p style={{ fontSize: 45, color: COLORS.textWhite, marginTop: 60, lineHeight: 1.4 }}>
          Практика, яка реально <br/> <span style={{ color: COLORS.accentYellow }}>тримає клас</span>
        </p>
      </div>
    </AbsoluteFill>
  );
};

const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const slide = interpolate(frame, [0, 15], [100, 0], { easing: EASINGS.out, extrapolateLeft: 'clamp' });
  
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 80 }}>
      <div style={{ transform: `translateY(${slide}px)`, textAlign: 'center' }}>
        <IconBox path={ICONS.book} color={COLORS.accentGreen} delay={5} />
        <h2 style={{ fontSize: 80, color: COLORS.textWhite, marginBottom: 40 }}>ВІД СТРУКТУРИ ДО ФІДБЕКУ</h2>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: 40, borderRadius: 30, border: `2px solid ${COLORS.accentGreen}` }}>
          <p style={{ fontSize: 50, color: COLORS.textWhite, margin: 0 }}>
            Це не теорія з підручника, <br/>
            а <strong>реальні інструменти</strong>
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const progress = interpolate(frame, [0, 100], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', padding: 60 }}>
      <IconBox path={ICONS.globe} color={COLORS.accentYellow} delay={0} />
      <h1 style={{ fontSize: 90, color: COLORS.textWhite, textAlign: 'center', marginBottom: 20 }}>International House</h1>
      <p style={{ fontSize: 50, color: COLORS.accentYellow }}>70 РОКІВ ДОСВІДУ</p>
      
      <div style={{ marginTop: 60, textAlign: 'center' }}>
        <div style={{ fontSize: 120, fontWeight: 900, color: COLORS.textWhite }}>
          {Math.round(progress * 1000)}+
        </div>
        <p style={{ fontSize: 40, color: COLORS.textMuted || '#999' }}>Випускників в Україні</p>
      </div>
    </AbsoluteFill>
  );
};

const SceneFinal: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame / 5) * 0.05 + 1;

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary }}>
      <div style={{ transform: `scale(${pulse})`, textAlign: 'center' }}>
        <h2 style={{ fontSize: 60, color: COLORS.textWhite }}>СТАРТ КУРСУ:</h2>
        <h1 style={{ fontSize: 150, color: COLORS.accentYellow, margin: '20px 0' }}>1 ЧЕРВНЯ</h1>
        
        <div style={{ marginTop: 80, padding: '30px 60px', backgroundColor: COLORS.textWhite, borderRadius: 100 }}>
          <span style={{ fontSize: 60, color: COLORS.primary, fontWeight: 900 }}>ПИШИ "BRIDGE"</span>
        </div>
        
        <div style={{ marginTop: 40 }}>
           <IconBox path={ICONS.message} color={COLORS.textWhite} delay={10} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =============================================================================
// MAIN ENTRY
// =============================================================================

const BridgeToCeltaPro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: 'system-ui, sans-serif' }}>
      {/* Background Particles */}
      {[...Array(30)].map((_, i) => <FloatingParticle key={i} seed={i} />)}

      <Sequence from={0} durationInFrames={300}>
        <Scene1 />
      </Sequence>

      <Sequence from={300} durationInFrames={300}>
        <Scene2 />
      </Sequence>

      <Sequence from={600} durationInFrames={400}>
        <Scene3 />
      </Sequence>

      <Sequence from={1000} durationInFrames={500}>
        <SceneFinal />
      </Sequence>
    </AbsoluteFill>
  );
};

export default BridgeToCeltaPro;
