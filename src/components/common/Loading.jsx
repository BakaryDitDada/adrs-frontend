'use client';

import React from 'react';
import PropTypes from 'prop-types';
import { FaRotate } from 'react-icons/fa6';
import * as S from './Loading.styles';

const Loading = ({
  variant = 'container',
  size = 'md',
  color = 'primary',
  label = 'Chargement en cours...',
  showLabel = false,
  className = '',
}) => {
  return (
    <S.LoadingContainer
      $variant={variant}
      className={`app-loader-${variant} ${className}`}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <S.SpinnerWrapper $variant={variant}>
        <FaRotate className="spinner-icon" size={S.SIZE_MAP[size] || size} />
        {showLabel && <S.LoadingText $color={color}>{label}</S.LoadingText>}
      </S.SpinnerWrapper>
      
      {/* Visually hidden text specifically for screen readers / web accessibility */}
      <S.ScreenReaderText>{label}</S.ScreenReaderText>
    </S.LoadingContainer>
  );
};

// Strict Type Checking for Enterprise Codebases
Loading.propTypes = {
  variant: PropTypes.oneOf(['inline', 'container', 'fullscreen', 'overlay']),
  size: PropTypes.oneOfType([PropTypes.oneOf(['sm', 'md', 'lg', 'xl']), PropTypes.string]),
  color: PropTypes.oneOf(['primary', 'secondary', 'white', 'muted']),
  label: PropTypes.string,
  showLabel: PropTypes.bool,
  className: PropTypes.string,
};

export default Loading;