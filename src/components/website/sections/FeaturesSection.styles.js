import styled, { css } from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import responsive from '@/styles/Responsive';

export const FeaturesSectionContainer = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0; // 100px
  background: ${({ theme }) => theme.colors.background.primary};
  
  ${responsive(css`
    padding: ${({ theme }) => theme.spacing.xl} 0; // 80px
  `, "sm")}
`;

export const FeaturesContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md}; // 20px
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.elements.h2.fontSize};
  margin-bottom: ${({ theme }) => theme.spacing.md}; // 20px
  color: ${({ theme }) => theme.colors.text.primary};
  
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

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg}; // 30px
  
  ${responsive(css`
    grid-template-columns: repeat(2, 1fr);
  `, "sm")}
  
  ${responsive(css`
    grid-template-columns: repeat(4, 1fr);
  `, "lg")}
`;

export const FeatureCard = styled(motion.div)`
  background: ${({ theme, $isHovered }) => 
    $isHovered ? theme.colors.background.secondary : theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.radii.lg}; // 16px
  padding: ${({ theme }) => theme.spacing.lg}; // 30px
  border: 1px solid ${({ theme, $isHovered }) => 
    $isHovered ? theme.colors.primary : theme.colors.border};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: ${({ theme }) => theme.spacing.xs}; // 4px
    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    transform: ${({ $isHovered }) => $isHovered ? 'scaleX(1)' : 'scaleX(0)'};
    transform-origin: left;
    transition: transform 0.3s ease;
  }
`;

export const FeatureIcon = styled.div`
  width: ${({ theme }) => theme.spacing.xl}; // 60px
  height: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radii.md}; // 12px
  background: ${({ color }) => color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md}; // 20px
  color: ${({ color }) => color};
  transition: all 0.3s ease;
  
  ${FeatureCard}:hover & {
    background: ${({ color }) => color};
    color: white;
    transform: rotate(5deg) scale(1.1);
  }
`;

export const FeatureTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.bodyLg}; // 1.25rem ≈ 18px
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm}; // 12px
  transition: color 0.3s ease;
  
  ${FeatureCard}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.body}; // 0.9375rem ≈ 16px
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.md}; // 20px
  flex-grow: 1;
`;

export const FeatureButton = styled(motion(Link))`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, $isHovered }) => 
    $isHovered ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $isHovered }) => 
    $isHovered ? theme.colors.text.inverse : theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md}; // 10px 20px
  border-radius: ${({ theme }) => theme.radii.md}; // 8px
  font-size: ${({ theme }) => theme.fontSizes.caption}; // 0.875rem ≈ 14px
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  border: 1px solid ${({ theme, $isHovered }) => 
    $isHovered ? theme.colors.primary : theme.colors.border};
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text.inverse};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;