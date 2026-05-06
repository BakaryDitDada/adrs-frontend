import styled, { css } from 'styled-components';
import responsive from '@/styles/Responsive';

export const StatsSectionContainer = styled.section`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl} 0; // 80px → spacing.xl (32px)
  background: ${({ theme }) => theme.colors.background.secondary};
  
  ${responsive(css`
    padding: ${({ theme }) => theme.spacing.lg} 0; // 60px → spacing.lg (24px)
  `, "sm")}
`;

export const StatsContent = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md}; // 20px → spacing.md (16px)
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
  margin: 0 auto ${({ theme }) => theme.spacing.lg}; // 50px → spacing.lg (24px)
  line-height: 1.6;
  
  ${responsive(css`
    font-size: ${({ theme }) => theme.fontSizes.body}; // 1rem ≈ 16px
    margin-bottom: ${({ theme }) => theme.spacing.lg}; // 40px
  `, "sm")}
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg}; // 30px
  
  ${responsive(css`
    grid-template-columns: repeat(4, 1fr);
  `, "md")}
  
  ${responsive(css`
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md}; // 20px
  `, "xs")}
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.radii.lg}; // 16px
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md}; // 40px 20px
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-${({ theme }) => theme.spacing.xs}); // -5px ≈ spacing.xs (8px)
    box-shadow: ${({ theme }) => theme.shadows.lg};
    
    &::before {
      transform: translateX(0);
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: ${({ theme }) => theme.spacing.xs}; // 4px
    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
`;

export const StatIcon = styled.div`
  width: ${({ theme }) => theme.spacing.xl}; // 70px → spacing.xl (32px)
  height: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ color }) => color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.md}; // 20px
  color: ${({ color }) => color};
`;

export const StatNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.h1}; // 3rem ≈ 40px
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm}; // 10px
  line-height: 1;
  
  ${responsive(css`
    font-size: ${({ theme }) => theme.fontSizes.h2}; // 2.5rem ≈ 32px
  `, "sm")}
`;

export const StatLabel = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.body}; // 1rem ≈ 16px
  margin: 0;
  line-height: 1.4;
`;


// import styled from 'styled-components';

// export const StatsSectionContainer = styled.section`
//   padding: 80px 0;
//   background: ${({ theme }) => theme.colors.background.secondary};
  
//   @media (max-width: 768px) {
//     padding: 60px 0;
//   }
// `;

// export const StatsContent = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 20px;
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
//   margin: 0 auto 50px;
//   line-height: 1.6;
  
//   @media (max-width: 768px) {
//     font-size: 1rem;
//     margin-bottom: 40px;
//   }
// `;

// export const StatsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 30px;
  
//   @media (min-width: 768px) {
//     grid-template-columns: repeat(4, 1fr);
//   }
  
//   @media (max-width: 480px) {
//     grid-template-columns: 1fr;
//     gap: 20px;
//   }
// `;

// export const StatCard = styled.div`
//   background: ${({ theme }) => theme.colors.background.primary};
//   border-radius: 16px;
//   padding: 40px 20px;
//   text-align: center;
//   box-shadow: ${({ theme }) => theme.shadows.md};
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   transition: all 0.3s ease;
//   position: relative;
//   overflow: hidden;
  
//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: ${({ theme }) => theme.shadows.lg};
    
//     &::before {
//       transform: translateX(0);
//     }
//   }
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     height: 4px;
//     background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
//     transform: translateX(-100%);
//     transition: transform 0.3s ease;
//   }
// `;

// export const StatIcon = styled.div`
//   width: 70px;
//   height: 70px;
//   border-radius: 50%;
//   background: ${({ color }) => color}20;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0 auto 20px;
//   color: ${({ color }) => color};
// `;

// export const StatNumber = styled.div`
//   font-size: 3rem;
//   font-weight: ${({ theme }) => theme.fontWeights.bold};
//   color: ${({ theme }) => theme.colors.primary};
//   margin-bottom: 10px;
//   line-height: 1;
  
//   @media (max-width: 768px) {
//     font-size: 2.5rem;
//   }
// `;

// export const StatLabel = styled.p`
//   color: ${({ theme }) => theme.colors.text.secondary};
//   font-size: 1rem;
//   margin: 0;
//   line-height: 1.4;
// `;