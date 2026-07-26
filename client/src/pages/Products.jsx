import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/products/ProductCard';

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const filteredProducts = category
    ? products.filter((p) => p.category === category)
    : products;

  return (
    <div className="min-h-screen bg-[#FFF8E7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb / Title */}
        <div className="mb-10">
          <p className="text-[#7B1E2B]/70 mb-2">Home / Products</p>
          <h1 className="text-4xl font-bold text-[#7B1E2B]">
            {category || "All Products"}
          </h1>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-[#7B1E2B] mb-2">
              No products available in this category.
            </h2>
            <p className="text-gray-600">Please check back later or explore other categories.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
