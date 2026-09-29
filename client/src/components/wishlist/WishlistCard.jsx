import { motion } from "framer-motion";
import { X, ShoppingCart, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";

const WishlistCard = ({ item }) => {
  const { removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    // Using default variant as per CartContext expectations
    addToCart(item, item.variants[0], 1);
    
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white p-4 rounded-2xl shadow-lg border border-[#7B1E2B]/10 flex flex-col relative"
    >
      {showToast && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="absolute top-4 left-4 right-4 z-20 bg-green-500 text-white p-2 rounded-lg text-sm flex items-center justify-center shadow-md"
        >
          <CheckCircle size={16} className="mr-2" /> Added to cart!
        </motion.div>
      )}
      <div className="relative h-48 overflow-hidden rounded-xl mb-4">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <h3 className="text-xl font-bold text-[#7B1E2B] mb-1">{item.name}</h3>
      <p className="text-gray-600 mb-2">
  {typeof item.category === "object"
    ? item.category?.name
    : item.category}
</p>
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-lg text-[#D4AF37]">₹{item.variants[0].price}</span>
      </div>
      <div className="flex gap-2 mt-auto">
        <button 
          onClick={handleAddToCart}
          className="flex-1 bg-[#7B1E2B] text-white py-2 rounded-full text-sm font-semibold hover:bg-[#7B1E2B]/90 transition"
        >
          <ShoppingCart size={16} className="inline mr-1" /> Add to Cart
        </button>
        <button 
          onClick={() => removeFromWishlist(item.id)}
          className="p-2 bg-gray-100 rounded-full hover:bg-red-100 text-red-500 transition"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default WishlistCard;
