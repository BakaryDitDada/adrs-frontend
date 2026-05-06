// src/styled/mixins/grid.ts
import { css } from 'styled-components';

export const gridCenter = css`
  display: grid;
  place-items: center;
`;

export const responsiveGrid = (columns: string) => css`
  display: grid;
  grid-template-columns: ${columns};
  gap: ${props => props.theme.spacing.lg};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.md};
  }
`;