import React, { useState, useEffect } from 'react';
import {
  HeroSliderContainer,
  Slide,
  ImageBackground,
  VideoBackground,
  Overlay,
  SlideContent,
  SlideTitle,
  SlideSubtitle,
  CTAButtons,
  CTAButton,
  NavigationButtons,
  DotButton,
  ArrowButton
} from './HeroSlider.styles';
import { ArrowRight } from 'lucide-react';
import { ArrowBigLeft } from 'lucide-react'; 
import { ArrowBigRight } from 'lucide-react';


const HeroSlider = ({ config }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = config.slides.filter(slide => slide.published);

  useEffect(() => {
    if (!config.autoplay || isPaused || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, config.interval);

    return () => clearInterval(interval);
  }, [config.autoplay, config.interval, isPaused, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) {
    return null;
  }

  return (
    <HeroSliderContainer 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className='hero-slider__container'
    >
      {slides.map((slide, index) => (
        <Slide key={slide.id} $isActive={index === currentSlide}>
          {/* Background */}
          {slide.background.type === 'image' ? (
            <ImageBackground $src={slide.background.src} />
          ) : slide.background.videoType === 'embedded' && slide.background.embedCode ? (
            <div 
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1
              }}
              dangerouslySetInnerHTML={{ __html: slide.background.embedCode }}
            />
          ) : (
            <>
              <VideoBackground
                // ref={el => videoRefs.current[index] = el}
                autoPlay
                muted={slide.background.muted}
                loop={slide.background.loop}
                poster={slide.background.poster}
                playsInline
              >
                <source src={slide.background.src} type="video/mp4" />
                Your browser does not support the video tag.
              </VideoBackground>
            </>
          )}
          
          {/* Overlay */}
          <Overlay 
            $color={slide.background.overlayColor} 
            $opacity={slide.background.overlayOpacity} 
          />
          
          {/* Content */}
          <SlideContent $alignment={slide.contentAlignment}>
            <span className="subtitle">{slide.subtitle}</span>
            <SlideTitle>{slide.title}</SlideTitle>
            {slide.description && (
              <SlideSubtitle>{slide.description}</SlideSubtitle>
            )}
            {slide.ctas.length > 0 && (
              <CTAButtons>
                {slide.ctas.map((cta, ctaIndex) => (
                  <CTAButton
                    key={ctaIndex}
                    href={cta.href}
                    $variant={cta.variant}
                    $size={cta.size}
                  >
                    {cta.text} {cta.variant !== 'outline' && <ArrowRight size={20} />}
                  </CTAButton>
                ))}
              </CTAButtons>
            )}
          </SlideContent>
        </Slide>
      ))}

      {/* Navigation Arrows */}
      {config.showArrows && slides.length > 1 && (
        <>
          <ArrowButton className="prev" onClick={prevSlide}>
            <ArrowBigLeft size={24} />
          </ArrowButton>
          <ArrowButton className="next" onClick={nextSlide}>
            <ArrowBigRight size={24} />
          </ArrowButton>
        </>
      )}

      {/* Dot Navigation */}
      {config.showDots && slides.length > 1 && (
        <NavigationButtons>
          {slides.map((_, index) => (
            <DotButton
              key={index}
              $isActive={index === currentSlide}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </NavigationButtons>
      )}
    </HeroSliderContainer>
  );
};

export default HeroSlider;