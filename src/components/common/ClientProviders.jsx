'use client';

import React from 'react';
import StyledComponentsRegistry from '@/lib/registry'; // must be a client wrapper
import StoreProvider from '@/providers/StoreProvider'; // client provider
import PersistLogin from '@/utils/auth/PersistLogin'; // client component
import ThemeInitializer from './ThemeInitializer';

export default function ClientProviders({ children }) {
  return (
    <StoreProvider>
      <StyledComponentsRegistry>
        <ThemeInitializer />
          {children}
        <PersistLogin />
      </StyledComponentsRegistry>
    </StoreProvider>
  );
}
