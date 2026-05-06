'use client';

import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Wrench, Mail, Clock } from 'lucide-react';

const MaintenanceContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.background.primary} 0%,
    ${({ theme }) => theme.colors.background.secondary} 100%
  );
`;

const Content = styled.div`
  max-width: 600px;
  text-align: center;
`;

const IconWrapper = styled(motion.div)`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary}15;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  
  svg {
    width: 60px;
    height: 60px;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 3rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 2.5rem;
  line-height: 1.6;
`;

const InfoBox = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: left;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
  
  .icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.primary}10;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.primary};
  }
  
  .content {
    flex: 1;
    
    h4 {
      font-size: 1rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.text.primary};
      margin-bottom: 0.25rem;
    }
    
    p {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.colors.text.secondary};
    }
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-3px);
  }
`;

export default function MaintenancePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <MaintenanceContainer>
      <Content>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <IconWrapper variants={itemVariants}>
            <Wrench />
          </IconWrapper>

          <Title variants={itemVariants}>
            Site en <span>maintenance</span>
          </Title>

          <Description variants={itemVariants}>
            Nous effectuons actuellement des améliorations techniques pour mieux vous servir.
            Le site sera bientôt de retour. Merci de votre patience.
          </Description>

          <InfoBox variants={itemVariants}>
            <InfoItem>
              <div className="icon">
                <Clock size={20} />
              </div>
              <div className="content">
                <h4>Durée estimée</h4>
                <p>Quelques heures (mise à jour sur nos réseaux)</p>
              </div>
            </InfoItem>
            <InfoItem>
              <div className="icon">
                <Mail size={20} />
              </div>
              <div className="content">
                <h4>Contact</h4>
                <p>Pour toute urgence : contact@adrs.ml</p>
              </div>
            </InfoItem>
          </InfoBox>

          <SocialLinks variants={itemVariants}>
            {['facebook', 'twitter', 'linkedin'].map((social, idx) => (
              <SocialLink
                key={idx}
                href="#"
                target="_blank"
                rel="noopener"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Icons would go here - using placeholders */}
                <span>{social[0].toUpperCase()}</span>
              </SocialLink>
            ))}
          </SocialLinks>
        </motion.div>
      </Content>
    </MaintenanceContainer>
  );
}