import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const GalleryCard = ({ item, onClick, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      exit={{ opacity: 0, scale: 0.8 }}
      onClick={() => onClick(item)}
      className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-shadow duration-300 hover:shadow-2xl relative"
    >
      {onDelete && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(item.id); }}
          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 z-10"
        >
          <Trash2 size={16} />
        </button>
      )}
      <div className="relative h-64 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-[#7B1E2B]">{item.name}</h3>
        <span className="inline-block mt-2 px-3 py-1 bg-[#FFF8E7] text-[#7B1E2B] text-xs font-medium rounded-full border border-[#7B1E2B]">
          {item.category}
        </span>
      </div>
    </motion.div>
  );
};

export default GalleryCard;
