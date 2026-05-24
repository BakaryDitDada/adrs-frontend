'use client';

import React from 'react';
import {
  Page,
  Container,
  Breadcrumbs,
  BreadcrumbLink,
  BreadcrumbText,
  BreadcrumbSeparator,
  Header,
  Title,
  Subtitle,
  Actions,
  ActionButton,
  ContentGrid,
  MainColumn,
  Sidebar,
} from './DetailPage.styles';

/**
 * Generic detail page shell.
 * 
 * @param {Object} props
 * @param {Array}  props.breadcrumbs  - [{ label, href? }]
 * @param {String} props.title
 * @param {String} [props.subtitle]
 * @param {Array}  props.actions      - [{ label, icon, onClick, variant }]
 * @param {ReactNode} props.children  - content for the main column
 * @param {ReactNode} props.sidebar   - content for the right sidebar
 */
export default function DetailPage({
  breadcrumbs,
  title,
  subtitle,
  actions,
  children,
  sidebar,
}) {
  return (
    <Page>
      <Container>
        {/* Breadcrumbs */}
        {breadcrumbs?.length > 0 && (
          <Breadcrumbs>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {crumb.href ? (
                  <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbText>{crumb.label}</BreadcrumbText>
                )}
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
              </React.Fragment>
            ))}
          </Breadcrumbs>
        )}

        {/* Header with title and actions */}
        <Header>
          <div>
            <Title>{title}</Title>
            {subtitle && <Subtitle>{subtitle}</Subtitle>}
          </div>
          {actions.length > 0 && (
            <Actions>
              {actions.map((action, idx) => (
                <ActionButton
                  key={idx}
                  variant={action.variant || 'secondary'}
                  onClick={action.onClick}
                  // size="md"
                  // loading
                  // iconOnly
                  // danger
                >
                  {action.icon && <action.icon size={16} />}
                  {action.label}
                </ActionButton>
              ))}
            </Actions>
          )}
        </Header>

        {/* Main grid: left (children) + right (sidebar) */}
        <ContentGrid $hasSidebar={sidebar}>
          <MainColumn>{children}</MainColumn>
          {sidebar && <Sidebar>{sidebar}</Sidebar>}
        </ContentGrid>
      </Container>
    </Page>
  );
}