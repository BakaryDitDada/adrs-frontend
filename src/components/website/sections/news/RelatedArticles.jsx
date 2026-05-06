'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { useTheme } from 'styled-components';
import { ContentWrapper } from '@/styles/pages/news-detail.styles';
import * as S from './RelatedArticles.styles';

export default function RelatedArticles({ articles }) {
  const theme = useTheme();

  return (
    <S.RelatedContainer>
      <ContentWrapper style={{ paddingTop: "5rem", borderTop: `1px solid ${theme.colors.border}`}}>
        <S.RelatedTitle>
          Articles <span>similaires</span>
        </S.RelatedTitle>
        
        <S.RelatedGrid>
          {articles.map((article, index) => (
            <S.RelatedCard
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <S.CardImage>
                <Calendar size={40} color="var(--text-secondary)" opacity={0.3} />
              </S.CardImage>
              
              <S.CardContent>
                <S.CardCategory>{article.category}</S.CardCategory>
                <S.CardTitle>{article.title}</S.CardTitle>
                <S.CardDate>
                  <Calendar size={14} />
                  {article.date}
                </S.CardDate>
                <S.ReadLink href={`/news/${article.slug}`}>
                  Lire l&apos;article
                  <ArrowRight size={14} />
                </S.ReadLink>
              </S.CardContent>
            </S.RelatedCard>
          ))}
        </S.RelatedGrid>
      </ContentWrapper>
    </S.RelatedContainer>
  );
}

// 'use client';

// import { motion } from 'framer-motion';
// import styled from 'styled-components';
// import Link from 'next/link';
// import { Calendar, ArrowRight } from 'lucide-react';
// import { ContentWrapper } from '@/styles/pages/news-detail.styles';

// const RelatedContainer = styled.section`
//   padding: 4rem 1rem;
//   background: ${({ theme }) => theme.colors.background.secondary};
// `;

// const RelatedTitle = styled.h3`
//   font-size: 2rem;
//   font-weight: 700;
//   color: ${({ theme }) => theme.colors.text.primary};
//   margin-bottom: 2rem;
//   text-align: center;
  
//   span {
//     color: ${({ theme }) => theme.colors.primary};
//   }
// `;

// const RelatedGrid = styled.div`
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 2rem;
  
//   @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
//     grid-template-columns: repeat(2, 1fr);
//   }
  
//   @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
//     grid-template-columns: repeat(3, 1fr);
//   }
// `;

// const RelatedCard = styled(motion.article)`
//   background: ${({ theme }) => theme.colors.background.primary};
//   border-radius: 16px;
//   overflow: hidden;
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   box-shadow: ${({ theme }) => theme.shadows.sm};
//   transition: all 0.3s ease;
  
//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: ${({ theme }) => theme.shadows.md};
//     border-color: ${({ theme }) => theme.colors.primary};
//   }
// `;

// const CardImage = styled.div`
//   height: 160px;
//   background: linear-gradient(
//     135deg,
//     ${({ theme }) => theme.colors.primary}20,
//     ${({ theme }) => theme.colors.secondary}20
//   );
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const CardContent = styled.div`
//   padding: 1.5rem;
// `;

// const CardCategory = styled.span`
//   font-size: 0.75rem;
//   font-weight: 600;
//   color: ${({ theme }) => theme.colors.primary};
//   text-transform: uppercase;
//   letter-spacing: 0.5px;
//   margin-bottom: 0.5rem;
//   display: block;
// `;

// const CardTitle = styled.h4`
//   font-size: 1.125rem;
//   font-weight: 600;
//   color: ${({ theme }) => theme.colors.text.primary};
//   margin-bottom: 0.75rem;
//   line-height: 1.4;
// `;

// const CardDate = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   font-size: 0.875rem;
//   color: ${({ theme }) => theme.colors.text.secondary};
//   margin-bottom: 1rem;
  
//   svg {
//     color: ${({ theme }) => theme.colors.primary};
//   }
// `;

// const ReadLink = styled(Link)`
//   display: inline-flex;
//   align-items: center;
//   gap: 0.5rem;
//   font-size: 0.875rem;
//   font-weight: 600;
//   color: ${({ theme }) => theme.colors.primary};
//   text-decoration: none;
  
//   svg {
//     transition: transform 0.3s ease;
//   }
  
//   &:hover svg {
//     transform: translateX(5px);
//   }
// `;

// export default function RelatedArticles({ articles }) {
//   return (
//     <RelatedContainer>
//       <ContentWrapper>
//         <RelatedTitle>
//           Articles <span>similaires</span>
//         </RelatedTitle>
        
//         <RelatedGrid>
//           {articles.map((article, index) => (
//             <RelatedCard
//               key={article.id}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1 }}
//             >
//               <CardImage>
//                 <Calendar size={40} color="var(--text-secondary)" opacity={0.3} />
//               </CardImage>
              
//               <CardContent>
//                 <CardCategory>{article.category}</CardCategory>
//                 <CardTitle>{article.title}</CardTitle>
//                 <CardDate>
//                   <Calendar size={14} />
//                   {article.date}
//                 </CardDate>
//                 <ReadLink href={`/news/${article.slug}`}>
//                   Lire l&apos;article
//                   <ArrowRight size={14} />
//                 </ReadLink>
//               </CardContent>
//             </RelatedCard>
//           ))}
//         </RelatedGrid>
//       </ContentWrapper>
//     </RelatedContainer>
//   );
// }