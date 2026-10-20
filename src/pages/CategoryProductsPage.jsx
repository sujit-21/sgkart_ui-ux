import React from 'react';
import { useParams } from 'react-router-dom';
import { AllProductsPage } from './AllProductsPage';
import { CATEGORIES } from '../data/mockProducts';

export const CategoryProductsPage = () => {
  const { slug } = useParams();

  const matchedCat = CATEGORIES.find(
    (c) => c.slug.toLowerCase() === (slug || '').toLowerCase()
  );

  const categoryName = matchedCat ? matchedCat.name : slug;

  return (
    <AllProductsPage 
      forcedCategory={categoryName} 
      categoryTitle={`${categoryName} Deals & Store`} 
    />
  );
};
