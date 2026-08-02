import React from "react";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EmptyCart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-[70vh] flex items-center justify-center px-4"
    >
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-10 text-center">
        {/* Icon */}
        <div className="w-28 h-28 mx-auto rounded-full bg-[#FFF8E7] flex items-center justify-center shadow-md mb-6">
          <ShoppingBag size={60} className="text-[#D4AF37]" />
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-[#7B1E2B] mb-4">
          Your Cart is Empty
        </h2>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed mb-8">
          Looks like you haven't added any delicious sweets to your cart yet.
          Explore our authentic Kumaoni sweets and make your celebrations even
          sweeter.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/products"
            className="bg-[#7B1E2B] hover:bg-[#5a1620] text-white font-semibold px-8 py-3 rounded-xl transition duration-300 shadow-md"
          >
            Continue Shopping
          </Link>

          <Link
            to="/"
            className="border-2 border-[#D4AF37] text-[#7B1E2B] hover:bg-[#FFF8E7] font-semibold px-8 py-3 rounded-xl transition duration-300"
          >
            Back to Home
          </Link>
        </div>

        {/* Decorative Line */}
        <div className="mt-10 border-t border-gray-200 pt-6">
          <p className="text-sm text-gray-500">
            🍬 Freshly prepared • 🚚 Fast Delivery • ❤️ Made with Love
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyCart;