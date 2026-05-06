'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { SectionContainer, SectionContent, SectionTitle } from '@/styles/pages/contact.styles';
import * as S from './ContactForm.styles';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Le sujet est requis';
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Hide success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const infoItems = [
    {
      icon: '📍',
      title: 'Adresse',
      content: 'Kita, Région de Kayes, Mali'
    },
    {
      icon: '📞',
      title: 'Téléphone',
      content: '+223 20 00 00 00'
    },
    {
      icon: '✉️',
      title: 'Email',
      content: 'contact@adrs.ml'
    },
    {
      icon: '🕒',
      title: 'Horaires',
      content: 'Lun-Ven: 8h - 17h'
    }
  ];

  return (
    <SectionContainer>
      <SectionContent>
        <S.FormGrid>
          <S.ContactInfo>
            <SectionTitle>Informations de <span>contact</span></SectionTitle>
            <S.InfoList>
              {infoItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <S.InfoItem>
                    <div className="icon">{item.icon}</div>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.content}</p>
                    </div>
                  </S.InfoItem>
                </motion.div>
              ))}
            </S.InfoList>
          </S.ContactInfo>

          <S.FormWrapper
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 style={{marginBottom: '2rem', fontWeight: 600 }}>Envoyez-nous un message</h3>
            <S.Form onSubmit={handleSubmit}>
              <S.FormGroup>
                <S.Label htmlFor="name">Nom complet *</S.Label>
                <S.Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                />
                {errors.name && (
                  <S.ErrorMessage>
                    <AlertCircle size={14} />
                    {errors.name}
                  </S.ErrorMessage>
                )}
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="email">Email *</S.Label>
                <S.Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                />
                {errors.email && (
                  <S.ErrorMessage>
                    <AlertCircle size={14} />
                    {errors.email}
                  </S.ErrorMessage>
                )}
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="subject">Sujet *</S.Label>
                <S.Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Objet de votre message"
                />
                {errors.subject && (
                  <S.ErrorMessage>
                    <AlertCircle size={14} />
                    {errors.subject}
                  </S.ErrorMessage>
                )}
              </S.FormGroup>

              <S.FormGroup>
                <S.Label htmlFor="message">Message *</S.Label>
                <S.TextArea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre message..."
                />
                {errors.message && (
                  <S.ErrorMessage>
                    <AlertCircle size={14} />
                    {errors.message}
                  </S.ErrorMessage>
                )}
              </S.FormGroup>

              <S.SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner" style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTopColor: 'white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer le message
                    <Send size={18} />
                  </>
                )}
              </S.SubmitButton>

              {isSuccess && (
                <S.SuccessMessage
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <CheckCircle size={20} />
                  Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                </S.SuccessMessage>
              )}
            </S.Form>
          </S.FormWrapper>
        </S.FormGrid>
      </SectionContent>
    </SectionContainer>
  );
}