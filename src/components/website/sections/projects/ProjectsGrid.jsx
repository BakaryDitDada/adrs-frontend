'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Calendar, Users, ArrowRight, Droplets, Sprout, Building } from 'lucide-react';
import { SectionContainer, SectionContent } from '@/styles/pages/projects.styles';
import * as S from './ProjectsGrid.styles';

// Sample project data - replace with API call
const projectsData = [
  {
    id: 1,
    title: 'Modernisation des Systèmes d\'Irrigation à Kita',
    slug: 'modernisation-irrigation-kita',
    description: 'Installation de systèmes d\'irrigation modernes pour optimiser l\'utilisation de l\'eau et augmenter les rendements agricoles.',
    category: 'hydraulique',
    categoryLabel: 'Hydraulique Rurale',
    categoryIcon: <Droplets />,
    status: 'en-cours',
    location: 'Kita',
    startDate: '2023',
    beneficiaries: 350,
    progress: 65,
    image: '/projects/irrigation.jpg'
  },
  {
    id: 2,
    title: 'Développement de Périmètres Agricoles à Mahina',
    slug: 'perimetre-agricole-mahina',
    description: 'Aménagement de 300 hectares de terres agricoles avec des techniques de conservation des sols.',
    category: 'agricole',
    categoryLabel: 'Agriculture Durable',
    categoryIcon: <Sprout />,
    status: 'acheve',
    location: 'Mahina',
    startDate: '2021',
    beneficiaries: 500,
    progress: 100,
    image: '/projects/perimetre.jpg'
  },
  {
    id: 3,
    title: 'Construction du Marché Agricole de Bafoulabé',
    description: 'Réalisation d\'un marché moderne pour faciliter la commercialisation des produits agricoles.',
    category: 'infrastructure',
    categoryLabel: 'Infrastructures Rurales',
    categoryIcon: <Building />,
    status: 'en-cours',
    location: 'Bafoulabé',
    startDate: '2024',
    beneficiaries: 200,
    progress: 25,
    image: '/projects/market.jpg'
  },
  {
    id: 4,
    title: 'Programme de Formation en Techniques Agricoles Durables',
    description: 'Formation de 500 agriculteurs aux pratiques agroécologiques et à la gestion durable des ressources.',
    category: 'formation',
    categoryLabel: 'Formation',
    categoryIcon: <Users />,
    status: 'en-cours',
    location: 'Kayes',
    startDate: '2024',
    beneficiaries: 500,
    progress: 40,
    image: '/projects/training.jpg'
  },
  {
    id: 5,
    title: 'Adduction d\'Eau Potable pour 10 Villages',
    description: 'Installation de pompes solaires et de réseaux de distribution d\'eau potable dans les zones rurales.',
    category: 'hydraulique',
    categoryLabel: 'Hydraulique Rurale',
    categoryIcon: <Droplets />,
    status: 'planifie',
    location: 'Kita',
    startDate: '2025',
    beneficiaries: 2000,
    progress: 0,
    image: '/projects/water.jpg'
  },
  {
    id: 6,
    title: 'Construction de Magasins de Stockage',
    description: 'Édification de magasins de stockage pour réduire les pertes post-récolte et améliorer la conservation.',
    category: 'infrastructure',
    categoryLabel: 'Infrastructures Rurales',
    categoryIcon: <Building />,
    status: 'acheve',
    location: 'Mahina',
    startDate: '2022',
    beneficiaries: 150,
    progress: 100,
    image: '/projects/storage.jpg'
  },
  {
    id: 7,
    title: 'Projet de Réhabilitation des Sols',
    description: 'Techniques de conservation des sols et de reforestation pour lutter contre l\'érosion.',
    category: 'agricole',
    categoryLabel: 'Agriculture Durable',
    categoryIcon: <Sprout />,
    status: 'en-cours',
    location: 'Bafoulabé',
    startDate: '2023',
    beneficiaries: 250,
    progress: 70,
    image: '/projects/soil.jpg'
  },
  {
    id: 8,
    title: 'Partenariat avec la Banque Mondiale',
    description: 'Accord de financement pour le développement des infrastructures rurales.',
    category: 'partenariat',
    categoryLabel: 'Partenariats',
    categoryIcon: <Users />,
    status: 'acheve',
    location: 'Régionale',
    startDate: '2023',
    beneficiaries: null,
    progress: 100,
    image: '/projects/partnership.jpg'
  },
  {
    id: 9,
    title: 'Aménagement de Bas-fonds à Kayes',
    description: 'Mise en valeur des bas-fonds pour la culture du riz et du maraîchage.',
    category: 'agricole',
    categoryLabel: 'Agriculture Durable',
    categoryIcon: <Sprout />,
    status: 'planifie',
    location: 'Kayes',
    startDate: '2025',
    beneficiaries: 300,
    progress: 0,
    image: '/projects/bas-fonds.jpg'
  }
];

