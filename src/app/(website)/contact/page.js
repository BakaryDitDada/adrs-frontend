'use client';

import ContactHero from '@/components/website/sections/contact/ContactHero';
import ContactForm from '@/components/website/sections/contact/ContactForm';
import ContactMap from '@/components/website/sections/contact/ContactMap';
import ContactSocial from '@/components/website/sections/contact/ContactSocial';
import { PageContainer as ContactPageContainer } from '../Home.styles';

export default function ContactPage() {
  return (
    <ContactPageContainer>
      <ContactHero />
      <ContactForm />
      <ContactMap />
      <ContactSocial />
    </ContactPageContainer>
  );
}