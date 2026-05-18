import React from 'react';

import {
  MenuOverlayBackdrop,
} from './Menu.styles';

import { useMenu } from './Menu';

const MenuOverlay = () => {
  const { open, setOpen } =
    useMenu();

  if (!open) return null;

  return (
    <MenuOverlayBackdrop
      onClick={() => setOpen(false)}
    />
  );
};

export default MenuOverlay;