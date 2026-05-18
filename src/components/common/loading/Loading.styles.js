'use client';

import { Loader2 } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled(Loader2)`
  animation: ${spin} 0.8s linear infinite;
`;

export const SkeletonBlock = styled.div`
  position: relative;
  overflow: hidden;

  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '2rem'};

  border-radius: ${({ theme, radius }) =>
    radius || theme.radii.md};

  background: ${({ theme }) =>
    theme.mode === 'dark'
      ? theme.colors.background.tertiary
      : theme.colors.neutral.gray200};

  &::after {
    content: '';

    position: absolute;
    inset: 0;

    background: linear-gradient(
      90deg,
      transparent,
      rgba(255,255,255,0.08),
      transparent
    );

    animation: ${shimmer} 1.8s infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
    }
  }
`;

// Dashboard Skeleton
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxl};
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
  }
`;

export const ChartCard = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};

  min-height: 42rem;

  border-radius: ${({ theme }) => theme.radii.xl};

  border: 1px solid ${({ theme }) => theme.colors.border};

  background: ${({ theme }) =>
    theme.colors.background.secondary};
`;

// Stats Card Skeleton
export const Card = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  padding: ${({ theme }) => theme.spacing.xl};

  min-height: 16rem;

  border-radius: ${({ theme }) => theme.radii.xl};

  border: 1px solid ${({ theme }) => theme.colors.border};

  background: ${({ theme }) =>
    theme.colors.background.secondary};
`;

export const IconWrapper = styled.div`
  flex-shrink: 0;
`;

export const Content = styled.div`
  flex: 1;
`;

// Table Skeleton
export const TableWrapper = styled.div`
  border-radius: ${({ theme }) => theme.radii.xl};

  overflow: hidden;

  border: 1px solid ${({ theme }) => theme.colors.border};

  background: ${({ theme }) =>
    theme.colors.background.secondary};
`;

export const TableHeader = styled.div`
  display: grid;
  grid-template-columns:
    6rem
    1fr
    1fr
    2fr
    1.5fr
    1.5fr
    1fr
    1.5fr
    1fr;

  padding: ${({ theme }) => theme.spacing.lg};

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none;
  }
`;

export const TableRow = styled.div`
  display: grid;
  grid-template-columns:
    6rem
    1fr
    1fr
    2fr
    1.5fr
    1.5fr
    1fr
    1.5fr
    1fr;

  padding: ${({ theme }) => theme.spacing.lg};

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

// Loading Overlay
export const Overlay = styled.div`
  position: absolute;
  inset: 0;

  z-index: 20;

  display: flex;
  align-items: center;
  justify-content: center;

  backdrop-filter: blur(4px);

  background: rgba(0,0,0,0.3);

  border-radius: inherit;
`;

// Dashboard KPI Skeleton
export const DashKPISkeletonCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  padding: ${({ theme }) => theme.spacing.xl};

  min-height: 16rem;

  border-radius: ${({ theme }) => theme.radii.xl};

  border: 1px solid ${({ theme }) => theme.colors.border};

  background: ${({ theme }) =>
    theme.colors.background.secondary};
`;

export const ChartSkeletonWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};

  min-height: 42rem;

  border-radius: ${({ theme }) => theme.radii.xl};

  border: 1px solid ${({ theme }) => theme.colors.border};

  background: ${({ theme }) =>
    theme.colors.background.secondary};
`;
