import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import responsive from '@/styles/Responsive';

export const PartnersLogosContainer = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0; // 80px
  background: ${({ theme }) => theme.colors.background.secondary};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.background.secondary} 0%,
      transparent 10%,
      transparent 90%,
      ${({ theme }) => theme.colors.background.secondary} 100%
    );
    pointer-events: none;
    z-index: 2;
  }
  
  ${responsive(css`
    padding: ${({ theme }) => theme.spacing.lg} 0; // 60px
  `, "sm")}
`;

export const PartnersContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md}; // 20px
  position: relative;
  z-index: 1;
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.elements.h2.fontSize};
  margin-bottom: ${({ theme }) => theme.spacing.md}; // 20px
  color: ${({ theme }) => theme.colors.text.primary};
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  ${responsive(css`
    font-size: ${({ theme }) => theme.fontSizes.bodyLg}; // 1.75rem ≈ 18px
  `, "sm")}
`;

export const SectionSubtitle = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.bodyLg}; // 1.125rem ≈ 18px
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 700px;
  margin: 0 auto ${({ theme }) => theme.spacing.lg}; // 40px
  line-height: 1.6;
  
  ${responsive(css`
    font-size: ${({ theme }) => theme.fontSizes.body}; // 1rem ≈ 16px
  `, "sm")}
`;

export const LogosWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing.md} 0; // 20px
  margin: ${({ theme }) => theme.spacing.lg} 0; // 40px
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: ${({ theme }) => theme.spacing.xl}; // 100px
    z-index: 1;
    pointer-events: none;
  }
  
  &::before {
    left: 0;
    background: linear-gradient(to right, 
      ${({ theme }) => theme.colors.background.secondary}, 
      transparent);
  }
  
  &::after {
    right: 0;
    background: linear-gradient(to left, 
      ${({ theme }) => theme.colors.background.secondary}, 
      transparent);
  }
`;

export const LogosTrack = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg}; // 30px
  width: max-content;
  transition: transform 0.1s linear;
  animation: ${({ $isPaused, direction }) => 
    $isPaused ? 'none' : direction === 'left' ? 'scrollLeft 30s linear infinite' : 'scrollRight 30s linear infinite'};
  
  @keyframes scrollLeft {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(-50% - ${({ theme }) => theme.spacing.sm})); } // 15px
  }
  
  @keyframes scrollRight {
    0% { transform: translateX(calc(-50% - ${({ theme }) => theme.spacing.sm})); }
    100% { transform: translateX(0); }
  }
  
  &:hover {
    animation-play-state: paused;
  }
  
  ${responsive(css`
    gap: ${({ theme }) => theme.spacing.md}; // 20px
    
    @keyframes scrollLeft {
      0% { transform: translateX(0); }
      100% { transform: translateX(calc(-50% - ${({ theme }) => theme.spacing.xs})); } // 10px
    }
    
    @keyframes scrollRight {
      0% { transform: translateX(calc(-50% - ${({ theme }) => theme.spacing.xs})); }
      100% { transform: translateX(0); }
    }
  `, "sm")}
`;

export const LogoItem = styled.div`
  flex: 0 0 auto;
  width: 200px;
  height: 120px;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.radii.lg}; // 16px
  padding: ${({ theme }) => theme.spacing.md}; // 20px
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm}; // 12px
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: ${({ theme }) => theme.spacing.xs}; // 3px
    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-${({ theme }) => theme.spacing.xs}) scale(1.03); // -5px
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.primary}50;
    
    &::before {
      transform: scaleX(1);
    }
  }
  
  ${responsive(css`
    width: 150px;
    height: 100px;
    padding: ${({ theme }) => theme.spacing.sm}; // 15px
  `, "sm")}
