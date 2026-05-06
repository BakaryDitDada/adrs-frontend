'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Users, Sprout, Droplets, Target } from 'lucide-react';
import {
  StatsSectionContainer,
  StatsContent,
  SectionTitle,
  SectionSubtitle,
  StatsGrid,
  StatCard,
  StatIcon,
  StatNumber,
  StatLabel
} from './StatsSection.styles';

const stats = [
  {
    id: 1,
    icon: <Sprout size={32} />,
    endValue: 15,
    suffix: '+',
    label: 'Projets Agricoles',
    duration: 2,
    color: '#10b981'
  },
  {
    id: 2,
    icon: <Users size={32} />,
    endValue: 1200,
    suffix: '+',
    label: 'Agriculteurs Formés',
    duration: 2.5,
    color: '#3b82f6'
  },
  {
    id: 3,
    icon: <Droplets size={32} />,
    endValue: 500,
    suffix: '+',
    label: 'Hectares Aménagés',
    duration: 2.2,
    color: '#0ea5e9'
  },
  {
    id: 4,
    icon: <Target size={32} />,
    endValue: 10,
    suffix: '+',
    label: 'Communes Bénéficiaires',
    duration: 1.5,
    color: '#8b5cf6'
  }
];

function AnimatedCounter({ endValue, suffix, duration }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView) {
      let startTime;
      let animationFrame;

      const updateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / (duration * 1000), 1);
        
        setCount(Math.floor(endValue * percentage));

        if (percentage < 1) {
          animationFrame = requestAnimationFrame(updateCount);
        }
      };

      animationFrame = requestAnimationFrame(updateCount);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, endValue, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <StatsSectionContainer>
      <StatsContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>Nos Chiffres Clés</SectionTitle>
          <SectionSubtitle>
            Impact tangible de notre action pour le développement rural durable
          </SectionSubtitle>
          
          <StatsGrid>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <StatCard>
                  <StatIcon color={stat.color}>
                    {stat.icon}
                  </StatIcon>
                  
                  <StatNumber>
                    <AnimatedCounter
                      endValue={stat.endValue}
                      suffix={stat.suffix}
                      duration={stat.duration}
                    />
                  </StatNumber>
                  
                  <StatLabel>{stat.label}</StatLabel>
                </StatCard>
              </motion.div>
            ))}
          </StatsGrid>
        </motion.div>
      </StatsContent>
    </StatsSectionContainer>
  );
}