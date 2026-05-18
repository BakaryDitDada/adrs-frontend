import styled from 'styled-components';
import { motion } from 'framer-motion';

export const MenuWrapper = styled.div`
  position: relative;
  display: inline-flex;

  & .user__info-button {
    display: flex;
    background: transparent;
  }
`;

export const MenuContentContainer = styled(motion.div)`
  position: fixed;

  min-width: ${({ $width }) => $width || '22rem'};

  background: ${({ theme }) =>
    theme.colors.background.primary};

  border: 1px solid
    ${({ theme }) => theme.colors.border};

  border-radius: ${({ theme }) =>
    theme.radii.lg};

  box-shadow: ${({ theme }) =>
    theme.shadows.xl};

  overflow: hidden;

  z-index: 9999;

  padding: ${({ theme }) =>
    theme.spacing.xs};

  backdrop-filter: blur(12px);
`;

export const MenuItemButton = styled.button`
  width: 100%;

  border: none;
  background: transparent;

  display: flex;
  align-items: center;
  gap: ${({ theme }) =>
    theme.spacing.sm};

  padding:
    ${({ theme }) => theme.spacing.sm}
    ${({ theme }) => theme.spacing.md};

  border-radius: ${({ theme }) =>
    theme.radii.md};

  cursor: pointer;

  color: ${({ theme, $variant }) => {
    if ($variant === 'danger') {
      return theme.colors.error;
    }

    return theme.colors.text.primary;
  }};

  transition:
    background 0.2s ease,
    color 0.2s ease;

  font-size: ${({ theme }) =>
    theme.fontSizes.body};

  font-weight: ${({ theme }) =>
    theme.fontWeights.medium};

  &:hover {
    background: ${({ theme, $variant }) => {
      if ($variant === 'danger') {
        return `${theme.colors.error}15`;
      }

      return theme.colors.background.secondary;
    }};
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme }) => theme.colors.primary};

    outline-offset: 2px;
  }

  svg {
    flex-shrink: 0;
  }
`;

export const MenuDividerLine = styled.div`
  width: 100%;
  height: 1px;

  margin:
    ${({ theme }) => theme.spacing.xs}
    0;

  background:
    ${({ theme }) => theme.colors.border};
`;

export const MenuOverlayBackdrop = styled.div`
  position: fixed;
  inset: 0;

  z-index: 9998;

  background: transparent;
`;