export default function ProjectsGrid({
    searchQuery,
    category,
    status,
    region,
    year,
}) {
  const [currentPage, setCurrentPage] = useState(1);  

  const normalize = (value = '') =>
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  const filteredProjects = projectsData.filter((project) => {
    const normalizedQuery = normalize(searchQuery);

    const matchesSearch =
      normalizedQuery === '' ||
      normalize(project.title).includes(normalizedQuery) ||
      normalize(project.description).includes(normalizedQuery);

    const matchesCategory =
      category === '' || project.category === category;

    const matchesYear =
      year === '' || project.startDate === year;

    const matchesStatus =
      status === '' || project.status === status;

    const matchesRegion =
      region === '' ||
      normalize(project.location) === normalize(region);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesYear &&
      matchesStatus &&
      matchesRegion
    );
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  const getStatusLabel = (status) => {
    const labels = {
      'en-cours': 'En cours',
      'acheve': 'Achevé',
      'planifie': 'Planifié'
    };
    return labels[status] || status;
  };

  return (
    <SectionContainer>
      <SectionContent>
        <S.ResultsInfo>
          <strong>{filteredProjects.length}</strong> documents disponibles
        </S.ResultsInfo>
        <S.GridContainer>
          <AnimatePresence mode="wait">
            <motion.div
              key={`page-${currentPage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <S.ProjectsGridWrapper>
                {paginatedProjects.map((project, index) => (
                  <S.ProjectCard
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <S.CardImage>
                      <div 
                        className="card-image"
                        style={{
                          background: `linear-gradient(135deg, ${project.category === 'hydraulique' ? '#2563eb' : project.category === 'agricole' ? '#10b981' : '#7c3aed'}20, ${project.category === 'hydraulique' ? '#2563eb' : project.category === 'agricole' ? '#10b981' : '#7c3aed'}05)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {project.categoryIcon}
                      </div>
                      <span className={`status-badge ${project.status}`}>
                        {getStatusLabel(project.status)}
                      </span>
                    </S.CardImage>
                    
                    <S.CardContent>
                      <S.CardCategory>
                        {project.categoryIcon}
                        {project.categoryLabel}
                      </S.CardCategory>
                      
                      <S.CardTitle>
                        <Link href={`/projects/${project.id}`}>
                          {project.title}
                        </Link>
                      </S.CardTitle>
                      
                      <S.CardDescription>
                        {project.description}
                      </S.CardDescription>
                      
                      <S.CardMeta>
                        <span className="meta-item">
                          <MapPin size={16} />
                          {project.location}
                        </span>
                        <span className="meta-item">
                          <Calendar size={16} />
                          Début: {project.startDate}
                        </span>
                        {project.beneficiaries && (
                          <span className="meta-item">
                            <Users size={16} />
                            {project.beneficiaries} bénéficiaires
                          </span>
                        )}
                      </S.CardMeta>
                      
                      <S.CardFooter>
                        {project.status === 'en-cours' && (
                          <>
                            <S.ProgressBar $progress={project.progress}>
                              <div className="progress-fill" />
                            </S.ProgressBar>
                            <S.ProgressText>{project.progress}%</S.ProgressText>
                          </>
                        )}
                        {project.status === 'acheve' && (
                          <S.ProgressText style={{ color: '#10b981' }}>
                            Projet terminé
                          </S.ProgressText>
                        )}
                        {project.status === 'planifie' && (
                          <S.ProgressText style={{ color: '#f59e0b' }}>
                            À venir
                          </S.ProgressText>
                        )}
                        <S.ReadMore href={`/projects/${project.id}`}>
                          Détails
                          <ArrowRight size={14} />
                        </S.ReadMore>
                      </S.CardFooter>
                    </S.CardContent>
                  </S.ProjectCard>
                ))}
              </S.ProjectsGridWrapper>
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
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <S.PageButton
                  key={page}
                  $active={currentPage === page}
                  onClick={() => handlePageChange(page)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {page}
                </S.PageButton>
              ))}
              
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