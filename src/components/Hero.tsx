import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useEffect } from "react";
import { HeroSlide } from "../types";
import { HERO_SLIDES } from "../data";

interface HeroProps {
  currentSlide: number;
  onSlideChange: (index: number) => void;
  onAddToCart: (slide: HeroSlide) => void;
  scrollToSection: (id: string) => void;
}

export default function Hero({
  currentSlide,
  onSlideChange,
  onAddToCart,
  scrollToSection
}: HeroProps) {
  const slide = HERO_SLIDES[currentSlide];

  // Automatic slide changing interval (every 4 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      onSlideChange((currentSlide + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [currentSlide, onSlideChange]);

  const handleNext = () => {
    onSlideChange((currentSlide + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    onSlideChange((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Stack of customer reviewer avatar images
  const reviewers = [
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
  ];

  return (
    <>
    <section
      id="hero"
      className="relative min-h-[680px] w-full flex flex-col justify-between overflow-hidden transition-colors duration-700 ease-out"
      style={{ backgroundColor: slide.bgColor }}
    >
      {/* Hero Content Area */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-16 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20">
        
        {/* Left Side: Headline & CTAs */}
        <div className="flex flex-col space-y-6 lg:col-span-5 text-left order-2 lg:order-1" id="hero-left-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-4"
            >
              {/* Product Badge */}
              <div 
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase shadow-xs select-none"
                style={{ backgroundColor: slide.badgeBg, color: slide.badgeText }}
              >
                <span>{slide.flavor}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                <span>{slide.calories}</span>
              </div>

              {/* Title */}
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-black font-display leading-[1.1] tracking-tight drop-shadow-xs"
                style={{ color: slide.accentColor }}
              >
                {slide.tagline}
              </h1>

              {/* Description */}
              <p className="text-neutral-900/80 text-sm md:text-base leading-relaxed max-w-md font-medium">
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => onAddToCart(slide)}
              className="bg-neutral-950 hover:bg-neutral-850 hover:shadow-xl hover:scale-103 text-white font-extrabold text-xs tracking-wider uppercase px-8 py-4 rounded-full transition-all duration-300 shadow-md cursor-pointer flex items-center gap-2 group active:scale-98"
              id="hero-order-now"
            >
              Explore Profile ({slide.calories})
              <motion.span 
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                ⚽
              </motion.span>
            </button>
            <button
              onClick={() => scrollToSection("footer")}
              className="border-2 border-white/60 hover:bg-white/20 active:bg-white/30 text-neutral-900 font-extrabold text-xs tracking-wider uppercase px-8 py-4 rounded-full transition-all duration-300 cursor-pointer"
              id="hero-see-menu"
            >
              Contact Support
            </button>
          </div>

          {/* Customer Reviews Social Proof */}
          <div className="flex items-center gap-4 pt-4" id="social-proof-hero">
            <div className="flex -space-x-3 overflow-hidden">
              {reviewers.map((url, index) => (
                <img
                  key={index}
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src={url}
                  alt={`Happy fan ${index + 1}`}
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-white drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.2)]" />
                ))}
              </div>
              <p className="text-xs font-bold text-neutral-950/90 mt-0.5">
                {slide.ratingCount} • Overall Rating: {slide.ratingValue}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Main Floating Ice Cream Tub */}
        <div className="relative flex items-center justify-center lg:col-span-5 h-[400px] md:h-[540px] lg:h-[600px] order-1 lg:order-2 group select-none" id="hero-center-carousel">
          {/* Radial glow background ring behind the center tub */}
          <div className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] rounded-full bg-white/25 blur-3xl scale-110 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 300, scale: 0.6 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -300, scale: 0.6 }}
              transition={{ type: "spring", damping: 18, stiffness: 110 }}
              className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] lg:w-[540px] lg:h-[540px] flex items-center justify-center z-30"
              id="hero-active-tub-container"
            >
              {/* Main Tub Interactive floating & bouncing */}
              <motion.img
                referrerPolicy="no-referrer"
                src={slide.image}
                alt={slide.name}
                animate={{ y: [0, -14, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-full h-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)] cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Next Product teaser floating */}
        <div className="hidden lg:flex lg:col-span-2 flex-col items-center justify-center relative select-none cursor-pointer z-20 order-3" id="hero-right-teaser">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-900/60 mb-2">Next Star</span>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`${slide.id}-teaser`}
              initial={{ opacity: 0, x: 80, rotate: 0 }}
              animate={{ opacity: 0.9, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -80, rotate: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleNext}
              className="relative w-64 h-64 filter blur-[0.2px] hover:blur-none hover:opacity-100 active:scale-95 hover:scale-105 transition-all duration-300"
            >
              <img
                src={slide.nextImage}
                alt="Next Scoop"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Flowing bottom layout / navigation controllers & liquid cream wave wave design */}
      <div className="relative w-full z-20">
        
        {/* Navigation arrow + pagination dot panel overlay */}
        <div className="absolute left-6 md:left-12 bottom-20 flex items-center gap-4 z-40">
          <div className="flex gap-2.5">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full bg-white hover:bg-neutral-950 hover:text-white text-neutral-850 flex items-center justify-center transition-all duration-300 shadow-md active:scale-90 cursor-pointer"
              id="slider-prev-btn"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-white hover:bg-neutral-950 hover:text-white text-neutral-850 flex items-center justify-center transition-all duration-300 shadow-md active:scale-90 cursor-pointer"
              id="slider-next-btn"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pagination indicators on the bottom right */}
        <div className="absolute right-6 md:right-12 bottom-20 flex items-center gap-2 z-40">
          {HERO_SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => onSlideChange(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx 
                  ? "w-8 bg-neutral-950" 
                  : "w-2 bg-white hover:bg-neutral-900/50"
              }`}
              id={`carousel-dot-${idx}`}
            />
          ))}
        </div>

        {/* Beautiful melted wave divider in cream `#FAF5EE` */}
        <div className="w-full leading-none overflow-hidden select-none -mb-1 bg-transparent">
          <svg
            className="relative block w-full h-[65px] sm:h-[105px]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C54.43,84.06,204,80.12,321.39,56.44Z"
              className="fill-[#FAF5EE]"
            />
          </svg>
        </div>

      </div>

    </section>

    {/* Elegant Black & White Infinite Marquee Slider Strip */}
    <div 
      className="w-full bg-neutral-950 text-white py-3.5 overflow-hidden select-none border-t border-b border-white/10 flex items-center relative z-40 shadow-lg font-sans text-[10px] sm:text-xs tracking-widest uppercase font-extrabold"
      id="hero-football-marquee"
    >
      <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
        {/* Content Segment 1 */}
        <span className="flex items-center gap-4">
          <span>★ THE BEAUTIFUL GAME</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ WORLD STAGE CHAMPIONS</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ LEGENDARY ICONS</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ #WEARE26</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ PELÉ</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ MARADONA</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ MESSI</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ CRISTIANO</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ ZIDANE</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ RONALDO</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ GLOBAL PASSION</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ WEAREFIFA</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ GOLDEN MOMENTS</span>
        </span>
        {/* Repeating Content Segment 2 for continuous scrolling */}
        <span className="flex items-center gap-4">
          <span>★ THE BEAUTIFUL GAME</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ WORLD STAGE CHAMPIONS</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ LEGENDARY ICONS</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ #WEARE26</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ PELÉ</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ MARADONA</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ MESSI</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ CRISTIANO</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ ZIDANE</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ RONALDO</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ GLOBAL PASSION</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ WEAREFIFA</span>
          <span className="text-[#E11D48] text-[15px]">•</span>
          <span>★ GOLDEN MOMENTS</span>
        </span>
      </div>
    </div>
    </>
  );
}
