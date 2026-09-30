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
          ...(category
            ? { categorySlug: category }
            : {}),
        });

        setProducts(data?.products || []);
      } catch (err) {
        console.error(
          "Failed to load products:",
          err
        );

        setError(
          "Unable to load products. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  const categoryName = category
    ? category
        .split("-")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() +
            word.slice(1)
        )
        .join(" ")
    : "All Products";

  return (
    <div className="min-h-screen w-full bg-[#FFF8E7] py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto min-w-0">

        {/* =========================
            HEADER
        ========================== */}

        <div className="mb-8 sm:mb-10">
          <p className="text-xs sm:text-sm text-[#7B1E2B]/70 mb-2 break-words">
            Home / Products
            {category && ` / ${categoryName}`}
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#7B1E2B] break-words">
            {categoryName}
          </h1>
        </div>

        {/* =========================
            LOADING
        ========================== */}

        {loading && (
          <div className="text-center py-20">
            <p className="text-[#7B1E2B] text-base sm:text-lg">
              Loading products...
            </p>
          </div>
        )}

        {/* =========================
            ERROR
        ========================== */}

        {!loading && error && (
          <div className="text-center py-20 px-4">
            <p className="text-red-600 text-sm sm:text-base">
              {error}
            </p>
          </div>
        )}

        {/* =========================
            PRODUCTS
        ========================== */}

        {!loading &&
          !error &&
          products.length > 0 && (
            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-5
                sm:gap-6
                lg:gap-8
                w-full
              "
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="min-w-0 w-full"
                >
                  <ProductCard
                    product={product}
                  />
                </div>
              ))}
            </div>
          )}

        {/* =========================
            EMPTY STATE
        ========================== */}

        {!loading &&
          !error &&
          products.length === 0 && (
            <div className="text-center py-20 px-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#7B1E2B] mb-2">
                No products available.
              </h2>

              <p className="text-gray-600 text-sm sm:text-base">
                Please check back later or explore
                other categories.
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default Products;