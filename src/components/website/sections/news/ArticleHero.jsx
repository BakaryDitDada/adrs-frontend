'use client';

import { motion } from 'framer-motion';
import { Calendar, User, Clock, Eye, Share2, Bookmark } from 'lucide-react';
import { ContentWrapper } from '@/styles/pages/news-detail.styles';
import {
  HeroContainer,
  CategoryBadge,
  ArticleTitle,
  MetaContainer,
  ActionButtons,
  ActionButton,
  FeaturedImage
} from './ArticleHero.styles';

export default function ArticleHero({ article }) {
  return (
    <HeroContainer>
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CategoryBadge>{article.category}</CategoryBadge>
          
          <ArticleTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {article.title}
          </ArticleTitle>
          
          <MetaContainer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="meta-item">
              <Calendar size={18} />
              {article.date}
            </span>
            <span className="meta-item">
              <User size={18} />
              {article.author.name}
            </span>
            <span className="meta-item">
              <Clock size={18} />
              {article.readTime}
            </span>
            <span className="meta-item">
              <Eye size={18} />
              {article.views.toLocaleString()} vues
            </span>
          </MetaContainer>
          
          <ActionButtons
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ActionButton
              $primary
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.print()}
            >
              <Share2 size={18} />
              Partager
            </ActionButton>
            <ActionButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={article.bookmarked ? 'bookmarked' : ''}
            >
              <Bookmark size={18} />
              Enregistrer
            </ActionButton>
          </ActionButtons>
          
          <FeaturedImage
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Replace with Next.js Image when ready */}
            <div style={{
              background: `linear-gradient(135deg, #2563eb20, #7c3aed20)`,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Calendar size={80} color="var(--text-secondary)" opacity={0.2} />
            </div>
          </FeaturedImage>
        </motion.div>
      </ContentWrapper>
    </HeroContainer>
  );
}