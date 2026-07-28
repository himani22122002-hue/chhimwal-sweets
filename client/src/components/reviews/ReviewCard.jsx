import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ReviewCard = ({ review }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#7B1E2B]/10 rounded-full flex items-center justify-center font-bold text-[#7B1E2B]">
            {review.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-[#7B1E2B]">{review.name}</h4>
            <p className="text-xs text-gray-500">{review.date}</p>
          </div>
        </div>
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => <Star key={i} size={16} className={i < review.rating ? "fill-current" : ""} />)}
        </div>
      </div>
      <h5 className="font-semibold text-gray-800 mb-2">{review.title}</h5>
      <p className="text-gray-600 text-sm">{review.message}</p>
    </motion.div>
  );
};

export default ReviewCard;
