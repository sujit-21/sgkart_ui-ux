import React, { useState, useEffect } from 'react';
import { HeroBannerSlider } from '../components/home/HeroBannerSlider';
import { CategoryPills } from '../components/home/CategoryPills';
import { FlashDealsSection } from '../components/home/FlashDealsSection';
import { ProductSection } from '../components/home/ProductSection';
import { PromotionalBanners } from '../components/home/PromotionalBanners';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { useProducts } from '../context/ProductContext';

export const HomePage = () => {
  const { products } = useProducts();

  const trendingProducts = products.filter((p) => p.isTrending);
  const bestSellerProducts = products.filter((p) => p.isBestSeller);
  const recommendedProducts = products.filter((p) => p.isRecommended);

  // Recently viewed products from localStorage (or fallback sample products)
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sgkart_recently_viewed');
      if (saved) {
        const ids = JSON.parse(saved);
        const matched = ids
          .map((id) => products.find((p) => p.id === id))
          .filter(Boolean);
        if (matched.length > 0) {
          setRecentlyViewed(matched);
          return;
        }
      }
      // default sample recently viewed
      setRecentlyViewed(products.slice(0, 4));
    } catch {
      setRecentlyViewed(products.slice(0, 4));
    }
  }, [products]);

  return (
    <div className="space-y-2 pb-8">
      {/* Hero Carousel */}
      <HeroBannerSlider />

      {/* Category Icons Shortcut Bar */}
      <CategoryPills />

      {/* Flash Deals with Countdown Timer */}
      <FlashDealsSection />

      {/* Trending Products */}
      <ProductSection
        title="Trending Deals in India"
        subtitle="Hottest products with fastest delivery and highest buyer ratings"
        badge="POPULAR"
        badgeColor="bg-emerald-100 text-emerald-800"
        products={trendingProducts}
        viewAllLink="/products?filter=trending"
      />

      {/* Promotional Split Banners */}
      <PromotionalBanners />

      {/* Best Sellers */}
      <ProductSection
        title="SGKart Best Sellers"
        subtitle="Most ordered products by millions of Indian shoppers this season"
        badge="TOP RATED"
        badgeColor="bg-amber-100 text-amber-800"
        products={bestSellerProducts}
        viewAllLink="/products?filter=bestseller"
      />

      {/* Recommended For You */}
      <ProductSection
        title="Recommended For You"
        subtitle="Personalized picks based on your browsing interests and cart"
        badge="JUST FOR YOU"
        badgeColor="bg-blue-100 text-primary"
        products={recommendedProducts}
        viewAllLink="/products"
      />

      {/* Recently Viewed Products */}
      {recentlyViewed.length > 0 && (
        <ProductSection
          title="Recently Viewed Products"
          subtitle="Pick up right where you left off"
          badge="HISTORY"
          badgeColor="bg-slate-200 text-slate-700"
          products={recentlyViewed}
          viewAllLink="/products"
        />
      )}

      {/* Newsletter & Customer Perks */}
      <NewsletterSection />
    </div>
  );
};
