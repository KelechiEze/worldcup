export interface HeroSlide {
  id: number;
  name: string;
  flavor: string;
  tagline: string;
  description: string;
  bgColor: string;
  accentColor: string;
  textColor: string;
  badgeBg: string;
  badgeText: string;
  image: string;
  nextImage: string;
  prevImage: string;
  ratingCount: string;
  ratingValue: string;
  calories: string;
  price: string;
  floatingFruits: string[];
}

export interface Product {
  id: number;
  name: string;
  flavor: string;
  price: number;
  image: string;
  bgColor: string;
  accentColor: string;
  textColor: string;
  description: string;
  rating: number;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface CartItem {
  product: Product | HeroSlide;
  quantity: number;
}
