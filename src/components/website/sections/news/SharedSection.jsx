'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Mail, 
  Link2,
  Check
} from 'lucide-react';
import { ContentWrapper } from '@/styles/pages/news-detail.styles';
import * as S from './SharedSection.styles';

export default function SharedSection({ article }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <S.ShareContainer>
      <ContentWrapper>
        <S.ShareTitle>
          Partagez cet <span>article</span>
        </S.ShareTitle>
        
        <S.ShareButtons>
          <S.ShareButton
            $color="#1877f2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')}
          >
            <Facebook size={18} />
            Facebook
          </S.ShareButton>
          
          <S.ShareButton
            $color="#1da1f2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${article.title}`, '_blank')}
          >
            <Twitter size={18} />
            Twitter
          </S.ShareButton>
          
          <S.ShareButton
            $color="#0a66c2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank')}
          >
            <Linkedin size={18} />
            LinkedIn
          </S.ShareButton>
          
          <S.ShareButton
            $color="#ff5646"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(`mailto:?subject=${article.title}&body=${shareUrl}`)}
          >
            <Mail size={18} />
            Email
          </S.ShareButton>
        </S.ShareButtons>
        
        <S.CopyLinkButton
          onClick={handleCopyLink}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {copied ? (
            <>
              <Check size={18} />
              Lien copié !
            </>
          ) : (
            <>
              <Link2 size={18} />
              Copier le lien
            </>
          )}
        </S.CopyLinkButton>
      </ContentWrapper>
    </S.ShareContainer>
  );
}