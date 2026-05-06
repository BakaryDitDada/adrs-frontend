import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Animation for moving gradient along the border
const borderFlow = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => `${theme.spacing.xl} 0`};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

export const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: linear-gradient(
    135deg,
    ${({ theme }) => `${theme.colors.primary}20`},
    ${({ theme }) => `${theme.colors.secondary}20`}
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
    width: 30px;
    height: 30px;
  }
`;

export const StatValue = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.caption};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.4;
`;

export const StatCard = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all 0.3s ease;
  overflow: hidden;
  height: stretch;
  
  /* Create a pseudo-element that acts as the animated border */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 2px; /* border thickness */
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary},
      ${({ theme }) => theme.colors.primary}
    );
    background-size: 200% 200%;
    border-radius: ${({ theme }) => theme.radii.lg};
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
  
  &:hover::before {
    opacity: 1;
    animation: ${borderFlow} 3s ease infinite;
  }
`;

export const DescriptionContainer = styled(motion.div)`
  // background: ${({ theme }) => theme.colors.background.secondary};
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 24px;
  padding: 2rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 3rem;
  }
`;

export const Content = styled.div`
  // font-size: 1.125rem;
  font-size: ${({ theme }) => theme.fontSizes.body};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text.primary};
  
  p {
    margin-bottom: 1.5rem;
  }
  
  h3 {
    // font-size: 1.5rem;
    font-size: ${({ theme }) => theme.fontSizes.h3};
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 2rem 0 1rem;
  }
  
  ul {
    margin: 1.5rem 2rem;
    padding-left: 2rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
  
  strong {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
