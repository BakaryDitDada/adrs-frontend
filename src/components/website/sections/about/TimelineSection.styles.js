import styled from 'styled-components';
import { motion } from 'framer-motion';

/* ================= CONTAINER ================= */

export const TimelineContainer = styled.div`
  position: relative;
  max-width: 1000px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 3px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.primary},
      ${({ theme }) => theme.colors.secondary}
    );

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      left: 30px;
    }
  }
`;

/* ================= ITEM ================= */

export const TimelineItem = styled(motion.div)`
  display: flex;
  margin-bottom: 3rem;
  position: relative;
  width: 100%;

  &:nth-child(odd) {
    justify-content: flex-start;
    padding-right: calc(50% + 2rem);

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      padding-right: 0;
      padding-left: 5rem;
    }
  }

  &:nth-child(even) {
    justify-content: flex-end;
    padding-left: calc(50% + 2rem);

    @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
      padding-left: 5rem;
      justify-content: flex-start;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

/* ================= DOT ================= */

export const TimelineDot = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  border: 4px solid ${({ theme }) => theme.colors.background.primary};
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    left: 30px;
  }
`;

/* ================= CONTENT ================= */

export const TimelineContent = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  width: 100%;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

/* ================= META ================= */

export const TimelineYear = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}20,
    ${({ theme }) => theme.colors.secondary}20
  );
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.radii.full};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  margin-bottom: 1rem;
`;

/* ================= TEXT ================= */

export const TimelineTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h3};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.75rem;
`;

export const TimelineDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.caption};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;

/* ================= ICON ================= */

export const IconWrapper = styled.div`
  margin-bottom: 1rem;

  svg {
    color: ${({ theme }) => theme.colors.primary};
    width: 32px;
    height: 32px;
  }
`;