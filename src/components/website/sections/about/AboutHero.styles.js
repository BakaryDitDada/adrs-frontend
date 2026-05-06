import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

/* ================= ANIMATIONS ================= */

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
`;
 
const glitch = keyframes`
  0% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 2px); }
  5% { clip-path: inset(92% 0 1% 0); transform: translate(2px, -2px); }
  10% { clip-path: inset(43% 0 1% 0); transform: translate(-2px, 2px); }
  15% { clip-path: inset(25% 0 58% 0); transform: translate(2px, -2px); }
  20% { clip-path: inset(54% 0 7% 0); transform: translate(-2px, 2px); }
  45% { clip-path: inset(58% 0 43% 0); transform: translate(2px, -2px); }
  50% { clip-path: inset(98% 0 1% 0); transform: translate(-2px, 2px); }
  55% { clip-path: inset(67% 0 30% 0); transform: translate(2px, -2px); }
  60% { clip-path: inset(84% 0 6% 0); transform: translate(-2px, 2px); }
  65% { clip-path: inset(63% 0 20% 0); transform: translate(2px, -2px); }
  70% { clip-path: inset(76% 0 8% 0); transform: translate(-2px, 2px); }
  75% { clip-path: inset(86% 0 5% 0); transform: translate(2px, -2px); }
  80% { clip-path: inset(59% 0 28% 0); transform: translate(-2px, 2px); }
  85% { clip-path: inset(95% 0 3% 0); transform: translate(2px, -2px); }
  90% { clip-path: inset(71% 0 19% 0); transform: translate(-2px, 2px); }
  95% { clip-path: inset(88% 0 6% 0); transform: translate(2px, -2px); }
  100% { clip-path: inset(100% 0 0 0); transform: translate(0); }
`;

/* ================= LAYOUT ================= */

export const HeroContainer = styled.section`
  position: relative;
  // min-height: 100vh;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primaryDark} 25%,
    ${({ theme }) => theme.colors.background.primary} 70%,
    ${({ theme }) => theme.colors.background.secondary} 100%
  );
  overflow: hidden;
  padding: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.08) 0%, transparent 50%);
    z-index: 0;
  }
`;

export const BackgroundElements = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
`;

export const FloatingShape = styled(motion.div)`
  position: absolute;
  border-radius: ${({ $shape }) => $shape === 'circle' ? '50%' : '0'};
  background: ${({ color }) => color};
  opacity: 0.1;
  filter: blur(40px);
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  animation: ${float} ${({ duration }) => duration}s ease-in-out infinite;
`;

export const GridPattern = styled.div`
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(circle at center, black 30%, transparent 70%);
  -webkit-mask-image: radial-gradient(circle at center, black 30%, transparent 70%);
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 140rem;
  margin: 0 auto;
  padding: 4rem 2rem;
  width: 100%;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 4rem 4rem;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1.2fr 0.8fr;
    gap: 6rem;
    align-items: center;
  }
`;

/* ================= TEXT ================= */

export const TextContent = styled.div`
  position: relative;
`;

export const GlitchText = styled(motion.div)`
  position: relative;
  margin-bottom: 2rem;
  
  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip-path: inset(0 0 0 0);
  }
  
  &::before {
    animation: ${glitch} 5s infinite linear alternate-reverse;
    color: ${({ theme }) => theme.colors.secondary};
    // color: ${({ theme }) => theme.colors.neutral.gray200};
    z-index: -1;
  }
  
  &::after {
    animation: ${glitch} 3s infinite linear alternate-reverse;
    color: ${({ theme }) => theme.colors.accent};
    z-index: -2;
  }
`;

export const MainTitle = styled(motion.h1)`
  // font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-size: ${({ theme }) => theme.fontSizes.h1};
  font-weight: 900;
  color: ${({ theme }) => theme.colors.neutral.gray100};
  margin-bottom: 1.5rem;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  
  .gradient-text {
    // background: linear-gradient(90deg, #1d4483, #7352bd, #8cd1b8);
    background: linear-gradient(90deg, #03911b, #cdd009, #bd0808);
    
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    display: inline-block;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 100%;
      height: 4px;
      background: linear-gradient(
        90deg,
        ${({ theme }) => theme.colors.primary},
        ${({ theme }) => theme.colors.secondary},
        ${({ theme }) => theme.colors.accent}
      );
      border-radius: 2px;
      transform: scaleX(0);
      transform-origin: left;
      animation: scaleIn 1s ease-out 0.5s forwards;
    }
  }
  
  @keyframes scaleIn {
    to {
      transform: scaleX(1);
    }
  }
`;

export const Subtitle = styled(motion.p)`
  // font-size: clamp(1.1rem, 2vw, 1.4rem);
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.neutral.gray100}; 
  margin-bottom: 3rem;
  line-height: 1.8;
  max-width: 65rem;
  font-weight: 400;
`;

/* ================= STATS ================= */

