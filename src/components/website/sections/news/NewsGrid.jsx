'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  Eye, 
  Share2, 
  Bookmark
} from 'lucide-react';
import { SectionContainer, SectionContent } from '@/styles/pages/news.styles';
import * as S from './NewsGrid.styles';

export default function NewsGrid({
    searchQuery,
    selectedCategories,
    selectedYears,
    selectedTags
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('latest');
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  
  const articles = [
    {
      id: 1,
      title: 'Lancement du Projet de Modernisation des Systèmes d\'Irrigation à Kita',
      excerpt: 'Un nouveau projet ambitieux visant à moderniser les systèmes d\'irrigation traditionnels pour améliorer la productivité agricole.',
      category: 'Hydraulique Rurale',
      tags: ['Événement'],
      date: '15 Jan 2024',
      author: 'Dr. Amadou Diallo',
      readTime: '5 min',
      views: 1245,
      image: '/news/irrigation-project.jpg',
      featured: true
    },
    {
      id: 2,
      title: 'Formation de 200 Agriculteurs aux Techniques Agricoles Durables',
      excerpt: 'Un programme intensif de formation pour promouvoir des pratiques agricoles respectueuses de l\'environnement.',
      category: 'Formation',
      date: '10 Jan 2024',
      author: 'Fatoumata Koné',
      readTime: '3 min',
      views: 892,
      image: '/news/training-program.jpg'
    },
    {
      id: 3,
      title: 'Signature de Partenariat Stratégique avec la Banque Mondiale',
      excerpt: 'Un accord historique pour financer le développement des infrastructures rurales dans la région.',
      category: 'Partenariats',
      date: '5 Jan 2024',
      author: 'Aïssata Diarra',
      readTime: '4 min',
      views: 1567,
      image: '/news/partnership.jpg'
    },
    {
      id: 4,
      title: 'Inauguration du Nouveau Marché Agricole de Mahina',
      excerpt: 'Un marché moderne qui offre aux agriculteurs un espace commercial équitable et organisé.',
      category: 'Infrastructures',
      date: '28 Déc 2023',
      author: 'Boubacar Coulibaly',
      readTime: '6 min',
      views: 2103,
      image: '/news/market-inauguration.jpg'
    },
    {
      id: 5,
      title: 'Rapport Annuel 2023 : Des Résultats Exceptionnels',
      excerpt: 'Découvrez les réalisations majeures de l\'ADRS au cours de l\'année écoulée.',
      category: 'Rapport',
      date: '20 Déc 2023',
      author: 'Moussa Traoré',
      readTime: '8 min',
      views: 1789,
      image: '/news/annual-report.jpg'
    },
    {
      id: 6,
      title: 'Innovation : Système de Suivi Hydrique par Satellite',
      excerpt: 'Une nouvelle technologie pour optimiser la gestion des ressources en eau dans la région.',
      category: 'Innovation',
      date: '15 Déc 2023',
      author: 'Kadiatou Keita',
      readTime: '7 min',
      views: 1345,
      image: '/news/satellite-tech.jpg'
    }
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(articles.length / itemsPerPage);

  const toggleBookmark = (id) => {
    setBookmarkedArticles(prev =>
      prev.includes(id)
        ? prev.filter(articleId => articleId !== id)
        : [...prev, id]
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  const handleShare = async (article) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: `/news/${article.id}`
        });
      } catch (err) {
        console.log('Erreur de partage:', err);
      }
    } else {
      // Fallback: copier le lien
      navigator.clipboard.writeText(`${window.location.origin}/news/${article.id}`);
      alert('Lien copié dans le presse-papier!');
    }
  };
  
  const filteredArticles = articles.filter((article) => {
    const normalizedQuery = searchQuery.toLowerCase();

    const matchesSearch =
      normalizedQuery === '' ||
      article.title.toLowerCase().includes(normalizedQuery) ||
      article.excerpt.toLowerCase().includes(normalizedQuery);

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(article.category);

    const articleYear = article.date.split(' ').pop();

    const matchesYear =
      selectedYears.length === 0 ||
      selectedYears.includes(articleYear) ||
      (selectedYears.includes('2019+') && Number(articleYear) <= 2019);

    const matchesTags =
      selectedTags.length === 0 ||
      (article.tags &&
        selectedTags.some((tag) => article.tags.includes(tag)));

    return (
      matchesSearch &&
      matchesCategory &&
      matchesYear &&
      matchesTags
    );
  });

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'popular') {
      return b.views - a.views;
    } else if (sortBy === 'featured') {
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
    return 0;
  });

  const paginatedArticles = sortedArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const renderPagination = () => {
    const pages = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push(<S.PageEllipsis key="start-ellipsis">...</S.PageEllipsis>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <S.PageButton
          key={i}
          $active={currentPage === i}
          onClick={() => handlePageChange(i)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {i}
        </S.PageButton>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<S.PageEllipsis key="end-ellipsis">...</S.PageEllipsis>);
      }
      pages.push(
        <S.PageButton
          key={totalPages}
          $active={currentPage === totalPages}
          onClick={() => handlePageChange(totalPages)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {totalPages}
        </S.PageButton>
      );
    }

    return pages;
  };

  return (
    <SectionContainer>
      <SectionContent>
        <S.GridContainer>
          <S.GridHeader>
            <S.ResultsInfo>
              Affichage de <strong>{sortedArticles.length}</strong> articles sur{' '}
              <strong>{articles.length}</strong> au total
            </S.ResultsInfo>
            
            <S.SortSelect>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Plus récents</option>
                <option value="popular">Plus populaires</option>
                <option value="featured">En vedette</option>
              </select>
            </S.SortSelect>
          </S.GridHeader>

          <AnimatePresence mode="wait">
            <motion.div
              key={`page-${currentPage}-${sortBy}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <S.NewsGridWrapper>
                {paginatedArticles.map((article, index) => (
                  <S.NewsCard
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <S.CardImage>
                      <div 
                        className="card-image"
                        style={{
                          background: `linear-gradient(135deg, #2563eb20, #7c3aed20)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Calendar size={48} color="var(--text-secondary)" opacity={0.2} />
                      </div>
                      <div className="category-badge">
                        {article.category}
                      </div>
                    </S.CardImage>
                    
                    <S.CardContent>
                      <S.CardMeta>
                        <span className="meta-item">
                          <Calendar size={14} />
                          {article.date}
                        </span>
                        <span className="meta-item">
                          <User size={14} />
                          {article.author}
                        </span>
                        <span className="meta-item">
                          <Clock size={14} />
                          {article.readTime}
                        </span>
                      </S.CardMeta>
                      
                      <S.CardTitle>
                        <a href={`/news/${article.id}`}>
                          {article.title}
                        </a>
                      </S.CardTitle>
                      
                      <S.CardExcerpt>
                        {article.excerpt}
                      </S.CardExcerpt>
                      
                      <S.CardFooter>
                        <S.ReadMore 
                          href={`/news/${article.id}`}
                          className="read-more"
                        >
                          Lire l&apos;article
                          <ArrowRight size={16} />
                        </S.ReadMore>
                        
                        <S.CardActions>
                          <button
                            onClick={() => toggleBookmark(article.id)}
                            className={bookmarkedArticles.includes(article.id) ? 'bookmarked' : ''}
                            aria-label="Ajouter aux favoris"
                          >
                            <Bookmark size={18} />
                          </button>
                          <button
                            onClick={() => handleShare(article)}
                            aria-label="Partager"
                          >
                            <Share2 size={18} />
                          </button>
                          <button aria-label="Nombre de vues" className='views'>
                            <Eye size={18} />
                            <span style={{ fontSize: '1.2rem', marginLeft: '0.4rem' }}>
                              {article.views.toLocaleString()}
                            </span>
                          </button>
                        </S.CardActions>
                      </S.CardFooter>
                    </S.CardContent>
                  </S.NewsCard>
                ))}
              </S.NewsGridWrapper>
            </motion.div>
          </AnimatePresence>

          {totalPages > 1 && (
            <S.Pagination>
              <S.PageButton
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                ←
              </S.PageButton>
              
              {renderPagination()}
              
              <S.PageButton
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                →
              </S.PageButton>
            </S.Pagination>
          )}
        </S.GridContainer>
      </SectionContent>
    </SectionContainer>
  );
}