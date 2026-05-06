import styled from 'styled-components';
import { motion } from 'framer-motion';

export const GridContainer = styled.div`
  position: relative;
`;

export const GridHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl}; /* 3rem → 40px (close to 48px) */
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    align-items: flex-start;
  }
`;

export const ResultsInfo = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.body}; /* 1rem = 16px */
  color: ${({ theme }) => theme.colors.text.secondary};
  
  strong {
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;

export const SortSelect = styled.div`
  position: relative;
  
  select {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.xl} ${theme.spacing.sm} ${theme.spacing.md}`};
    background: ${({ theme }) => theme.colors.background.primary};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    font-size: ${({ theme }) => theme.fontSizes.body};
    color: ${({ theme }) => theme.colors.text.primary};
    appearance: none;
    cursor: pointer;
    min-width: 200px;
    
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}20`};
    }
  }
  
  &::after {
    content: '↓';
    position: absolute;
    right: ${({ theme }) => theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.text.light};
    pointer-events: none;
  }
`;

export const NewsGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.xl}; /* 2rem = 32px */
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const NewsCard = styled(motion.article)`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: 16px; /* No exact match in theme, keep as is */
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: ${({ theme }) => `${theme.colors.primary}40`};
    
    .card-image {
      transform: scale(1.05);
    }
    
    .read-more {
      color: ${({ theme }) => theme.colors.primary};
      transform: translateX(5px);
    }
  }
`;

export const CardImage = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
  
  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .category-badge {
    position: absolute;
    top: ${({ theme }) => theme.spacing.md};
    left: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
    border-radius: 20px;
    font-size: ${({ theme }) => theme.fontSizes.caption};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    z-index: 1;
  }
`;

export const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const CardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  color: ${({ theme }) => theme.colors.text.secondary};
  
  .meta-item {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

export const CardTitle = styled.h3`
  // font-size: 1.25rem; /* 20px – not in theme, keep */
  font-size: ${({ theme }) => theme.fontSizes.h3};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.4;
  flex: 1;
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const CardExcerpt = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex: 1;
`;

export const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ReadMore = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  svg {
    transition: transform 0.3s ease;
  }
`;

export const CardActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  
  button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.text.light};
    cursor: pointer;
    padding: ${({ theme }) => theme.spacing.xs};
    border-radius: ${({ theme }) => theme.radii.sm};
    // font-size: ${({ theme }) => theme.fontSizes.caption};
    transition: all 0.3s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => `${theme.colors.primary}10`};
    }
    
    &.views {
      // color: ${({ theme }) => theme.colors.primary};
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    &.bookmarked {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const Pagination = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.xxl};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const PageButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ $active, theme }) => 
    $active ? theme.colors.primary : theme.colors.background.primary};
  color: ${({ $active, theme }) => 
    $active ? 'white' : theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ $active, theme }) => 
      $active ? theme.colors.primaryDark : `${theme.colors.primary}10`};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    &:hover {
      border-color: ${({ theme }) => theme.colors.border};
      background: ${({ theme }) => theme.colors.background.primary};
    }
  }
`;

export const PageEllipsis = styled.span`
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.fontSizes.body};
`;