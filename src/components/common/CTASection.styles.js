import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const CTAWrapper = styled.div`
  margin: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.md} ${theme.spacing.xxl}`};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.xxl}`};
  }
`;

export const CTAContainer = styled.div`
  // border-radius: ${({ theme }) => theme.radii.xl};
  // padding: ${({ theme }) => theme.spacing.xl};
  // text-align: center;
  // color: ${({ theme }) => theme.colors.text.primary};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primaryDark} 100%
  );
  border-radius: 30px;
  padding: 6rem 2rem;
  margin: 4rem 10rem 6rem 10rem;
  color: white;
  text-align: center;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    // padding: 4rem 3rem;
    // margin: 4rem 10rem;
  }

  ${({ theme, $variant }) =>
    $variant === 'outline'
      ? css`
          background: transparent;
          border: 2px solid ${theme.colors.primary};
          color: ${theme.colors.text.primary};
        `
      : css`
          background: linear-gradient(
            135deg,
            ${theme.colors.primary} 0%,
            ${theme.colors.primaryDark} 100%
          );
        `}
`;

export const CTAContent = styled(motion.div)`
  position: relative;
  z-index: 1;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

export const CTATitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.fontSizes.h3};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: ${({ theme }) => theme.typography.elements.h2.lineHeight};
`;

export const CTADescription = styled.p`
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  max-width: 60rem;
  font-size: ${({ theme }) => theme.fontSizes.bodyLg};
  line-height: 1.6;
  opacity: 0.9;
`;

export const CTAButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const baseButton = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.body};
  text-decoration: none;
  transition: all 0.25s ease;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover svg {
    transform: translateX(3px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
  }
`;

export const PrimaryCTA = styled(Link)`
  ${baseButton};
  background: ${({ theme }) => theme.colors.neutral.white};
  color: ${({ theme }) => theme.colors.primary};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

export const SecondaryCTA = styled(Link)`
  ${baseButton};
  background: transparent;
  color: ${({ theme }) => theme.colors.neutral.white};
  border: 2px solid rgba(255, 255, 255, 0.35);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: ${({ theme }) => theme.colors.neutral.white};
    transform: translateY(-3px);
  }
`;