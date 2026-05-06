'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { selectCurrentTheme } from '@/store/globalSlice';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Target, 
  Users, 
  TrendingUp,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Expand
} from 'lucide-react';
import * as S from "./AboutHero.styles"
import VideoModal from '@/components/common/VideoModal';
import { useSelector } from 'react-redux';
 
export default function AboutHero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const currentTheme = useSelector(selectCurrentTheme);

  const iframeRef = useRef(null);
  const YOUTUBE_VIDEO_ID = "wQpN4fgDeBQ";

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  // ---------- IFRAME VIDEO PLAYER - START -------------
  const sendPlayerCommand = (command, args = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: 'command',
        func: command,
        args,
      }),
      '*'
    );
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      sendPlayerCommand('pauseVideo');
    } else {
      sendPlayerCommand('playVideo');
    }

    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = (e) => {
    e.stopPropagation();

    if (isMuted) {
      sendPlayerCommand('unMute');
    } else {
      sendPlayerCommand('mute');
    }

    setIsMuted(!isMuted);
  };
  // ---------- IFRAME VIDEO PLAYER - END   -------------

  const floatingShapes = [
    { size: 300, color: 'rgba(59, 130, 246, 0.2)', duration: 20, x: '10%', y: '20%' },
    { size: 200, color: 'rgba(139, 92, 246, 0.15)', duration: 25, x: '80%', y: '60%' },
    { size: 150, color: 'rgba(16, 185, 129, 0.1)', duration: 30, x: '70%', y: '20%' },
    { size: 250, color: 'rgba(239, 68, 68, 0.1)', duration: 22, x: '20%', y: '70%' },
  ];

  const stats = [
    { value: '15+', label: 'Projets Agricoles', icon: <Target /> },
    { value: '1200+', label: 'Agriculteurs Formés', icon: <Users /> },
    { value: '500+', label: 'Hectares Aménagés', icon: <TrendingUp /> },
    { value: '10+', label: 'Communes Bénéficiaires', icon: <Building2 /> },
  ];

  const cardStats = [
    { number: '98%', label: 'Satisfaction' },
    { number: '15', label: 'Années Exp.' },
    { number: '50+', label: 'Experts' },
    { number: '24/7', label: 'Support' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <>
      <VideoModal videoId={YOUTUBE_VIDEO_ID} isExpanded={isExpanded} setIsExpanded={setIsExpanded} isMuted={isMuted}/>
      <S.HeroContainer ref={ref}>
        <S.BackgroundElements>
          <S.GridPattern />
          {floatingShapes.map((shape, index) => (
            <S.FloatingShape
              key={index}
              initial={{ x: shape.x, y: shape.y }}
              animate={{
                x: [shape.x, `${parseInt(shape.x) + 10}%`, shape.x],
                y: [shape.y, `${parseInt(shape.y) + 10}%`, shape.y],
              }}
              transition={{
                duration: shape.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              size={shape.size}
              color={shape.color}
              duration={shape.duration}
            />
          ))}
        </S.BackgroundElements>

        <S.HeroContent>
          <S.ContentGrid>
            <S.TextContent>
              <S.GlitchText data-text="À PROPOS">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    color: '#d3d4d6',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    letterSpacing: '4px',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '1rem',
                  }}
                >
                  À PROPOS
                </motion.span>
              </S.GlitchText>

              <S.MainTitle variants={itemVariants} initial="hidden" animate="visible">
                Transformer la{' '}
                <span className="gradient-text">Vallée du Fleuve</span>
                <br />
                Depuis <span className="gradient-text">2010</span>
              </S.MainTitle>

              <S.Subtitle variants={itemVariants} initial="hidden" animate="visible">
                L&apos;<span>Agence de Développement Rural de la Vallée du Fleuve Sénégal (ADRS)</span> 
                est l&apos;acteur majeur du développement agricole et rural durable. 
                Nous innovons pour des communautés résilientes.
              </S.Subtitle>

              <S.InteractiveStats variants={containerVariants} initial="hidden" animate="visible">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <S.StatCircle>
                      <S.StatRing>
                        <circle cx="60" cy="60" r="50" className="stat-ring" />
                      </S.StatRing>
                      <S.StatValue>
                        {stat.value}
                      </S.StatValue>
                      <S.StatLabel>{stat.label}</S.StatLabel>
                    </S.StatCircle>
                  </motion.div>
                ))}
              </S.InteractiveStats>

              <S.CTAButtons variants={containerVariants} initial="hidden" animate="visible">
                <S.PrimaryButton
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Nous Rejoindre
                  <ChevronRight size={20} />
                </S.PrimaryButton>
                
                <S.SecondaryButton
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
                >
                  Explorer
                  <ChevronRight size={20} />
                </S.SecondaryButton>
              </S.CTAButtons>
            </S.TextContent>

            <S.VisualContent>
              <S.AnimatedCard
                initial={{ opacity: 0, x: 50, rotateY: 20 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <S.FloatingBadge
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1, type: 'spring' }}
                >
                  <TrendingUp size={16} />
                  Leader Régional
                </S.FloatingBadge>

                <S.CardHeader>
                  <S.LogoIcon>
                    <Building2 />
                  </S.LogoIcon>
                  <S.LogoText>
                    <h3>ADRS</h3>
                    <p>Agence de Développement Rural</p>
                  </S.LogoText>
                </S.CardHeader>

                <S.CardStats>
                  {cardStats.map((stat, index) => (
                    <S.StatItem
                      key={index}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                      $currentTheme={currentTheme}
                    >
                      <div className="number">{stat.number}</div>
                      <div className="label">{stat.label}</div>
                    </S.StatItem>
                  ))}
                </S.CardStats>

                <S.AboutInfoWrapper
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  // style={{
                  //   display: 'flex',
                  //   alignItems: 'center',
                  //   gap: '1rem',
                  //   marginBottom: '1rem',
                  // }}
                >
                  <S.AboutInfoLine $currentTheme={currentTheme || undefined} />
                  <S.AboutInfoTitle $currentTheme={currentTheme}>
                    Kita, Mali • Depuis 2010
                  </S.AboutInfoTitle>
                  <S.AboutInfoLine $currentTheme={currentTheme} />
                </S.AboutInfoWrapper>

                <S.AboutInfoDescription $currentTheme={currentTheme}>
                  Établissement public à caractère administratif, nous œuvrons pour améliorer durablement 
                  les conditions de vie des populations rurales à travers des solutions innovantes.
                </S.AboutInfoDescription>

                {/* <S.VideoPreview
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  whileHover={{ scale: 1.02 }}
                >
                  <S.SoundControl
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMuted(!isMuted);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isMuted ? <VolumeX /> : <Volume2 />}
                  </S.SoundControl>
                  
                  <S.PlayButton
                    animate={{ scale: isPlaying ? 0.9 : 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isPlaying ? <Pause /> : <Play />}
                  </S.PlayButton>
                  
                  <motion.div
                    animate={{ opacity: isPlaying ? 1 : 0.5 }}
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      left: '1rem',
                      right: '1rem',
                      height: '2px',
                      background: 'rgba(255, 255, 255, 0.3)',
                      borderRadius: '1px',
                      overflow: 'hidden',
                    }}
                  >
                    <motion.div
                      animate={{ width: isPlaying ? '100%' : '30%' }}
                      transition={{ duration: 10, repeat: isPlaying ? Infinity : 0 }}
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                      }}
                    />
                  </motion.div>
                </S.VideoPreview> */}

                <S.VideoPreview
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <iframe
                    ref={iframeRef}
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&autoplay=0&mute=1&controls=0&rel=0&modestbranding=1&playsinline=1`}
                    title="ADRS Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />

                  <S.SoundControl
                    onClick={handleMuteToggle}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isMuted ? <VolumeX /> : <Volume2 />}
                  </S.SoundControl>

                  <S.ExpandButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsExpanded(true);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Expand />
                  </S.ExpandButton>

                  <S.PlayButton
                    onClick={handlePlayPause}
                    animate={{ scale: isPlaying ? 0.9 : 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {isPlaying ? <Pause /> : <Play />}
                  </S.PlayButton>

                  <motion.div
                    animate={{ opacity: isPlaying ? 1 : 0.5 }}
                    style={{
                      position: 'absolute',
                      bottom: '1rem',
                      left: '1rem',
                      right: '1rem',
                      height: '2px',
                      background: 'rgba(255, 255, 255, 0.3)',
                      borderRadius: '1px',
                      overflow: 'hidden',
                      zIndex: 2,
                    }}
                  >
                    <motion.div
                      animate={{ width: isPlaying ? '100%' : '30%' }}
                      transition={{ duration: 10, repeat: isPlaying ? Infinity : 0 }}
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                      }}
                    />
                  </motion.div>
                </S.VideoPreview>

              </S.AnimatedCard>
            </S.VisualContent>
          </S.ContentGrid>
        </S.HeroContent>
      </S.HeroContainer>
    </>
  );
}