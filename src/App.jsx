import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { AllProductsPage } from './pages/AllProductsPage';
import { CategoryProductsPage } from './pages/CategoryProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AuthPage } from './pages/AuthPage';
import { MyAccountPage } from './pages/MyAccountPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

// Context Providers
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';

// Scroll to top on navigation helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Storefront Layout with Header, Navbar, and Footer
const StoreLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-page">
      <Header />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
              <OrderProvider>
                <ScrollToTop />
                <Routes>
                  {/* Storefront Routes */}
                  <Route path="/" element={<StoreLayout><HomePage /></StoreLayout>} />
                  <Route path="/products" element={<StoreLayout><AllProductsPage /></StoreLayout>} />
                  <Route path="/category/:slug" element={<StoreLayout><CategoryProductsPage /></StoreLayout>} />
                  <Route path="/product/:slug" element={<StoreLayout><ProductDetailsPage /></StoreLayout>} />
                  <Route path="/search" element={<StoreLayout><SearchResultsPage /></StoreLayout>} />
                  <Route path="/wishlist" element={<StoreLayout><WishlistPage /></StoreLayout>} />
                  <Route path="/cart" element={<StoreLayout><CartPage /></StoreLayout>} />
                  <Route path="/checkout" element={<StoreLayout><CheckoutPage /></StoreLayout>} />
                  <Route path="/auth" element={<StoreLayout><AuthPage /></StoreLayout>} />
                  <Route path="/account" element={<StoreLayout><MyAccountPage /></StoreLayout>} />
                  <Route path="/orders" element={<StoreLayout><MyOrdersPage /></StoreLayout>} />

                  {/* Admin Dashboard Route */}
                  <Route path="/admin" element={<AdminDashboardPage />} />

                  {/* 404 Route */}
                  <Route path="*" element={<StoreLayout><NotFoundPage /></StoreLayout>} />
                </Routes>
              </OrderProvider>
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
