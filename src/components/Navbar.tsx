import { User, ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  onCartClick: () => void;
  cartCount: number;
  scrollToSection: (id: string) => void;
}

export default function Navbar({ onCartClick, cartCount, scrollToSection }: NavbarProps) {
  const [activeItem, setActiveItem] = useState("HOME");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = ["HOME", "MENU", "ABOUT", "CONTACT"];

  const handleNavItemClick = (item: string) => {
    setActiveItem(item);
    setMobileMenuOpen(false);

    if (item === "HOME") {
      scrollToSection("hero");
    } else if (item === "MENU") {
      scrollToSection("products");
    } else if (item === "ABOUT") {
      scrollToSection("story");
    } else if (item === "CONTACT") {
      scrollToSection("footer");
    }
  };

  return (
    <nav className="w-full py-4 px-6 md:px-12 flex items-center justify-between z-40 relative" id="creamy-navbar">
      {/* Brand Logo */}
      <div 
        onClick={() => handleNavItemClick("HOME")}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <img 
          src="https://kelechieze.wordpress.com/wp-content/uploads/2026/06/utimage-removebg-preview-1.png" 
          alt="Logo" 
          className="h-12 w-auto object-contain drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Center Navigation Pill (Desktop) */}
      <div className="hidden md:flex bg-white/70 backdrop-blur-md border border-white/40 shadow-sm rounded-full p-1.5" id="nav-pill-container">
        {menuItems.map((item) => {
          const isActive = activeItem === item;
          return (
            <button
              key={item}
              onClick={() => handleNavItemClick(item)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-neutral-900 text-white shadow-md font-extrabold"
                  : "text-neutral-700 hover:text-black hover:bg-white/40"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {/* Profile Avatar Button */}
        <button className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-md hover:bg-white shadow-xs border border-white/40 flex items-center justify-center text-neutral-850 hover:scale-105 transition-transform duration-200 cursor-pointer">
          <User className="w-4 h-4" />
        </button>

        {/* Shopping Cart Trigger */}
        <button
          onClick={onCartClick}
          className="relative w-10 h-10 rounded-full bg-white/70 backdrop-blur-md hover:bg-white shadow-xs border border-white/40 flex items-center justify-center text-neutral-850 hover:scale-105 transition-transform duration-200 cursor-pointer"
          id="cart-trigger-btn"
        >
          <ShoppingBag className="w-4 h-4" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1.5 w-5 h-5 flex items-center justify-center text-[10px] font-bold text-white bg-red-500 border border-white rounded-full animate-bounce">
              {cartCount}
            </span>
          )}
        </button>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-10 h-10 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center text-neutral-800 border border-white/40 cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-6 right-6 bg-white/95 backdrop-blur-lg border border-cream-dark shadow-xl rounded-3xl p-6 flex flex-col gap-4 z-50 md:hidden animate-in fade-in slide-in-from-top-5 duration-300">
          {menuItems.map((item) => {
            const isActive = activeItem === item;
            return (
              <button
                key={item}
                onClick={() => handleNavItemClick(item)}
                className={`w-full text-left px-5 py-3 rounded-2xl text-sm font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-700 hover:bg-cream/50"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
