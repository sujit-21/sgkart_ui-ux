import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Clock, ArrowRight, Zap } from 'lucide-react';
import { ProductCard } from '../common/ProductCard';
import { useProducts } from '../../context/ProductContext';

export const FlashDealsSection = () => {
  const { products } = useProducts();
  const flashProducts = products.filter((p) => p.isFlashDeal).slice(0, 4);

  // Simulated countdown timer: 6 hours 42 minutes 19 seconds
  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const format2 = (num) => String(num).padStart(2, '0');

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-[#172033] via-[#0D3578] to-[#174EA6] rounded-2xl p-5 sm:p-6 text-white shadow-card">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/15">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-secondary text-navy flex items-center justify-center font-black shadow-md animate-pulse">
              <Flame className="w-6 h-6 fill-navy" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black font-heading tracking-tight">
                  Flash Deals
                </h2>
                <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  LIMITED TIME
                </span>
              </div>
              <p className="text-xs text-blue-200 mt-0.5">
                Massive discounts on top rated electronics and essentials
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
            <Clock className="w-4 h-4 text-secondary" />
            <span className="text-xs text-slate-300 font-medium">Ends In:</span>
            <div className="flex items-center gap-1 font-mono font-black text-sm text-secondary">
              <span className="bg-white/10 px-1.5 py-0.5 rounded">{format2(timeLeft.hours)}h</span>
              <span>:</span>
              <span className="bg-white/10 px-1.5 py-0.5 rounded">{format2(timeLeft.minutes)}m</span>
              <span>:</span>
              <span className="bg-white/10 px-1.5 py-0.5 rounded">{format2(timeLeft.seconds)}s</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {flashProducts.map((product) => (
            <div key={product.id} className="text-navy">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 text-center">
          <Link
            to="/products?filter=flash"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-hover text-navy font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition shadow-md"
          >
            <span>View All Flash Deals ({products.filter(p => p.isFlashDeal).length} Items)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
