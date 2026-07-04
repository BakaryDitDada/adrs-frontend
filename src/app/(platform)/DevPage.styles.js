import styled, { keyframes } from "styled-components";
import Link from "next/link";

// ==========================================
// ANIMATIONS
// ==========================================
const pulseGlow = keyframes`
  0%, 100% { 
    filter: drop-shadow(0 0 12px rgba(96, 165, 250, 0.4)) drop-shadow(0 0 30px rgba(37, 99, 235, 0.2)); 
    opacity: 0.9;
  }
  50% { 
    filter: drop-shadow(0 0 20px rgba(96, 165, 250, 0.6)) drop-shadow(0 0 40px rgba(37, 99, 235, 0.4)); 
    opacity: 1;
  }
`;

// Upgraded to a multi-directional slow drifting movement (simulating dark liquid/space drift)
const dynamicDrift = keyframes`
  0%, 100% { transform: translateY(0px) translateX(0px); }
  33% { transform: translateY(-6px) translateX(4px); }
  66% { transform: translateY(4px) translateX(-4px); }
`;

// ==========================================
// STYLED COMPONENTS
// ==========================================
export const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 11rem);
  min-height: 500px;
  // background-color: #060b16; /* Re-enabled base background color containment */
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  overflow: hidden;
  font-family: system-ui, -apple-system, sans-serif;
`;

// The Technical Grid Backdrop (Optimized Layering & Dissolve Effects)
export const WireframeWaves = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  user-select: none;
  
  /* CRITICAL: Drop z-index to 1 to sit completely beneath all content */
  z-index: 1; 
  
  /* Natural drifting animation that preserves structural line-geometry */
  animation: ${dynamicDrift} 12s ease-in-out infinite;
  
  /* 
    ENTERPRISE MASKING: Fades the grid out toward the top and center 
    so it never competes with the text elements.
  */
  mask-image: radial-gradient(circle at 50% 50%, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 80%);
  -webkit-mask-image: radial-gradient(circle at 50% 50%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.9) 80%);
`;

export const GlowHalo = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 700px;
  aspect-ratio: 1 / 1;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(7, 13, 25, 0) 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 2; /* Sandwiched between grid lines and content layout */
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 10; /* Clean separation context above background elements */
  width: 100%;
  // max-width: 48rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const PremiumIconContainer = styled.div`
  margin-bottom: 2rem;
  color: #60a5fa;
  animation: ${pulseGlow} 5s ease-in-out infinite;

  svg {
    width: 6rem;
    height: 6rem;
    @media (min-width: 768px) {
      width: 7.5rem;
      height: 7.5rem;
    }
  }
`;

export const MainTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.h1 || '2.25rem'};
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  user-select: none;
  margin: 0;
  background: linear-gradient(to bottom, #7dd3fc 20%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 4px 20px rgba(37, 99, 235, 0.25));

  @media (min-width: 768px) {
    font-size: ${({ theme }) => theme.fontSizes.h1 || '4.2rem'};
  }
`;

export const SubTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.h2 || '1.5rem'};
  font-weight: 700;
  margin-top: 1rem;
  color: #f8fafc;
  letter-spacing: 0.02em;

  @media (min-width: 768px) {
    // font-size: 1.5rem;
  }
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.body || '1.125rem'};
  color: #94a3b8;
  max-width: 40rem;
  margin-top: 1rem;
  line-height: 1.7;

  @media (min-width: 768px) {
    // font-size: 1rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2.5rem;
  width: 100%;
  justify-content: center;
  align-items: center;

  @media (min-width: 640px) {
    flex-direction: row;
    width: auto;
  }
`;

export const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.875rem 1.75rem;
  background-color: #1d4ed8;
  color: #ffffff;
  font-weight: 600;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 8px 20px rgba(29, 78, 216, 0.3);
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.caption};

  @media (min-width: 640px) { width: auto; }

  &:hover {
    background-color: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(37, 99, 235, 0.45);
  }
`;

export const SecondaryButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.875rem 1.75rem;
  background-color: rgba(15, 23, 42, 0.4);
  border: 1px solid rgba(51, 65, 85, 0.5);
  color: #cbd5e1;
  font-weight: 500;
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  backdrop-filter: blur(12px);
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.caption};

  @media (min-width: 640px) { width: auto; }

  &:hover {
    background-color: rgba(30, 41, 59, 0.6);
    color: #ffffff;
    border-color: rgba(148, 163, 184, 0.4);
    transform: translateY(-2px);
  }
`;

export const CornerLogo = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 1.5rem;
  opacity: 0.4;
  z-index: 10;

  div {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    border: 1px solid #334155;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: 900;
    color: #ffffff;
  }
`;