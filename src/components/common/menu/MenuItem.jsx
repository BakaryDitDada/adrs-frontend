import React from 'react';

import {
  MenuItemButton,
} from './Menu.styles';

import { useMenu } from './Menu';

const MenuItem = ({
  children,
  icon: Icon,
  onClick,
  variant,
}) => {
  const { setOpen } =
    useMenu();

  const handleClick = () => {
    onClick?.();
    setOpen(false);
  };

  return (
    <MenuItemButton
      type="button"
      onClick={handleClick}
      $variant={variant}
    >
      {Icon && <Icon size={16} />}

      <span>{children}</span>
    </MenuItemButton>
  );
};

export default MenuItem;