'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, Send, Shield } from 'lucide-react';
import { SectionContainer, SectionContent } from '@/styles/pages/news.styles';
import * as S from './NewsletterSection.styles';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !email.includes('@')) {
      setError('Veuillez entrer une adresse email valide');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSuccess(true);
    setIsSubmitting(false);
    setEmail('');
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  const benefits = [
    {
      icon: <Send />,
      title: 'Notifications Instantanées',
      description: 'Soyez les premiers informés des nouvelles publications'
    },
    {
      icon: <Shield />,
      title: 'Confidentialité Garantie',
      description: 'Vos données sont protégées et ne seront jamais partagées'
    },
    {
      icon: <Mail />,
      title: 'Contenu Exclusif',
      description: 'Accédez à des articles et rapports exclusifs'
    },
    {
      icon: <Check />,
      title: 'Désinscription Facile',
      description: 'Vous pouvez vous désinscrire à tout moment en un clic'
    }
  ];

  return (
    <SectionContainer>
      <SectionContent>
        <S.NewsletterContainer>
          <S.NewsletterContent>
            <S.NewsletterTitle>
              Restez Connecté
            </S.NewsletterTitle>
            
            <S.NewsletterDescription>
              Abonnez-vous à notre newsletter pour recevoir les dernières actualités, 
              rapports exclusifs et mises à jour directement dans votre boîte mail.
            </S.NewsletterDescription>

            <AnimatePresence>
              {isSuccess && (
                <S.SuccessMessage
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Check size={20} />
                  Merci pour votre inscription ! Vous recevrez bientôt nos actualités.
                </S.SuccessMessage>
              )}
            </AnimatePresence>

            <S.NewsletterForm
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <S.EmailInput>
                <Mail size={20} />
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                  required
                />
              </S.EmailInput>
              
              <S.SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner" style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(37, 99, 235, 0.3)',
                      borderTop: '2px solid var(--primary)',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Inscription...
                  </>
                ) : (
                  <>
                    S&apos;inscrire
                    <Send size={18} />
                  </>
                )}
              </S.SubmitButton>
            </S.NewsletterForm>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ 
                  color: '#f87171', 
                  marginBottom: '1rem',
                  fontSize: '0.875rem'
                }}
              >
                {error}
              </motion.p>
            )}

            <S.PrivacyNote>
              <Shield size={16} />
              Nous respectons votre vie privée. Vous pouvez vous désinscrire à tout moment.
            </S.PrivacyNote>

            <S.BenefitsGrid>
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <S.BenefitItem>
                    <div className="benefit-icon">
                      {benefit.icon}
                    </div>
                    <div className="benefit-title">
                      {benefit.title}
                    </div>
                    <div className="benefit-description">
                      {benefit.description}
                    </div>
                  </S.BenefitItem>
                </motion.div>
              ))}
            </S.BenefitsGrid>
          </S.NewsletterContent>
        </S.NewsletterContainer>
      </SectionContent>
    </SectionContainer>
  );
}

// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import styled from 'styled-components';
// import { Mail, Check, Send, Shield } from 'lucide-react';
// import { SectionContainer, SectionContent } from '@/styles/pages/news.styles';
// import { AnimatePresence } from 'framer-motion';

// const NewsletterContainer = styled.div`
//   background: linear-gradient(
//     135deg,
//     ${({ theme }) => theme.colors.primary} 0%,
//     ${({ theme }) => theme.colors.primaryDark} 100%
//   );
//   border-radius: 24px;
//   padding: 4rem 2rem;
//   color: white;
//   position: relative;
//   overflow: hidden;
  
//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background: url('/patterns/newsletter-pattern.svg');
//     opacity: 0.1;
//     z-index: 0;
//   }
// `;

// const NewsletterContent = styled.div`
//   position: relative;
//   z-index: 1;
//   max-width: 800px;
//   margin: 0 auto;
//   text-align: center;
// `;

// const NewsletterTitle = styled.h2`
//   font-size: 2.5rem;
//   font-weight: 700;
//   margin-bottom: 1rem;
//   line-height: 1.2;
  
//   @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
//     font-size: 3rem;
//   }
// `;

// const NewsletterDescription = styled.p`
//   font-size: 1.125rem;
//   opacity: 0.9;
//   margin-bottom: 2rem;
//   line-height: 1.6;
//   max-width: 600px;
//   margin-left: auto;
//   margin-right: auto;
  
//   @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
//     font-size: 1.25rem;
//   }
// `;

// const NewsletterForm = styled(motion.form)`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   max-width: 500px;
//   margin: 0 auto 2rem;
  
//   @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
//     flex-direction: row;
//     gap: 0;
//   }
// `;

// const EmailInput = styled.div`
//   flex: 1;
//   position: relative;
  
//   input {
//     width: 100%;
//     padding: 1rem 1rem 1rem 3rem;
//     border: none;
//     border-radius: 12px;
//     font-size: 1rem;
//     background: rgba(255, 255, 255, 0.1);
//     color: white;
//     border: 1px solid rgba(255, 255, 255, 0.2);
//     transition: all 0.3s ease;
    
//     &::placeholder {
//       color: rgba(255, 255, 255, 0.7);
//     }
    
//     &:focus {
//       outline: none;
//       border-color: white;
//       background: rgba(255, 255, 255, 0.15);
//       box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
//     }
//   }
  
//   svg {
//     position: absolute;
//     left: 1rem;
//     top: 50%;
//     transform: translateY(-50%);
//     color: rgba(255, 255, 255, 0.7);
//   }
// `;

// const SubmitButton = styled(motion.button)`
//   padding: 1rem 2rem;
//   background: white;
//   color: ${({ theme }) => theme.colors.primary};
//   border: none;
//   border-radius: 12px;
//   font-size: 1rem;
//   font-weight: 600;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.75rem;
//   transition: all 0.3s ease;
  
