'use client';

import styled from 'styled-components';

// Heading 1
export const Heading1 = styled.h1`
  ${({ theme }) => `
    font-size: ${theme.typography.elements.h1.fontSize};
    font-weight: ${theme.typography.elements.h1.fontWeight};
    line-height: ${theme.typography.elements.h1.lineHeight};
    font-family: ${theme.fonts.primary};
    color: ${theme.colors.text.primary};
    margin: 0 0 ${theme.spacing.md};
  `}
`;

// Heading 2
export const Heading2 = styled.h2`
  ${({ theme }) => `
    font-size: ${theme.typography.elements.h2.fontSize};
    font-weight: ${theme.typography.elements.h2.fontWeight};
    line-height: ${theme.typography.elements.h2.lineHeight};
    font-family: ${theme.fonts.primary};
    color: ${theme.colors.text.primary};
    margin: 0 0 ${theme.spacing.sm};
  `}
`;

// Heading 3
export const Heading3 = styled.h3`
  ${({ theme }) => `
    font-size: ${theme.typography.elements.h3.fontSize};
    font-weight: ${theme.typography.elements.h3.fontWeight};
    line-height: ${theme.typography.elements.h3.lineHeight};
    font-family: ${theme.fonts.primary};
    color: ${theme.colors.text.primary};
    margin: 0 0 ${theme.spacing.sm};
  `}
`;

// Paragraph
export const Paragraph = styled.p`
  ${({ theme }) => `
    font-size: ${theme.typography.elements.p.fontSize};
    font-weight: ${theme.typography.elements.p.fontWeight};
    line-height: ${theme.typography.elements.p.lineHeight};
    font-family: ${theme.fonts.primary};
    color: ${theme.colors.text.secondary};
    margin: 0 0 ${theme.spacing.md};
  `}
`;

// Small text
export const SmallText = styled.small`
  ${({ theme }) => `
    font-size: ${theme.typography.elements.small.fontSize};
    font-weight: ${theme.typography.elements.small.fontWeight};
    line-height: ${theme.typography.elements.small.lineHeight};
    font-family: ${theme.fonts.primary};
    color: ${theme.colors.text.light};
  `}
`;
