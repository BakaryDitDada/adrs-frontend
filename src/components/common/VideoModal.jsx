import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import * as S from "./VideoModal.styles";

const VideoModal = ({ videoId, isExpanded, setIsExpanded, isMuted }) => {
  return (
    <AnimatePresence>
      {isExpanded && (
        <S.VideoModal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <S.ModalBackdrop onClick={() => setIsExpanded(false)} />

          <S.ModalContent
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <S.CloseButton
              onClick={() => setIsExpanded(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X />
            </S.CloseButton>

            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&rel=0&modestbranding=1`}
              title="ADRS Video Expanded"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '16px',
              }}
            />
          </S.ModalContent>
        </S.VideoModal>
      )}
    </AnimatePresence>
  )
}

export default VideoModal