//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
//   }
  
//   &:disabled {
//     opacity: 0.7;
//     cursor: not-allowed;
    
//     &:hover {
//       transform: none;
//       box-shadow: none;
//     }
//   }
  
//   @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
//     border-radius: 0 12px 12px 0;
//     margin-left: -1rem;
//   }
// `;

// const SuccessMessage = styled(motion.div)`
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
//   background: rgba(16, 185, 129, 0.2);
//   border: 1px solid rgba(16, 185, 129, 0.4);
//   color: white;
//   padding: 1rem 1.5rem;
//   border-radius: 12px;
//   max-width: 500px;
//   margin: 0 auto 1rem;
  
//   svg {
//     color: #10b981;
//   }
// `;

// const PrivacyNote = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.75rem;
//   font-size: 0.875rem;
//   opacity: 0.8;
//   justify-content: center;
  
//   svg {
//     width: 16px;
//     height: 16px;
//   }
// `;

// const BenefitsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 1.5rem;
//   margin-top: 3rem;
  
//   @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
//     grid-template-columns: repeat(4, 1fr);
//     gap: 2rem;
//   }
// `;

// const BenefitItem = styled.div`
//   text-align: center;
  
//   .benefit-icon {
//     width: 60px;
//     height: 60px;
//     background: rgba(255, 255, 255, 0.1);
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin: 0 auto 1rem;
    
//     svg {
//       color: white;
//       width: 24px;
//       height: 24px;
//     }
//   }
  
//   .benefit-title {
//     font-weight: 600;
//     margin-bottom: 0.5rem;
//     font-size: 1rem;
//   }
  
//   .benefit-description {
//     font-size: 0.875rem;
//     opacity: 0.8;
//     line-height: 1.4;
//   }
// `;

// export default function NewsletterSection() {
//   const [email, setEmail] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     if (!email || !email.includes('@')) {
//       setError('Veuillez entrer une adresse email valide');
//       return;
//     }

//     setIsSubmitting(true);
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     setIsSuccess(true);
//     setIsSubmitting(false);
//     setEmail('');
    
//     // Reset success message after 5 seconds
//     setTimeout(() => {
//       setIsSuccess(false);
//     }, 5000);
//   };

//   const benefits = [
//     {
//       icon: <Send />,
//       title: 'Notifications Instantanées',
//       description: 'Soyez les premiers informés des nouvelles publications'
//     },
//     {
//       icon: <Shield />,
//       title: 'Confidentialité Garantie',
//       description: 'Vos données sont protégées et ne seront jamais partagées'
//     },
//     {
//       icon: <Mail />,
//       title: 'Contenu Exclusif',
//       description: 'Accédez à des articles et rapports exclusifs'
//     },
//     {
//       icon: <Check />,
//       title: 'Désinscription Facile',
//       description: 'Vous pouvez vous désinscrire à tout moment en un clic'
//     }
//   ];

//   return (
//     <SectionContainer>
//       <SectionContent>
//         <NewsletterContainer>
//           <NewsletterContent>
//             <NewsletterTitle>
//               Restez Connecté
//             </NewsletterTitle>
            
//             <NewsletterDescription>
//               Abonnez-vous à notre newsletter pour recevoir les dernières actualités, 
//               rapports exclusifs et mises à jour directement dans votre boîte mail.
//             </NewsletterDescription>

//             <AnimatePresence>
//               {isSuccess && (
//                 <SuccessMessage
//                   initial={{ opacity: 0, y: -20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                 >
//                   <Check size={20} />
//                   Merci pour votre inscription ! Vous recevrez bientôt nos actualités.
//                 </SuccessMessage>
//               )}
//             </AnimatePresence>

//             <NewsletterForm
//               onSubmit={handleSubmit}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//             >
//               <EmailInput>
//                 <Mail size={20} />
//                 <input
//                   type="email"
//                   placeholder="Votre adresse email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   disabled={isSubmitting}
//                   required
//                 />
//               </EmailInput>
              
//               <SubmitButton
//                 type="submit"
//                 disabled={isSubmitting}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <div className="spinner" style={{
//                       width: '16px',
//                       height: '16px',
//                       border: '2px solid rgba(37, 99, 235, 0.3)',
//                       borderTop: '2px solid var(--primary)',
//                       borderRadius: '50%',
//                       animation: 'spin 1s linear infinite'
//                     }} />
//                     Inscription...
//                   </>
//                 ) : (
//                   <>
//                     S&apos;inscrire
//                     <Send size={18} />
//                   </>
//                 )}
//               </SubmitButton>
//             </NewsletterForm>

//             {error && (
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 style={{ 
//                   color: '#f87171', 
//                   marginBottom: '1rem',
//                   fontSize: '0.875rem'
//                 }}
//               >
//                 {error}
//               </motion.p>
//             )}

//             <PrivacyNote>
//               <Shield size={16} />
//               Nous respectons votre vie privée. Vous pouvez vous désinscrire à tout moment.
//             </PrivacyNote>

//             <BenefitsGrid>
//               {benefits.map((benefit, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.4 + index * 0.1 }}
//                 >
//                   <BenefitItem>
//                     <div className="benefit-icon">
//                       {benefit.icon}
//                     </div>
//                     <div className="benefit-title">
//                       {benefit.title}
//                     </div>
//                     <div className="benefit-description">
//                       {benefit.description}
//                     </div>
//                   </BenefitItem>
//                 </motion.div>
//               ))}
//             </BenefitsGrid>
//           </NewsletterContent>
//         </NewsletterContainer>
//       </SectionContent>
//     </SectionContainer>
//   );
// }