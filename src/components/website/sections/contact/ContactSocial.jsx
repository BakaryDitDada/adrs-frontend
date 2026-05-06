'use client';

import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';
import { SectionContainer, SectionContent } from '@/styles/pages/contact.styles';
import * as S from './ContactSocial.styles';

export default function ContactSocial() {
  const socials = [
    { icon: <Facebook />, href: '#', label: 'Facebook' },
    { icon: <Twitter />, href: '#', label: 'Twitter' },
    { icon: <Linkedin />, href: '#', label: 'LinkedIn' },
    { icon: <Youtube />, href: '#', label: 'YouTube' },
    { icon: <Instagram />, href: '#', label: 'Instagram' },
  ];

  return (
    <SectionContainer>
      <SectionContent>
        <S.SocialWrapper>
          <S.SocialTitle>Suivez-nous sur les réseaux</S.SocialTitle>
          <S.SocialIcons>
            {socials.map((social, idx) => (
              <S.SocialLink
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {social.icon}
              </S.SocialLink>
            ))}
          </S.SocialIcons>
        </S.SocialWrapper>
      </SectionContent>
    </SectionContainer>
  );
}