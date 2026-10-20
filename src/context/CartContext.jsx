import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { addToast } = useToast();
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('sgkart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('sgkart_applied_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sgkart_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem('sgkart_applied_coupon', JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem('sgkart_applied_coupon');
      }
    } catch (e) {
      console.error('Error saving coupon:', e);
    }
  }, [appliedCoupon]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    addToast(`Added "${product.name.slice(0, 24)}..." to cart`, 'success');
  };

  const removeFromCart = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    setCartItems((prev) => prev.filter((i) => i.id !== productId));
    addToast(`Removed "${item?.name?.slice(0, 24) || 'Item'}" from cart`, 'info');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  // Pricing calculations
  const { subtotal, originalSubtotal, savings, totalItems } = useMemo(() => {
    let sub = 0;
    let orig = 0;
    let count = 0;

    cartItems.forEach((item) => {
      sub += (item.price || 0) * item.quantity;
      orig += (item.originalPrice || item.price || 0) * item.quantity;
      count += item.quantity;
    });

    return {
      subtotal: sub,
      originalSubtotal: orig,
      savings: orig - sub,
      totalItems: count
    };
  }, [cartItems]);

  const deliveryCharge = useMemo(() => {
    if (cartItems.length === 0) return 0;
    return subtotal >= 499 ? 0 : 49;
  }, [subtotal, cartItems.length]);

  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'percent') {
      return Math.round((subtotal * appliedCoupon.value) / 100);
    }
    if (appliedCoupon.type === 'flat') {
      return Math.min(appliedCoupon.value, subtotal);
    }
    return 0;
  }, [appliedCoupon, subtotal]);

  const totalAmount = useMemo(() => {
    if (cartItems.length === 0) return 0;
    const final = subtotal - couponDiscount + deliveryCharge;
    return Math.max(0, final);
  }, [subtotal, couponDiscount, deliveryCharge, cartItems.length]);

  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SGKART10') {
      setAppliedCoupon({ code: 'SGKART10', type: 'percent', value: 10, label: '10% SGKart Discount' });
      addToast('Coupon SGKART10 applied! 10% off your order.', 'success');
      return true;
    }
    if (clean === 'WELCOME200') {
      if (subtotal < 999) {
        addToast('WELCOME200 requires a minimum order of ₹999', 'warning');
        return false;
      }
      setAppliedCoupon({ code: 'WELCOME200', type: 'flat', value: 200, label: '₹200 Welcome Bonus' });
      addToast('Coupon WELCOME200 applied! Flat ₹200 off.', 'success');
      return true;
    }
    if (clean === 'BANK10') {
      setAppliedCoupon({ code: 'BANK10', type: 'percent', value: 10, label: '10% Instant Bank Offer' });
      addToast('Bank promo BANK10 applied! 10% off.', 'success');
      return true;
    }
    addToast('Invalid coupon code. Try SGKART10 or WELCOME200', 'error');
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        subtotal,
        originalSubtotal,
        savings,
        deliveryCharge,
        couponDiscount,
        totalAmount,
        appliedCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