`;

export const LogoIcon = styled.div`
  width: ${({ theme }) => theme.spacing.lg}; // 50px
  height: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md}; // 12px
  background: ${({ color }) => color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ color }) => color};
  transition: all 0.3s ease;
  
  ${LogoItem}:hover & {
    background: ${({ color }) => color};
    color: white;
    transform: rotate(5deg) scale(1.1);
  }
  
  ${responsive(css`
    width: ${({ theme }) => theme.spacing.md}; // 40px
    height: ${({ theme }) => theme.spacing.md};
  `, "sm")}
`;

export const LogoName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.caption}; // 0.875rem ≈ 14px
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: 1.3;
  transition: color 0.3s ease;
  
  ${LogoItem}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  ${responsive(css`
    font-size: ${({ theme }) => theme.fontSizes.small}; // 0.75rem ≈ 12px
  `, "sm")}
`;

export const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm}; // 15px
  margin-top: ${({ theme }) => theme.spacing.lg}; // 30px
  flex-wrap: wrap;
`;

export const PauseButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}; // 8px
  background: ${({ theme, $isPaused }) => 
    $isPaused ? theme.colors.primary : theme.colors.background.primary};
  color: ${({ theme, $isPaused }) => 
    $isPaused ? theme.colors.text.inverse : theme.colors.text.primary};
  border: 1px solid ${({ theme, $isPaused }) => 
    $isPaused ? theme.colors.primary : theme.colors.border};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md}; // 10px 20px
  border-radius: ${({ theme }) => theme.radii.full}; // 50px
  font-size:

// import styled from 'styled-components';
// import { motion } from 'framer-motion';

// export const PartnersLogosContainer = styled.section`
//   padding: 80px 0;
//   background: ${({ theme }) => theme.colors.background.primary};
//   position: relative;
//   overflow: hidden;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: linear-gradient(
//       90deg,
//       ${({ theme }) => theme.colors.background.primary} 0%,
//       transparent 10%,
//       transparent 90%,
//       ${({ theme }) => theme.colors.background.primary} 100%
//     );
//     pointer-events: none;
//     z-index: 2;
//   }
  
//   @media (max-width: 768px) {
//     padding: 60px 0;
//   }
// `;

// export const PartnersContent = styled.div`
//   max-width: 1400px;
//   margin: 0 auto;
//   padding: 0 20px;
//   position: relative;
//   z-index: 1;
// `;

// export const SectionTitle = styled.h2`
//   text-align: center;
//   font-size: clamp(2rem, 4vw, 2.5rem);
//   margin-bottom: 20px;
//   color: ${({ theme }) => theme.colors.text.primary};
  
//   span {
//     color: ${({ theme }) => theme.colors.primary};
//   }
  
//   @media (max-width: 768px) {
//     font-size: 1.75rem;
//   }
// `;

// export const SectionSubtitle = styled.p`
//   text-align: center;
//   font-size: 1.125rem;
//   color: ${({ theme }) => theme.colors.text.secondary};
//   max-width: 700px;
//   margin: 0 auto 40px;
//   line-height: 1.6;
  
//   @media (max-width: 768px) {
//     font-size: 1rem;
//   }
// `;

// export const LogosWrapper = styled.div`
//   position: relative;
//   width: 100%;
//   overflow: hidden;
//   padding: 20px 0;
//   margin: 40px 0;
  
//   &::before,
//   &::after {
//     content: '';
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     width: 100px;
//     z-index: 1;
//     pointer-events: none;
//   }
  
//   &::before {
//     left: 0;
//     background: linear-gradient(to right, 
//       ${({ theme }) => theme.colors.background.primary}, 
//       transparent);
//   }
  
//   &::after {
//     right: 0;
//     background: linear-gradient(to left, 
//       ${({ theme }) => theme.colors.background.primary}, 
//       transparent);
//   }
// `;

// export const LogosTrack = styled.div`
//   display: flex;
//   gap: 30px;
//   width: max-content;
//   transition: transform 0.1s linear;
//   animation: ${({ $isPaused, direction }) => 
//     $isPaused ? 'none' : direction === 'left' ? 'scrollLeft 30s linear infinite' : 'scrollRight 30s linear infinite'};
  
