import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "../data";

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((activeIdx + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIdx((activeIdx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const currentReview = TESTIMONIALS[activeIdx];

  return (
    <section className="bg-[#FAF5EE] py-20 px-6 md:px-12 relative overflow-hidden" id="testimonials">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        
        {/* Header Title */}
        <div className="space-y-3">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-500 bg-orange-500/5 px-3.5 py-1.5 rounded-full border border-orange-500/10 inline-block">
            Loving Customer Reviews
          </span>
          <h2 className="text-3xl md:text-5xl font-black font-display text-neutral-800 tracking-tight leading-none">
            What Our Scoop Fans Say
          </h2>
          <p className="text-neutral-500 text-xs md:text-sm font-semibold max-w-sm mx-auto">
            Real stories from real dessert lovers who can't get enough of Creamy scoop dynamics.
          </p>
        </div>

        {/* Animated Slide Quote Cards */}
        <div className="relative min-h-[300px] flex items-center justify-center bg-cream/30 border border-cream-dark p-8 md:p-12 rounded-[32px] shadow-xs" id="testimonials-body">
          {/* Symmetrical Quote Background vector */}
          <div className="absolute top-6 left-6 text-cream-dark opacity-40 select-none pointer-events-none">
            <Quote className="w-12 h-12 fill-current rotate-180 text-orange-500/10" />
          </div>
          <div className="absolute bottom-6 right-6 text-cream-dark opacity-40 select-none pointer-events-none">
            <Quote className="w-12 h-12 fill-current text-orange-500/10" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col items-center space-y-6"
            >
              {/* Star indicators */}
              <div className="flex gap-0.5 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Real Quote Text */}
              <h3 className="text-lg md:text-2xl font-serif font-black text-neutral-800 tracking-normal px-4 leading-relaxed italic max-w-2xl">
                "{currentReview.quote}"
              </h3>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-4">
                <img
                  referrerPolicy="no-referrer"
                  src={currentReview.avatar}
                  alt={currentReview.author}
                  className="w-12 h-12 rounded-full object-cover ring-4 ring-[#1C3F30]/10"
                />
                <div className="text-left">
                  <p className="font-bold text-neutral-850 font-display text-sm">{currentReview.author}</p>
                  <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider">{currentReview.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={handlePrev}
            className="w-11 h-11 rounded-full border border-neutral-300 bg-white hover:bg-neutral-900 hover:text-white text-neutral-800 flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer"
            id="testimonial-prev-btn"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <span className="text-xs font-bold font-mono tracking-widest text-[#1C3F30]">
            {(activeIdx + 1).toString().padStart(2, "0")} / {TESTIMONIALS.length.toString().padStart(2, "0")}
          </span>

          <button
            onClick={handleNext}
            className="w-11 h-11 rounded-full border border-neutral-300 bg-white hover:bg-neutral-900 hover:text-white text-neutral-800 flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer"
            id="testimonial-next-btn"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
