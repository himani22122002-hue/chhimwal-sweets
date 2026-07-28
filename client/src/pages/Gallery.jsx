import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { galleryData } from "../data/gallery";
import GalleryGrid from "../components/gallery/GalleryGrid";
import Lightbox from "../components/gallery/Lightbox";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = useMemo(() => {
    return ["All", ...new Set(galleryData.map((item) => item.category))];
  }, []);

  const filteredItems = useMemo(() => {
    return activeCategory === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleNext = () => {
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedItem.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedItem(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    const currentIndex = filteredItems.findIndex((i) => i.id === selectedItem.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedItem(filteredItems[prevIndex]);
  };

  return (
    <div className="bg-[#FFF8E7] min-h-screen py-12 px-6">
      {/* Hero */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#7B1E2B] font-medium mb-2"
        >
          Home / Gallery
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-5xl font-bold text-[#7B1E2B] mb-4"
        >
          Gallery
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[#7B1E2B]/80 max-w-2xl mx-auto"
        >
          Explore the rich tradition and authentic taste of Chhimwal Sweets through our handcrafted delicacies.
        </motion.p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full transition-all duration-300 border ${
              activeCategory === category
                ? "bg-[#7B1E2B] text-white border-[#7B1E2B]"
                : "bg-[#FFF8E7] text-[#7B1E2B] border-[#7B1E2B] hover:bg-[#7B1E2B]/10"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto">
        <GalleryGrid items={filteredItems} onImageClick={setSelectedItem} />
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto mt-20 py-16 text-center border-t border-[#7B1E2B]/20">
        <h2 className="text-3xl font-bold text-[#7B1E2B] mb-6">
          Craving Authentic Kumaoni Sweets?
        </h2>
        <div className="flex justify-center gap-4">
          <button className="px-8 py-3 bg-[#D4AF37] text-white rounded-full font-semibold hover:bg-[#D4AF37]/90 transition">
            Shop Now
          </button>
          <button className="px-8 py-3 border border-[#7B1E2B] text-[#7B1E2B] rounded-full font-semibold hover:bg-[#7B1E2B] hover:text-white transition">
            Contact Us
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        selectedItem={selectedItem}
        onClose={() => setSelectedItem(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
};

export default Gallery;
