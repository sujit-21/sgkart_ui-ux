import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from '../common/ProductCard';

export const ProductSection = ({
  title,
  subtitle,
  badge,
  badgeColor = 'bg-primary/10 text-primary',
  products = [],
  viewAllLink = '/products'
}) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black font-heading text-navy">
                {title}
              </h2>
              {badge && (
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${badgeColor}`}>
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>

          <Link
            to={viewAllLink}
            className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1 group transition"
          >
            <span>See All</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Responsive Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-5">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
