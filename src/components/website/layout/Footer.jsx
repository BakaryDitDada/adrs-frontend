'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, 
  Facebook, Twitter, Linkedin, Instagram,
  Globe, Calendar, Users, Target,
  MoveUp
} from 'lucide-react';
import { Dot } from 'lucide-react';
import { FooterContainer, FooterContent, FooterGrid, FooterSection, FooterLinks, ContactInfo, ContactItem, LogoSection, Logo, LogoImage, LogoText, Description, SocialLinks, SocialLink, NewsletterForm, Input, SubmitButton, Copyright, Hours, NewsletterDesc, NewsletterTitle, GoToTop } from './Layout.styles';

export default function Footer() {
  const quickLinks = [
    { icon: <Target size={16} />, label: 'Notre Mission', href: '/about#mission' },
    { icon: <Users size={16} />, label: 'Nos Projets', href: '/projects' },
    { icon: <Calendar size={16} />, label: 'Actualités', href: '/news' },
    { icon: <Globe size={16} />, label: 'Domaines d\'intervention', href: '/about#domains' },
  ];

  const legalLinks = [
    { label: 'Politique de confidentialité', href: '/privacy' },
    { label: 'Conditions d\'utilisation', href: '/terms' },
    { label: 'Accessibilité', href: '/accessibility' },
    { label: 'Plan du site', href: '/sitemap' },
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <FooterContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <FooterContent>
          <FooterGrid>
            <FooterSection>
              <LogoSection>

              <Logo href="/" onClick={() => setIsMenuOpen(false)}>
                <LogoImage><span className="green">A</span><span className="yellow">D</span><span className="red">RS</span></LogoImage>
                <LogoText>
                  <h1>Mali</h1>
                  {/* <span>Agence de Développement Rural</span> */}
                </LogoText>
              </Logo>

                <Description>
                  Promouvoir un développement rural intégré, durable et équitable dans la vallée du fleuve Sénégal.
                </Description>
                <SocialLinks>
                  <SocialLink href="#" aria-label="Facebook">
                    <Facebook size={20} />
                  </SocialLink>
                  <SocialLink href="#" aria-label="Twitter">
                    <Twitter size={20} />
                  </SocialLink>
                  <SocialLink href="#" aria-label="LinkedIn">
                    <Linkedin size={20} />
                  </SocialLink>
                  <SocialLink href="#" aria-label="Instagram">
                    <Instagram size={20} />
                  </SocialLink>
                </SocialLinks>
              </LogoSection>
            </FooterSection>

            <FooterSection>
              <h3>Liens Rapides</h3>
              <FooterLinks>
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      {link.icon}
                      {link.label}
                    </Link>
                  </li>
                ))}
              </FooterLinks>
            </FooterSection>

            <FooterSection>
              <h3>Contactez-nous</h3>
              <ContactInfo $isColumn={true}>
                <ContactItem $isColumn={true}>
                  <MapPin size={18} />
                  <span>ADRS, Quartier administratif, Kita, Mali</span>
                </ContactItem>
                <ContactItem $isColumn={true}>
                  <Phone size={18} />
                  <span>+223 20 20 20 20</span>
                </ContactItem>
                <ContactItem $isColumn={true}>
                  <Mail size={18} />
                  <span>contact@adrs.ml</span>
                </ContactItem>
                <Hours>
                  <strong>Horaires :</strong><br />
                  Lundi à Vendredi<br />
                  de 8h à 16h30
                </Hours>
              </ContactInfo>
            </FooterSection>

            <FooterSection>
              <NewsletterTitle>Newsletter</NewsletterTitle>
              <NewsletterDesc style={{marginBottom: '20px' }}>
                Restez informé de nos activités et projets.
              </NewsletterDesc>
              <NewsletterForm onSubmit={handleNewsletterSubmit}>
                <Input
                  type="email"
                  placeholder="Votre adresse email"
                  required
                  aria-label="Adresse email pour newsletter"
                />
                <SubmitButton type="submit">
                  {"S'abonner"}
                </SubmitButton>
              </NewsletterForm>
            </FooterSection>
          </FooterGrid>

          <Copyright>
            <p>&copy; {new Date().getFullYear()} ADRS Mali. Tous droits réservés.</p>
            <FooterLinks style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '30px', 
              marginTop: '15px',
              flexWrap: 'wrap'
            }}>
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} style={{ fontSize: '13px' }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </FooterLinks>
            <p style={{ marginTop: '20px', fontSize: '12px', opacity: 0.7 }}>
              Pour une vallée du fleuve Sénégal prospère, résiliente et solidaire.
            </p>
          </Copyright>
        </FooterContent>
      </motion.div>
    
      <GoToTop
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <MoveUp />  
      </GoToTop>
  
    </FooterContainer>
  );
}