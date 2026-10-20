import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Smartphone, 
  Shirt, 
  Home, 
  Sparkles, 
  Apple, 
  Trophy, 
  Watch,
  Tag
} from 'lucide-react';
import { CATEGORIES } from '../../data/mockProducts';

const categoryPillConfig = {
  electronics: {
    icon: Smartphone,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50 text-blue-600',
    border: 'border-blue-200'
  },
  fashion: {
    icon: Shirt,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50 text-pink-600',
    border: 'border-pink-200'
  },
  'home-kitchen': {
    icon: Home,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50 text-amber-600',
    border: 'border-amber-200'
  },
  beauty: {
    icon: Sparkles,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50 text-purple-600',
    border: 'border-purple-200'
  },
  grocery: {
    icon: Apple,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50 text-emerald-600',
    border: 'border-emerald-200'
  },
  sports: {
    icon: Trophy,
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-50 text-cyan-600',
    border: 'border-cyan-200'
  },
  accessories: {
    icon: Watch,
    color: 'from-slate-600 to-slate-800',
    bgColor: 'bg-slate-100 text-slate-700',
    border: 'border-slate-300'
  }
};

export const CategoryPills = () => {
  const mainCategories = CATEGORIES.filter((c) => c.slug !== 'all');

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold font-heading text-navy">
              Explore Popular Categories
            </h2>
            <p className="text-xs text-slate-500">Hand-curated collections with fastest delivery</p>
          </div>
          <Link
            to="/products"
            className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1 transition"
          >
            <span>All Categories</span> &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 sm:gap-4 text-center">
          {mainCategories.map((cat) => {
            const config = categoryPillConfig[cat.slug] || {
              icon: Tag,
              color: 'from-blue-500 to-indigo-600',
              bgColor: 'bg-blue-50 text-primary',
              border: 'border-blue-200'
            };
            const Icon = config.icon;

            return (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="group flex flex-col items-center p-2 rounded-xl hover:bg-slate-50 transition-all duration-200 transform hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xs group-hover:shadow-md ${config.bgColor} border ${config.border} group-hover:scale-105`}
                >
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 transition-transform group-hover:rotate-6" />
                </div>
                <span className="mt-2 text-xs font-semibold text-navy group-hover:text-primary line-clamp-1">
                  {cat.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {cat.count ? `${cat.count}+ items` : 'Explore'}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
