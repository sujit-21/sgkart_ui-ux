import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Tag } from 'lucide-react';

export const PromotionalBanners = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Banner 1: Electronics */}
        <div className="relative rounded-2xl overflow-hidden shadow-xs h-64 group flex flex-col justify-end p-6 text-white">
          <img
            src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80"
            alt="Smart Electronics"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/60 to-transparent"></div>
          <div className="relative z-10 space-y-2">
            <span className="bg-secondary text-navy text-[10px] font-black px-2 py-0.5 rounded uppercase">
              MIN 40% OFF
            </span>
            <h3 className="text-xl font-black font-heading leading-tight">
              Next-Gen Audio & Smart Wearables
            </h3>
            <p className="text-xs text-blue-100">Noise cancellation, Amoled screens & water resistance</p>
            <Link
              to="/category/electronics"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:text-white pt-1 transition"
            >
              <span>Explore Electronics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Banner 2: Fashion */}
        <div className="relative rounded-2xl overflow-hidden shadow-xs h-64 group flex flex-col justify-end p-6 text-white">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
            alt="Festive Fashion"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#831843]/95 via-[#831843]/60 to-transparent"></div>
          <div className="relative z-10 space-y-2">
            <span className="bg-amber-400 text-navy text-[10px] font-black px-2 py-0.5 rounded uppercase">
              FESTIVE SPECIAL
            </span>
            <h3 className="text-xl font-black font-heading leading-tight">
              Royal Sarees & Men's Ethnic Kurtas
            </h3>
            <p className="text-xs text-pink-100">Pure Banarasi silk, embroidered sets & festive footwear</p>
            <Link
              to="/category/fashion"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white pt-1 transition"
            >
              <span>Shop Fashion Fest</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Banner 3: Kitchen & Living */}
        <div className="relative rounded-2xl overflow-hidden shadow-xs h-64 group flex flex-col justify-end p-6 text-white md:col-span-2 lg:col-span-1">
          <img
            src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
            alt="Home & Kitchen"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#065F46]/95 via-[#065F46]/60 to-transparent"></div>
          <div className="relative z-10 space-y-2">
            <span className="bg-emerald-400 text-navy text-[10px] font-black px-2 py-0.5 rounded uppercase">
              HOME MAKEOVER
            </span>
            <h3 className="text-xl font-black font-heading leading-tight">
              Smart Air Fryers & Cast Iron Cookware
            </h3>
            <p className="text-xs text-emerald-100">Healthy oil-free cooking & heirloom pure cast iron</p>
            <Link
              to="/category/home-kitchen"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-white pt-1 transition"
            >
              <span>Discover Home Essentials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
