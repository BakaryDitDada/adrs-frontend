import styled from 'styled-components';
import { motion } from 'framer-motion';

export const HeroWrapper = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.background.secondary};
  text-align: center;
`;

export const HeroTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, ${({ theme }) => theme.fontSizes.h1});
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const HeroSubtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.bodyLg};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 700px;
  margin: 0 auto ${({ theme }) => theme.spacing.xxl};
  line-height: 1.6;
`;

export const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 800px;
  margin: 0 auto;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

export const StatItem = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: 16px;
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  
  .icon {
    width: 4.8rem;
    height: 4.8rem;
    border-radius: ${({ theme }) => theme.radii.md};
    background: ${({ theme }) => `${theme.colors.primary}15`};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.primary};
  }
  
  .number {
    // font-size: 1.75rem;
    font-size: ${({ theme }) => theme.fontSizes.body};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
  
  .label {
    font-size: ${({ theme }) => theme.fontSizes.caption};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;