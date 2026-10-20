import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Home, Search } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 text-center max-w-lg w-full shadow-card space-y-5">
        <div className="w-24 h-24 rounded-3xl bg-blue-50 text-primary font-black text-4xl flex items-center justify-center mx-auto border border-blue-100 shadow-inner">
          404
        </div>

        <div>
          <h1 className="text-2xl font-black font-heading text-navy">
            Oops! Looking for something?
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            The page or product you were searching for might have been moved, renamed, or is temporarily out of stock.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow"
          >
            <Home className="w-4 h-4" />
            <span>Go to SGKart Homepage</span>
          </Link>

          <Link
            to="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-hover text-navy text-xs font-bold px-6 py-3 rounded-xl transition shadow"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Explore All Deals</span>
          </Link>
        </div>

        {/* Quick popular links */}
        <div className="pt-4 border-t border-slate-100 text-xs text-slate-400">
          <p className="mb-2 font-medium">Or explore popular sections:</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link to="/category/electronics" className="text-primary hover:underline">Electronics</Link>
            <span>•</span>
            <Link to="/category/fashion" className="text-primary hover:underline">Ethnic Fashion</Link>
            <span>•</span>
            <Link to="/category/home-kitchen" className="text-primary hover:underline">Home & Kitchen</Link>
            <span>•</span>
            <Link to="/products?filter=flash" className="text-rose-600 font-bold hover:underline">Flash Deals</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
