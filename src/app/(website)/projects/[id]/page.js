'use client';

import { notFound, useParams } from 'next/navigation';
import ProjectHero from '@/components/website/sections/projects/ProjectHero';
import ProjectDetail from '@/components/website/sections/projects/ProjectDetail';
import ProjectPartners from '@/components/website/sections/projects/ProjectPartners';
import ProjectTimeline from '@/components/website/sections/projects/ProjectTimeline';
import RelatedProjects from '@/components/website/sections/projects/RelatedProjects';
import { PageContainer as ProjectDetailContainer, HrLine } from '../../Home.styles';
import CTASection from '@/components/common/CTASection';
import { FileText, MessageSquare } from 'lucide-react';

// Sample project data (extended from list)
const projectsData = [
  {
    id: 1,
    slug: 'modernisation-irrigation-kita',
    title: 'Modernisation des Systèmes d\'Irrigation à Kita',
    subtitle: 'Améliorer la productivité agricole grâce à des technologies d\'irrigation modernes',
    description: `
      <p>Le projet de modernisation des systèmes d'irrigation à Kita vise à transformer les pratiques agricoles traditionnelles en introduisant des technologies d'irrigation modernes. Financé par la Banque Mondiale et le gouvernement malien, ce projet s'étend sur 3 ans (2023-2026).</p>
      <p>L'objectif principal est d'augmenter la productivité agricole tout en réduisant la consommation d'eau de 30% grâce à des systèmes goutte-à-goutte et des pompes solaires.</p>
      <h3>Objectifs spécifiques</h3>
      <ul>
        <li>Installer 50 systèmes d'irrigation goutte-à-goutte sur 300 hectares</li>
        <li>Former 200 agriculteurs aux techniques d'irrigation moderne</li>
        <li>Mettre en place un système de gestion participative de l'eau</li>
        <li>Réduire les pertes d'eau de 40%</li>
      </ul>
      <h3>Bénéfices attendus</h3>
      <ul>
        <li>Augmentation des rendements de 50% pour les cultures maraîchères</li>
        <li>Création de 150 emplois directs</li>
        <li>Sécurité alimentaire renforcée pour 500 ménages</li>
      </ul>
    `,
    category: 'hydraulique',
    categoryLabel: 'Hydraulique Rurale',
    status: 'en-cours',
    location: 'Kita',
    startDate: '2023',
    endDate: '2026',
    budget: '2.5M €',
    beneficiaries: 350,
    progress: 65,
    image: '/projects/irrigation.jpg',
    gallery: [
      '/projects/gallery/irrigation1.jpg',
      '/projects/gallery/irrigation2.jpg',
      '/projects/gallery/irrigation3.jpg',
    ],
    partners: [
      { name: 'Banque Mondiale', logo: '/partners/world-bank.png' },
      { name: 'Ministère de l\'Agriculture', logo: '/partners/agriculture.png' },
      { name: 'FAO', logo: '/partners/fao.png' },
    ],
    timeline: [
      { phase: 'Études préparatoires', date: 'Jan 2023 - Jun 2023', status: 'completed' },
      { phase: 'Installation pilote', date: 'Jul 2023 - Dec 2023', status: 'completed' },
      { phase: 'Déploiement phase 1', date: 'Jan 2024 - Dec 2024', status: 'in-progress' },
      { phase: 'Déploiement phase 2', date: 'Jan 2025 - Dec 2025', status: 'planned' },
      { phase: 'Évaluation et clôture', date: 'Jan 2026 - Jun 2026', status: 'planned' },
    ],
    relatedIds: [2, 3, 5],
  },
  {
    id: 2,
    slug: 'perimetre-agricole-mahina',
    title: 'Développement de Périmètres Agricoles à Mahina',
    subtitle: 'Aménagement de 300 hectares pour une agriculture durable',
    description: '...',
    category: 'agricole',
    categoryLabel: 'Agriculture Durable',
    status: 'acheve',
    location: 'Mahina',
    startDate: '2021',
    endDate: '2023',
    budget: '1.8M €',
    beneficiaries: 500,
    progress: 100,
    image: '/projects/perimetre.jpg',
    gallery: [],
    partners: [],
    timeline: [],
    relatedIds: [1, 4, 6],
  },
  // ... autres projets
];

export default function ProjectDetailPage({ params }) {
  const { id } = useParams(params);
  const project = projectsData.find(p => p.id === parseInt(id));
  
  if (!project) {
    notFound();
  }

  const relatedProjects = projectsData.filter(p => project.relatedIds?.includes(p.id));

  return (
      <ProjectDetailContainer>
        <ProjectHero project={project} />
        <ProjectDetail project={project} />
        {project.timeline && project.timeline.length > 0 && (
          <ProjectTimeline timeline={project.timeline} />
        )}
        {project.partners && project.partners.length > 0 && (
          <ProjectPartners partners={project.partners} />
        )}
        <HrLine />
        {relatedProjects.length > 0 && (
          <RelatedProjects projects={relatedProjects} />
        )}
        <CTASection
          title="Intéressé par ce projet ?"
          description="Contactez-nous pour plus d'informations ou discuter d'une collaboration."
          actions={[
            {
              label: 'Nous contacter',
              href: '/contact',
              icon: MessageSquare,
            },
            {
              label: 'Voir les documents',
              href: '/documents',
              icon: FileText,
              variant: 'secondary',
            },
          ]}
        />
      </ProjectDetailContainer>
  );
}