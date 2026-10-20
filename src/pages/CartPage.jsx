import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  Plus, 
  Minus, 
  Heart, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Tag, 
  CheckCircle2, 
  X,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const CartPage = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    totalItems, 
    subtotal, 
    originalSubtotal, 
    savings, 
    deliveryCharge, 
    couponDiscount, 
    totalAmount, 
    appliedCoupon, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    applyCoupon, 
    removeCoupon 
  } = useCart();

  const { toggleWishlist, isInWishlist } = useWishlist();
  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponInput('');
    }
  };

  const handleSaveForLater = (product) => {
    if (!isInWishlist(product.id)) {
      toggleWishlist(product);
    }
    removeFromCart(product.id);
  };

  // Free delivery threshold: ₹499
  const freeDeliveryThreshold = 499;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto shadow-xs">
          <div className="w-20 h-20 rounded-full bg-blue-50 text-primary flex items-center justify-center mx-auto mb-4">
            <Truck className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-black font-heading text-navy">Your SGKart Cart is Empty</h2>
          <p className="text-xs text-slate-500 mt-2 mb-6 leading-relaxed">
            Your shopping cart is currently waiting for items. Discover trending deals, phones, ethnic wear, and household essentials.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-hover text-navy text-xs font-bold px-6 py-3 rounded-xl transition shadow-md"
          >
            <span>Start Shopping Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-black font-heading text-navy">
            Shopping Cart ({totalItems} items)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review your selected products and apply discount coupons
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-slate-400 hover:text-rose-600 transition flex items-center gap-1 font-semibold"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free Shipping Progress Card */}
          <div className="bg-white rounded-2xl border border-blue-200 p-4 shadow-xs">
            <div className="flex items-center justify-between text-xs font-bold mb-2">
              <span className="flex items-center gap-1.5 text-primary">
                <Truck className="w-4 h-4 text-primary" />
                {amountNeededForFreeDelivery === 0 ? (
                  <span className="text-emerald-700">Congratulations! You unlocked FREE Express Delivery!</span>
                ) : (
                  <span>Add ₹{amountNeededForFreeDelivery} more to qualify for FREE Delivery</span>
                )}
              </span>
              <span className="text-slate-500">{freeDeliveryProgress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  amountNeededForFreeDelivery === 0 ? 'bg-emerald-500' : 'bg-primary'
                }`}
                style={{ width: `${freeDeliveryProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Items List */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs divide-y divide-slate-100 overflow-hidden">
            {cartItems.map((item) => (
              <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex gap-4 items-center flex-1">
                  <Link to={`/product/${item.slug || item.id}`} className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200">
                    <img
                      src={item.images?.[0] || item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {item.brand}
                    </p>
                    <Link
                      to={`/product/${item.slug || item.id}`}
                      className="text-xs sm:text-sm font-bold text-navy hover:text-primary transition line-clamp-2"
                    >
                      {item.name}
                    </Link>

                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="text-base font-black text-navy">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-xs text-slate-400 line-through">
                          ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      )}
                      <span className="text-[11px] text-slate-400">
                        (₹{item.price.toLocaleString('en-IN')} each)
                      </span>
                    </div>

                    <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-secondary" /> SG Assured Express Delivery
                    </p>
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="flex items-center bg-slate-100 border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1.5 hover:bg-slate-200 text-navy transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 py-1.5 text-xs font-black text-navy min-w-[28px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1.5 hover:bg-slate-200 text-navy transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <button
                      onClick={() => handleSaveForLater(item)}
                      className="text-slate-500 hover:text-primary transition flex items-center gap-1 font-medium text-[11px]"
                    >
                      <Heart className="w-3 h-3" /> Save for Later
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-rose-500 hover:text-rose-700 transition flex items-center gap-1 font-medium text-[11px]"
                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-hover pt-2"
          >
            &larr; <span>Continue Shopping More Products</span>
          </Link>
        </div>

        {/* Right Column: Order Summary (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Coupon Box */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-primary" /> Apply Coupons & Offers
            </h3>

            {appliedCoupon ? (
              <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-emerald-900 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {appliedCoupon.code} Applied
                  </p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    Saved ₹{couponDiscount.toLocaleString('en-IN')} with {appliedCoupon.label}
                  </p>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-slate-400 hover:text-rose-600 p-1"
                  title="Remove coupon"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="e.g. SGKART10 or WELCOME200"
                  className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-xl uppercase font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-hover text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-xs"
                >
                  Apply
                </button>
              </form>
            )}

            <div className="pt-2 text-[11px] text-slate-500 space-y-1">
              <p className="font-medium text-slate-700">Available demo promo codes:</p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => applyCoupon('SGKART10')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-bold text-[10px]"
                >
                  SGKART10 (10% off)
                </button>
                <button
                  onClick={() => applyCoupon('WELCOME200')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-bold text-[10px]"
                >
                  WELCOME200 (₹200 off)
                </button>
                <button
                  onClick={() => applyCoupon('BANK10')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono font-bold text-[10px]"
                >
                  BANK10 (10% bank)
                </button>
              </div>
            </div>
          </div>

          {/* Price Details Breakdown */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 pb-2 border-b border-slate-100">
              Price Details ({totalItems} Items)
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Total MRP</span>
                <span>₹{originalSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {savings > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Product Discount</span>
                  <span>- ₹{savings.toLocaleString('en-IN')}</span>
                </div>
              )}

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Savings</span>
                  <span>- ₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span>Delivery Charges</span>
                <span>
                  {deliveryCharge === 0 ? (
                    <span className="text-emerald-700 font-bold uppercase text-[11px]">Free</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>

              <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline text-sm font-black text-navy font-heading">
                <span>Total Payable</span>
                <span className="text-lg">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {savings + couponDiscount > 0 && (
              <div className="p-2.5 bg-emerald-50 rounded-xl text-center text-xs font-bold text-emerald-800">
                You will save ₹{(savings + couponDiscount).toLocaleString('en-IN')} on this order!
              </div>
            )}

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-secondary hover:bg-secondary-hover text-navy font-black text-sm py-3.5 px-6 rounded-xl transition shadow-md flex items-center justify-center gap-2 active:scale-98"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe and 100% Secure Simulated Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
