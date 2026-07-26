import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=Sweets'; }}
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-[#7B1E2B] mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-[#D4AF37]">₹{product.price}</span>
          <div className="flex items-center text-sm text-gray-600">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            {product.rating}
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 bg-[#7B1E2B] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#5a1620] transition-colors">
            Add to Cart
          </button>
          <button className="flex-1 border border-[#7B1E2B] text-[#7B1E2B] py-2 rounded-lg text-sm font-semibold hover:bg-[#7B1E2B] hover:text-white transition-colors">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
