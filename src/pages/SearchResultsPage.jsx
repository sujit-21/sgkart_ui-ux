import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { AllProductsPage } from './AllProductsPage';

export const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <AllProductsPage 
      categoryTitle={`Search Results for "${query}"`} 
    />
  );
};
