import styled from 'styled-components';
import { motion } from 'framer-motion';

export const TimelineWrapper = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.background.secondary};
`;

export const TimelineContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.h2};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  text-align: center;
`;

export const PhasesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    justify-content: space-between;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 40px;
      left: 0;
      right: 0;
      height: 2px;
      background: ${({ theme }) => theme.colors.border};
      z-index: 1;
    }
  }
`;

export const Phase = styled(motion.div)`
  flex: 1;
  text-align: center;
  position: relative;
  z-index: 2;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    gap: ${({ theme }) => theme.spacing.lg};
    text-align: left;
    align-items: flex-start;
  }
`;

export const PhaseIcon = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.background.primary};
  border: 3px solid ${({ $status, theme }) => 
    $status === 'completed' ? theme.colors.success :
    $status === 'in-progress' ? theme.colors.primary :
    theme.colors.text.light};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
  color: ${({ $status, theme }) => 
    $status === 'completed' ? theme.colors.success :
    $status === 'in-progress' ? theme.colors.primary :
    theme.colors.text.light};
  background: ${({ theme }) => theme.colors.background.primary};
  
  svg {
    width: 32px;
    height: 32px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: 0 ${({ theme }) => theme.spacing.md} 0 0;
    width: 60px;
    height: 60px;
    
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export const PhaseContent = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 1;
  }
`;

export const PhaseTitle = styled.h4`
  // font-size: 1.25rem;
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const PhaseDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: flex-start;
  }
`;

export const PhaseStatus = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radii.xl};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  
  &.completed {
    background: ${({ theme }) => `${theme.colors.success}20`};
    color: ${({ theme }) => theme.colors.success};
  }
  &.in-progress {
    background: ${({ theme }) => `${theme.colors.primary}20`};
    color: ${({ theme }) => theme.colors.primary};
  }
  &.planned {
    background: ${({ theme }) => `${theme.colors.text.light}20`};
    color: ${({ theme }) => theme.colors.text.light};
  }
`;