import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const SectionContainer = styled.section`
  padding: 4rem 0;
  position: relative;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 6rem 0;
  }
`;

export const SectionContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

export const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.h2};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
  text-align: center;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: ${({ theme }) => theme.fontSizes.h2};
  }
`;

export const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodyLg};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
  line-height: 1.6;
`;

export const CtaSection = styled.section`
  width: 100%;
  height: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

export const CtaContentWrapper = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary}20;
  border-radius: 16px;
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const CtaContent = styled.div`
  max-width: 800px;
  text-align: center;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

export const CtaTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.h2}; // 2.5rem ≈ 32px
  margin-bottom: ${({ theme }) => theme.spacing.sm}; // 10px
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const CtaDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.bodyLg}; // 1.25rem ≈ 20px
  margin-bottom: ${({ theme }) => theme.spacing.md}; // 20px
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const CtaButton = styled.a`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg}; // 10px 30px
  background: ${({ theme }) => theme.colors.secondary};
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.body}; // 1rem ≈ 16px
  font-weight: ${({ theme }) => theme.fontWeights.semibold}; // 600
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondaryLight};
  }
`;

export const HrLine = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.lg} 10rem;
`;