import { motion } from "framer-motion";

const GalleryCard = ({ item, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05 }}
      onClick={() => onClick(item)}
      className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-shadow duration-300 hover:shadow-2xl"
    >
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
