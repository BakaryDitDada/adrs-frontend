'use client';

import { motion } from 'framer-motion';
import { FileText, Download, BookOpen } from 'lucide-react';
import * as S from './DocumentsHero.styles';

export default function DocumentsHero() {
  const stats = [
    { icon: <FileText size={24} />, number: '150+', label: 'Documents' },
    { icon: <Download size={24} />, number: '12K+', label: 'Téléchargements' },
    { icon: <BookOpen size={24} />, number: '45', label: 'Publications' },
  ];

  return (
    <S.HeroWrapper>
      <S.HeroTitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Centre de <span>documentation</span>
      </S.HeroTitle>
      <S.HeroSubtitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Accédez à nos rapports, études, guides techniques et publications officielles.
      </S.HeroSubtitle>
      <S.StatsGrid
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {stats.map((stat, idx) => (
          <S.StatItem key={idx}>
            <div className="icon">{stat.icon}</div>
            <div className="number">{stat.number}</div>
            <div className="label">{stat.label}</div>
          </S.StatItem>
        ))}
      </S.StatsGrid>
    </S.HeroWrapper>
  );
}

// 'use client';

// import { motion } from 'framer-motion';
// import styled from 'styled-components';
// import { FileText, Download, BookOpen } from 'lucide-react';

// const HeroWrapper = styled.section`
//   padding: 4rem 1rem;
//   background: ${({ theme }) => theme.colors.background.secondary};
//   text-align: center;
// `;

// const HeroTitle = styled(motion.h1)`
//   font-size: clamp(2rem, 5vw, 3.5rem);
//   font-weight: 700;
//   color: ${({ theme }) => theme.colors.text.primary};
//   margin-bottom: 1rem;
  
//   span {
//     color: ${({ theme }) => theme.colors.primary};
//   }
// `;

// const HeroSubtitle = styled(motion.p)`
//   font-size: 1.25rem;
//   color: ${({ theme }) => theme.colors.text.secondary};
//   max-width: 700px;
//   margin: 0 auto 3rem;
//   line-height: 1.6;
// `;

// const StatsGrid = styled(motion.div)`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 1.5rem;
//   max-width: 800px;
//   margin: 0 auto;
  
//   @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
//     grid-template-columns: repeat(3, 1fr);
//     gap: 2rem;
//   }
// `;

// const StatItem = styled.div`
//   background: ${({ theme }) => theme.colors.background.primary};
//   border-radius: 16px;
//   padding: 1.5rem 1rem;
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   box-shadow: ${({ theme }) => theme.shadows.sm};
  
//   .icon {
//     width: 48px;
//     height: 48px;
//     border-radius: 12px;
//     background: ${({ theme }) => theme.colors.primary}15;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin: 0 auto 1rem;
//     color: ${({ theme }) => theme.colors.primary};
//   }
  
//   .number {
//     font-size: 1.75rem;
//     font-weight: 700;
//     color: ${({ theme }) => theme.colors.text.primary};
//     margin-bottom: 0.25rem;
//   }
  
//   .label {
//     font-size: 0.875rem;
//     color: ${({ theme }) => theme.colors.text.secondary};
//   }
// `;

// export default function DocumentsHero() {
//   const stats = [
//     { icon: <FileText size={24} />, number: '150+', label: 'Documents' },
//     { icon: <Download size={24} />, number: '12K+', label: 'Téléchargements' },
//     { icon: <BookOpen size={24} />, number: '45', label: 'Publications' },
//   ];

//   return (
//     <HeroWrapper>
//       <HeroTitle
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         Centre de <span>documentation</span>
//       </HeroTitle>
//       <HeroSubtitle
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1, duration: 0.5 }}
//       >
//         Accédez à nos rapports, études, guides techniques et publications officielles.
//       </HeroSubtitle>
//       <StatsGrid
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.2, duration: 0.5 }}
//       >
//         {stats.map((stat, idx) => (
//           <StatItem key={idx}>
//             <div className="icon">{stat.icon}</div>
//             <div className="number">{stat.number}</div>
//             <div className="label">{stat.label}</div>
//           </StatItem>
//         ))}
//       </StatsGrid>
//     </HeroWrapper>
//   );
// }