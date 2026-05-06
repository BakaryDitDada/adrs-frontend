import styled from "styled-components";

export const Section = styled.section`
  padding: 80px 0;
  
  &:nth-child(even) {
    background: ${({ theme }) => theme.colors.background.primary};
    // background: ${({ theme }) => theme.colors.background.secondary};
  }
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

export const SectionTitle = styled.h2`
  text-align: center;
  // font-size: clamp(2rem, 4vw, 2.5rem);
  font-size: ${({ theme }) => theme.fontSizes.h2};
  margin-bottom: 5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (max-width: 768px) {
    margin-bottom: 30px;
  }
`;

export const SectionContent = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 2rem;
  color: ${({ theme }) => theme.colors.text.primary} !important;
`;