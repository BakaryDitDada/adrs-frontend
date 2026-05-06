'use client';

import styled from 'styled-components';

export const ProjectDetailContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0;
`;

export const SectionContainer = styled.section`
  padding: ${({ $padding }) => $padding || "4rem 1rem"};
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    // padding: 5rem 2rem;
    padding: ${({ $padding }) => $padding || "5rem 2rem"};
  }
`;

export const SectionContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 2rem;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;