export const calculateMenuPosition = ({
  triggerRect,
  menuRect,
  align,
  sideOffset = 8,
}) => {
  let left = triggerRect.left;

  if (align === 'end') {
    left =
      triggerRect.right -
      menuRect.width;
  }

  let top =
    triggerRect.bottom + sideOffset;

  const viewportWidth =
    window.innerWidth;

  const viewportHeight =
    window.innerHeight;

  if (
    left + menuRect.width >
    viewportWidth - 8
  ) {
    left =
      viewportWidth -
      menuRect.width -
      8;
  }

  if (left < 8) {
    left = 8;
  }

  if (
    top + menuRect.height >
    viewportHeight - 8
  ) {
    top =
      triggerRect.top -
      menuRect.height -
      sideOffset;
  }

  return {
    top,
    left,
  };
};