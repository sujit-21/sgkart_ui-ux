import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Zap, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Clock, 
  MapPin, 
  Check, 
  Share2, 
  Plus, 
  Minus, 
  ChevronRight,
  Sparkles,
  MessageSquarePlus,
  ThumbsUp
} from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { ProductCard } from '../components/common/ProductCard';

export const ProductDetailsPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products, getProductBySlug } = useProducts();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const product = getProductBySlug(slug) || products[0];

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('400076');
  const [isPincodeChecked, setIsPincodeChecked] = useState(true);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'reviews' | 'features'

  // Write Review Demo State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState(product?.reviews || []);

  // Update image and reviews when slug changes
  useEffect(() => {
    setSelectedImageIdx(0);
    setQuantity(1);
    if (product) {
      setLocalReviews(product.reviews || []);
      // Save to recently viewed in localStorage
      try {
        const saved = localStorage.getItem('sgkart_recently_viewed');
        const ids = saved ? JSON.parse(saved) : [];
        const updatedIds = [product.id, ...ids.filter((id) => id !== product.id)].slice(0, 6);
        localStorage.setItem('sgkart_recently_viewed', JSON.stringify(updatedIds));
      } catch (e) {
        // ignore
      }
    }
  }, [slug, product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-navy">Product Not Found</h2>
        <Link to="/products" className="text-primary font-bold text-sm mt-3 inline-block">
          Return to Marketplace
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      setIsPincodeChecked(true);
      addToast(`Standard delivery available for PIN: ${pincode}`, 'success');
    } else {
      addToast('Please enter a valid 6-digit Indian PIN code', 'error');
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('Product link copied to clipboard!', 'info');
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      addToast('Please provide your name and review feedback', 'error');
      return;
    }

    const newRev = {
      id: 'rev-' + Date.now(),
      user: reviewName.trim(),
      rating: reviewRating,
      date: 'Today',
      comment: reviewComment.trim(),
      verified: true
    };

    setLocalReviews([newRev, ...localReviews]);
    setIsReviewModalOpen(false);
    setReviewComment('');
    addToast('Thank you! Your verified review has been posted.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
        <Link to="/" className="hover:text-primary transition">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/products" className="hover:text-primary transition">Products</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to={`/category/${product.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="hover:text-primary transition">
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-navy font-semibold truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Details Grid */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center shadow-xs">
            <img
              src={product.images[selectedImageIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <span className="bg-secondary text-navy font-black text-xs px-2.5 py-1 rounded-full shadow-xs uppercase">
                {product.discountPercent}% OFF
              </span>
              {product.sgAssured && (
                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-secondary" /> SG Assured
                </span>
              )}
            </div>

            {/* Floating actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded-full shadow-md backdrop-blur-md transition ${
                  isFavorited
                    ? 'bg-rose-50 text-rose-500 scale-105'
                    : 'bg-white/90 text-slate-500 hover:text-rose-500 hover:bg-white'
                }`}
                title="Add to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-500' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-white/90 text-slate-500 hover:text-primary hover:bg-white shadow-md backdrop-blur-md transition"
                title="Share product link"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Thumbnails Row */}
          {product.images?.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 transition ${
                    selectedImageIdx === idx
                      ? 'border-primary ring-2 ring-primary/30'
                      : 'border-slate-200 hover:border-slate-400 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Perks Bar */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-slate-600">
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <Truck className="w-4 h-4 mx-auto text-primary mb-1" />
              <p className="font-semibold">Free Delivery</p>
              <p className="text-[10px] text-slate-400">Order &gt; ₹499</p>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <RotateCcw className="w-4 h-4 mx-auto text-primary mb-1" />
              <p className="font-semibold">7-Day Return</p>
              <p className="text-[10px] text-slate-400">Easy replacement</p>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-4 h-4 mx-auto text-primary mb-1" />
              <p className="font-semibold">100% Genuine</p>
              <p className="text-[10px] text-slate-400">Brand Warranty</p>
            </div>
          </div>
        </div>

        {/* Right Column: Information & Actions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                {product.brand}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">{product.subcategory || product.category}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black font-heading text-navy leading-snug">
              {product.name}
            </h1>

            {/* Ratings and reviews bar */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 bg-emerald-700 text-white text-xs font-black px-2 py-1 rounded-md shadow-2xs">
                <span>{product.rating}</span>
                <Star className="w-3.5 h-3.5 fill-white" />
              </div>
              <span className="text-xs text-slate-500 font-medium">
                {product.reviewCount ? product.reviewCount.toLocaleString('en-IN') : 0} Ratings & {localReviews.length} Reviews
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Verified Buyer Favorite
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-navy font-heading">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-sm text-slate-400 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm font-black text-emerald-700">
                    Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({product.discountPercent}% OFF)
                  </span>
                </>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Inclusive of all taxes. EMI starts at ₹{Math.round(product.price / 6).toLocaleString('en-IN')}/month.
            </p>

            {/* Bank offer badge */}
            <div className="mt-3 pt-3 border-t border-slate-200 text-xs flex items-center gap-2 text-slate-700">
              <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>
                <b>Bank Offer:</b> Extra 10% instant discount on HDFC/ICICI Bank cards. Use code <b>BANK10</b>.
              </span>
            </div>
          </div>

          {/* Quantity Selector & Stock Indicator */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-700">Quantity:</span>
              <div className="flex items-center bg-white border border-slate-300 rounded-xl shadow-xs overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 hover:bg-slate-100 text-navy transition"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 py-2 text-xs font-black text-navy min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="px-3 py-2 hover:bg-slate-100 text-navy transition"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="text-xs">
              {product.inStock ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  In Stock ({product.stockCount || 20} units remaining)
                </span>
              ) : (
                <span className="text-rose-600 font-bold">Currently Out of Stock</span>
              )}
            </div>
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full bg-secondary hover:bg-secondary-hover text-navy font-black text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition shadow-md active:scale-98"
            >
              <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full bg-primary hover:bg-primary-hover text-white font-black text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition shadow-md active:scale-98"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Delivery & Pincode Checker */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Delivery & Availability</span>
            </div>

            <form onSubmit={handleCheckPincode} className="flex gap-2 max-w-sm">
              <input
                type="text"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter 6-digit Pincode"
                className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-slate-800 hover:bg-black text-white text-xs font-bold px-4 py-2 rounded-xl transition"
              >
                Check
              </button>
            </form>

            {isPincodeChecked && (
              <p className="text-[11px] text-slate-600 flex items-center gap-1.5 pt-1">
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                <span>
                  Delivery by <b>Tomorrow, 5 PM</b> for PIN {pincode} | Standard Free Shipping
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tabs: Specifications, Description, Reviews */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
        <div className="flex items-center gap-6 border-b border-slate-200 pb-3 text-sm font-bold">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 relative transition ${
              activeTab === 'specs'
                ? 'text-primary border-b-2 border-primary'
                : 'text-slate-500 hover:text-navy'
            }`}
          >
            Specifications & Details
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`pb-3 relative transition ${
              activeTab === 'features'
                ? 'text-primary border-b-2 border-primary'
                : 'text-slate-500 hover:text-navy'
            }`}
          >
            Key Highlights
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 relative transition ${
              activeTab === 'reviews'
                ? 'text-primary border-b-2 border-primary'
                : 'text-slate-500 hover:text-navy'
            }`}
          >
            Customer Reviews ({localReviews.length})
          </button>
        </div>

        {/* Tab 1: Specifications */}
        {activeTab === 'specs' && (
          <div className="pt-6 space-y-4">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>

            <div className="pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                Technical Specifications
              </h4>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
                {product.specifications ? (
                  Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-3 p-3 bg-white even:bg-slate-50">
                      <span className="font-semibold text-slate-600">{key}</span>
                      <span className="col-span-2 text-navy">{value}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-slate-500">Standard brand specifications apply.</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Features */}
        {activeTab === 'features' && (
          <div className="pt-6 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
              Why Customers Love This Product
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              {product.features?.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tab 3: Customer Reviews */}
        {activeTab === 'reviews' && (
          <div className="pt-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black text-navy">{product.rating}</span>
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Based on {product.reviewCount} verified purchases across India
                </p>
              </div>

              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow flex items-center gap-2 self-start"
              >
                <MessageSquarePlus className="w-4 h-4" />
                Write a Review
              </button>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {localReviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-primary font-bold text-xs flex items-center justify-center">
                        {rev.user.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-navy">{rev.user}</p>
                        <p className="text-[10px] text-slate-400">{rev.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      <span>{rev.rating}</span>
                      <Star className="w-2.5 h-2.5 fill-white" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {rev.comment}
                  </p>

                  {rev.verified && (
                    <p className="text-[10px] font-semibold text-emerald-700 flex items-center gap-1 pt-1">
                      <Check className="w-3 h-3 stroke-[3]" /> Verified SGKart Buyer
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Write Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl text-navy animate-in fade-in-50 zoom-in-95">
            <h3 className="text-base font-bold text-navy mb-1">Write a Review</h3>
            <p className="text-xs text-slate-500 mb-4">{product.name}</p>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-110 transition"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewRating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Your Name</label>
                <input
                  type="text"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Your Review</label>
                <textarea
                  rows={3}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="What did you like or dislike about this product?"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-xl text-xs font-bold transition shadow"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
            <h3 className="text-base font-bold font-heading text-navy">
              Customers Who Viewed This Also Bought
            </h3>
            <Link to={`/category/${product.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="text-xs font-bold text-primary hover:underline">
              View More &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
