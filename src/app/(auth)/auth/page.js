'use client'

import { useState } from 'react';
import { useSigninMutation } from '@/store/features/auth/authApi';
import { setAuthMethod, setCredentials, setAuthSuccess, selectAuthLoading } from '@/store/features/auth/authSlice';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import usePersist from '@/hooks/auth/usePersist';
import ThemeToggle from '@/components/ThemeToggle';

import {
  PageWrapper,
  ThemeToggleWrapper,
  AuthContainer,
  FormsWrapper,
  OverlayWrapper,
  OverlayPanel,
  GhostButton,
} from '@/styles/pages/auth/auth.styles';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <PageWrapper>
      <ThemeToggleWrapper>
        <ThemeToggle />
      </ThemeToggleWrapper>

      <AuthContainer>
        <FormsWrapper $isSignUp={isSignUp}>
          {/* Sign Up */}
          <RegisterForm />

          {/* Sign In */}
          <LoginForm />
        </FormsWrapper>

        <OverlayWrapper $isSignUp={isSignUp}>
          <OverlayPanel>
            {isSignUp ? (
              <>
                <h2>Bienvenue !</h2>
                <p>Créez votre compte et commencez votre expérience dès maintenant.</p>
                <div className='auth__or-container'>
                  <span className='or_line'></span>
                  <span className='or_text'>OU</span>
                  <span className='or_line'></span>
                </div>
                <GhostButton onClick={() => setIsSignUp(false)}>
                  Connectez-vous
                </GhostButton>
              </>
            ) : (
              <>
                <h2>Bon retour parmi nous !!</h2>
                <p>Connectez-vous pour accéder à toutes les fonctionnalités de votre espace.</p>
                <div className='auth__or-container'>
                  <span className='or_line'></span>
                  <span className='or_text'>OU</span>
                  <span className='or_line'></span>
                </div>
                <GhostButton onClick={() => setIsSignUp(true)}>
                  Inscrivez-vous
                </GhostButton>
              </>
            )}
          </OverlayPanel>
        </OverlayWrapper>
      </AuthContainer>
    </PageWrapper>
  );
}