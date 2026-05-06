import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import responsive from '@/styles/Responsive';

export const ValuesSectionContainer = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0; // 100px
  background: ${({ theme }) => theme.colors.background.primary};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, 
      transparent, 
      ${({ theme }) => theme.colors.primary}50, 
      transparent);
  }
  
  ${responsive(css`
    padding: ${({ theme }) => theme.spacing.xl} 0; // 80px
  `, "sm")}
`;

export const ValuesContent = styled.div`
  max-width: 1200px;
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
  margin: 0 auto ${({ theme }) => theme.spacing.xl}; // 60px
  line-height: 1.6;
  
  ${responsive(css`
    font-size: ${({ theme }) => theme.fontSizes.body}; // 1rem ≈ 16px
    margin-bottom: ${({ theme }) => theme.spacing.lg}; // 40px
  `, "sm")}
`;

export const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md}; // 25px
  
  ${responsive(css`
    grid-template-columns: repeat(4, 1fr);
  `, "md")}
  
  ${responsive(css`
    grid-template-columns: 1fr;
  `, "xs")}
`;

export const ValueCard = styled(motion.div)`
  background: ${({ theme, $isHovered }) => 
    $isHovered ? theme.colors.background.secondary : theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.radii.lg}; // 16px
  padding: ${({ theme }) => theme.spacing.md}; // 25px
  border: 1px solid ${({ theme, $isHovered }) => 
    $isHovered ? theme.colors.primary : theme.colors.border};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.colors.primary}05, 
      transparent);
    opacity: ${({ $isHovered }) => $isHovered ? 1 : 0};
    transition: opacity 0.3s ease;
  }
`;

export const ValueIcon = styled.div`
  width: ${({ theme }) => theme.spacing.lg}; // 50px
  height: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md}; // 12px
  background: ${({ color }) => color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}; // 20px
  color: ${({ color }) => color};
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
  
  ${ValueCard}:hover & {
    background: ${({ color }) => color};
    color: white;
    transform: rotate(10deg) scale(1.1);
  }
`;

export const ValueTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.bodyLg}; // 1.125rem ≈ 18px
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm}; // 10px
  position: relative;
  z-index: 1;
`;

export const ValueDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.caption}; // 0.875rem ≈ 14px
  line-height: 1.5;
  margin: 0;
  position: relative;
  z-index: 1;
`;

export const ValuesQuote = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl}; // 60px
  padding: ${({ theme }) => theme.spacing.xl}; // 40px
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radii.xl}; // 20px
  border-left: 5px solid ${({ theme }) => theme.colors.primary};
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '"';
    position: absolute;
    top: ${({ theme }) => theme.spacing.md}; // 20px
    right: ${({ theme }) => theme.spacing.lg}; // 40px
    font-size: 120px;
    color: ${({ theme }) => theme.colors.primary}10;
    font-family: serif;
    line-height: 1;
  }
  
  p {
    font-size: ${({ theme }) => theme.fontSizes.bodyLg}; // 1.25rem ≈ 18px
    color: ${({ theme }) => theme.colors.text.primary};
    line-height: 1.6;
    margin-bottom: ${({ theme }) => theme.spacing.md}; // 20px
    font-style: italic;
    position: relative;
    z-index: 1;
  }
  
  span {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSizes.body};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    position: relative;
    z-index: 1;
  }
  
  ${responsive(css`
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md}; // 30px 20px
    
    p {
      font-size: ${({ theme }) => theme.fontSizes.bodyLg}; // 1.125rem ≈ 18px
    }
    
    &::before {
      font-size: 80px;
      right: ${({ theme }) => theme.spacing.md}; // 20px
    }
  `, "sm")}
`;


// import { motion } from 'framer-motion';
// import styled from 'styled-components';

// export const ValuesSectionContainer = styled.section`
//   padding: 100px 0;
//   background: ${({ theme }) => theme.colors.background.primary};
//   position: relative;
//   overflow: hidden;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     height: 1px;
//     background: linear-gradient(90deg, 
//       transparent, 
//       ${({ theme }) => theme.colors.primary}50, 
//       transparent);
//   }
  
//   @media (max-width: 768px) {
//     padding: 80px 0;
//   }
// `;

// export const ValuesContent = styled.div`
//   max-width: 1200px;
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
//   margin: 0 auto 60px;
//   line-height: 1.6;
  
//   @media (max-width: 768px) {
//     font-size: 1rem;
//     margin-bottom: 40px;
//   }
// `;

// export const ValuesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 25px;
  
//   @media (min-width: 768px) {
//     grid-template-columns: repeat(4, 1fr);
//   }
  
//   @media (max-width: 480px) {
//     grid-template-columns: 1fr;
//   }
// `;

// export const ValueCard = styled(motion.div)`
//   background: ${({ theme, $isHovered }) => 
//     $isHovered ? theme.colors.background.secondary : theme.colors.background.primary};
//   border-radius: 16px;
//   padding: 25px;
//   border: 1px solid ${({ theme, $isHovered }) => 
//     $isHovered ? theme.colors.primary : theme.colors.border};
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
//     bottom: 0;
//     background: linear-gradient(135deg, 
//       ${({ theme }) => theme.colors.primary}05, 
//       transparent);
//     opacity: ${({ $isHovered }) => $isHovered ? 1 : 0};
//     transition: opacity 0.3s ease;
//   }
// `;

// export const ValueIcon = styled.div`
//   width: 50px;
//   height: 50px;
//   border-radius: 12px;
//   background: ${({ color }) => color}20;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-bottom: 20px;
//   color: ${({ color }) => color};
//   position: relative;
//   z-index: 1;
//   transition: all 0.3s ease;
  
//   ${ValueCard}:hover & {
//     background: ${({ color }) => color};
//     color: white;
//     transform: rotate(10deg) scale(1.1);
//   }
// `;

// export const ValueTitle = styled.h3`
//   font-size: 1.125rem;
//   color: ${({ theme }) => theme.colors.text.primary};
//   margin-bottom: 10px;
//   position: relative;
//   z-index: 1;
// `;

// export const ValueDescription = styled.p`
//   color: ${({ theme }) => theme.colors.text.secondary};
//   font-size: 0.875rem;
//   line-height: 1.5;
//   margin: 0;
//   position: relative;
//   z-index: 1;
// `;

// export const ValuesQuote = styled.div`
//   margin-top: 60px;
//   padding: 40px;
//   background: ${({ theme }) => theme.colors.background.secondary};
//   border-radius: 20px;
//   border-left: 5px solid ${({ theme }) => theme.colors.primary};
//   text-align: center;
//   position: relative;
//   overflow: hidden;
  
//   &::before {
//     content: '"';
//     position: absolute;
//     top: 20px;
//     right: 40px;
//     font-size: 120px;
//     color: ${({ theme }) => theme.colors.primary}10;
//     font-family: serif;
//     line-height: 1;
//   }
  
//   p {
//     font-size: 1.25rem;
//     color: ${({ theme }) => theme.colors.text.primary};
//     line-height: 1.6;
//     margin-bottom: 20px;
//     font-style: italic;
//     position: relative;
//     z-index: 1;
//   }
  
//   span {
//     color: ${({ theme }) => theme.colors.primary};
//     font-weight: ${({ theme }) => theme.fontWeights.semibold};
//     position: relative;
//     z-index: 1;
//   }
  
//   @media (max-width: 768px) {
//     padding: 30px 20px;
    
//     p {
//       font-size: 1.125rem;
//     }
    
//     &::before {
//       font-size: 80px;
//       right: 20px;
//     }
//   }
// `;