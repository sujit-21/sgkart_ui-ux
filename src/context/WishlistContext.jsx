import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { useCart } from './CartContext';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { addToast } = useToast();
  const { addToCart } = useCart();
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const saved = localStorage.getItem('sgkart_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sgkart_wishlist', JSON.stringify(wishlistItems));
    } catch (e) {
      console.error('Error saving wishlist:', e);
    }
  }, [wishlistItems]);

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
      addToast(`Removed "${product.name.slice(0, 20)}..." from Wishlist`, 'info');
    } else {
      setWishlistItems((prev) => [product, ...prev]);
      addToast(`Added "${product.name.slice(0, 20)}..." to Wishlist`, 'success');
    }
  };

  const removeFromWishlist = (productId) => {
    const item = wishlistItems.find((i) => i.id === productId);
    setWishlistItems((prev) => prev.filter((i) => i.id !== productId));
    addToast(`Removed "${item?.name?.slice(0, 20) || 'Item'}" from Wishlist`, 'info');
  };

  const moveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
    addToast('Wishlist cleared', 'info');
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        moveToCart,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
