import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PreloaderProps {
  onComplete: () => void;
}

type PreloaderPhase = "loading" | "wipe-in" | "wipe-out" | "completed";

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<PreloaderPhase>("loading");
  const [showWhiteScreen, setShowWhiteScreen] = useState(true);

  // Smooth progress counter reaching 100% in 1.4 seconds
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 1400; // milliseconds
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progressPercent = Math.min((elapsed / duration) * 100, 100);
      setProgress(Math.floor(progressPercent));
      
      if (elapsed < duration) {
        requestAnimationFrame(step);
      }
    };
    
    const animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Control sequence phases after 100% progress is hit
  useEffect(() => {
    if (progress === 100) {
      // Wait loaded state for a bit, then start light blue wipe covering the screen
      const wipeInTimer = setTimeout(() => {
        setPhase("wipe-in");
      }, 750);

      return () => clearTimeout(wipeInTimer);
    }
  }, [progress]);

  // Determine current slogan based on progress percentage
  // 0 - 34% : #WEARE26
  // 35 - 69%: #WEARENYNJ
  // 70 - 100%: #WEARFIFA
  let activeText = "#WEARE26";
  let activeColor = "#2143E5"; // FIFA Royal Blue

  if (progress >= 35 && progress < 70) {
    activeText = "#WEARENYNJ";
    activeColor = "#0C1D3F"; // NYNJ Dark Blue
  } else if (progress >= 70) {
    activeText = "#WEARFIFA";
    activeColor = "#E11D48"; // Vibrant FIFA Magenta/Red
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none select-none" id="preloader-overlay-container">
      {/* 1. White Preloader Dashboard Screen */}
      <AnimatePresence>
        {showWhiteScreen && (
          <motion.div
            key="preloader-white-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white flex flex-col items-center justify-between py-16 px-6 text-center select-none pointer-events-auto"
            id="preloader-white-cover"
          >
            {/* Top spacer */}
            <div className="w-full h-8" />

            {/* Slogans Container (with reduced font size) */}
            <div className="flex-1 flex items-center justify-center w-full px-4 max-w-4xl">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={activeText}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-[-0.06em] uppercase leading-none select-none font-sans"
                  style={{
                    color: activeColor,
                    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
                  }}
                  id={`preloader-slogan-title-${activeText.slice(1).toLowerCase()}`}
                >
                  {activeText}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Bottom percentage progress */}
            <div 
              className="text-gray-400 font-sans text-xs sm:text-sm tracking-wider font-semibold select-none pb-4"
              id="preloader-progress-tracker"
            >
              {progress} %
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Light Blue Sliding Container (Acts as the swipe transition mask) */}
      <AnimatePresence>
        {phase === "wipe-in" && (
          <motion.div
            key="preloader-wipe-in-cover"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => {
              // Hide the white preloader screen once fully covered, and swap to wipe-out
              setShowWhiteScreen(false);
              // Small timeout to allow state to settle, then slide the wipe container up and off
              setTimeout(() => {
                setPhase("wipe-out");
              }, 100);
            }}
            className="absolute inset-0 bg-[#7DD3FC] flex items-center justify-center pointer-events-auto"
            id="preloader-wipe-in-shield"
          />
        )}

        {phase === "wipe-out" && (
          <motion.div
            key="preloader-wipe-out-cover"
            initial={{ y: "0%" }}
            animate={{ y: "-100%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => {
              setPhase("completed");
              onComplete();
            }}
            className="absolute inset-0 bg-[#7DD3FC] flex items-center justify-center pointer-events-auto"
            id="preloader-wipe-out-shield"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
