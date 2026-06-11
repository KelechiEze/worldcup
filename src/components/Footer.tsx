import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from "lucide-react";

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  return (
    <footer 
      id="footer" 
      className="bg-[#1C3F30] text-white pt-24 pb-12 relative overflow-hidden"
    >
      {/* Decorative Wave at the top of the footer */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none select-none pointer-events-none transform rotate-180">
        <svg
          className="relative block w-full h-[40px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C54.43,84.06,204,80.12,321.39,56.44Z"
            className="fill-[#FAF5EE]"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 text-left">
        {/* Brand Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <img 
            src="https://kelechieze.wordpress.com/wp-content/uploads/2026/06/utimage-removebg-preview-1.png" 
            alt="Logo" 
            className="h-12 w-auto object-contain drop-shadow-sm"
            referrerPolicy="no-referrer"
          />
          <p className="text-[#94D3AB]/70 text-sm leading-relaxed max-w-sm font-medium">
            Celebrating legendary achievements, global icons, and world stage memories of the beautiful game. Built for fans worldwide.
          </p>

          <div className="space-y-3.5 text-sm pt-2 text-[#94D3AB]/80 font-bold">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-orange-400 shrink-0" />
              <span>123 Milky Way Street, Foodie Town, NY 10001</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-orange-400 shrink-0" />
              <a href="tel:5551234567" className="hover:text-white transition-colors">+1 (555) 123-4567</a>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-orange-400 shrink-0" />
              <a href="mailto:hello@creamyicecream.com" className="hover:text-white transition-colors">hello@creamyicecream.com</a>
            </div>
          </div>
        </div>

        {/* Hours Column (3 cols) */}
        <div className="lg:col-span-3 space-y-5">
          <h4 className="border-b border-white/10 pb-3 font-extrabold font-display text-white tracking-wider text-sm uppercase">
            Opening Hours
          </h4>
          <div className="space-y-4 text-sm text-[#94D3AB]/85 font-medium">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-white text-xs uppercase">Weekdays</p>
                <p className="text-xs">Monday - Friday: 10:00 AM – 10:00 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-white text-xs uppercase">Weekends</p>
                <p className="text-xs">Saturday - Sunday: 12:00 PM – 12:00 AM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links Column (3 cols) */}
        <div className="lg:col-span-2 space-y-5">
          <h4 className="border-b border-white/10 pb-3 font-extrabold font-display text-white tracking-wider text-sm uppercase">
            Quick Links
          </h4>
          <ul className="space-y-3.5 text-[#94D3AB]/85 text-xs font-bold uppercase tracking-wider">
            <li>
              <button 
                onClick={() => scrollToSection("hero")}
                className="hover:text-white transition-all cursor-pointer hover:translate-x-1 inline-block"
              >
                Home Scoop
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("products")}
                className="hover:text-white transition-all cursor-pointer hover:translate-x-1 inline-block"
              >
                Menu Delights
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("story")}
                className="hover:text-white transition-all cursor-pointer hover:translate-x-1 inline-block"
              >
                Our Philosophy
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("faqs")}
                className="hover:text-white transition-all cursor-pointer hover:translate-x-1 inline-block"
              >
                Support FAQs
              </button>
            </li>
          </ul>
        </div>

        {/* Social Media Column (3 cols) */}
        <div className="lg:col-span-3 space-y-5">
          <h4 className="border-b border-white/10 pb-3 font-extrabold font-display text-white tracking-wider text-sm uppercase">
            Social Media
          </h4>
          <ul className="space-y-3.5 text-[#94D3AB]/85 text-xs font-bold uppercase tracking-wider">
            <li>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white transition-all hover:translate-x-1 inline-block"
              >
                Instagram
              </a>
            </li>
            <li>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white transition-all hover:translate-x-1 inline-block"
              >
                Facebook
              </a>
            </li>
            <li>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white transition-all hover:translate-x-1 inline-block"
              >
                Twitter
              </a>
            </li>
            <li>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white transition-all hover:translate-x-1 inline-block"
              >
                Pinterest
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom copyright area with micro details */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 text-xs text-[#94D3AB]/60 font-medium">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-orange-400" />
          <span>Copyright © 2026 Underdog Football stars. All rights reserved. Registered Trademark.</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-current animate-pulse" />
          <span>for real football passion.</span>
        </div>
      </div>
    </footer>
  );
}
