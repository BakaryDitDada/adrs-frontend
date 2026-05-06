import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import * as S from './Modal.styles';

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <S.Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <S.Dialog
            size={size}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <S.Header>
              <S.Title>{title}</S.Title>
              <S.CloseButton onClick={onClose}>
                <X size={20} />
              </S.CloseButton>
            </S.Header>
            <S.Body>{children}</S.Body>
          </S.Dialog>
        </S.Overlay>
      )}
    </AnimatePresence>
  );
}