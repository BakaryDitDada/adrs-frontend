'use client';

import { notFound, useParams } from 'next/navigation';
import ArticleHero from '@/components/website/sections/news/ArticleHero';
import ArticleContent from '@/components/website/sections/news/ArticleContent';
import AuthorSection from '@/components/website/sections/news/AuthorSection';
import RelatedArticles from '@/components/website/sections/news/RelatedArticles';
import SharedSection from '@/components/website/sections/news/SharedSection';
import { PageContainer as ArticlePageContainer } from '../../Home.styles';

// Sample data - replace with actual data fetching
const articles = [
  {
    id: 1,
    slug: 'lancement-projet-irrigation-kita',
    title: 'Lancement du Projet de Modernisation des Systèmes d\'Irrigation à Kita',
    excerpt: 'Un nouveau projet ambitieux visant à moderniser les systèmes d\'irrigation traditionnels pour améliorer la productivité agricole.',
    category: 'Hydraulique Rurale',
    date: '15 Jan 2024',
    author: {
      name: 'Dr. Amadou Diallo',
      role: 'Directeur Général',
      avatar: '/team/directeur.jpg',
      bio: 'Ingénieur agronome avec plus de 15 ans d\'expérience dans le développement rural.'
    },
    readTime: '5 min',
    views: 1245,
    image: '/news/irrigation-project.jpg',
    featured: true,
    content: `
      <p>Le projet de modernisation des systèmes d'irrigation à Kita représente une avancée majeure dans notre mission de développement rural durable. Financé par des partenaires internationaux, ce projet vise à transformer les pratiques agricoles traditionnelles en introduisant des technologies modernes d'irrigation.</p>
      
      <h2>Objectifs du projet</h2>
      <p>L'objectif principal est d'augmenter la productivité agricole tout en préservant les ressources en eau. Plus précisément, le projet prévoit :</p>
      <ul>
        <li>L'installation de 50 systèmes d'irrigation goutte-à-goutte</li>
        <li>La formation de 200 agriculteurs aux techniques d'irrigation moderne</li>
        <li>La réhabilitation de 300 hectares de périmètres agricoles</li>
        <li>La mise en place d'un système de gestion participative de l'eau</li>
      </ul>
      
      <h2>Bénéfices attendus</h2>
      <p>Ce projet devrait générer des bénéfices significatifs pour les communautés locales :</p>
      <ul>
        <li>Augmentation des rendements agricoles de 40%</li>
        <li>Réduction de la consommation d'eau de 30%</li>
        <li>Création de 150 emplois directs et indirects</li>
        <li>Amélioration de la sécurité alimentaire dans la région</li>
      </ul>
      
      <h2>Partenaires impliqués</h2>
      <p>Le projet est réalisé en partenariat avec plusieurs institutions :</p>
      <ul>
        <li>Banque Mondiale (financement)</li>
        <li>FAO (assistance technique)</li>
        <li>Ministère de l'Agriculture du Mali (coordination nationale)</li>
        <li>ONG locales (mise en œuvre terrain)</li>
      </ul>
      
      <h2>Calendrier de mise en œuvre</h2>
      <p>Le projet s'étalera sur 3 ans :</p>
      <ul>
        <li>Année 1 : Études et conception, formation des premiers groupes</li>
        <li>Année 2 : Installation des équipements, suivi rapproché</li>
        <li>Année 3 : Consolidation, évaluation, capitalisation</li>
      </ul>
      
      <p>Ce projet incarne notre engagement pour un développement rural durable et inclusif. Il permettra aux communautés de la vallée du fleuve Sénégal de mieux exploiter leur potentiel agricole tout en préservant les ressources naturelles pour les générations futures.</p>
    `,
    tags: ['Irrigation', 'Développement Durable', 'Formation'],
    relatedIds: [2, 3, 5]
  },
  {
    id: 2,
    slug: 'formation-200-agriculteurs',
    title: 'Formation de 200 Agriculteurs aux Techniques Agricoles Durables',
    excerpt: 'Un programme intensif de formation pour promouvoir des pratiques agricoles respectueuses de l\'environnement.',
    category: 'Formation',
    date: '10 Jan 2024',
    author: {
      name: 'Fatoumata Koné',
      role: 'Chef de Projet Hydraulique',
      avatar: '/team/hydraulique.jpg',
      bio: 'Spécialiste en hydraulique rurale avec une expertise particulière dans les systèmes d\'irrigation.'
    },
    readTime: '3 min',
    views: 892,
    image: '/news/training-program.jpg',
    content: '...',
    tags: ['Formation', 'Agriculture Durable'],
    relatedIds: [1, 3, 4]
  },
  {
    id: 3,
    slug: 'partenariat-banque-mondiale',
    title: 'Signature de Partenariat Stratégique avec la Banque Mondiale',
    excerpt: 'Un accord historique pour financer le développement des infrastructures rurales dans la région.',
    category: 'Partenariats',
    date: '5 Jan 2024',
    author: {
      name: 'Aïssata Diarra',
      role: 'Responsable Partenariats',
      avatar: '/team/partenariats.jpg',
      bio: 'Spécialiste en développement de partenariats stratégiques avec les institutions internationales.'
    },
    readTime: '4 min',
    views: 1567,
    image: '/news/partnership.jpg',
    content: '...',
    tags: ['Partenariat', 'Financement'],
    relatedIds: [1, 2, 5]
  },
  {
    id: 4,
    slug: 'marche-agricole-mahina',
    title: 'Inauguration du Nouveau Marché Agricole de Mahina',
    excerpt: 'Un marché moderne qui offre aux agriculteurs un espace commercial équitable et organisé.',
    category: 'Infrastructures',
    date: '28 Déc 2023',
    author: {
      name: 'Boubacar Coulibaly',
      role: 'Expert Agricole',
      avatar: '/team/agricole.jpg',
      bio: 'Agronome spécialisé dans les systèmes de production durable.'
    },
    readTime: '6 min',
    views: 2103,
    image: '/news/market-inauguration.jpg',
    content: '...',
    tags: ['Infrastructure', 'Commercialisation'],
    relatedIds: [2, 3, 6]
  },
  {
    id: 5,
    slug: 'rapport-annuel-2023',
    title: 'Rapport Annuel 2023 : Des Résultats Exceptionnels',
    excerpt: 'Découvrez les réalisations majeures de l\'ADRS au cours de l\'année écoulée.',
    category: 'Rapport',
    date: '20 Déc 2023',
    author: {
      name: 'Moussa Traoré',
      role: 'Responsable Formation',
      avatar: '/team/formation.jpg',
      bio: 'Expert en formation agricole et accompagnement des producteurs.'
    },
    readTime: '8 min',
    views: 1789,
    image: '/news/annual-report.jpg',
    content: '...',
    tags: ['Rapport', 'Bilan'],
    relatedIds: [1, 3, 6]
  },
  {
    id: 6,
    slug: 'innovation-suivi-hydrique-satellite',
    title: 'Innovation : Système de Suivi Hydrique par Satellite',
    excerpt: 'Une nouvelle technologie pour optimiser la gestion des ressources en eau dans la région.',
    category: 'Innovation',
    date: '15 Déc 2023',
    author: {
      name: 'Kadiatou Keita',
      role: 'Responsable Infrastructure',
      avatar: '/team/infrastructure.jpg',
      bio: 'Ingénieur en génie civil spécialisée dans les infrastructures rurales.'
    },
    readTime: '7 min',
    views: 1345,
    image: '/news/satellite-tech.jpg',
    content: '...',
    tags: ['Innovation', 'Technologie', 'Eau'],
    relatedIds: [1, 4, 5]
  }
];

export default function NewsDetailPage({ params }) {
  const { newId } = useParams(params);
  const article = articles.find(a => a.id === parseInt(newId));
  
  if (!article) {
    notFound();
  }

  const relatedArticles = articles.filter(a => article.relatedIds?.includes(a.id));

  return (
    <ArticlePageContainer>
      <ArticleHero article={article} />
      <ArticleContent article={article} />
      <AuthorSection author={article.author} />
      <SharedSection article={article} />
      {relatedArticles.length > 0 && (
        <RelatedArticles articles={relatedArticles} />
      )}
    </ArticlePageContainer>
  );
}