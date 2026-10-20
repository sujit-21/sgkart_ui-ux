import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { HERO_BANNERS } from '../../data/mockProducts';

export const HeroBannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
  };

  const banner = HERO_BANNERS[currentSlide];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 pt-4 pb-2">
      <div className="relative rounded-2xl overflow-hidden shadow-card min-h-[300px] sm:min-h-[380px] md:min-h-[440px] flex items-center">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={banner.image}
            alt={banner.headline}
            className="w-full h-full object-cover object-center transition-all duration-700 transform scale-105"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${banner.accent} opacity-85 mix-blend-multiply`}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-2xl px-6 sm:px-12 py-8 text-white space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm bg-secondary text-navy">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{banner.tag}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading leading-tight tracking-tight drop-shadow-md">
            {banner.headline}
          </h1>

          <p className="text-sm sm:text-base text-slate-100 font-medium max-w-lg leading-relaxed drop-shadow">
            {banner.subheadline}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to={banner.ctaLink}
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-hover text-navy font-black text-sm px-6 py-3 rounded-xl transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{banner.ctaText}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold text-sm px-5 py-3 rounded-xl backdrop-blur-sm transition border border-white/30"
            >
              <span>View All Deals</span>
            </Link>
          </div>
        </div>

        {/* Left/Right Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition shadow"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition shadow"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {HERO_BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-8 bg-secondary' : 'w-2.5 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
