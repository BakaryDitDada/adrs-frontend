'use client';

import { SectionContainer, SectionContent } from '@/styles/pages/project-detail.styles';
import {
  CTAWrapper,
  CTAContainer,
  CTAContent,
  CTATitle,
  CTADescription,
  CTAButtonGroup,
  PrimaryCTA,
  SecondaryCTA,
} from './CTASection.styles';

/**
 * Reusable CTA Section
 *
 * @param {string} title
 * @param {string} description
 * @param {Array} actions [{ label, href, icon, variant }]
 * @param {string} variant "default" | "outline"
 * @param {boolean} fullWidth
 */
export default function CTASection({
  title,
  description,
  actions = [],
  variant = 'default',
  fullWidth = false,
}) {
  if (!title && !description) return null;

  return (
    // <SectionContainer>
    //   <SectionContent>
    //     <CTAWrapper>
          <CTAContainer $variant={variant}>
            <CTAContent
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
            >
              {title && <CTATitle>{title}</CTATitle>}
              {description && <CTADescription>{description}</CTADescription>}

              {actions.length > 0 && (
                <CTAButtonGroup>
                  {actions.map((action, index) => {
                    const Button =
                      action.variant === 'secondary' ? SecondaryCTA : PrimaryCTA;

                    return (
                      <Button key={index} href={action.href}>
                        {action.icon && <action.icon size={18} />}
                        {action.label}
                      </Button>
                    );
                  })}
                </CTAButtonGroup>
              )}
            </CTAContent>
          </CTAContainer>
    //     {/* </CTAWrapper>
    //   </SectionContent>
    // </SectionContainer> */}
  );
}