export const InteractiveStats = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 3rem;
`;

export const StatCircle = styled(motion.div)`
  width: 12rem;
  height: 12rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 30px rgba(37, 99, 235, 0.3);
    
    .stat-ring {
      stroke-dashoffset: 0;
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: conic-gradient(
      from 0deg,  #03911b, #e1e403, #bd0808
      // ${({ theme }) => theme.colors.primary},
      // ${({ theme }) => theme.colors.secondary},
      // ${({ theme }) => theme.colors.accent}
      // ${({ theme }) => theme.colors.primary}
    );
    border-radius: 50%;
    z-index: -1;
    animation: rotate 4s linear infinite;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

export const StatRing = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  circle {
    fill: none;
    stroke: ${({ theme }) => theme.colors.primary};
    stroke-width: 2;
    stroke-dasharray: 314;
    stroke-dashoffset: 314;
    transition: stroke-dashoffset 2s ease-out;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
`;

export const StatValue = styled.div`
  font-size: 2.2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.neutral.gray100};
  // color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.25rem;
  
  .plus {
    font-size: 2rem;
    // color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.neutral.gray100};
    font-weight: 600;
  }
`;

export const StatLabel = styled.div`
  font-size:${({ theme }) => theme.fontSizes.caption};
  // font-size: 0.9rem;
  // color: ${({ theme }) => theme.colors.text.secondary};
  color: ${({ theme }) => theme.colors.neutral.black};
  font-weight: 600;
  text-align: center;
  max-width: 100px;
`;

/* ================= BUTTONS ================= */

export const CTAButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const PrimaryButton = styled(motion.a)`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.neutral.white};
  border: 3px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.full};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.body};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
    
    &::after {
      transform: translateX(100%);
    }
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: transform 0.6s ease;
  }
`;

export const SecondaryButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: transparent;
  color: ${({ theme }) => theme.colors.neutral.white};
  border: 3px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.full};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.body};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondaryDark};
    border-color: ${({ theme }) => theme.colors.secondaryDark};
    color: ${({ theme }) => theme.colors.secondaryDark};
    font-weight: 700;
    transform: translateY(-2px);
  }
`;

/* ================= CARD ================= */

export const VisualContent = styled.div`
  position: relative;
`; 

export const AnimatedCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 1.8rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary},
      ${({ theme }) => theme.colors.accent}
    );
  }
`;

export const FloatingBadge = styled(motion.div)`
  position: absolute;
  top: -10px;
  right: 0px;
  padding: 1.2rem 1.2rem .6rem .6rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.accent},
    ${({ theme }) => theme.colors.success}
  );
  color: white;
  // border-radius: 20px;
  border-radius: 20px 20px 0px 20px;
  font-weight: 600;
  // font-size: 0.9rem;
  font-size: ${({ theme }) => theme.fontSizes.caption};
  box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;
 
export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const LogoIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.secondary}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    color: white;
    width: 32px;
    height: 32px;
  }
`;

export const LogoText = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.text.primary};
    // font-size: 1.5rem;
    font-size: ${({ theme }) => theme.fontSizes.h3};
    font-weight: 700;
    margin-bottom: 0.25rem;
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.fontSizes.body};
  }
`;

export const CardStats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const StatItem = styled(motion.div)`
  text-align: center;
  padding: .8rem;
  background: ${({ $currentTheme }) => $currentTheme === "light" ? "rgba(191, 189, 189, 0.35)" : "rgba(255, 255, 255, 0.11)"};
  border: ${({ $currentTheme }) => $currentTheme === "light" ? "rgba(230, 229, 229, 0.1)" : "rgba(255, 255, 255, 0.05)"};
  border-radius: 12px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: ${({ theme }) => theme.colors.primary}40;
  }
  
  .number {
    font-size: ${({ theme }) => theme.fontSizes.bodyLg};
    font-weight: 800;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 0.25rem;
  }
  
  .label {
    font-size: ${({ theme }) => theme.fontSizes.caption};
    // color: ${({ theme }) => theme.colors.neutral.gray100};
    color: ${({ theme }) => theme.colors.text.secondary};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;

/* ================= ABOUT INFO ================= */
export const AboutInfoWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const AboutInfoLine = styled.div`
  flex: 1; 
  height: 1px;
  background: ${({ $currentTheme }) => $currentTheme === "light" ? "rgba(183, 181, 181, 0.62)" : "rgba(255, 255, 255, 0.11)"}; // rgba(255, 255, 255, 0.1)
`;

export const AboutInfoTitle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.bodyLg};
  color: ${({ theme, $currentTheme }) => $currentTheme === "light" ? theme.colors.neutral.black :  theme.colors.text.secondary};
  white-space: nowrap;
`;

export const AboutInfoDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme, $currentTheme }) => $currentTheme === "light" ? theme.colors.neutral.black :  theme.colors.text.secondary};
  line-height: 1.6;
  text-align: justify;
`;


/* ================= VIDEO ================= */

export const VideoPreview = styled(motion.div)`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 18rem;
  background: linear-gradient(
    45deg,
    ${({ theme }) => theme.colors.primary}20,
    ${({ theme }) => theme.colors.secondary}20
  );
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 2rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      rgba(37, 99, 235, 0.3),
      rgba(124, 58, 237, 0.3)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

export const PlayButton = styled(motion.button)`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  background: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
    width: 24px;
    height: 24px;
    margin-left: 4px;
  }
`;

export const SoundControl = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  
  svg {
    color: white;
    width: 20px;
    height: 20px;
  }
`;

export const ExpandButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 3;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.75);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 20px rgba(37, 99, 235, 0.25);
  }

  svg {
    color: white;
    width: 20px;
    height: 20px;
  }
`;

