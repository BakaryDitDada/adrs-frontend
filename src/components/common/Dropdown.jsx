import {
  DropdownContainer,
  DropdownOverlayBackdrop,
} from "@/styles/ModalStyled";

const Dropdown = ({
  isopen,
  slideFrom = "top",
  width,
  height,
  overlay = false,
  position = "0",
  dropdownRef,
  leftPosition,
  topPosition,
  children,
}) => {
  return (
    <DropdownContainer
      ref={dropdownRef}
      className={isopen ? "modal__active" : ""}
      $width={width}
      $height={height}
      $isOpen={isopen}
      $slideFrom={slideFrom}
      $overlay={overlay}
      $position={position}
      $leftPosition={leftPosition}
      $topPosition={topPosition}
    >
      {children}
    </DropdownContainer>
  );
};

export default Dropdown;
