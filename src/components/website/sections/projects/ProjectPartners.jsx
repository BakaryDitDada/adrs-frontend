'use client';

import { motion } from 'framer-motion';
import { SectionContainer, SectionContent, SectionTitle } from '@/styles/pages/project-detail.styles';
import * as S from './ProjectPartners.styles';

export default function ProjectPartners({ partners }) {
  return (
    <S.PartnersContainer>
      {/* <SectionContent> */}
        <S.PartnersTitle>
          Nos <span>Partenaires</span>
        </S.PartnersTitle>
        
        <S.PartnersGrid>
          {partners.map((partner, index) => (
            <S.PartnerItem
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="logo">
                {/* Replace with actual logo */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: `linear-gradient(135deg, #2563eb20, #7c3aed20)`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)'
                }}>
                  Logo
                </div>
              </div>
              <div className="name">{partner.name}</div>
            </S.PartnerItem>
          ))}
        </S.PartnersGrid>
      {/* </SectionContent> */}
    </S.PartnersContainer>
  );
}


// 'use client';

// import { motion } from 'framer-motion';
// import styled from 'styled-components';
// import { SectionContainer, SectionContent, SectionTitle } from '@/styles/pages/project-detail.styles';

// const PartnersGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 2rem;
//   align-items: center;
//   justify-items: center;
  
//   @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
//     grid-template-columns: repeat(4, 1fr);
//     gap: 3rem;
//   }
// `;

// const PartnerItem = styled(motion.div)`
//   text-align: center;
  
//   .logo {
//     width: 120px;
//     height: 120px;
//     border-radius: 50%;
//     background: ${({ theme }) => theme.colors.background.secondary};
//     border: 1px solid ${({ theme }) => theme.colors.border};
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin: 0 auto 1rem;
//     padding: 1rem;
    
//     img {
//       max-width: 100%;
//       max-height: 100%;
//       object-fit: contain;
//     }
//   }
  
//   .name {
//     font-weight: 600;
//     color: ${({ theme }) => theme.colors.text.primary};
//     font-size: 1rem;
//   }
// `;

// export default function ProjectPartners({ partners }) {
//   return (
//     <SectionContainer>
//       <SectionContent>
//         <SectionTitle>
//           Nos <span>partenaires</span>
//         </SectionTitle>
        
//         <PartnersGrid>
//           {partners.map((partner, index) => (
//             <PartnerItem
//               key={index}
//               initial={{ opacity: 0, scale: 0.5 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <div className="logo">
//                 {/* Replace with actual logo */}
//                 <div style={{
//                   width: '60px',
//                   height: '60px',
//                   background: `linear-gradient(135deg, #2563eb20, #7c3aed20)`,
//                   borderRadius: '50%',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   color: 'var(--text-secondary)'
//                 }}>
//                   Logo
//                 </div>
//               </div>
//               <div className="name">{partner.name}</div>
//             </PartnerItem>
//           ))}
//         </PartnersGrid>
//       </SectionContent>
//     </SectionContainer>
//   );
// }