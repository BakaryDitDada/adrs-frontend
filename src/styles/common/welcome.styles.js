import styled from "styled-components";

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background.primary};
  padding: 2rem;
  position: relative;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: 1rem;
  font-size: 1.125rem;
`;

export const ColorDemo = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ColorBox = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 8px;
  background: ${({ bg }) => bg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ color }) => color};
  font-weight: bold;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
  }
`;