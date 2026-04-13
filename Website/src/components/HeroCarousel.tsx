import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroCarouselProps {
  children?: React.ReactNode;
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  overlay?: boolean;
  className?: string;
}

const heroImages = [
  { src: "/images/hero-1.jpg", alt: "Athlete training in gym" },
  { src: "/images/hero-2.jpg", alt: "Athlete running on track" },
  { src: "/images/hero-3.jpg", alt: "Basketball player in action" },
  { src: "/images/hero-4.jpg", alt: "Athlete recovery session" },
];

const HeroCarousel = ({
  children,
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = true,
  overlay = true,
  className = "",
}: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [nextSlide, autoPlayInterval, isPaused]);

  return (
    <section
      className={`relative h-screen overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroImages[currentIndex].src}
            alt={heroImages[currentIndex].alt}
            className="absolute inset-0 w-full h-full object-cover"
            crossOrigin="anonymous"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      {overlay && <div className="absolute inset-0 bg-black/60" />}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {children}
      </div>

      {/* Navigation Controls */}
      {showControls && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-primary/80 transition-colors text-white"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 hover:bg-primary/80 transition-colors text-white"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-12 h-1 transition-all ${
                index === currentIndex
                  ? "bg-primary"
                  : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/20">
        <motion.div
          key={currentIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
          className="h-full bg-primary"
          style={{ animationPlayState: isPaused ? "paused" : "running" }}
        />
      </div>
    </section>
  );
};

export default HeroCarousel;
