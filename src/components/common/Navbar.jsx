import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  Smartphone, 
  Shirt, 
  Home, 
  Sparkles, 
  Apple, 
  Trophy, 
  Watch, 
  Flame, 
  Zap, 
  ChevronDown, 
  SlidersHorizontal,
  Tag
} from 'lucide-react';
import { CATEGORIES } from '../../data/mockProducts';

const iconMap = {
  Smartphone,
  Shirt,
  Home,
  Sparkles,
  Apple,
  Trophy,
  Watch
};

export const Navbar = () => {
  const location = useLocation();
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 text-navy relative z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs font-semibold overflow-x-auto no-scrollbar">
        {/* Categories Bar */}
        <div className="flex items-center space-x-1 sm:space-x-2 py-1.5 min-w-max">
          {/* All Categories Button */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-navy transition cursor-pointer font-bold"
            >
              <Menu className="w-4 h-4 text-primary" />
              <span>All Categories</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </button>

            {/* Dropdown Menu */}
            {isCategoryDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsCategoryDropdownOpen(false)}
                />
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-dropdown border border-slate-200 py-2 z-50 animate-in fade-in-50 zoom-in-95">
                  <div className="px-3.5 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Browse Marketplace
                  </div>
                  <Link
                    to="/products"
                    onClick={() => setIsCategoryDropdownOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2 hover:bg-blue-50 text-primary font-bold transition"
                  >
                    <span>All Products</span>
                    <span className="text-[10px] bg-blue-100 text-primary px-1.5 py-0.5 rounded-full">All</span>
                  </Link>
                  {CATEGORIES.filter(c => c.slug !== 'all').map((cat) => {
                    const Icon = iconMap[cat.icon] || Tag;
                    return (
                      <Link
                        key={cat.id}
                        to={`/category/${cat.slug}`}
                        onClick={() => setIsCategoryDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3.5 py-2 hover:bg-slate-100 text-slate-700 transition"
                      >
                        <Icon className="w-4 h-4 text-slate-500" />
                        <div className="flex-1">
                          <p className="font-semibold text-xs leading-none">{cat.name}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{cat.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <div className="h-4 w-px bg-slate-200 mx-1"></div>

          {/* Quick Category Links */}
          {CATEGORIES.filter(c => c.slug !== 'all').map((cat) => {
            const Icon = iconMap[cat.icon] || Tag;
            const isActive = location.pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition whitespace-nowrap ${
                  isActive 
                    ? 'bg-blue-50 text-primary font-bold border-b-2 border-primary' 
                    : 'text-slate-700 hover:text-primary hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
                <span>{cat.name}</span>
              </Link>
            );
          })}

          <div className="h-4 w-px bg-slate-200 mx-1"></div>

          {/* Special Highlights */}
          <Link
            to="/products?filter=flash"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-amber-700 hover:bg-amber-50 font-bold whitespace-nowrap"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-bounce" />
            <span>Flash Deals</span>
          </Link>

          <Link
            to="/products?filter=trending"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-emerald-700 hover:bg-emerald-50 font-bold whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
            <span>Trending</span>
          </Link>
        </div>

        {/* Right shortcut link to Admin Dashboard */}
        <div className="hidden lg:flex items-center pl-3">
          <Link
            to="/admin"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 border border-slate-200 transition font-semibold text-[11px]"
          >
            <SlidersHorizontal className="w-3 h-3 text-amber-600" />
            <span>Admin Console</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
