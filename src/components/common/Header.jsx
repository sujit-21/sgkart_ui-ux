import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  MapPin, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  Package, 
  LogOut, 
  LogIn, 
  SlidersHorizontal,
  ExternalLink,
  Flame,
  ArrowRight
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';

export const Header = () => {
  const navigate = useNavigate();
  const { totalItems, subtotal } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, logout, loginAsDemoCustomer, loginAsDemoAdmin, isAdmin } = useAuth();
  const { products, categories } = useProducts();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [currentPincode, setCurrentPincode] = useState('400076');
  const [currentCity, setCurrentCity] = useState('Mumbai');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchContainerRef = useRef(null);
  const accountMenuRef = useRef(null);

  // Filter search suggestions based on query
  const suggestions = searchQuery.trim()
    ? products
        .filter((p) => {
          const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesCat = selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();
          return matchesQuery && matchesCat;
        })
        .slice(0, 6)
    : [];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target)) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchFocused(false);
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}${selectedCategory !== 'all' ? `&category=${selectedCategory}` : ''}`);
  };

  const handleSuggestionClick = (slug) => {
    setIsSearchFocused(false);
    setSearchQuery('');
    navigate(`/product/${slug}`);
  };

  const handleUpdatePincode = (e) => {
    e.preventDefault();
    setIsLocationModalOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-md">
      {/* Top Announcement Bar */}
      <div className="bg-[#0C2B61] text-white text-xs py-1.5 px-4 font-medium border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-secondary text-navy font-bold px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider animate-pulse">
              FESTIVE SPECIAL
            </span>
            <span>Up to 70% Off on Top Electronics & Fashion + Instant 10% Bank Discount | Code: <b>SGKART10</b></span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-slate-300">
            <Link to="/orders" className="hover:text-secondary transition flex items-center gap-1">
              <Package className="w-3.5 h-3.5" />
              <span>Track Orders</span>
            </Link>
            <span className="text-blue-400/40">|</span>
            <Link to="/admin" className="hover:text-secondary transition flex items-center gap-1 font-semibold text-secondary">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{isAdmin ? 'Admin Dashboard' : 'Demo Admin'}</span>
            </Link>
            <span className="text-blue-400/40">|</span>
            <span>24x7 Support: 1800-SG-KART</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-primary text-white py-2.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 md:gap-6">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 hover:bg-primary-hover rounded-lg transition"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo Brand */}
          <Link to="/" className="flex flex-col group flex-shrink-0">
            <div className="flex items-center tracking-tight text-2xl sm:text-3xl font-black font-heading leading-none">
              <span className="text-white drop-shadow-sm">SG</span>
              <span className="text-secondary drop-shadow-sm ml-0.5">Kart</span>
              <span className="inline-block w-2 h-2 rounded-full bg-secondary ml-1 group-hover:scale-125 transition-transform duration-200"></span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-blue-100/90 font-medium tracking-wide italic leading-tight hidden xs:block">
              Everything You Need. All in One Place.
            </span>
          </Link>

          {/* Location Selector Placeholder */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 hover:bg-primary-hover rounded-lg transition text-left cursor-pointer border border-transparent hover:border-blue-400/30 flex-shrink-0"
            title="Select delivery location"
          >
            <MapPin className="w-4 h-4 text-secondary flex-shrink-0" />
            <div className="text-xs leading-tight">
              <p className="text-blue-200 text-[11px]">Deliver to {user?.name ? user.name.split(' ')[0] : 'Guest'}</p>
              <p className="font-bold text-white flex items-center gap-0.5">
                {currentCity} {currentPincode}
                <ChevronDown className="w-3 h-3 text-secondary" />
              </p>
            </div>
          </button>

          {/* Large Product Search Bar */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-2xl mx-1 sm:mx-2">
            <form onSubmit={handleSearchSubmit} className="flex w-full rounded-lg bg-white shadow-inner overflow-hidden focus-within:ring-2 focus-within:ring-secondary">
              {/* Category selector inside search */}
              <div className="hidden sm:flex items-center bg-slate-100 border-r border-slate-200 text-navy text-xs font-semibold px-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent py-2 outline-none cursor-pointer text-slate-700 font-medium"
                >
                  <option value="all">All Categories</option>
                  {categories.filter(c => c.slug !== 'all').map((cat) => (
                    <option key={cat.id} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search 10,000+ products, mobiles, sarees, laptops..."
                className="w-full px-3 py-2 text-sm text-navy placeholder-slate-400 focus:outline-none"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-2 text-slate-400 hover:text-slate-600 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="submit"
                className="bg-secondary hover:bg-secondary-hover text-navy px-4 sm:px-5 flex items-center justify-center transition font-bold"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-navy stroke-[2.5]" />
              </button>
            </form>

            {/* Live Autocomplete Suggestions Dropdown */}
            {isSearchFocused && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white text-navy rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50">
                <div className="p-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 border-b border-slate-100">
                  Matching Products & Brands
                </div>
                <div className="divide-y divide-slate-100">
                  {suggestions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSuggestionClick(item.slug)}
                      className="flex items-center gap-3 p-2.5 hover:bg-blue-50/70 cursor-pointer transition"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-md flex-shrink-0 border border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-navy truncate">{item.name}</p>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <span className="text-primary font-bold">₹{item.price.toLocaleString('en-IN')}</span>
                          <span className="line-through text-slate-400">₹{item.originalPrice.toLocaleString('en-IN')}</span>
                          <span className="text-emerald-600 font-semibold">{item.discountPercent}% off</span>
                        </div>
                      </div>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                        {item.category}
                      </span>
                    </div>
                  ))}
                </div>
                <div 
                  onClick={handleSearchSubmit}
                  className="bg-blue-50/50 hover:bg-blue-50 p-2.5 text-center text-xs font-semibold text-primary cursor-pointer border-t border-slate-100 flex items-center justify-center gap-1"
                >
                  View all results for "{searchQuery}" <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            )}
          </div>

          {/* Right Action Icons: Account, Wishlist, Cart */}
          <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
            {/* Account Menu Dropdown */}
            <div ref={accountMenuRef} className="relative">
              <button
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-primary-hover rounded-lg transition text-left cursor-pointer border border-transparent hover:border-blue-400/30"
              >
                <div className="w-8 h-8 rounded-full bg-blue-700/60 border border-blue-400/30 flex items-center justify-center font-bold text-secondary text-sm">
                  {isAuthenticated && user?.name ? user.name.charAt(0) : <User className="w-4 h-4 text-white" />}
                </div>
                <div className="hidden xl:block text-left leading-tight">
                  <p className="text-[11px] text-blue-200">Hello, {isAuthenticated ? user?.name?.split(' ')[0] : 'Sign In'}</p>
                  <p className="font-bold text-xs flex items-center gap-0.5 text-white">
                    Account <ChevronDown className="w-3 h-3 text-secondary" />
                  </p>
                </div>
              </button>

              {/* Account Dropdown */}
              {isAccountOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-navy rounded-xl shadow-dropdown border border-slate-200 overflow-hidden z-50 animate-in fade-in-50 duration-150">
                  <div className="p-3.5 bg-gradient-to-r from-primary to-blue-900 text-white">
                    <p className="text-xs text-blue-200 font-medium">Signed in as</p>
                    <p className="font-bold text-sm truncate">{isAuthenticated ? user?.name : 'Guest User'}</p>
                    <p className="text-[11px] text-blue-200 truncate">{isAuthenticated ? user?.email : 'Sign in to access your orders'}</p>
                    {isAdmin && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-secondary text-navy text-[10px] font-black rounded uppercase">
                        Store Administrator
                      </span>
                    )}
                  </div>

                  <div className="py-1 text-sm">
                    {isAuthenticated ? (
                      <>
                        <Link
                          to="/account"
                          onClick={() => setIsAccountOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-slate-100 transition"
                        >
                          <User className="w-4 h-4 text-primary" />
                          <span>My Profile</span>
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setIsAccountOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-slate-100 transition"
                        >
                          <Package className="w-4 h-4 text-primary" />
                          <span>My Orders & Returns</span>
                        </Link>
                        <Link
                          to="/wishlist"
                          onClick={() => setIsAccountOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 hover:bg-slate-100 transition"
                        >
                          <Heart className="w-4 h-4 text-rose-500" />
                          <span>Wishlist ({wishlistCount})</span>
                        </Link>

                        <div className="border-t border-slate-100 my-1"></div>

                        {/* Admin Link */}
                        <Link
                          to="/admin"
                          onClick={() => setIsAccountOpen(false)}
                          className="flex items-center justify-between px-4 py-2 hover:bg-amber-50 text-amber-900 font-semibold transition"
                        >
                          <span className="flex items-center gap-2">
                            <SlidersHorizontal className="w-4 h-4 text-amber-600" />
                            Admin Dashboard
                          </span>
                          <span className="text-[10px] bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded">Demo</span>
                        </Link>

                        <div className="border-t border-slate-100 my-1"></div>

                        {/* Quick switchers */}
                        <div className="px-4 py-2 bg-slate-50 text-[11px] text-slate-500">
                          <p className="font-semibold mb-1">Quick Demo Switchers:</p>
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => { loginAsDemoCustomer(); setIsAccountOpen(false); }}
                              className="flex-1 bg-white border border-slate-200 hover:bg-slate-100 px-2 py-1 rounded text-slate-700 font-medium"
                            >
                              Customer
                            </button>
                            <button
                              onClick={() => { loginAsDemoAdmin(); setIsAccountOpen(false); }}
                              className="flex-1 bg-primary text-white hover:bg-primary-hover px-2 py-1 rounded font-medium"
                            >
                              Admin
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => { logout(); setIsAccountOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-rose-600 hover:bg-rose-50 transition text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="p-3">
                          <Link
                            to="/auth"
                            onClick={() => setIsAccountOpen(false)}
                            className="w-full block text-center bg-secondary hover:bg-secondary-hover text-navy font-bold py-2 rounded-lg transition"
                          >
                            Sign In / Register
                          </Link>
                        </div>
                        <div className="border-t border-slate-100 px-3 py-2 bg-slate-50 text-xs text-center">
                          <p className="text-slate-500 mb-1.5">Or try 1-click Demo logins:</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => { loginAsDemoCustomer(); setIsAccountOpen(false); }}
                              className="flex-1 bg-white border border-slate-300 hover:bg-slate-100 py-1 rounded font-medium text-slate-700"
                            >
                              Demo Customer
                            </button>
                            <button
                              onClick={() => { loginAsDemoAdmin(); setIsAccountOpen(false); }}
                              className="flex-1 bg-primary text-white hover:bg-primary-hover py-1 rounded font-medium"
                            >
                              Demo Admin
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 hover:bg-primary-hover rounded-lg transition text-white flex items-center"
              title="My Wishlist"
            >
              <Heart className="w-6 h-6 stroke-[2]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-navy font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-scale">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart Button */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 bg-secondary hover:bg-secondary-hover text-navy px-3 py-2 rounded-lg font-bold transition shadow-sm ml-1"
              title="Shopping Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 stroke-[2.5]" />
                {totalItems > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-primary text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-secondary">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline text-xs font-bold">
                Cart {subtotal > 0 ? `(₹${subtotal.toLocaleString('en-IN')})` : ''}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Pincode / Location Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-navy animate-in fade-in-50 zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-bold text-lg text-primary">
                <MapPin className="w-5 h-5 text-secondary" />
                <h3>Choose Delivery Location</h3>
              </div>
              <button 
                onClick={() => setIsLocationModalOpen(false)}
                className="text-slate-400 hover:text-navy p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              Delivery options and speeds may vary based on your location. Enter your Indian delivery pin code:
            </p>

            <form onSubmit={handleUpdatePincode} className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">6-Digit Pincode</label>
                <input
                  type="text"
                  maxLength={6}
                  value={currentPincode}
                  onChange={(e) => setCurrentPincode(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold tracking-wider focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. 400076, 560001, 110001"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">City / Region</label>
                <input
                  type="text"
                  value={currentCity}
                  onChange={(e) => setCurrentCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. Mumbai, Bengaluru, Delhi NCR"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-2.5 rounded-xl transition shadow"
                >
                  Apply Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col text-navy overflow-y-auto animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="p-4 bg-primary text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-secondary text-navy font-black flex items-center justify-center">
                  {isAuthenticated ? user?.name?.charAt(0) : 'G'}
                </div>
                <div>
                  <p className="font-bold text-sm">Hello, {isAuthenticated ? user?.name : 'Shopper'}</p>
                  <p className="text-[11px] text-blue-200">{isAuthenticated ? user?.email : 'Welcome to SGKart'}</p>
                </div>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-1">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Demo Switcher */}
            <div className="p-3 bg-blue-50 border-b border-blue-100 flex gap-2 text-xs">
              <button
                onClick={() => { loginAsDemoCustomer(); setIsMobileMenuOpen(false); }}
                className="flex-1 bg-white border border-blue-200 py-1.5 rounded-lg font-medium text-primary shadow-xs"
              >
                Demo Customer
              </button>
              <button
                onClick={() => { loginAsDemoAdmin(); setIsMobileMenuOpen(false); }}
                className="flex-1 bg-primary text-white py-1.5 rounded-lg font-medium shadow-xs"
              >
                Demo Admin
              </button>
            </div>

            {/* Navigation Links */}
            <div className="p-4 space-y-4 text-sm flex-1">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Shop Categories</p>
                <div className="space-y-1">
                  <Link
                    to="/products"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-lg hover:bg-slate-100 font-medium text-primary"
                  >
                    All Products
                  </Link>
                  {categories.filter(c => c.slug !== 'all').map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.slug}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-3 py-2 rounded-lg hover:bg-slate-100 font-medium"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Your Activity</p>
                <div className="space-y-1">
                  <Link
                    to="/orders"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100"
                  >
                    <Package className="w-4 h-4 text-primary" />
                    <span>My Orders</span>
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100"
                  >
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>Wishlist ({wishlistCount})</span>
                  </Link>
                  <Link
                    to="/cart"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100"
                  >
                    <ShoppingCart className="w-4 h-4 text-primary" />
                    <span>Shopping Cart ({totalItems})</span>
                  </Link>
                  <Link
                    to="/admin"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg bg-amber-50 text-amber-900 font-semibold"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-amber-600" />
                    <span>Admin Dashboard</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Drawer Bottom */}
            <div className="p-4 border-t border-slate-100 bg-slate-50">
              {isAuthenticated ? (
                <button
                  onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-xl transition text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full block text-center py-2.5 bg-primary text-white font-bold rounded-xl shadow transition text-sm"
                >
                  Sign In / Register
                </Link>
              )}
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)}></div>
        </div>
      )}
    </header>
  );
};
