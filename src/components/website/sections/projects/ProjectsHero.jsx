'use client';

import { motion } from 'framer-motion';
import { FolderTree, Map, Target, Users } from 'lucide-react';
import * as S from './ProjectsHero.styles';

export default function ProjectsHero() {
  const stats = [
    {
      icon: <FolderTree />,
      number: '25+',
      label: 'Projets Réalisés',
      color: '#2563eb'
    },
    {
      icon: <Map />,
      number: '15',
      label: 'Communes Bénéficiaires',
      color: '#10b981'
    },
    {
      icon: <Target />,
      number: '5000+',
      label: 'Hectares Aménagés',
      color: '#7c3aed'
    },
    {
      icon: <Users />,
      number: '2000+',
      label: 'Agriculteurs Impactés',
      color: '#f59e0b'
    }
  ];

  return (
    <S.HeroContainer>
      <S.HeroContent>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <S.HeroTitle>
            Nos <span className="gradient-text">Projets</span> de{' '}
            <span className="gradient-text">Développement</span>
          </S.HeroTitle>
          
          <S.HeroDescription>
            Découvrez l&apos;ensemble de nos projets agricoles, d&apos;hydraulique rurale et 
            d&apos;infrastructures qui transforment durablement la vallée du fleuve Sénégal.
          </S.HeroDescription>
          
          <S.StatsGrid
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <S.StatCard>
                  <S.StatIcon color={stat.color}>
                    {stat.icon}
                  </S.StatIcon>
                  <S.StatNumber>{stat.number}</S.StatNumber>
                  <S.StatLabel>{stat.label}</S.StatLabel>
                </S.StatCard>
              </motion.div>
            ))}
          </S.StatsGrid>
        </motion.div>
      </S.HeroContent>
    </S.HeroContainer>
  );
}

// 'use client';

// import { motion } from 'framer-motion';
// import styled, { keyframes } from 'styled-components';
// import { FolderTree, Map, Target, Users } from 'lucide-react';

// const gradientFlow = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

// const HeroContainer = styled.section`
//   position: relative;
//   min-height: 60vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   background: linear-gradient(
//     135deg,
//     ${({ theme }) => theme.colors.background.primary} 0%,
//     ${({ theme }) => theme.colors.background.secondary} 100%
//   );
//   overflow: hidden;
//   padding: 4rem 1rem;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: 
//       radial-gradient(circle at 20% 30%, ${({ theme }) => theme.colors.primary}08 0%, transparent 50%),
//       radial-gradient(circle at 80% 70%, ${({ theme }) => theme.colors.secondary}05 0%, transparent 50%);
//     z-index: 0;
//   }
// `;

// const HeroContent = styled.div`
//   position: relative;
//   z-index: 1;
//   max-width: 1000px;
//   margin: 0 auto;
//   text-align: center;
// `;

// const HeroTitle = styled(motion.h1)`
//   font-size: clamp(2rem, 5vw, 4rem);
//   font-weight: 800;
//   color: ${({ theme }) => theme.colors.text.primary};
//   margin-bottom: 1.5rem;
//   line-height: 1.1;
  
//   .gradient-text {
//     background: linear-gradient(
//       90deg,
//       ${({ theme }) => theme.colors.primary},
//       ${({ theme }) => theme.colors.secondary}
//     );
//     background-size: 200% 200%;
//     animation: ${gradientFlow} 5s ease infinite;
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//     display: inline-block;
//   }
// `;

// const HeroDescription = styled(motion.p)`
//   font-size: 1.25rem;
//   color: ${({ theme }) => theme.colors.text.secondary};
//   max-width: 700px;
//   margin: 0 auto 3rem;
//   line-height: 1.7;
// `;

// const StatsGrid = styled(motion.div)`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 1.5rem;
//   max-width: 800px;
//   margin: 0 auto;
  
//   @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
//     grid-template-columns: repeat(4, 1fr);
//     gap: 2rem;
//   }
// `;

// const StatCard = styled.div`
//   background: ${({ theme }) => theme.colors.background.primary};
//   border-radius: 16px;
//   padding: 1.5rem 1rem;
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   box-shadow: ${({ theme }) => theme.shadows.sm};
//   transition: all 0.3s ease;
  
//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: ${({ theme }) => theme.shadows.md};
//     border-color: ${({ theme }) => theme.colors.primary};
//   }
// `;

// const StatIcon = styled.div`
//   width: 48px;
//   height: 48px;
//   border-radius: 12px;
//   background: linear-gradient(
//     135deg,
//     ${({ color }) => color}20,
//     ${({ color }) => color}10
//   );
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin: 0 auto 1rem;
  
//   svg {
//     color: ${({ color }) => color};
//     width: 24px;
//     height: 24px;
//   }
// `;

// const StatNumber = styled.div`
//   font-size: 1.75rem;
//   font-weight: 700;
//   color: ${({ theme }) => theme.colors.text.primary};
//   margin-bottom: 0.25rem;
// `;

// const StatLabel = styled.div`
//   font-size: 0.875rem;
//   color: ${({ theme }) => theme.colors.text.secondary};
//   line-height: 1.4;
// `;

// export default function ProjectsHero() {
//   const stats = [
//     {
//       icon: <FolderTree />,
//       number: '25+',
//       label: 'Projets Réalisés',
//       color: '#2563eb'
//     },
//     {
//       icon: <Map />,
//       number: '15',
//       label: 'Communes Bénéficiaires',
//       color: '#10b981'
//     },
//     {
//       icon: <Target />,
//       number: '5000+',
//       label: 'Hectares Aménagés',
//       color: '#7c3aed'
//     },
//     {
//       icon: <Users />,
//       number: '2000+',
//       label: 'Agriculteurs Impactés',
//       color: '#f59e0b'
//     }
//   ];

//   return (
//     <HeroContainer>
//       <HeroContent>
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <HeroTitle>
//             Nos <span className="gradient-text">Projets</span> de{' '}
//             <span className="gradient-text">Développement</span>
//           </HeroTitle>
          
//           <HeroDescription>
//             Découvrez l&apos;ensemble de nos projets agricoles, d&apos;hydraulique rurale et 
//             d&apos;infrastructures qui transforment durablement la vallée du fleuve Sénégal.
//           </HeroDescription>
          
//           <StatsGrid
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, scale: 0.5 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: 0.4 + index * 0.1 }}
//               >
//                 <StatCard>
//                   <StatIcon color={stat.color}>
//                     {stat.icon}
//                   </StatIcon>
//                   <StatNumber>{stat.number}</StatNumber>
//                   <StatLabel>{stat.label}</StatLabel>
//                 </StatCard>
//               </motion.div>
//             ))}
//           </StatsGrid>
//         </motion.div>
//       </HeroContent>
//     </HeroContainer>
//   );
// }