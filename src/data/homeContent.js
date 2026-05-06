export const homeContent = {
  navItems: [
      { label: "Accueil", href: "/" },
      { label: "Qui sommes-nous", href: "/about" },
      { label: "Actualités", href: "/news" },
      { label: "Nos Projets", href: "/projects" },
      { label: "Documentation", href: "/documents" },
      { label: "Contact", href: "/contact" },
  ],

  topNavIem: {
    contactInfo: [],
    socialMediaInfo: [],
    platformLink: "/platform"
  },
  
  about: {
    title: "Qui sommes-nous ?",
    description: "L'Agence de Développement Rural de la Vallée du Fleuve Sénégal (ADRS) est un établissement public à caractère administratif basé à Kita, au Mali. Créée pour impulser le développement agricole et rural dans la région, nous œuvrons pour améliorer durablement les conditions de vie des populations rurales.",
    mission: {
      title: "Notre Mission",
      description: "Promouvoir un développement rural intégré, durable et équitable dans la vallée du fleuve Sénégal.",
      points: [
        "Planification et mise en œuvre de projets agricoles et d'aménagement hydro-agricole",
        "Renforcement des capacités des producteurs et des organisations paysannes",
        "Appui à la commercialisation des produits agricoles",
        "Gestion durable des ressources naturelles",
        "Mobilisation des financements pour le développement local",
      ],
    },
  },
  
  interventions: {
    title: "Nos Domaines d'Intervention",
    items: [
      {
        title: "Agriculture Irriguée et Pluviale",
        description: "Développement de périmètres agricoles, amélioration des rendements, diversification des cultures",
        icon: "🌾",
      },
      {
        title: "Hydraulique Rurale",
        description: "Accès à l'eau potable, irrigation, gestion des eaux de surface",
        icon: "💧",
      },
      {
        title: "Infrastructures Rurales",
        description: "Pistes rurales, magasins de stockage, marchés agricoles",
        icon: "🏗️",
      },
      {
        title: "Formation et Accompagnement",
        description: "Renforcement des compétences techniques et organisationnelles des acteurs locaux",
        icon: "📚",
      },
    ],
  },
  
  // achievements: {
  //   title: "Nos Réalisations Phares",
  //   items: [
  //     {
  //       title: "Périmètre G/H à Mahina",
  //       description: "Réalisation et achèvement contribuant à l'extension des surfaces cultivables",
  //       year: "2023",
  //     },
  //     {
  //       title: "Fichier Fournisseurs",
  //       description: "Constitution pour une gestion transparente et efficace des marchés publics",
  //       year: "2022",
  //     },
  //     {
  //       title: "Appui Technique et Logistique",
  //       description: "Soutien aux campagnes agricoles, notamment en période de crue favorable",
  //       year: "2023",
  //     },
  //   ],
  // },

  // achievements: {
  //   title: "",
  //   items: [
  //     {
  //       id: 1,
  //       icon: <Target size={24} />,
  //       year: '2023',
  //       title: 'Périmètre G/H à Mahina',
  //       description: 'Réalisation et achèvement du périmètre contribuant à l\'extension des surfaces cultivables de 200 hectares.',
  //       color: '#10b981'
  //     },
  //     {
  //       id: 2,
  //       icon: <TrendingUp size={24} />,
  //       year: '2022',
  //       title: 'Fichier Fournisseurs',
  //       description: 'Constitution d\'un fichier fournisseurs pour une gestion transparente et efficace des marchés publics.',
  //       color: '#3b82f6'
  //     },
  //     {
  //       id: 3,
  //       icon: <Users size={24} />,
  //       year: '2023',
  //       title: 'Appui Technique aux Agriculteurs',
  //       description: 'Appui technique et logistique aux campagnes agricoles, notamment en période de crue favorable.',
  //       color: '#8b5cf6'
  //     },
  //     {
  //       id: 4,
  //       icon: <Award size={24} />,
  //       year: '2024',
  //       title: 'Programme de Formation Avancée',
  //       description: 'Formation de 500 agriculteurs sur les techniques agricoles modernes et durables.',
  //       color: '#f59e0b'
  //     }
  //   ]
  // },
  
  values: {
    title: "Nos Valeurs",
    items: [
      {
        title: "Engagement",
        description: "Envers les communautés rurales",
        icon: "🤝",
      },
      {
        title: "Transparence",
        description: "Dans la gestion des ressources",
        icon: "🔍",
      },
      {
        title: "Innovation",
        description: "Pour des solutions adaptées aux défis locaux",
        icon: "💡",
      },
      {
        title: "Durabilité",
        description: "Des actions entreprises",
        icon: "🌱",
      },
    ],
  },
  
  partners: {
    title: "Nos Partenaires",
    description: "L'ADRS collabore étroitement avec des institutions nationales et internationales",
    items: [
      { name: "Ministère du Développement Rural", type: "Gouvernement" },
      { name: "Collectivités Territoriales", type: "Local" },
      { name: "Organisations Paysannes", type: "Communautaire" },
      { name: "Partenaires Techniques et Financiers", type: "International" },
      { name: "ONG et Institutions de Recherche", type: "Collaboration" },
    ],
  },
};

export default homeContent;