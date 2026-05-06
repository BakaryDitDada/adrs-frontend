import styled from 'styled-components';
import { motion } from 'framer-motion';

export const HeroContainer = styled.section`
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background.secondary} 0%,
    ${({ theme }) => theme.colors.background.primary} 100%
  );
  overflow: hidden;
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.md}`};
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 125rem;
  margin: 0 auto;
`;

export const CategoryBadge = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.secondary};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radii.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ProjectTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, ${({ theme }) => theme.fontSizes.h1});
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.2;
`;

export const ProjectSubtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.bodyLg};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 800px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  // gap: ${({ theme }) => theme.spacing.xs};
  max-width: 85rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

export const InfoItem = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.sm};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5rem;
  
  .icon {
    color: ${({ theme }) => theme.colors.primary};
    // margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
  
  .label {
    font-size: ${({ theme }) => theme.fontSizes.caption};
    color: ${({ theme }) => theme.colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .value {
    font-size: ${({ theme }) => theme.fontSizes.caption};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    text-transform: uppercase;
  }
`;

export const StatusBadge = styled.div`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xxl}`};
  border-radius: ${({ theme }) => theme.radii.xxl};
  // border-radius: 5rem;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.body};
  
  &.en-cours {
    background: ${({ theme }) => `${theme.colors.success}20`};
    color: ${({ theme }) => theme.colors.success};
    border: 1px solid ${({ theme }) => theme.colors.success};
  }
  &.acheve {
    background: ${({ theme }) => `${theme.colors.text.light}20`};
    color: ${({ theme }) => theme.colors.text.light};
    border: 1px solid ${({ theme }) => theme.colors.text.light};
  }
  &.planifie {
    background: ${({ theme }) => `${theme.colors.warning}20`};
    color: ${({ theme }) => theme.colors.warning};
    border: 1px solid ${({ theme }) => theme.colors.warning};
  }
`;

export const ProgressContainer = styled.div`
  max-width: 600px;
  margin-top: ${({ theme }) => theme.spacing.xl};
  
  .progress-header {
    display: flex;
    justify-content: space-between;
    font-size: ${({ theme }) => theme.fontSizes.caption};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
  
  .progress-bar {
    height: 10px;
    background: ${({ theme }) => theme.colors.background.tertiary};
    border-radius: 5px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary}
    );
    border-radius: 5px;
    width: ${({ $progress }) => $progress}%;
  }
`;