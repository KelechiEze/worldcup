import { motion } from "motion/react";
import { Sparkles, Heart, Quote } from "lucide-react";

export default function StorySection() {
  return (
    <section 
      id="story"
      className="bg-[#FAF5EE] py-24 px-6 md:px-12 text-center relative overflow-hidden"
    >
      {/* Decorative vectors floating in background */}
      <div className="absolute top-10 left-10 text-cream-dark opacity-40 animate-pulse pointer-events-none select-none text-4xl">
        🍨
      </div>
      <div className="absolute bottom-12 right-12 text-cream-dark opacity-35 animate-bounce pointer-events-none select-none text-4xl">
        🍒
      </div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10" id="story-container">
        
        {/* Little decorative tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-neutral-900/5 px-4.5 py-1.5 rounded-full border border-neutral-950/5"
        >
          <Sparkles className="w-3.5 h-3.5 text-orange-500 fill-current" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#571612]">
            Our Sweet Philosophy
          </span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-current animate-pulse" />
        </motion.div>

        {/* Large Centered Core Statement */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-2xl sm:text-3xl md:text-5xl font-black font-serif leading-[1.3] text-neutral-850 tracking-tight"
          id="story-title"
        >
          We believe in capturing the{" "}
          <span className="text-[#C27F69] italic relative font-extrabold inline-block">
            joy of summer
            <span className="absolute bottom-1 left-0 right-0 h-1.5 bg-[#DCB17A]/40 rounded-full -rotate-1" />
          </span>{" "}
          in every single scoop. Our ice creams are made with the finest organic
          ingredients & real handpicked fruits.
        </motion.h2>

        {/* Decorative Quote Icon divider */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
          className="flex justify-center pt-2"
        >
          <div className="w-12 h-12 rounded-full bg-[#113A23]/5 flex items-center justify-center text-[#113A23]">
            <Quote className="w-5 h-5 fill-current rotate-180" />
          </div>
        </motion.div>

        {/* Secondary description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[#1A405D]/80 font-medium max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
        >
          No artificial stabilizers, no lab-engineered synthetics. Just pure organic dairy or plant-based raw nectar crafted at freezing levels. We partner directly with Swedish farms to make guilt-free indulgence a daily reality.
        </motion.p>
      </div>

      {/* Decorative Wave border to section 3 */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none select-none">
        <svg
          className="relative block w-full h-[30px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86C204,80.12,54.43,84.06,0,95.8V120H1200V92.83Z"
            className="fill-[#FAF5EE]"
          />
        </svg>
      </div>
    </section>
  );
}
