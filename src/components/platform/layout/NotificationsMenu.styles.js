import styled from 'styled-components';

export const NotificationButton =
  styled.button`
    position: relative;

    width: 4.2rem;
    height: 4.2rem;

    border: none;

    border-radius:
      ${({ theme }) =>
        theme.radii.full};

    background:
      ${({ theme }) =>
        theme.colors.background.secondary};

    color:
      ${({ theme }) =>
        theme.colors.text.primary};

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    transition:
      background 0.2s ease;

    &:hover {
      background:
        ${({ theme }) =>
          theme.colors.background.tertiary};
    }

    &:focus-visible {
      outline: 2px solid
        ${({ theme }) =>
          theme.colors.primary};

      outline-offset: 2px;
    }
`;

export const NotificationBadge =
  styled.span`
    position: absolute;

    top: -2px;
    right: -2px;

    min-width: 2rem;
    height: 2rem;

    padding: 0 0.4rem;

    border-radius:
      ${({ theme }) =>
        theme.radii.full};

    background:
      ${({ theme }) =>
        theme.colors.error};

    color:
      ${({ theme }) =>
        theme.colors.text.inverse};

    font-size:
      ${({ theme }) =>
        theme.fontSizes.caption};

    font-weight:
      ${({ theme }) =>
        theme.fontWeights.bold};

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const MenuHeader =
  styled.div`
    padding:
      ${({ theme }) =>
        theme.spacing.md};

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom: 1px solid
      ${({ theme }) =>
        theme.colors.border};

    h3 {
      font-size:
        ${({ theme }) =>
          theme.fontSizes.bodyLg};

      font-weight:
        ${({ theme }) =>
          theme.fontWeights.semibold};

      color:
        ${({ theme }) =>
          theme.colors.text.primary};
    }

    p {
      margin-top: 0.2rem;

      font-size:
        ${({ theme }) =>
          theme.fontSizes.caption};

      color:
        ${({ theme }) =>
          theme.colors.text.secondary};
    }
`;

export const NotificationsList =
  styled.div`
    max-height: 40rem;
    overflow-y: auto;
`;

export const NotificationItem =
  styled.button`
    width: 100%;

    border: none;
    background: transparent;

    display: flex;
    align-items: flex-start;
    gap: ${({ theme }) =>
      theme.spacing.md};

    padding:
      ${({ theme }) =>
        theme.spacing.md};

    text-align: left;

    cursor: pointer;

    transition:
      background 0.2s ease;

    &:hover {
      background:
        ${({ theme }) =>
          theme.colors.background.secondary};
    }
`;

export const NotificationIcon =
  styled.div`
    width: 3.6rem;
    height: 3.6rem;

    border-radius:
      ${({ theme }) =>
        theme.radii.full};

    background:
      ${({ theme }) =>
        theme.colors.background.secondary};

    display: flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;

    color:
      ${({ theme }) =>
        theme.colors.primary};
`;

export const NotificationContent =
  styled.div`
    flex: 1;
    min-width: 0;
`;

export const NotificationTitle =
  styled.h4`
    font-size:
      ${({ theme }) =>
        theme.fontSizes.body};

    font-weight:
      ${({ theme }) =>
        theme.fontWeights.semibold};

    color:
      ${({ theme }) =>
        theme.colors.text.primary};
`;

export const NotificationDescription =
  styled.p`
    margin-top: 0.4rem;

    font-size:
      ${({ theme }) =>
        theme.fontSizes.caption};

    color:
      ${({ theme }) =>
        theme.colors.text.secondary};

    line-height: 1.5;
`;

export const NotificationTime =
  styled.div`
    margin-top: 0.8rem;

    display: flex;
    align-items: center;
    gap: 0.4rem;

    font-size:
      ${({ theme }) =>
        theme.fontSizes.caption};

    color:
      ${({ theme }) =>
        theme.colors.text.light};
`;