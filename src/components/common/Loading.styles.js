import styled, { keyframes, css } from 'styled-components';

// 1. Pixel-perfect Size Token Mapping
export const SIZE_MAP = {
  sm: '16px',
  md: '32px',
  lg: '48px',
  xl: '64px',
};

// 2. Color Token Mapping matching your design system
const COLOR_MAP = {
  primary: 'var(--color-primary, #3b82f6)',
  secondary: 'var(--color-secondary, #10b981)',
  white: '#ffffff',
  muted: 'var(--color-muted, #6b7280)',
};

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// 3. Layout Architecture Variants
const variantStyles = {
  inline: css`
    display: inline-flex;
    align-items: center;
    width: auto;
    height: auto;
  `,
  container: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 150px;
    height: 100%;
    // background-color: transparent;
  `,
  overlay: css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--backdrop-color, rgba(255, 255, 255, 0.7));
    backdrop-filter: blur(2px);
    z-index: 50;
  `,
  fullscreen: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: var(--bg-main, #ffffff);
    z-index: 9999;
  `,
};

export const LoadingContainer = styled.div`
  ${({ $variant }) => variantStyles[$variant] || variantStyles.container};
  transition: all 0.2s ease-in-out;
  background-color: ${({ theme }) => theme.colors.background.primary}
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  .spinner-icon {
    color: ${({ $color }) => COLOR_MAP[$color] || COLOR_MAP.primary};
    animation: ${spin} 1s linear infinite;
    
    /* Performance Optimization: Force GPU execution to avoid UI stuttering */
    will-change: transform; 
    transform: translateZ(0);

    /* Respect Accessibility OS setting for users prone to motion sickness */
    @media (prefers-reduced-motion: reduce) {
      animation-duration: 2.5s;
    }
  }
`;

export const LoadingText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ $color }) => COLOR_MAP[$color] || COLOR_MAP.muted};
  letter-spacing: 0.025em;
`;

export const ScreenReaderText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;