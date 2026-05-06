'use client';

import { motion } from 'framer-motion';
import { Building2, Users, Globe, Shield, Target, Award, Handshake, Network } from 'lucide-react';
import {
  PartnersSectionContainer,
  PartnersContent,
  SectionTitle,
  SectionSubtitle,
  PartnersGrid,
  PartnerCategory,
  CategoryTitle,
  CategoryList,
  PartnerItem,
  PartnerIcon,
  PartnerName,
  PartnerType,
  CollaborationSection,
  CollaborationTitle,
  CollaborationDescription,
  CollaborationBenefits,
  BenefitItem
} from './PartnersSection.styles';

const partnersByCategory = [
  {
    category: 'Gouvernance',
    icon: <Building2 size={20} />,
    color: '#3b82f6',
    partners: [
      { name: 'Ministère du Développement Rural', type: 'Gouvernement National' },
      { name: 'Conseil d\'Administration', type: 'Organe de Décision' },
      { name: 'Direction Générale', type: 'Management Stratégique' }
    ]
  },
  {
    category: 'Collectivités Locales',
    icon: <Users size={20} />,
    color: '#10b981',
    partners: [
      { name: 'Communes de la Vallée', type: 'Autorités Locales' },
      { name: 'Conseils Régionaux', type: 'Gouvernance Régionale' },
      { name: 'Associations Villageoises', type: 'Organisations Communautaires' }
    ]
  },
  {
    category: 'Organisations Paysannes',
    icon: <Target size={20} />,
    color: '#f59e0b',
    partners: [
      { name: 'Coopératives Agricoles', type: 'Producteurs Organisés' },
      { name: 'Associations de Producteurs', type: 'Groupements Professionnels' },
      { name: 'Syndicats Agricoles', type: 'Représentation Sectorielle' }
    ]
  },
  {
    category: 'Partenaires Techniques',
    icon: <Globe size={20} />,
    color: '#8b5cf6',
    partners: [
      { name: 'Organisations Internationales', type: 'Expertise Technique' },
      { name: 'Institutions de Recherche', type: 'Innovation Agricole' },
      { name: 'ONG Nationales et Internationales', type: 'Appui Technique' }
    ]
  },
  {
    category: 'Partenaires Financiers',
    icon: <Shield size={20} />,
    color: '#ec4899',
    partners: [
      { name: 'Bailleurs de Fonds', type: 'Financement de Projets' },
      { name: 'Banques de Développement', type: 'Crédits Agricoles' },
      { name: 'Fonds Internationaux', type: 'Financement Climatique' }
    ]
  },
  {
    category: 'Partenariats Stratégiques',
    icon: <Handshake size={20} />,
    color: '#0ea5e9',
    partners: [
      { name: 'Secteur Privé Agricole', type: 'Entreprises Agroalimentaires' },
      { name: 'Centres de Formation', type: 'Capacitation des Acteurs' },
      { name: 'Réseaux de Développement', type: 'Coopération Sud-Sud' }
    ]
  }
];

const benefits = [
  'Échange de connaissances et d\'expertise',
  'Mobilisation des ressources financières',
  'Renforcement des capacités techniques',
  'Accès aux innovations technologiques',
  'Amélioration de la gouvernance locale',
  'Durabilité des interventions'
];

export default function PartnersSection() {
  return (
    <PartnersSectionContainer >
      <PartnersContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>
            Nos <span>Partenariats</span> & Collaborations
          </SectionTitle>
          
          <SectionSubtitle>
            L&apos;ADRS collabore étroitement avec un réseau diversifié d&apos;institutions 
            nationales et internationales pour un développement rural intégré.
          </SectionSubtitle>

          <PartnersGrid>
            {partnersByCategory.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <PartnerCategory>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '20px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: `${category.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: category.color
                    }}>
                      {category.icon}
                    </div>
                    <CategoryTitle>{category.category}</CategoryTitle>
                  </div>
                  
                  <CategoryList>
                    {category.partners.map((partner, partnerIndex) => (
                      <PartnerItem key={partner.name}>
                        <PartnerIcon color={category.color}>
                          <Network size={16} />
                        </PartnerIcon>
                        
                        <div style={{ flex: 1 }}>
                          <PartnerName>{partner.name}</PartnerName>
                          <PartnerType>{partner.type}</PartnerType>
                        </div>
                      </PartnerItem>
                    ))}
                  </CategoryList>
                </PartnerCategory>
              </motion.div>
            ))}
          </PartnersGrid>

          <CollaborationSection $bg="primary">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <CollaborationTitle>
                <Handshake size={24} />
                Avantages de la Collaboration
              </CollaborationTitle>
              
              <CollaborationDescription>
                Nos partenariats stratégiques permettent de créer des synergies 
                et d&apos;amplifier l&apos;impact de nos interventions.
              </CollaborationDescription>
              
              <CollaborationBenefits>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <BenefitItem>
                      <Award size={16} />
                      {benefit}
                    </BenefitItem>
                  </motion.div>
                ))}
              </CollaborationBenefits>
            </motion.div>
          </CollaborationSection>
        </motion.div>
      </PartnersContent>
    </PartnersSectionContainer>
  );
}