import React from 'react';
import { motion } from 'framer-motion';
import { Section, SectionTitle, SectionContent } from './Sections.styles.js';
import { homeContent } from '@/data/homeContent.js';

const AboutSection = () => {
  return (
    <Section> 
      <SectionContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>
            <span>Qui</span> sommes-nous ?
          </SectionTitle>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '50px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontSize: '1.6rem',
                lineHeight: '1.6',
                // color: 'var(--text-secondary)',
                marginBottom: '3rem'
              }}>
                {homeContent.about.description}
              </p>
            </div>
            
            <div style={{
              background: 'var(--background-tertiary)',
              borderRadius: '16px',
              padding: '40px',
              borderLeft: '5px solid var(--primary-color)'
            }}>
              <h3 style={{
                // color: 'var(--primary-color)',
                marginBottom: '20px',
                fontSize: '2.5rem'
              }}>
                {homeContent.about.mission.title}
              </h3>
              <p style={{
                // color: 'var(--text-secondary)',
                marginBottom: '20px',
                fontSize: '1.8rem'
              }}>
                {homeContent.about.mission.description}
              </p>
              <ul style={{
                listStyle: 'none',
                padding: '0',
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '10px',
                fontSize: '1.6rem'
              }}>
                {homeContent.about.mission.points.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      // color: 'var(--text-secondary)'
                    }}
                  >
                    <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>✓</span>
                    <span>{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </SectionContent>
    </Section>
  )
}

export default AboutSection