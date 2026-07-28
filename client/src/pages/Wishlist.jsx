import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useWishlist } from "../context/WishlistContext";
import WishlistCard from "../components/wishlist/WishlistCard";

const Wishlist = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-[#FFF8E7] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-[#7B1E2B] mb-8 text-center">My Wishlist</h1>
        
        {wishlist.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-3xl shadow-lg"
          >
            <p className="text-2xl text-[#7B1E2B] mb-6">❤️ Your wishlist is empty.</p>
            <Link to="/products" className="bg-[#7B1E2B] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#7B1E2B]/90 transition">
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <WishlistCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
