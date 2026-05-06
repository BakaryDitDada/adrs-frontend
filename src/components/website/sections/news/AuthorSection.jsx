'use client';

import { User, Mail, Linkedin, Twitter } from 'lucide-react';
import { ContentWrapper } from '@/styles/pages/news-detail.styles';
import * as S from './AuthorSection.styles';

export default function AuthorSection({ author }) {
  return (
    <S.AuthorContainer>
      <ContentWrapper>
        <S.AuthorCard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <S.AuthorAvatar>
            <User size={60} />
          </S.AuthorAvatar>
          <S.AuthorInfo>
            <S.AuthorName>{author.name}</S.AuthorName>
            <S.AuthorRole>{author.role}</S.AuthorRole>
            <S.AuthorBio>{author.bio}</S.AuthorBio>
            <S.AuthorSocial>
              <a href="#" aria-label="Email">
                <Mail size={18} />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </S.AuthorSocial>
          </S.AuthorInfo>
        </S.AuthorCard>
      </ContentWrapper>
    </S.AuthorContainer>
  );
}