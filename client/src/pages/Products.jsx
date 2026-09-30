import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/products/ProductCard";
import { ProductService } from "../services/ProductService";

const Products = () => {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await ProductService.getProducts({
          active: true,
          limit: 50,
          ...(category ? { categorySlug: category } : {}),
        });

        setProducts(data?.products || []);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError("Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  const categoryName = category
    ? category
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "All Products";

  return (
    <div className="min-h-screen bg-[#FFF8E7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-[#7B1E2B]/70 mb-2">
            Home / Products
            {category && ` / ${categoryName}`}
          </p>

          <h1 className="text-4xl font-bold text-[#7B1E2B]">
            {categoryName}
          </h1>
        </div>

        {loading && (
          <div className="text-center py-20">
            <p className="text-[#7B1E2B] text-lg">
              Loading products...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-20">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-[#7B1E2B] mb-2">
              No products available.
            </h2>

            <p className="text-gray-600">
              Please check back later or explore other categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;