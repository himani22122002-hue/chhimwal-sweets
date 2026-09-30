import React from "react";
import { motion } from "framer-motion";
import { Star, Heart } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const startingPrice =
    product?.variants?.[0]?.price || 0;

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!product?.variants?.[0]) return;

    addToCart(
      product,
      product.variants[0]
    );
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
        w-full
        min-w-0
        bg-white
        rounded-2xl
        shadow-md
        hover:shadow-xl
        border
        border-gray-100
        overflow-hidden
        flex
        flex-col
        relative
      "
    >
      {/* Wishlist */}
      <button
        type="button"
        onClick={toggleWishlist}
        aria-label={
          isWishlisted
            ? "Remove from wishlist"
            : "Add to wishlist"
        }
        className="
          absolute
          top-3
          right-3
          z-10
          p-2
          bg-white/90
          backdrop-blur-sm
          rounded-full
          shadow-sm
        "
      >
        <Heart
          size={19}
          className={
            isWishlisted
              ? "fill-[#7B1E2B] text-[#7B1E2B]"
              : "text-gray-500"
          }
        />
      </button>

      {/* Image */}
      <Link
        to={`/products/${product.id}`}
        className="block w-full"
      >
        <div className="w-full aspect-[4/3] sm:aspect-[4/3] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-500
              hover:scale-105
            "
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow min-w-0">

        <h3 className="
          text-lg
          sm:text-xl
          font-bold
          text-[#7B1E2B]
          break-words
          line-clamp-2
        ">
          {product.name}
        </h3>

        <p className="
          text-sm
          text-gray-500
          mt-2
          mb-4
          line-clamp-2
          leading-5
        ">
          {product.description}
        </p>

        {/* Price + Rating */}
        <div className="
          flex
          flex-col
          xs:flex-row
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-2
          mb-4
        ">
          <span className="
            text-base
            sm:text-lg
            font-bold
            text-[#D4AF37]
            break-words
          ">
            Starts at ₹{startingPrice}
          </span>

          <div className="
            flex
            items-center
            text-sm
            text-gray-600
            shrink-0
          ">
            <Star
              className="
                w-4
                h-4
                text-yellow-400
                fill-current
                mr-1
              "
            />

            {product.rating || 0}
          </div>
        </div>

        {/* Buttons */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-2
          mt-auto
        ">
          <button
            type="button"
            onClick={handleAddToCart}
            className="
              w-full
              bg-[#7B1E2B]
              text-white
              py-2.5
              px-3
              rounded-lg
              text-sm
              font-semibold
              hover:bg-[#5a1620]
              transition-colors
            "
          >
            Add to Cart
          </button>

          <Link
            to={`/products/${product.id}`}
            className="
              w-full
              border
              border-[#7B1E2B]
              text-[#7B1E2B]
              py-2.5
              px-3
              rounded-lg
              text-sm
              font-semibold
              text-center
              hover:bg-[#7B1E2B]
              hover:text-white
              transition-colors
            "
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;