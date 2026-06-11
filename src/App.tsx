import { useState, useRef } from "react";
import { AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import { HERO_SLIDES } from "./data";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const webpageViewportRef = useRef<HTMLDivElement>(null);

  const activeSlide = HERO_SLIDES[currentSlide];

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Cart action placeholder parameter (no-op since shop features are unused now)
  const handleAddToCart = () => {};

  return (
    <>
      <AnimatePresence>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div
        className="min-h-screen w-full flex flex-col bg-[#FAF5EE] font-sans select-none relative"
        id="root-creamy-container"
      >
        {/* Sticky Navbar with current dynamic background color */}
        <div 
          className="sticky top-0 w-full z-45 transition-colors duration-700 ease-out shadow-xs"
          style={{ backgroundColor: activeSlide.bgColor }}
        >
          <div className="max-w-7xl mx-auto">
            <Navbar 
              onCartClick={() => {}}
              cartCount={0}
              scrollToSection={scrollToSection}
            />
          </div>
        </div>

        {/* 1. Hero Dynamic Section */}
        <Hero 
          currentSlide={currentSlide}
          onSlideChange={setCurrentSlide}
          onAddToCart={handleAddToCart}
          scrollToSection={scrollToSection}
        />

        {/* 2. Contact & Social footer */}
        <Footer scrollToSection={scrollToSection} />
      </div>
    </>
  );
}

