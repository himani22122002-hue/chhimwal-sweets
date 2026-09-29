import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
  Package,
  Truck,
  Award,
} from "lucide-react";

import ProductCard from "../components/products/ProductCard";
import { ProductService } from "../services/ProductService";
import { useCart } from "../context/CartContext";
import RatingSummary from "../components/reviews/RatingSummary";
import ReviewCard from "../components/reviews/ReviewCard";
import ReviewForm from "../components/reviews/ReviewForm";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();

  const [reviews, setReviews] = useState([]);

  // Load product
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await ProductService.getProductById(id);

        setProduct(data);

        if (data?.variants?.length > 0) {
          setSelectedVariant(data.variants[0]);
        }

        // Load related products
        if (data?.categoryId) {
          const result = await ProductService.getProducts({
            categoryId: data.categoryId,
            active: true,
            limit: 10,
          });

          setRelatedProducts(
            (result?.products || [])
              .filter((p) => p.id !== data.id)
              .slice(0, 4)
          );
        }

        // Existing local reviews
        const saved = localStorage.getItem(`reviews-${id}`);

        if (saved) {
          setReviews(JSON.parse(saved));
        } else {
          setReviews([
            {
              id: 1,
              name: "Rahul S.",
              rating: 5,
              date: "2026-07-20",
              title: "Excellent Taste!",
              message:
                "Very authentic Baal Mithai, reminds me of home.",
            },
            {
              id: 2,
              name: "Priya K.",
              rating: 4,
              date: "2026-07-22",
              title: "Good quality",
              message:
                "Fresh and well-packaged. Will order again.",
            },
          ]);
        }
      } catch (err) {
        console.error("Failed to load product:", err);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  useEffect(() => {
    if (id && reviews.length > 0) {
      localStorage.setItem(
        `reviews-${id}`,
        JSON.stringify(reviews)
      );
    }
  }, [reviews, id]);

  const handleAddReview = (newReview) => {
    setReviews([
      {
        id: Date.now(),
        ...newReview,
      },
      ...reviews,
    ]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8E7]">
        <p className="text-lg font-semibold text-[#7B1E2B]">
          Loading product...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8E7]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#7B1E2B]">
            Product not found
          </h2>

          <Link
            to="/products"
            className="inline-block mt-4 bg-[#7B1E2B] text-white px-5 py-2 rounded-lg"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const rating = Number(product.averageRating || 0);

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addToCart(product, selectedVariant, quantity);
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Breadcrumb */}
        <nav className="text-xs font-semibold text-[#7B1E2B]/60 mb-8 uppercase tracking-widest">
          <Link to="/" className="hover:text-[#7B1E2B]">
            Home
          </Link>{" "}
          /
          <Link
            to="/products"
            className="hover:text-[#7B1E2B]"
          >
            {" "}
            Shop
          </Link>{" "}
          /
          <span className="text-[#7B1E2B]">
            {" "}
            {product.name}
          </span>
        </nav>

        {/* Product */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-3xl shadow-xl"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-5xl font-extrabold text-[#7B1E2B] leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rating)
                        ? "text-[#D4AF37] fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <span className="text-sm font-bold text-[#7B1E2B]">
                {rating.toFixed(1)} / 5.0 Rating
              </span>
            </div>

            {/* Price */}
            {selectedVariant && (
              <p className="text-4xl font-bold text-[#7B1E2B]">
                ₹{Number(selectedVariant.price)}
              </p>
            )}

            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Variants */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Select Size
              </p>

              <div className="flex flex-wrap gap-3">
                {product.variants?.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() =>
                      setSelectedVariant(variant)
                    }
                    className={`px-6 py-2 rounded-lg border text-sm font-semibold ${
                      selectedVariant?.id === variant.id
                        ? "border-[#7B1E2B] bg-[#7B1E2B] text-white"
                        : "border-[#D4AF37]/50 text-[#7B1E2B] hover:bg-[#D4AF37]/10"
                    } transition-all`}
                  >
                    {variant.weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">

              <div className="flex items-center border border-[#7B1E2B] rounded-lg">
                <button
                  onClick={() =>
                    setQuantity(Math.max(1, quantity - 1))
                  }
                  className="p-3 text-[#7B1E2B] hover:bg-[#D4AF37]/10"
                >
                  <Minus size={18} />
                </button>

                <span className="px-4 font-bold text-lg w-12 text-center">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                  className="p-3 text-[#7B1E2B] hover:bg-[#D4AF37]/10"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-[#7B1E2B] text-white py-3 rounded-lg font-bold hover:bg-[#5a1620] transition-colors"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-[#D4AF37] text-white py-3 rounded-lg font-bold hover:bg-[#b8952b] transition-colors"
              >
                <Zap size={20} />
                Buy Now
              </button>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-4 border-t border-[#7B1E2B]/10 pt-6 mt-6">
              <div className="flex flex-col items-center gap-2 text-[#7B1E2B]">
                <Award size={24} />
                <span className="text-xs font-bold uppercase">
                  Authentic
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 text-[#7B1E2B]">
                <Truck size={24} />
                <span className="text-xs font-bold uppercase">
                  Fast Delivery
                </span>
              </div>

              <div className="flex flex-col items-center gap-2 text-[#7B1E2B]">
                <Package size={24} />
                <span className="text-xs font-bold uppercase">
                  Safe Pack
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <div className="border-t border-[#7B1E2B]/10 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <RatingSummary reviews={reviews} />

            <div className="mt-8">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                />
              ))}
            </div>
          </div>

          <div>
            <ReviewForm onAddReview={handleAddReview} />
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-[#7B1E2B]/10 pt-16 mt-16">
            <h2 className="text-3xl font-extrabold text-[#7B1E2B] mb-10 text-center">
              You May Also Like
            </h2>

            <motion.div
              className="flex gap-6 overflow-x-auto pb-6 snap-x scrollbar-hide"
              whileTap={{ cursor: "grabbing" }}
            >
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="min-w-[280px] snap-center"
                >
                  <ProductCard product={relatedProduct} />
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;