import styled, { css } from 'styled-components';

const remainingSizes = {
  xs: css`
    width: 2.4rem;
    height: 2.4rem;
    font-size: 0.9rem;
  `,

  sm: css`
    width: 3rem;
    height: 3rem;
    font-size: 1rem;
  `,

  md: css`
    width: 3.6rem;
    height: 3.6rem;
    font-size: 1.2rem;
  `,

  lg: css`
    width: 4.4rem;
    height: 4.4rem;
    font-size: 1.4rem;
  `,

  xl: css`
    width: 5.2rem;
    height: 5.2rem;
    font-size: 1.6rem;
  `,
};

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const AvatarWrapper = styled.div`
  margin-left: -0.8rem;

  transition: transform 0.2s ease;

  &:first-child {
    margin-left: 0;
  }

  &:hover {
    transform: translateY(-2px);
    z-index: 5;
  }
`;

export const RemainingCount = styled.div`
  ${({ $size }) => remainingSizes[$size || 'md']}

  margin-left: -0.8rem;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  background: ${({ theme }) =>
    theme.colors.background.tertiary};

  color: ${({ theme }) =>
    theme.colors.text.primary};

  border: 2px solid
    ${({ theme }) =>
      theme.colors.background.primary};

  font-weight: ${({ theme }) =>
    theme.fontWeights.semibold};
`;

export const EmptyLabel = styled.span`
  color: ${({ theme }) =>
    theme.colors.text.secondary};

  font-size: ${({ theme }) =>
    theme.fontSizes.caption};
`;