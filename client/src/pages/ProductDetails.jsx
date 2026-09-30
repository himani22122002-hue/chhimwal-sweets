import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const { addToCart } = useCart();

  // ==========================================
  // LOAD PRODUCT
  // ==========================================
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await ProductService.getProductById(id);

        setProduct(data);

        // Select first variant
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
      } catch (err) {
        console.error("Failed to load product:", err);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProduct();
    }
  }, [id]);

  // ==========================================
  // LOAD APPROVED REVIEWS
  // ==========================================
  useEffect(() => {
    const loadReviews = async () => {
      if (!id) return;

      try {
        setReviewsLoading(true);

        const response = await fetch(
          `${API_URL}/api/v1/reviews/product/${id}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message || "Failed to fetch reviews"
          );
        }

        setReviews(result?.data || []);
      } catch (error) {
        console.error("Failed to load reviews:", error);
        setReviews([]);
      } finally {
        setReviewsLoading(false);
      }
    };

    loadReviews();
  }, [id]);

  // ==========================================
  // WHEN NEW REVIEW IS SUBMITTED
  // ==========================================
  const handleReviewSubmitted = (newReview) => {
    const formattedReview = {
      id: newReview?.id || Date.now(),

      name:
        newReview?.user?.fullName ||
        newReview?.customer ||
        "You",

      avatar: newReview?.user?.avatar || null,

      rating: Number(newReview?.rating || 0),

      title: newReview?.title || "",

      message:
        newReview?.comment ||
        newReview?.message ||
        "",

      date:
        newReview?.createdAt ||
        new Date().toLocaleDateString(),

      status: newReview?.status || "PENDING",
    };

    /*
      Newly submitted reviews are PENDING.
      They should not appear in the public review
      section until admin approves them.

      So only add immediately if backend returns APPROVED.
    */
    if (formattedReview.status === "APPROVED") {
      setReviews((prevReviews) => [
        formattedReview,
        ...prevReviews,
      ]);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8E7]">
        <p className="text-lg font-semibold text-[#7B1E2B]">
          Loading product...
        </p>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================
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

  // ==========================================
  // ADD TO CART
  // ==========================================
  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addToCart(
      product,
      selectedVariant,
      quantity
    );
  };

  // ==========================================
  // BUY NOW
  // ==========================================
  const handleBuyNow = () => {
    if (!selectedVariant) return;

    addToCart(
      product,
      selectedVariant,
      quantity
    );

    navigate("/checkout");
  };

  // ==========================================
  // UI
  // ==========================================
  return (
    <div className="min-h-screen bg-[#FFF8E7] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* =====================================
            BREADCRUMB
        ====================================== */}
        <nav className="text-xs font-semibold text-[#7B1E2B]/60 mb-8 uppercase tracking-widest">
          <Link
            to="/"
            className="hover:text-[#7B1E2B]"
          >
            Home
          </Link>

          {" / "}

          <Link
            to="/products"
            className="hover:text-[#7B1E2B]"
          >
            Shop
          </Link>

          {" / "}

          <span className="text-[#7B1E2B]">
            {product.name}
          </span>
        </nav>

        {/* =====================================
            PRODUCT SECTION
        ====================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">

          {/* PRODUCT IMAGE */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-3xl shadow-xl"
            />
          </motion.div>

          {/* PRODUCT DETAILS */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="space-y-6"
          >
            {/* NAME */}
            <h1 className="text-5xl font-extrabold text-[#7B1E2B] leading-tight">
              {product.name}
            </h1>

            {/* RATING */}
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

            {/* PRICE */}
            {selectedVariant && (
              <p className="text-4xl font-bold text-[#7B1E2B]">
                ₹{Number(selectedVariant.price)}
              </p>
            )}

            {/* DESCRIPTION */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* =================================
                VARIANTS
            ================================== */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
                Select Size
              </p>

              <div className="flex flex-wrap gap-3">
                {product.variants?.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => {
                      setSelectedVariant(variant);
                      setQuantity(1);
                    }}
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

            {/* =================================
                ACTIONS
            ================================== */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">

              {/* QUANTITY */}
              <div className="flex items-center border border-[#7B1E2B] rounded-lg">
                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(1, quantity - 1)
                    )
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

              {/* ADD TO CART */}
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-[#7B1E2B] text-white py-3 rounded-lg font-bold hover:bg-[#5a1620] transition-colors"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>

              {/* BUY NOW */}
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 bg-[#D4AF37] text-white py-3 rounded-lg font-bold hover:bg-[#b8952b] transition-colors"
              >
                <Zap size={20} />
                Buy Now
              </button>
            </div>

            {/* =================================
                HIGHLIGHTS
            ================================== */}
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

        {/* =====================================
            REVIEWS
        ====================================== */}
        <div className="border-t border-[#7B1E2B]/10 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* EXISTING REVIEWS */}
          <div>
            <RatingSummary
              reviews={reviews}
            />

            <div className="mt-8">

              {reviewsLoading ? (
                <p className="text-gray-500">
                  Loading reviews...
                </p>
              ) : reviews.length === 0 ? (
                <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                  <p className="text-gray-500">
                    No reviews yet.
                  </p>

                  <p className="text-sm text-gray-400 mt-1">
                    Be the first to review this product!
                  </p>
                </div>
              ) : (
                reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                  />
                ))
              )}

            </div>
          </div>

          {/* WRITE REVIEW */}
          <div>
            <ReviewForm
              productId={id}
              onReviewSubmitted={
                handleReviewSubmitted
              }
            />
          </div>

        </div>

        {/* =====================================
            RELATED PRODUCTS
        ====================================== */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-[#7B1E2B]/10 pt-16 mt-16">

            <h2 className="text-3xl font-extrabold text-[#7B1E2B] mb-10 text-center">
              You May Also Like
            </h2>

            <motion.div
              className="flex gap-6 overflow-x-auto pb-6 snap-x scrollbar-hide"
              whileTap={{
                cursor: "grabbing",
              }}
            >
              {relatedProducts.map(
                (relatedProduct) => (
                  <div
                    key={relatedProduct.id}
                    className="min-w-[280px] snap-center"
                  >
                    <ProductCard
                      product={relatedProduct}
                    />
                  </div>
                )
              )}
            </motion.div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ProductDetails;