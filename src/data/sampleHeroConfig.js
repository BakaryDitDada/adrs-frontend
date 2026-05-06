const heroImages = {
  irrigation: '/images/slider/irrigation-1.jpg',
  hydroAgricultural: '/images/slider/barrage-1.jpg',
  communityIrrigation: '/images/slider/irrigation-2.png',
  equipment: '/images/slider/Travaux-AHA.jpg'
};

export const sampleHeroConfig = {
  autoplay: true,
  interval: 6000,
  showArrows: true,
  showDots: true,
  transition: 'slide',
  slides: [
    {
      id: 'slide-1',
      title: "Développement Rural Intégré & Durable",
      subtitle: "ADRS Mali",
      description: "Œuvrons pour améliorer durablement les conditions de vie des populations rurales à travers des projets innovants et inclusifs.",
      background: {
        type: 'image',
        src: heroImages.irrigation,
        alt: 'Système d\'irrigation moderne dans les champs',
        overlayColor: '#000000',
        // overlayColor: '#1a5632',
        overlayOpacity: 0.6
      },
      contentAlignment: 'left',
      ctas: [
        {
          text: "Domaines d'intervention",
          href: '/services',
          variant: 'primary',
          size: 'sm'
        },
        {
          text: 'Nous contacter',
          href: '/projets-programmes',
          variant: 'outline',
          size: 'sm'
        }
      ],
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      published: true
    },
    {
      id: 'slide-2',
      title: "Agriculture Durable & Innovante",
      subtitle: "Périmètres Agricoles",
      description: "Développement de périmètres agricoles modernes pour augmenter la productivité et la sécurité alimentaire.",
      background: {
        type: 'image',
        src: heroImages.communityIrrigation,
        alt: 'Irrigation communautaire en milieu rural',
        // overlayColor: '#1e40af',
        overlayColor: '#000000',
        overlayOpacity: 0.6
      },
      contentAlignment: 'left',
      ctas: [
        {
          text: 'Aménagements Hydro-agricoles',
          href: '/services/amenagements-hydro-agricoles',
          // variant: 'secondary',
          variant: 'primary',
          size: 'sm'
        },
        {
          text: 'Projets / Programmes',
          href: '/services/equipements-agricoles',
          variant: 'outline',
          size: 'sm'
        }
      ],
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      published: true
    },
    {
      id: 'slide-3',
     title: "Formation & Accompagnement",
    subtitle: "Renforcement des Capacités",
    description: "Formation des agriculteurs et accompagnement technique pour une agriculture moderne et durable.",
      background: {
        type: 'image',
        src: heroImages.hydroAgricultural,
        // poster: 'https://images.unsplash.com/photo-1599423423927-a2c777b40f0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&h=900',
        // muted: true,
        // loop: true,
        alt: 'Barrage hydro-agricole moderne',
        overlayColor: '#000000',
        overlayOpacity: 0.6
      },
      contentAlignment: 'left',
      ctas: [
        {
          text: 'Documentation Technique',
          href: '/documentation',
          variant: 'primary',
          size: 'sm'
        },
        {
          text: 'Nos Réalisations',
          href: '/projets-programmes',
          variant: 'outline',
          size: 'sm'
        }
      ],
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
      published: true
    },
    {
      id: 'slide-4',
      title: "Hydraulique Rurale",
      subtitle: "Accès à l'Eau Potable",
      description: "Installation de systèmes d'irrigation et d'accès à l'eau potable pour les communautés rurales.",
      background: {
        type: 'image',
        src: heroImages.equipment,
        alt: 'Équipements hydro-agricoles modernes',
        overlayColor: '#000000',
        // overlayColor: '#059669',
        overlayOpacity: 0.6
      },
      contentAlignment: 'left',
      ctas: [
        {
          text: 'Catalogue des Équipements',
          href: '/services/equipements-agricoles',
          // variant: 'secondary',
          variant: 'primary',
          size: 'sm'
        },
        {
          text: 'En savoir plus...',
          href: '/contact',
          variant: 'outline',
          size: 'sm'
        }
      ],
      order: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
      published: true
    }
  ]
};