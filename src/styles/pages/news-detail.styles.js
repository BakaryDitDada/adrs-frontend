'use client';

import styled from 'styled-components';

export const ArticlePageContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0;
`;

export const SectionContainer = styled.section`
  padding: 4rem 1rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 5rem 2rem;
  }
`;

export const SectionContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

export const ContentWrapper = styled.div`
  max-width: 85rem;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0;
  }
`;