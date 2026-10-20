import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts, CATEGORIES } from '../data/mockProducts';
import { useToast } from './ToastContext';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const { addToast } = useToast();
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('sgkart_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [categories, setCategories] = useState(CATEGORIES);

  useEffect(() => {
    try {
      localStorage.setItem('sgkart_products', JSON.stringify(products));
    } catch (e) {
      console.error('Error storing products in localStorage:', e);
    }
  }, [products]);

  const getProductById = (id) => {
    return products.find((p) => p.id === id);
  };

  const getProductBySlug = (slug) => {
    return products.find((p) => p.slug === slug || p.id === slug);
  };

  const addProduct = (newProd) => {
    const slug = newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const product = {
      ...newProd,
      id: 'prod-custom-' + Date.now(),
      slug: slug || 'prod-' + Date.now(),
      rating: newProd.rating || 4.5,
      reviewCount: newProd.reviewCount || 1,
      inStock: newProd.stockCount > 0,
      discountPercent: newProd.originalPrice && newProd.price 
        ? Math.round(((newProd.originalPrice - newProd.price) / newProd.originalPrice) * 100)
        : 0,
      images: newProd.images?.length > 0 ? newProd.images : ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'],
      reviews: []
    };

    setProducts((prev) => [product, ...prev]);
    addToast(`Product "${product.name.slice(0, 30)}..." added successfully!`, 'success');
    return product;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, ...updatedFields };
          if (updatedFields.price && updatedFields.originalPrice) {
            updated.discountPercent = Math.round(
              ((updatedFields.originalPrice - updatedFields.price) / updatedFields.originalPrice) * 100
            );
          }
          return updated;
        }
        return item;
      })
    );
    addToast('Product details updated successfully!', 'success');
  };

  const deleteProduct = (id) => {
    const prod = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast(`Deleted "${prod?.name?.slice(0, 25) || 'Product'}".`, 'info');
  };

  const resetProductsToDefault = () => {
    setProducts(initialProducts);
    localStorage.setItem('sgkart_products', JSON.stringify(initialProducts));
    addToast('Product catalog reset to defaults.', 'info');
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        getProductById,
        getProductBySlug,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
