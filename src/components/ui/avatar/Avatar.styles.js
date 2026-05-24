import styled, { css } from 'styled-components';

const sizes = {
  xs: css`
    width: 2.4rem;
    height: 2.4rem;
    font-size: 0.9rem;
  `,

  sm: css`
    width: 3rem;
    height: 3rem;
    font-size: 1.1rem;
  `,

  md: css`
    width: 3.6rem;
    height: 3.6rem;
    font-size: 1.3rem;
  `,

  lg: css`
    width: 4.4rem;
    height: 4.4rem;
    font-size: 1.5rem;
  `,

  xl: css`
    width: 5.2rem;
    height: 5.2rem;
    font-size: 1.7rem;
  `,
};

export const Container = styled.div`
  ${({ $size }) => sizes[$size || 'md']}

  border-radius: 50%;

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  background: ${({ theme }) =>
    theme.colors.primary};

  color: ${({ theme }) =>
    theme.colors.white};

  font-weight: ${({ theme }) =>
    theme.fontWeights.semibold};

  border: 2px solid
    ${({ theme }) =>
      theme.colors.background.primary};

  user-select: none;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
`;