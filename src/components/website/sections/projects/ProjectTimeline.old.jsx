'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock, Calendar } from 'lucide-react';
import { SectionContainer, SectionContent, SectionTitle } from '@/styles/pages/project-detail.styles';
import * as S from './ProjectTimeline.styles';

export default function ProjectTimeline({ timeline }) {
  return (
    <SectionContainer>
      <SectionContent>
        <SectionTitle>
          Chronologie du <span>projet</span>
        </SectionTitle>
        
        <S.TimelineContainer>
          {timeline.map((phase, index) => (
            <S.TimelineItem
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <S.TimelineDot $status={phase.status}>
                {phase.status === 'completed' ? <CheckCircle /> : <Clock />}
              </S.TimelineDot>
              
              <S.TimelineContent>
                <S.PhaseTitle>{phase.phase}</S.PhaseTitle>
                <S.PhaseDate>
                  <Calendar size={14} />
                  {phase.date}
                </S.PhaseDate>
                <S.StatusBadge className={phase.status}>
                  {phase.status === 'completed' ? 'Terminé' :
                   phase.status === 'in-progress' ? 'En cours' : 'Planifié'}
                </S.StatusBadge>
              </S.TimelineContent>
            </S.TimelineItem>
          ))}
        </S.TimelineContainer>
      </SectionContent>
    </SectionContainer>
  );
}

// 'use client';

// import { motion } from 'framer-motion';
// import styled from 'styled-components';
// import { CheckCircle, Clock, Calendar } from 'lucide-react';
// import { SectionContainer, SectionContent, SectionTitle } from '@/styles/pages/project-detail.styles';

// const TimelineContainer = styled.div`
//   position: relative;
  
//   &::before {
//     content: '';
//     position: absolute;
//     left: 24px;
//     top: 0;
//     bottom: 0;
//     width: 2px;
//     background: ${({ theme }) => theme.colors.border};
    
//     @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
//       left: 50%;
//       transform: translateX(-50%);
//     }
//   }
// `;

// const TimelineItem = styled(motion.div)`
//   display: flex;
//   margin-bottom: 2rem;
//   position: relative;
  
//   @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
//     &:nth-child(odd) {
//       flex-direction: row-reverse;
//     }
//   }
// `;

// const TimelineDot = styled.div`
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
//   background: ${({ theme, $status }) => 
//     $status === 'completed' ? theme.colors.success :
//     $status === 'in-progress' ? theme.colors.primary :
//     theme.colors.text.light};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: white;
//   flex-shrink: 0;
//   z-index: 1;
  
//   svg {
//     width: 24px;
//     height: 24px;
//   }
// `;

// const TimelineContent = styled.div`
//   flex: 1;
//   padding: 0 1.5rem 2rem;
  
//   @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
//     width: calc(50% - 50px);
//     padding: 0 2rem 2rem;
    
//     &:nth-child(odd) {
//       text-align: right;
//     }
//   }
// `;

// const PhaseTitle = styled.h4`
//   font-size: 1.25rem;
//   font-weight: 600;
//   color: ${({ theme }) => theme.colors.text.primary};
//   margin-bottom: 0.5rem;
// `;

// const PhaseDate = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   font-size: 0.875rem;
//   color: ${({ theme }) => theme.colors.text.secondary};
//   margin-bottom: 0.5rem;
  
//   svg {
//     color: ${({ theme }) => theme.colors.primary};
//   }
// `;

// const StatusBadge = styled.span`
//   display: inline-block;
//   padding: 0.25rem 1rem;
//   border-radius: 20px;
//   font-size: 0.75rem;
//   font-weight: 600;
//   text-transform: uppercase;
  
//   &.completed {
//     background: ${({ theme }) => theme.colors.success}20;
//     color: ${({ theme }) => theme.colors.success};
//   }
//   &.in-progress {
//     background: ${({ theme }) => theme.colors.primary}20;
//     color: ${({ theme }) => theme.colors.primary};
//   }
//   &.planned {
//     background: ${({ theme }) => theme.colors.text.light}20;
//     color: ${({ theme }) => theme.colors.text.light};
//   }
// `;

// export default function ProjectTimeline({ timeline }) {
//   return (
//     <SectionContainer>
//       <SectionContent>
//         <SectionTitle>
//           Chronologie du <span>projet</span>
//         </SectionTitle>
        
//         <TimelineContainer>
//           {timeline.map((phase, index) => (
//             <TimelineItem
//               key={index}
//               initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//             >
//               <TimelineDot $status={phase.status}>
//                 {phase.status === 'completed' ? <CheckCircle /> : <Clock />}
//               </TimelineDot>
              
//               <TimelineContent>
//                 <PhaseTitle>{phase.phase}</PhaseTitle>
//                 <PhaseDate>
//                   <Calendar size={14} />
//                   {phase.date}
//                 </PhaseDate>
//                 <StatusBadge className={phase.status}>
//                   {phase.status === 'completed' ? 'Terminé' :
//                    phase.status === 'in-progress' ? 'En cours' : 'Planifié'}
//                 </StatusBadge>
//               </TimelineContent>
//             </TimelineItem>
//           ))}
//         </TimelineContainer>
//       </SectionContent>
//     </SectionContainer>
//   );
// }