import styled from 'styled-components';

/* ===============================
   Layout
================================= */

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
  transition: background 0.3s ease;
`;

export const ThemeToggleWrapper = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
`;

/* ===============================
   Main Container
================================= */

export const AuthContainer = styled.div`
  position: relative;
  width: 900px;
  max-width: 100%;
  min-height: 550px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radii['2xl']};
  // box-shadow: ${({ theme }) => theme.shadows.xl};
  box-shadow: 0px 22px 70px 4px rgba(0, 0, 0, 0.56);
  overflow: hidden;
  transition: background 0.3s ease;

  &.auth__container-centered {
    display: flex;
    width: 40rem !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-height: auto;
  }
`;

/* ===============================
   Forms Wrapper
================================= */

export const FormsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  // transform: ${({ $isSignUp }) => $isSignUp ? 'translateX(-50%)' : 'translateX(0)'};
  transition: transform 0.6s cubic-bezier(.68,-0.55,.27,1.55);
`;

/* ===============================
   Form Container
================================= */

export const FormContainer = styled.div`
  width: 50%;
  padding: 0 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

export const AuthForm = styled.form`
  padding: 0 2.5rem;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background.secondary};
  gap: 2rem;

  & .form__actions {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    // color: var(--hero-title-color-2);
    color: #686767;
    font-size: 1.4rem;

    & span {
      cursor: pointer;
    }
  }
`;

export const AuthTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.h2};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const AuthInputGroup = styled.div`
  position: relative;
  width: 100%;
  // display: flex;
  // flex-direction: column;
  // gap: 1.5rem;
`;

export const AuthInput = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.colors.background.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem;
  border-radius: ${({ theme }) => theme.radii.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  transition: 0.2s ease;

  &:focus + .placeholder, &:not(:placeholder-shown) ~ label {
    top: -20px;
    // top: -9px;
    background-color: #636778;
    padding: 0 .5rem;
  }

`;

export const AuthLabel = styled.label`
  position: absolute;
  top: .8rem;
  left: 1.2rem;
  // color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.caption};
  pointer-events: none;
  transition: all .3s ease-in-out;
  padding: 2px 5px;
  border-radius: .5rem;
`;

export const AuthNumInput = styled.input`
  width: 4rem;
  height: 4rem;
  padding: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 0 .5rem;
  outline: none;

  background: ${({ theme }) => theme.colors.background.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.caption};

  &:focus {
    border: 1px solid #849df8;
  }
`;

export const AuthNumInputGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* ===============================
   Overlay
================================= */

export const OverlayWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  background: ${({ theme }) =>
    `linear-gradient(135deg, ${theme.colors.secondary}, ${theme.colors.primary})`};
  color: white;
  display: flex;
  transform: ${({ $isSignUp }) =>
    $isSignUp ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.6s cubic-bezier(.68,-0.55,.27,1.55);
  border-top-left-radius: ${({ $isSignUp }) => $isSignUp ? '25%' : '0'};
  border-bottom-left-radius: ${({ $isSignUp }) => $isSignUp ? '25%' : '0'};
  border-top-right-radius: ${({ $isSignUp }) => $isSignUp ? '0' : '25%'};
  border-bottom-right-radius: ${({ $isSignUp }) => $isSignUp ? '0' : '25%'};
`;

export const OverlayPanel = styled.div`
  width: 100%;
  padding: 0 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1rem;

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.h2};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.body};
    color: rgba(255, 255, 255, 0.8);
  }

  .auth__or-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    .or_line {
      flex: 1;
      height: 1px;
      width: 100px;
      background: rgba(255, 255, 255, 0.5);
    }

    .or_text {
      font-size: ${({ theme }) => theme.fontSizes.body};
      color: rgba(255, 255, 255, 0.8);
      font-weight: ${({ theme }) => theme.fontWeights.medium};
    }
  }

`;

export const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primary};
`;

export const CheckboxLabel = styled.label`
  // color: ${({ theme }) => theme.colors.text.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 1rem;
  cursor: pointer;
`;

export const GhostButton = styled.button`
  width: auto;
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: 1rem;
  // padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid white;
  background: transparent;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Button = styled.button`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.875rem;
  text-align: center;
  margin-top: -1rem;
`;