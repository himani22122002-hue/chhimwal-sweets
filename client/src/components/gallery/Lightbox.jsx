import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const Lightbox = ({ selectedItem, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!selectedItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <button
          className="absolute top-4 right-4 p-2 text-white hover:text-[#D4AF37]"
          onClick={onClose}
        >
          <X size={32} />
        </button>
        
        <button
          className="absolute left-4 p-2 text-white hover:text-[#D4AF37]"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
        >
          <ChevronLeft size={48} />
        </button>

        <motion.img
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          src={selectedItem.image}
          alt={selectedItem.name}
          className="max-w-[90%] max-h-[80vh] rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />

        <button
          className="absolute right-4 p-2 text-white hover:text-[#D4AF37]"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
        >
          <ChevronRight size={48} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Lightbox;
