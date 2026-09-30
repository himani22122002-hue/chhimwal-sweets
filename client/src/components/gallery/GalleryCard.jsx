import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const GalleryCard = ({ item, onClick, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.02,
      }}
      exit={{
        opacity: 0,
        scale: 0.8,
      }}
      onClick={() => onClick(item)}
      className="
        relative
        w-full
        min-w-0
        overflow-hidden
        rounded-xl
        sm:rounded-2xl
        bg-white
        shadow-md
        sm:shadow-lg
        cursor-pointer
        transition-shadow
        duration-300
        hover:shadow-xl
        sm:hover:shadow-2xl
      "
    >
      {/* Delete Button - Admin */}
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
          aria-label="Delete gallery image"
          className="
            absolute
            top-2
            right-2
            sm:top-3
            sm:right-3
            z-10
            flex
            items-center
            justify-center
            w-8
            h-8
            sm:w-9
            sm:h-9
            rounded-full
            bg-red-500
            text-white
            shadow-md
            hover:bg-red-600
            transition-colors
          "
        >
          <Trash2
            size={15}
            className="sm:w-4 sm:h-4"
          />
        </button>
      )}

      {/* Image */}
      <div
        className="
          relative
          w-full
          aspect-square
          sm:aspect-[4/3]
          overflow-hidden
        "
      >
        <img
          src={item.image}
          alt={item.name || "Gallery image"}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-500
            hover:scale-105
          "
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-2.5 sm:p-4">
        <h3
          className="
            text-sm
            sm:text-lg
            lg:text-xl
            font-semibold
            text-[#7B1E2B]
            leading-tight
            break-words
            line-clamp-2
          "
        >
          {item.name}
        </h3>

        {item.category && (
          <span
            className="
              inline-block
              mt-1.5
              sm:mt-2
              max-w-full
              truncate
              px-2
              sm:px-3
              py-1
              bg-[#FFF8E7]
              text-[#7B1E2B]
              text-[10px]
              sm:text-xs
              font-medium
              rounded-full
              border
              border-[#7B1E2B]
            "
          >
            {item.category}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default GalleryCard;