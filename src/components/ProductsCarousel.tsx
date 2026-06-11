import { motion } from "motion/react";
import { Star, ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";
import { useRef } from "react";

interface ProductsCarouselProps {
  onAddToCart: (product: Product) => void;
}

export default function ProductsCarousel({ onAddToCart }: ProductsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 340;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <section 
      id="products" 
      className="bg-[#FAF5EE] py-20 px-6 md:px-12 relative"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header content heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6" id="products-header">
          <div className="space-y-4 max-w-xl text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#571612] bg-[#571612]/5 px-3.5 py-1.5 rounded-full border border-[#571612]/10 inline-block">
              Cold Delights Menu
            </span>
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-neutral-800" id="products-title">
              Explore Our <span className="text-orange-500 font-extrabold leading-tight">Delicious</span> Taste
            </h2>
          </div>
          
          <div className="flex items-center gap-6 md:max-w-md text-left">
            <p className="text-neutral-500 text-xs md:text-sm font-medium leading-relaxed">
              Every single ice cream is a masterpiece of delicious density, handcrafted from raw organic ingredients, fresh farm milk, and zero synthetic filters.
            </p>

            {/* Slider Controls */}
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 rounded-full border border-neutral-300 hover:bg-neutral-900 hover:border-neutral-900 hover:text-white flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer bg-white"
                id="products-scroll-left"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 rounded-full border border-neutral-300 hover:bg-neutral-900 hover:border-neutral-900 hover:text-white flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer bg-white"
                id="products-scroll-right"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable Carousel Container */}
        <div 
          ref={containerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-12 pl-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
          id="products-cards-grid"
        >
          {PRODUCTS.map((prod) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="min-w-[280px] sm:min-w-[310px] w-[310px] shrink-0 snap-start select-none bg-white border border-cream-dark shadow-sm hover:shadow-xl rounded-[32px] p-6 text-center relative flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5"
            >
              
              {/* Product Background Circle & Tub Container */}
              <div 
                className="w-full h-48 rounded-2xl relative flex items-center justify-center overflow-visible mb-6 transition-colors duration-300"
                style={{ backgroundColor: `${prod.bgColor}` }}
              >
                {/* Micro circle decoration */}
                <div className="absolute w-28 h-28 rounded-full bg-white/40 blur-md" />

                {/* Tub Image with 3D Float Hover Tilt */}
                <motion.div
                  className="w-36 h-36 relative z-10"
                  whileHover={{ 
                    scale: 1.15,
                    rotate: -12,
                    y: -18,
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 14 }}
                >
                  <img
                    referrerPolicy="no-referrer"
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-contain filter drop-shadow-[0_12px_15px_rgba(0,0,0,0.15)]"
                  />
                </motion.div>
              </div>

              {/* Card Meta Content */}
              <div className="space-y-3 mb-6 text-left flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-extrabold font-display text-neutral-850 text-lg group-hover:text-orange-500 transition-colors">
                      {prod.name}
                    </h3>
                    <div className="flex items-center gap-0.5 shrink-0 bg-yellow-400/10 text-yellow-600 px-2 py-0.5 rounded-md text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current text-yellow-500" />
                      <span>{prod.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-400 font-bold mt-0.5 uppercase tracking-wide">
                    {prod.flavor}
                  </p>
                </div>

                <p className="text-neutral-500 text-xs font-medium leading-relaxed mt-2 flex-1">
                  {prod.description}
                </p>

                <div className="flex items-baseline gap-1 pt-2">
                  <span className="text-2xl font-black font-display text-brand-green">
                    ${prod.price.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase">/ 473ml tub</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onAddToCart(prod)}
                className="w-full bg-neutral-900 group-hover:bg-brand-green hover:shadow-lg hover:scale-102 hover:text-white text-white font-extrabold text-xs tracking-wider uppercase py-3.5 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                Buy Now
              </button>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
