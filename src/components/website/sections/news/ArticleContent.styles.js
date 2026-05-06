import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ContentContainer = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xxl} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.background.primary};
`;

export const ArticleBody = styled(motion.div)`
  font-size: ${({ theme }) => theme.fontSizes.bodyLg};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text.primary};
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  h2 {
    // font-size: 1.75rem;
    font-size: ${({ theme }) => theme.fontSizes.h2};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: ${({ theme }) => `${theme.spacing.xxl} 0 ${theme.spacing.md}`};
    
    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      font-size: 2rem;
    }
  }
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.h3};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.text.primary};
    margin: ${({ theme }) => `${theme.spacing.xl} 0 ${theme.spacing.md}`};
  }
  
  ul, ol {
    margin: ${({ theme }) => `${theme.spacing.lg} 0`};
    padding-left: ${({ theme }) => theme.spacing.xl};
    
    li {
      margin-bottom: ${({ theme }) => theme.spacing.xs};
    }
  }
  
  blockquote {
    margin: ${({ theme }) => `${theme.spacing.xl} 0`};
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
    background: ${({ theme }) => theme.colors.background.secondary};
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    font-style: italic;
    border-radius: 0 ${({ theme }) => theme.radii.lg} ${({ theme }) => theme.radii.lg} 0;
    
    p {
      margin-bottom: 0;
    }
  }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.radii.md};
    margin: ${({ theme }) => `${theme.spacing.xl} 0`};
  }
  
  figure {
    margin: ${({ theme }) => `${theme.spacing.xl} 0`};
    
    figcaption {
      font-size: ${({ theme }) => theme.fontSizes.caption};
      color: ${({ theme }) => theme.colors.text.secondary};
      text-align: center;
      margin-top: ${({ theme }) => theme.spacing.xs};
    }
  }
`;

export const TagsContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxl};
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  
  h4 {
    font-size: ${({ theme }) => theme.fontSizes.body};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const Tag = styled.span`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.secondary};
  border-radius: ${({ theme }) => theme.radii.xl};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;