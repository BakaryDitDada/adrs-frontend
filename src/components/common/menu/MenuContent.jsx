import React, {
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import { createPortal } from 'react-dom';

import {
  AnimatePresence,
} from 'framer-motion';

import {
  MenuContentContainer,
} from './Menu.styles';

import { useMenu } from './Menu';

import {
  calculateMenuPosition,
} from './menu.utils';

const MenuContent = ({
  children,
  width,
  align = 'start',
}) => {
  const {
    open,
    setOpen,
    triggerRef,
    contentRef,
  } = useMenu();

  const [mounted] = useState(true);

  const [position, setPosition] =
    useState({
      top: 0,
      left: 0,
    });

  useLayoutEffect(() => {
    if (!open) return;

    const trigger =
      triggerRef.current;

    const menu =
      contentRef.current;

    if (!trigger || !menu) return;

    const triggerRect =
      trigger.getBoundingClientRect();

    const menuRect =
      menu.getBoundingClientRect();

    const nextPosition =
      calculateMenuPosition({
        triggerRect,
        menuRect,
        align,
      });

    setPosition(nextPosition);
  }, [open, align, triggerRef, contentRef]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>

      {open && (
        <MenuContentContainer
          ref={contentRef}
          $width={width}
          initial={{
            opacity: 0,
            scale: 0.96,
            y: -6,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.96,
            y: -6,
          }}
          transition={{
            duration: 0.16,
          }}
          style={{
            top: position.top,
            left: position.left,
          }}
        >
          {children}
        </MenuContentContainer>
      )}

    </AnimatePresence>,
    document.body
  );
};

export default MenuContent;