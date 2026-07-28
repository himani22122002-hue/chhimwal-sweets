import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ImageUploader from "./ImageUploader";

const UploadModal = ({ isOpen, onClose, onUpload }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Baal Mithai");
  const [image, setImage] = useState(null);

  const categories = [
    "Baal Mithai", "Singodi", "Peda", "Jalebi", "Besan Laddu", "Milk Sweets"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image || !name) return;
    onUpload({ name, category, image });
    onClose();
    setName("");
    setCategory("Baal Mithai");
    setImage(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#FFF8E7] rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-[#7B1E2B]"><X /></button>
            <h2 className="text-2xl font-bold text-[#7B1E2B] mb-6">Upload New Sweet</h2>
            <form onSubmit={handleSubmit}>
              <ImageUploader onImageSelected={setImage} />
              <input
                type="text"
                placeholder="Sweet Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 mb-4 rounded-lg border border-[#7B1E2B]/20"
                required
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 mb-6 rounded-lg border border-[#7B1E2B]/20"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div className="flex gap-4">
                <button type="button" onClick={onClose} className="flex-1 py-3 border border-[#7B1E2B] text-[#7B1E2B] rounded-full">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-[#7B1E2B] text-white rounded-full">Upload</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UploadModal;