//   @keyframes scrollLeft {
//     0% {
//       transform: translateX(0);
//     }
//     100% {
//       transform: translateX(calc(-50% - 15px));
//     }
//   }
  
//   @keyframes scrollRight {
//     0% {
//       transform: translateX(calc(-50% - 15px));
//     }
//     100% {
//       transform: translateX(0);
//     }
//   }
  
//   &:hover {
//     animation-play-state: paused;
//   }
  
//   @media (max-width: 768px) {
//     gap: 20px;
    
//     @keyframes scrollLeft {
//       0% {
//         transform: translateX(0);
//       }
//       100% {
//         transform: translateX(calc(-50% - 10px));
//       }
//     }
    
//     @keyframes scrollRight {
//       0% {
//         transform: translateX(calc(-50% - 10px));
//       }
//       100% {
//         transform: translateX(0);
//       }
//     }
//   }
// `;

// export const LogoItem = styled.div`
//   flex: 0 0 auto;
//   width: 200px;
//   height: 120px;
//   background: ${({ theme }) => theme.colors.background.secondary};
//   border-radius: 16px;
//   padding: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   gap: 12px;
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   cursor: pointer;
//   position: relative;
//   overflow: hidden;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     height: 3px;
//     background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
//     transform: scaleX(0);
//     transform-origin: left;
//     transition: transform 0.3s ease;
//   }
  
//   &:hover {
//     transform: translateY(-5px) scale(1.03);
//     box-shadow: ${({ theme }) => theme.shadows.lg};
//     border-color: ${({ theme }) => theme.colors.primary}50;
    
//     &::before {
//       transform: scaleX(1);
//     }
//   }
  
//   @media (max-width: 768px) {
//     width: 150px;
//     height: 100px;
//     padding: 15px;
//   }
// `;

// export const LogoIcon = styled.div`
//   width: 50px;
//   height: 50px;
//   border-radius: 12px;
//   background: ${({ color }) => color}20;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: ${({ color }) => color};
//   transition: all 0.3s ease;
  
//   ${LogoItem}:hover & {
//     background: ${({ color }) => color};
//     color: white;
//     transform: rotate(5deg) scale(1.1);
//   }
  
//   @media (max-width: 768px) {
//     width: 40px;
//     height: 40px;
//   }
// `;

// export const LogoName = styled.span`
//   font-size: 0.875rem;
//   color: ${({ theme }) => theme.colors.text.primary};
//   text-align: center;
//   font-weight: ${({ theme }) => theme.fontWeights.medium};
//   line-height: 1.3;
//   transition: color 0.3s ease;
  
//   ${LogoItem}:hover & {
//     color: ${({ theme }) => theme.colors.primary};
//   }
  
//   @media (max-width: 768px) {
//     font-size: 0.75rem;
//   }
// `;

// export const Controls = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 15px;
//   margin-top: 30px;
//   flex-wrap: wrap;
// `;

// export const PauseButton = styled(motion.button)`
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   background: ${({ theme, $isPaused }) => 
//     $isPaused ? theme.colors.primary : theme.colors.background.secondary};
//   color: ${({ theme, $isPaused }) => 
//     $isPaused ? 'white' : theme.colors.text.primary};
//   border: 1px solid ${({ theme, $isPaused }) => 
//     $isPaused ? theme.colors.primary : theme.colors.border};
//   padding: 10px 20px;
//   border-radius: 50px;
//   font-size: 0.875rem;
//   font-weight: ${({ theme }) => theme.fontWeights.medium};
//   cursor: pointer;
//   transition: all 0.2s ease;
  
//   &:hover {
//     background: ${({ theme }) => theme.colors.primary};
//     color: white;
//     border-color: ${({ theme }) => theme.colors.primary};
//     transform: translateY(-2px);
//   }
  
//   span {
//     font-size: 0.75rem;
//   }
  
//   @media (max-width: 768px) {
//     padding: 8px 16px;
    
//     span {
//       font-size: 0.6875rem;
//     }
//   }
// `;