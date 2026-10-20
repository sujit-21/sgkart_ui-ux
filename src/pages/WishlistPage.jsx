import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist, moveToCart } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddAllToCart = () => {
    if (wishlistItems.length === 0) return;
    wishlistItems.forEach((item) => {
      addToCart(item, 1);
    });
    clearWishlist();
    addToast('All wishlist items moved to your shopping cart!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black font-heading text-navy flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
            <span>My Wishlist</span>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
              {wishlistItems.length} items
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Items saved for later. Prices and availability subject to change.
          </p>
        </div>

        {wishlistItems.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={clearWishlist}
              className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Wishlist</span>
            </button>

            <button
              onClick={handleAddAllToCart}
              className="bg-secondary hover:bg-secondary-hover text-navy text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs flex items-center gap-1.5"
            >
              <ShoppingCart className="w-4 h-4 stroke-[2.5]" />
              <span>Move All to Cart</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid or Empty State */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-card-hover transition flex flex-col justify-between"
            >
              <div className="relative">
                <Link to={`/product/${product.slug || product.id}`} className="block aspect-square overflow-hidden bg-slate-50">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </Link>

                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 text-rose-500 hover:bg-rose-50 shadow-xs transition"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {product.discountPercent > 0 && (
                  <span className="absolute top-2.5 left-2.5 bg-secondary text-navy font-black text-[10px] px-2 py-0.5 rounded-full shadow-xs uppercase">
                    {product.discountPercent}% OFF
                  </span>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    {product.brand}
                  </p>
                  <Link
                    to={`/product/${product.slug || product.id}`}
                    className="text-xs font-bold text-navy hover:text-primary transition line-clamp-2 leading-snug mb-2"
                  >
                    {product.name}
                  </Link>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-base font-black text-navy">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-slate-400 line-through">
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => moveToCart(product)}
                    className="flex-1 bg-secondary hover:bg-secondary-hover text-navy text-xs font-bold py-2 px-3 rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-lg font-bold text-navy">Your Wishlist is Empty</h2>
          <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
            Explore our curated collections and save your favorite electronics, ethnic fashion, and home products here.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-md"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
};
