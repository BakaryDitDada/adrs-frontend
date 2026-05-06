import styled, { css } from 'styled-components';
import responsive from '../../../styles/Responsive';

export const AchievementsSectionContainer = styled.section`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xxl} 0; // 100px → spacing.xxl (40px) mais adapté
  background: ${({ theme }) => theme.colors.background.secondary};
  
  ${responsive(css`
    padding: ${({ theme }) => theme.spacing.xl} 0; // 80px → spacing.xl (32px)
  `, "sm")}
`;

export const AchievementsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md}; // 20px → spacing.md (16px)
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.elements.h2.fontSize};
  margin-bottom: ${({ theme }) => theme.spacing.md}; // 20px → spacing.md (16px)
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
  margin: 0 auto ${({ theme }) => theme.spacing.xl}; // 60px → spacing.xl (32px)
  line-height: 1.6;
  
  ${responsive(css`
    font-size: ${({ theme }) => theme.fontSizes.body}; // 1rem ≈ 16px
    margin-bottom: ${({ theme }) => theme.spacing.lg}; // 40px → spacing.lg (24px)
  `, "sm")}
`;

export const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg}; // 30px → spacing.lg (24px)
  
  ${responsive(css`
    grid-template-columns: repeat(2, 1fr);
  `, "md")}
  
  ${responsive(css`
    grid-template-columns: repeat(4, 1fr);
  `, "lg")}
  
  ${responsive(css`
    display: none;
  `, "sm")}
`;

export const AchievementCard = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.radii.lg}; // 16px → radii.lg (12px)
  padding: ${({ theme }) => theme.spacing.lg}; // 30px → spacing.lg (24px)
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: ${({ theme }) => theme.spacing.xs}; // 4px → spacing.xs (8px)
    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-${({ theme }) => theme.spacing.xs}); // -8px
    box-shadow: ${({ theme }) => theme.shadows.lg};
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

export const AchievementIcon = styled.div`
  width: ${({ theme }) => theme.spacing.xl}; // 60px → spacing.xl (32px)
  height: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radii.md}; // 12px → radii.md (8px)
  background: ${({ color }) => color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto ${({ theme }) => theme.spacing.md}; // 20px → spacing.md (16px)
  color: ${({ color }) => color};
  transition: all 0.3s ease;
  
  ${AchievementCard}:hover & {
    background: ${({ color }) => color};
    color: white;
    transform: rotate(5deg) scale(1.1);
  }
`;

export const AchievementYear = styled.div`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary}10;
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md}; // 6px 16px
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.caption}; // 0.875rem ≈ 14px
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.md}; // 15px → spacing.md (16px)
`;

export const AchievementTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.bodyLg}; // 1.25rem ≈ 18px
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm}; // 12px
  line-height: 1.3;
`;

export const AchievementDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.body}; // 0.9375rem ≈ 16px
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.md}; // 15px → spacing.md (16px)
`;

export const Timeline = styled.div`
  display: none;
  position: relative;
  padding-left: ${({ theme }) => theme.spacing.lg}; // 30px
  margin-top: ${({ theme }) => theme.spacing.lg}; // 40px
  
  &::before {
    content: '';
    position: absolute;
    left: ${({ theme }) => theme.spacing.sm}; // 9px ≈ spacing.sm (12px)
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${({ theme }) => theme.colors.border};
  }
  
  ${responsive(css`
    display: block;
  `, "sm")}
`;

export const TimelineItem = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.lg}; // 30px
  display: flex;
  align-items: flex-start;
`;

export const TimelineDot = styled.div`
  width: ${({ theme }) => theme.spacing.sm}; // 20px
  height: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ color, theme }) => color || theme.colors.primary};
  position: absolute;
  left: -${({ theme }) => theme.spacing.lg}; // -30px
  top: 0;
  border: 3px solid ${({ theme }) => theme.colors.background.secondary};
`;

export const TimelineContent = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.radii.md}; // 12px
  padding: ${({ theme }) => theme.spacing.md}; // 20px
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
`;

export const TimelineDate = styled.div`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primary}10;
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm}; // 4px 12px
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.caption}; // 0.75rem ≈ 14px
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm}; // 10px
`;