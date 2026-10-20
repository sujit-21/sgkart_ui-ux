import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Filter, 
  X, 
  SlidersHorizontal, 
  ChevronDown, 
  Star, 
  Grid3X3, 
  LayoutList, 
  ArrowUpDown, 
  Check, 
  RotateCcw,
  Search
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ProductCard } from '../components/common/ProductCard';

export const AllProductsPage = ({ forcedCategory = null, categoryTitle = null }) => {
  const { products, categories } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters state from URL query or defaults
  const filterQueryParam = searchParams.get('filter') || '';
  const searchParam = searchParams.get('q') || '';
  const categoryParam = forcedCategory || searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 70000]);
  const [minRating, setMinRating] = useState(0);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlySGAssured, setOnlySGAssured] = useState(false);
  const [sortBy, setSortBy] = useState('popularity'); // popularity, price-asc, price-desc, rating, newest
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [localSearch, setLocalSearch] = useState(searchParam);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync state if URL prop changes
  useEffect(() => {
    if (forcedCategory) {
      setSelectedCategory(forcedCategory);
    }
  }, [forcedCategory]);

  useEffect(() => {
    if (searchParam) {
      setLocalSearch(searchParam);
    }
  }, [searchParam]);

  // Extract all unique brands from products
  const allBrands = useMemo(() => {
    const brandsSet = new Set(products.map((p) => p.brand).filter(Boolean));
    return Array.from(brandsSet);
  }, [products]);

  // Handle brand toggle
  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  // Clear all filters
  const handleClearFilters = () => {
    if (!forcedCategory) setSelectedCategory('all');
    setSelectedBrands([]);
    setPriceRange([0, 70000]);
    setMinRating(0);
    setOnlyInStock(false);
    setOnlySGAssured(false);
    setLocalSearch('');
    setSortBy('popularity');
    setCurrentPage(1);
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory && selectedCategory !== 'all') {
        const matchesSlug = p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-') === selectedCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const matchesName = p.category.toLowerCase() === selectedCategory.toLowerCase();
        if (!matchesSlug && !matchesName) return false;
      }

      // Filter preset from query (flash, trending, bestseller)
      if (filterQueryParam === 'flash' && !p.isFlashDeal) return false;
      if (filterQueryParam === 'trending' && !p.isTrending) return false;
      if (filterQueryParam === 'bestseller' && !p.isBestSeller) return false;

      // Local search query
      if (localSearch.trim()) {
        const query = localSearch.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCat) return false;
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }

      // Price filter
      if (p.price < priceRange[0] || p.price > priceRange[1]) {
        return false;
      }

      // Rating filter
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }

      // Availability filter
      if (onlyInStock && !p.inStock) {
        return false;
      }

      // SG Assured
      if (onlySGAssured && !p.sgAssured) {
        return false;
      }

      return true;
    });
  }, [
    products,
    selectedCategory,
    filterQueryParam,
    localSearch,
    selectedBrands,
    priceRange,
    minRating,
    onlyInStock,
    onlySGAssured
  ]);

  // Sort logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      list.reverse();
    } else {
      // Popularity (rating * reviewCount)
      list.sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount));
    }
    return list;
  }, [filteredProducts, sortBy]);

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage]);

  const activeFilterCount = (selectedCategory !== 'all' && !forcedCategory ? 1 : 0) +
    selectedBrands.length +
    (minRating > 0 ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (onlySGAssured ? 1 : 0) +
    (priceRange[1] < 70000 || priceRange[0] > 0 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Breadcrumbs & Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-primary transition">Home</Link>
          <span>/</span>
          <span className="text-navy font-semibold">
            {categoryTitle || (selectedCategory !== 'all' ? selectedCategory : 'All Products')}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black font-heading text-navy flex items-center gap-2">
              <span>{categoryTitle || (selectedCategory !== 'all' ? selectedCategory : 'All Products')}</span>
              <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                {sortedProducts.length} results
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Shop verified authentic products with free SG Assured express delivery
            </p>
          </div>

          {/* Mobile Filter Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-300 py-2 px-4 rounded-xl text-xs font-bold text-navy shadow-xs"
            >
              <Filter className="w-4 h-4 text-primary" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-300 py-2 px-3 rounded-xl text-xs font-bold text-navy shadow-xs"
            >
              <option value="popularity">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-6 items-start">
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden lg:block w-64 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs sticky top-24 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 font-bold text-sm text-navy">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={handleClearFilters}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-0.5 transition"
              >
                <RotateCcw className="w-3 h-3" /> Clear All
              </button>
            )}
          </div>

          {/* Category Filter */}
          {!forcedCategory && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Category</h4>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => { setSelectedCategory('all'); setCurrentPage(1); }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-white font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  All Categories ({products.length})
                </button>
                {categories.filter(c => c.slug !== 'all').map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.name); setCurrentPage(1); }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition flex items-center justify-between ${
                      selectedCategory.toLowerCase() === cat.name.toLowerCase()
                        ? 'bg-primary text-white font-bold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-70">
                      {products.filter(p => p.category.toLowerCase() === cat.name.toLowerCase()).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
              <span className="uppercase tracking-wider">Price Range</span>
              <span className="text-primary">Up to ₹{priceRange[1].toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={500}
              max={70000}
              step={1000}
              value={priceRange[1]}
              onChange={(e) => { setPriceRange([0, Number(e.target.value)]); setCurrentPage(1); }}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>₹0</span>
              <span>₹35,000</span>
              <span>₹70,000+</span>
            </div>
          </div>

          {/* Customer Rating Filter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Minimum Rating</h4>
            <div className="space-y-1.5 text-xs">
              {[4, 3, 2].map((stars) => (
                <button
                  key={stars}
                  onClick={() => { setMinRating(minRating === stars ? 0 : stars); setCurrentPage(1); }}
                  className={`w-full flex items-center justify-between p-2 rounded-lg border transition ${
                    minRating === stars
                      ? 'border-primary bg-blue-50 text-primary font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span className="flex items-center text-amber-500">
                      {Array.from({ length: stars }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </span>
                    <span className="ml-1">& above</span>
                  </div>
                  {minRating === stars && <Check className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          {allBrands.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Brands</h4>
              <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar text-xs">
                {allBrands.map((brand) => {
                  const isChecked = selectedBrands.includes(brand);
                  return (
                    <label
                      key={brand}
                      className="flex items-center gap-2 text-slate-700 hover:text-navy cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleBrand(brand)}
                        className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
                      />
                      <span>{brand}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* SG Assured & Stock Toggles */}
          <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
              <input
                type="checkbox"
                checked={onlySGAssured}
                onChange={(e) => { setOnlySGAssured(e.target.checked); setCurrentPage(1); }}
                className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
              />
              <span>SG Assured Only</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => { setOnlyInStock(e.target.checked); setCurrentPage(1); }}
                className="rounded text-primary focus:ring-primary w-4 h-4 cursor-pointer"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* MAIN PRODUCT LISTING AREA */}
        <div className="flex-1 min-w-0">
          {/* Top Controls: Search within, Sorting & Active Chips */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 mb-4 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Keyword Filter Input */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={localSearch}
                  onChange={(e) => { setLocalSearch(e.target.value); setCurrentPage(1); }}
                  placeholder="Filter by keyword / name..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Sort by dropdown & View Switcher */}
              <div className="hidden sm:flex items-center gap-3 w-full sm:w-auto justify-end">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-slate-50 border border-slate-200 py-1.5 px-2.5 rounded-lg text-xs font-bold text-navy cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>

                <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition ${viewMode === 'grid' ? 'bg-white text-primary shadow-xs' : 'text-slate-500'}`}
                    title="Grid View"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition ${viewMode === 'list' ? 'bg-white text-primary shadow-xs' : 'text-slate-500'}`}
                    title="List View"
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-400 font-medium mr-1">Active:</span>

                {selectedCategory !== 'all' && !forcedCategory && (
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-primary border border-blue-200 px-2.5 py-0.5 rounded-full font-semibold">
                    Category: {selectedCategory}
                    <button onClick={() => setSelectedCategory('all')}>
                      <X className="w-3 h-3 text-primary hover:text-navy" />
                    </button>
                  </span>
                )}

                {selectedBrands.map((b) => (
                  <span key={b} className="inline-flex items-center gap-1 bg-blue-50 text-primary border border-blue-200 px-2.5 py-0.5 rounded-full font-semibold">
                    Brand: {b}
                    <button onClick={() => toggleBrand(b)}>
                      <X className="w-3 h-3 text-primary hover:text-navy" />
                    </button>
                  </span>
                ))}

                {minRating > 0 && (
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-primary border border-blue-200 px-2.5 py-0.5 rounded-full font-semibold">
                    {minRating}★ & above
                    <button onClick={() => setMinRating(0)}>
                      <X className="w-3 h-3 text-primary hover:text-navy" />
                    </button>
                  </span>
                )}

                {onlySGAssured && (
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-primary border border-blue-200 px-2.5 py-0.5 rounded-full font-semibold">
                    SG Assured
                    <button onClick={() => setOnlySGAssured(false)}>
                      <X className="w-3 h-3 text-primary hover:text-navy" />
                    </button>
                  </span>
                )}

                {onlyInStock && (
                  <span className="inline-flex items-center gap-1 bg-blue-50 text-primary border border-blue-200 px-2.5 py-0.5 rounded-full font-semibold">
                    In Stock
                    <button onClick={() => setOnlyInStock(false)}>
                      <X className="w-3 h-3 text-primary hover:text-navy" />
                    </button>
                  </span>
                )}

                <button
                  onClick={handleClearFilters}
                  className="text-xs text-rose-600 hover:underline font-semibold ml-auto"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>

          {/* Product Grid / List View */}
          {paginatedProducts.length > 0 ? (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {paginatedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                /* List View */
                <div className="space-y-3">
                  {paginatedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col sm:flex-row gap-4 hover:shadow-card-hover transition"
                    >
                      <Link to={`/product/${product.slug || product.id}`} className="w-full sm:w-44 h-44 flex-shrink-0 bg-slate-50 rounded-xl overflow-hidden block">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                              {product.brand}
                            </span>
                            <span className="text-[10px] text-slate-400">{product.category}</span>
                            {product.sgAssured && (
                              <span className="text-[10px] bg-blue-100 text-primary font-bold px-2 py-0.5 rounded">
                                SG Assured
                              </span>
                            )}
                          </div>

                          <Link
                            to={`/product/${product.slug || product.id}`}
                            className="text-sm font-bold text-navy hover:text-primary transition line-clamp-2"
                          >
                            {product.name}
                          </Link>

                          <div className="flex items-center gap-2 mt-1.5">
                            <div className="flex items-center gap-0.5 bg-emerald-700 text-white text-[10px] font-black px-1.5 py-0.5 rounded">
                              <span>{product.rating}</span>
                              <Star className="w-2.5 h-2.5 fill-white" />
                            </div>
                            <span className="text-xs text-slate-400">
                              ({product.reviewCount} customer ratings)
                            </span>
                          </div>

                          <p className="text-xs text-slate-500 line-clamp-2 mt-2">
                            {product.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                          <div className="flex items-baseline gap-2">
                            <span className="text-lg font-black text-navy">
                              ₹{product.price.toLocaleString('en-IN')}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className="text-xs text-slate-400 line-through">
                                ₹{product.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                            <span className="text-xs font-bold text-emerald-600">
                              {product.discountPercent}% OFF
                            </span>
                          </div>

                          <Link
                            to={`/product/${product.slug || product.id}`}
                            className="bg-secondary hover:bg-secondary-hover text-navy text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-navy disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition ${
                          currentPage === pageNum
                            ? 'bg-primary text-white shadow-xs'
                            : 'bg-white border border-slate-300 text-navy hover:bg-slate-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-navy disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-navy">No products match your filters</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                Try widening your price range or clearing some of the brand or rating filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow transition"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE FILTERS MODAL */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-xs bg-white h-full shadow-2xl p-5 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-base text-navy flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-primary" /> Filter Products
                </h3>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-1 text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price */}
              <div className="py-4 border-b border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                  <span>MAX PRICE</span>
                  <span className="text-primary font-bold">₹{priceRange[1].toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={70000}
                  step={1000}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              {/* Brands */}
              <div className="py-4 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Brands</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto text-xs">
                  {allBrands.map((brand) => (
                    <label key={brand} className="flex items-center gap-2 text-slate-700">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="rounded text-primary w-4 h-4"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={handleClearFilters}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700"
              >
                Clear
              </button>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
