import styled, { css } from 'styled-components';
import responsive from '@/styles/Responsive';

export const PartnersSectionContainer = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} 0; // 100px
  background: ${({ theme }) => theme.colors.background.secondary};
  
  ${responsive(css`
    padding: ${({ theme }) => theme.spacing.xl} 0; // 80px
  `, "sm")}
`;

export const PartnersContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md}; // 20px
`;

export const SectionTitle = styled.h2`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.elements.h2.fontSize};
  margin-bottom: ${({ theme }) => theme.spacing.md}; // 20px
  color: ${({ theme }) => theme.colors.text.secondary};
  
  span {
    color: ${({ theme }) => theme.colors.secondary};
  }
  
  ${responsive(css`
    font-size: ${({ theme }) => theme.fontSizes.bodyLg}; // 1.75rem ≈ 18px
  `, "sm")}
`;

export const SectionSubtitle = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.bodyLg}; // 1.125rem ≈ 18px
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 800px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl}; // 60px
  line-height: 1.6;
  
  ${responsive(css`
    font-size: ${({ theme }) => theme.fontSizes.body}; // 1rem ≈ 16px
    margin-bottom: ${({ theme }) => theme.spacing.lg}; // 40px
  `, "sm")}
`;

export const PartnersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ theme }) => theme.spacing.lg}; // 30px
  
  ${responsive(css`
    grid-template-columns: repeat(2, 1fr);
  `, "md")}
  
  ${responsive(css`
    grid-template-columns: repeat(3, 1fr);
  `, "lg")}
`;

export const PartnerCategory = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.radii.lg}; // 16px
  padding: ${({ theme }) => theme.spacing.lg}; // 30px
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-${({ theme }) => theme.spacing.xs}); // -5px ≈ spacing.xs (8px)
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CategoryTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.bodyLg}; // 1.25rem ≈ 18px
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

export const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm}; // 15px
`;

export const PartnerItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}; // 12px
  padding: ${({ theme }) => theme.spacing.sm}; // 12px
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radii.md}; // 10px
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
    transform: translateX(${({ theme }) => theme.spacing.xs}); // 5px ≈ spacing.xs (8px)
  }
`;

export const PartnerIcon = styled.div`
  width: ${({ theme }) => theme.spacing.md}; // 36px
  height: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.sm}; // 8px
  background: ${({ color }) => color}20;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ color }) => color};
  flex-shrink: 0;
`;

export const PartnerName = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.body}; // 0.9375rem ≈ 16px
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0; // 4px
  line-height: 1.3;
`;

export const PartnerType = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.caption}; // 0.75rem ≈ 14px
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.background.tertiary};
  padding: 2px ${({ theme }) => theme.spacing.xs}; // 2px 8px
  border-radius: ${({ theme }) => theme.radii.md}; // 10px
  display: inline-block;
`;

export const CollaborationSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl}; // 60px
  padding: ${({ theme }) => theme.spacing.xl}; // 40px
  background: ${({ theme, $bg }) => $bg === "primary" ? theme.colors.background.primary : theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radii.xl}; // 20px
  border: 2px dashed ${({ theme }) => theme.colors.primary}40;
  
  ${responsive(css`
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md}; // 30px 20px
  `, "sm")}
`;

export const CollaborationTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.h3}; // 1.5rem ≈ 24px
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm}; // 15px
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs}; // 10px
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  ${responsive(css`
    font-size: ${({ theme }) => theme.fontSizes.bodyLg}; // 1.25rem ≈ 18px
  `, "sm")}
`;

export const CollaborationDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg}; // 30px
  line-height: 1.6;
`;

export const CollaborationBenefits = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.sm}; // 15px
  
  ${responsive(css`
    grid-template-columns: 1fr;
  `, "sm")}
`;

export const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}; // 12px
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md}; // 12px 16px
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radii.md}; // 10px
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.body}; // 0.9375rem ≈ 16px
  
  svg {
    color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
  }
`;


// import styled from 'styled-components';

// export const PartnersSectionContainer = styled.section`
//   padding: 100px 0;
//   background: ${({ theme }) => theme.colors.background.secondary};
  
//   @media (max-width: 768px) {
//     padding: 80px 0;
//   }
// `;

// export const PartnersContent = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 20px;
// `;

