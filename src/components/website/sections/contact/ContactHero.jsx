'use client';

import * as S from "./ContactHero.styles";

export default function ContactHero() {
  return (
    <S.HeroWrapper>
      <S.HeroTitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Contactez-<span>nous</span>
      </S.HeroTitle>
      <S.HeroSubtitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        Une question, un projet ? Notre équipe est à votre écoute pour échanger 
        sur vos besoins et opportunités de collaboration.
      </S.HeroSubtitle>
    </S.HeroWrapper>
  );
}