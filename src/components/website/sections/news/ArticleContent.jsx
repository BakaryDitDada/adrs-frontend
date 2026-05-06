'use client';

import { motion } from 'framer-motion';
import { ContentWrapper } from '@/styles/pages/news-detail.styles';
import * as S from './ArticleContent.styles';

export default function ArticleContent({ article }) {
  return (
    <S.ContentContainer>
      <ContentWrapper>
        <S.ArticleBody
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </S.ArticleBody>
        
        <S.TagsContainer>
          <h4>Tags :</h4>
          <div className="tags">
            {article.tags.map(tag => (
              <S.Tag key={tag}>{tag}</S.Tag>
            ))}
          </div>
        </S.TagsContainer>
      </ContentWrapper>
    </S.ContentContainer>
  );
}