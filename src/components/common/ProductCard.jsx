import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, ShieldCheck, Check, Plus, Minus } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

export const ProductCard = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { cartItems, addToCart, updateQuantity } = useCart();

  const isFavorited = isInWishlist(product.id);
  const cartItem = cartItems.find((item) => item.id === product.id);
  const inCartQty = cartItem?.quantity || 0;

  return (
    <div className="group bg-white rounded-xl border border-slate-200/80 shadow-xs hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Top Badges & Wishlist Action */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex flex-col gap-1 items-start">
          {product.discountPercent > 0 && (
            <span className="bg-secondary text-navy font-black text-[10px] px-2 py-0.5 rounded-full shadow-xs uppercase tracking-wider">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isFlashDeal && (
            <span className="bg-rose-500 text-white font-bold text-[9px] px-1.5 py-0.5 rounded shadow-xs uppercase">
              ⚡ Flash Deal
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`pointer-events-auto p-2 rounded-full transition-all duration-200 ${
            isFavorited
              ? 'bg-rose-50 text-rose-500 shadow-sm scale-110'
              : 'bg-white/80 hover:bg-white text-slate-400 hover:text-rose-500 shadow-xs backdrop-blur-xs'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 transition-colors ${isFavorited ? 'fill-rose-500' : ''}`} />
        </button>
      </div>

      {/* Image Container with hover zoom */}
      <Link 
        to={`/product/${product.slug || product.id}`}
        className="relative pt-[90%] w-full bg-slate-50 overflow-hidden block"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80';
          }}
        />
        {product.sgAssured && (
          <span className="absolute bottom-2 left-2 bg-primary/95 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-xs backdrop-blur-xs">
            <ShieldCheck className="w-3 h-3 text-secondary" />
            <span>SG Assured</span>
          </span>
        )}
      </Link>

      {/* Card Details */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span className="font-semibold text-slate-600 uppercase tracking-wider text-[10px]">
              {product.brand}
            </span>
            <span className="text-slate-400 text-[10px]">{product.category}</span>
          </div>

          {/* Title */}
          <Link
            to={`/product/${product.slug || product.id}`}
            className="text-xs font-semibold text-navy hover:text-primary transition line-clamp-2 leading-snug mb-1.5 group-hover:underline"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Rating Badge */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center gap-0.5 bg-emerald-700 text-white text-[10px] font-black px-1.5 py-0.5 rounded">
              <span>{product.rating}</span>
              <Star className="w-2.5 h-2.5 fill-white" />
            </div>
            <span className="text-[11px] text-slate-400">
              ({product.reviewCount ? product.reviewCount.toLocaleString('en-IN') : 0})
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-base font-black text-navy font-heading">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Delivery Note */}
          <p className="text-[10px] text-slate-500 mb-3 flex items-center gap-1">
            {product.freeDelivery ? (
              <span className="text-emerald-700 font-semibold">Free Delivery</span>
            ) : (
              <span>Standard delivery</span>
            )}
            <span>• 2 Days</span>
          </p>

          {/* Add to Cart button / Quantity controllers */}
          {inCartQty > 0 ? (
            <div className="flex items-center justify-between bg-slate-100 rounded-lg p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => updateQuantity(product.id, inCartQty - 1)}
                className="w-7 h-7 bg-white hover:bg-slate-200 text-navy rounded-md flex items-center justify-center font-bold shadow-2xs transition"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold text-navy px-2">{inCartQty} in cart</span>
              <button
                type="button"
                onClick={() => updateQuantity(product.id, inCartQty + 1)}
                className="w-7 h-7 bg-primary hover:bg-primary-hover text-white rounded-md flex items-center justify-center font-bold shadow-2xs transition"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product, 1)}
              className="w-full bg-secondary hover:bg-secondary-hover text-navy font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition shadow-xs active:scale-[0.98]"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
