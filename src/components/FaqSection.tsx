import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, Instagram, MessageCircle, Phone, ArrowUpRight } from "lucide-react";
import { FAQS } from "../data";

export default function FaqSection() {
  const [openFaqId, setOpenFaqId] = useState<number | null>(1); // Item 1 is open by default!

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faqs" className="bg-[#FAF5EE] py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Dark Green FAQ Card */}
      <div 
        className="max-w-7xl mx-auto bg-[#1C3F30] rounded-[40px] px-8 py-14 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 relative overflow-hidden shadow-2xl"
        id="faq-inner-card"
      >
        {/* Abstract background blobs for design polish */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#2D5F4A]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-yellow-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Left Column: Heading & Social indicators */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8 text-left z-10" id="faq-left-meta">
          <div className="space-y-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#94D3AB] bg-[#FAF5EE]/10 px-3.5 py-1.5 rounded-full border border-white/10 inline-block">
              Support Center
            </span>
            <h2 className="text-4xl md:text-5xl font-black font-display text-white tracking-tight leading-none">
              FAQ's
            </h2>
            <p className="text-[#94D3AB]/80 text-sm md:text-base font-medium leading-relaxed max-w-sm">
              We've answered the most common questions to make your experience as smooth as our ice cream.
            </p>
          </div>

          {/* Social Channels buttons on bottom-left of the FAQ card */}
          <div className="space-y-4 pt-4">
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Connect with us</p>
            <div className="flex gap-3">
              <a 
                href="https://whatsapp.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white text-[#94D3AB] hover:text-[#193F2D] flex items-center justify-center transition-all duration-300 shadow-xs hover:shadow-lg hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white text-[#94D3AB] hover:text-[#193F2D] flex items-center justify-center transition-all duration-300 shadow-xs hover:shadow-lg hover:scale-105"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="tel:1234567" 
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white text-[#94D3AB] hover:text-[#193F2D] flex items-center justify-center transition-all duration-300 shadow-xs hover:shadow-lg hover:scale-105"
              >
                <Phone className="w-5 h-5 fill-current" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive expand/collapse Accordions */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4 z-10" id="faq-accordions">
          {FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id;

            return (
              <div 
                key={faq.id}
                className="w-full"
                id={`faq-item-${faq.id}`}
              >
                <motion.div
                  initial={false}
                  animate={{
                    backgroundColor: isOpen ? "#FAF5EE" : "rgba(255, 255, 255, 0.04)",
                    borderColor: isOpen ? "#FAF5EE" : "rgba(255, 255, 255, 0.15)"
                  }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="rounded-3xl border overflow-hidden shadow-xs hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => toggleFaq(faq.id)}
                >
                  {/* Item Header Button */}
                  <div className="flex items-center justify-between p-6 gap-4">
                    <p className={`font-extrabold text-sm md:text-base font-display transition-colors duration-300 ${
                      isOpen ? "text-[#1C3F30]" : "text-white"
                    }`}>
                      {faq.question}
                    </p>
                    <div className={`p-2 rounded-full transition-colors duration-300 shrink-0 ${
                      isOpen ? "bg-[#1C3F30] text-white" : "bg-white/10 text-[#FAF5EE]"
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>

                  {/* Expandable answer panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-1 text-slate-700 font-medium text-xs md:text-sm leading-relaxed border-t border-[#1C3F30]/10 flex items-start gap-2 animate-in fade-in duration-300">
                          <ArrowUpRight className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                          <p className="text-[#1C3F30]/80">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
