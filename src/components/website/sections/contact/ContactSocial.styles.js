import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SocialWrapper = styled.div`
  text-align: center;
  padding: ${({ theme }) => `${theme.spacing.xl} 0 ${theme.spacing.xxl}`};
`;

export const SocialTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
`;

export const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-5px);
    border-color: ${({ theme }) => theme.colors.primary};
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;