import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

const MenuContext =
  createContext(null);

export const useMenu = () => {
  const context =
    useContext(MenuContext);

  if (!context) {
    throw new Error(
      'Menu components must be used inside Menu'
    );
  }

  return context;
};

const Menu = ({
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  closeOnEscape = true,
  closeOnOutsideClick = true,
}) => {
  const [internalOpen, setInternalOpen] =
    useState(defaultOpen);

  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  const isControlled =
    typeof controlledOpen === 'boolean';

  const open = isControlled
    ? controlledOpen
    : internalOpen;

  const setOpen = useCallback(
    (value) => {
      if (!isControlled) {
        setInternalOpen(value);
      }

      onOpenChange?.(value);
    },
    [isControlled, onOpenChange]
  );

  const toggle = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  /*
  ========================================
  ESCAPE KEY HANDLER
  ========================================
  */

  useEffect(() => {
    if (!open || !closeOnEscape) {
      return;
    }

    const handleEscape = (
      event
    ) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener(
      'keydown',
      handleEscape
    );

    return () => {
      document.removeEventListener(
        'keydown',
        handleEscape
      );
    };
  }, [
    open,
    closeOnEscape,
    setOpen,
  ]);

  /*
  ========================================
  OUTSIDE CLICK HANDLER
  ========================================
  */

  useEffect(() => {
    if (
      !open ||
      !closeOnOutsideClick
    ) {
      return;
    }

    const handleOutsideClick = (
      event
    ) => {
      const trigger =
        triggerRef.current;

      const content =
        contentRef.current;

      const target =
        event.target;

      const clickedTrigger =
        trigger?.contains(target);

      const clickedContent =
        content?.contains(target);

      if (
        !clickedTrigger &&
        !clickedContent
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutsideClick
      );
    };
  }, [
    open,
    closeOnOutsideClick,
    setOpen,
  ]);

  const value = useMemo(
    () => ({
      open,
      setOpen,
      toggle,
      triggerRef,
      contentRef,
    }),
    [open, setOpen, toggle]
  );

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};

export default Menu;