// export const SectionTitle = styled.h2`
//   text-align: center;
//   font-size: clamp(2rem, 4vw, 2.5rem);
//   margin-bottom: 20px;
//   color: ${({ theme }) => theme.colors.text.primary};
  
//   span {
//     color: ${({ theme }) => theme.colors.primary};
//   }
  
//   @media (max-width: 768px) {
//     font-size: 1.75rem;
//   }
// `;

// export const SectionSubtitle = styled.p`
//   text-align: center;
//   font-size: 1.125rem;
//   color: ${({ theme }) => theme.colors.text.secondary};
//   max-width: 800px;
//   margin: 0 auto 60px;
//   line-height: 1.6;
  
//   @media (max-width: 768px) {
//     font-size: 1rem;
//     margin-bottom: 40px;
//   }
// `;

// export const PartnersGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(1, 1fr);
//   gap: 30px;
  
//   @media (min-width: 768px) {
//     grid-template-columns: repeat(2, 1fr);
//   }
  
//   @media (min-width: 1024px) {
//     grid-template-columns: repeat(3, 1fr);
//   }
// `;

// export const PartnerCategory = styled.div`
//   background: ${({ theme }) => theme.colors.background.primary};
//   border-radius: 16px;
//   padding: 30px;
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   transition: all 0.3s ease;
  
//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: ${({ theme }) => theme.shadows.lg};
//     border-color: ${({ theme }) => theme.colors.primary};
//   }
// `;

// export const CategoryTitle = styled.h3`
//   font-size: 1.25rem;
//   color: ${({ theme }) => theme.colors.text.primary};
//   margin: 0;
// `;

// export const CategoryList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
// `;

// export const PartnerItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   padding: 12px;
//   background: ${({ theme }) => theme.colors.background.secondary};
//   border-radius: 10px;
//   transition: all 0.2s ease;
  
//   &:hover {
//     background: ${({ theme }) => theme.colors.background.tertiary};
//     transform: translateX(5px);
//   }
// `;

// export const PartnerIcon = styled.div`
//   width: 36px;
//   height: 36px;
//   border-radius: 8px;
//   background: ${({ color }) => color}20;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: ${({ color }) => color};
//   flex-shrink: 0;
// `;

// export const PartnerName = styled.h4`
//   font-size: 0.9375rem;
//   color: ${({ theme }) => theme.colors.text.primary};
//   margin: 0 0 4px 0;
//   line-height: 1.3;
// `;

// export const PartnerType = styled.span`
//   font-size: 0.75rem;
//   color: ${({ theme }) => theme.colors.text.secondary};
//   background: ${({ theme }) => theme.colors.background.tertiary};
//   padding: 2px 8px;
//   border-radius: 10px;
//   display: inline-block;
// `;

// export const CollaborationSection = styled.div`
//   margin-top: 60px;
//   padding: 40px;
//   background: ${({ theme, $bg }) => $bg === "primary" ? theme.colors.background.primary : theme.colors.background.secondary};
//   border-radius: 20px;
//   border: 2px dashed ${({ theme }) => theme.colors.primary}40;
  
//   @media (max-width: 768px) {
//     padding: 30px 20px;
//   }
// `;

// export const CollaborationTitle = styled.h3`
//   font-size: 1.5rem;
//   color: ${({ theme }) => theme.colors.text.primary};
//   margin-bottom: 15px;
//   display: flex;
//   align-items: center;
//   gap: 10px;
  
//   svg {
//     color: ${({ theme }) => theme.colors.primary};
//   }
  
//   @media (max-width: 768px) {
//     font-size: 1.25rem;
//   }
// `;

// export const CollaborationDescription = styled.p`
//   color: ${({ theme }) => theme.colors.text.secondary};
//   margin-bottom: 30px;
//   line-height: 1.6;
// `;

// export const CollaborationBenefits = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 15px;
  
//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//   }
// `;

// export const BenefitItem = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 12px;
//   padding: 12px 16px;
//   background: ${({ theme }) => theme.colors.background.secondary};
//   border-radius: 10px;
//   color: ${({ theme }) => theme.colors.text.primary};
//   font-size: 0.9375rem;
  
//   svg {
//     color: ${({ theme }) => theme.colors.primary};
//     flex-shrink: 0;
//   }
// `;