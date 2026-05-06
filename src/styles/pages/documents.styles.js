'use client';

import styled from 'styled-components';

export const DocumentsPageContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0;
`;

export const SectionContainer = styled.section`
  padding: 2rem 1rem;
  // padding: 4rem 1rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    // padding: 3rem 2rem;
    // padding: 5rem 2rem;
  }
`;

export const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
  text-align: center;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 2.5rem;
  }
`;

export const SectionSubtitle = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem;
  line-height: 1.6;
`;