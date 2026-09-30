import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { getGalleryImages } from "../services/GalleryService";
import GalleryGrid from "../components/gallery/GalleryGrid";
import Lightbox from "../components/gallery/Lightbox";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadImages = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getGalleryImages();

      setImages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load gallery images:", err);
      setError(
        err.message || "Unable to load gallery images."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        images
          .map((item) => item.category)
          .filter(Boolean)
      ),
    ];
  }, [images]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") {
      return images;
    }

    return images.filter(
      (item) => item.category === activeCategory
    );
  }, [images, activeCategory]);

  const handleNext = () => {
    if (!selectedItem || filteredItems.length === 0) {
      return;
    }

    const currentIndex = filteredItems.findIndex(
      (item) => item.id === selectedItem.id
    );

    const nextIndex =
      (currentIndex + 1) % filteredItems.length;

    setSelectedItem(filteredItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedItem || filteredItems.length === 0) {
      return;
    }

    const currentIndex = filteredItems.findIndex(
      (item) => item.id === selectedItem.id
    );

    const prevIndex =
      (currentIndex - 1 + filteredItems.length) %
      filteredItems.length;

    setSelectedItem(filteredItems[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] px-6 py-12">
      {/* Header */}
      <div className="relative mx-auto mb-16 max-w-7xl text-center">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 font-medium text-[#7B1E2B]"
        >
          Home / Gallery
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-4 text-5xl font-bold text-[#7B1E2B]"
        >
          Gallery
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-2xl text-[#7B1E2B]/80"
        >
          Explore the rich tradition and authentic taste of
          Chhimwal Sweets through our handcrafted delicacies.
        </motion.p>
      </div>

      {/* Categories */}
      {categories.length > 1 && (
        <div className="mx-auto mb-12 flex max-w-7xl flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-6 py-2 transition-all duration-300 ${
                activeCategory === category
                  ? "border-[#7B1E2B] bg-[#7B1E2B] text-white"
                  : "border-[#7B1E2B] bg-[#FFF8E7] text-[#7B1E2B] hover:bg-[#7B1E2B]/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mx-auto mb-8 max-w-2xl rounded-lg bg-red-50 px-4 py-3 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <p className="text-lg text-[#7B1E2B]">
            Loading gallery...
          </p>
        </div>
      ) : filteredItems.length === 0 ? (
        /* Empty State */
        <div className="mx-auto flex min-h-[300px] max-w-xl flex-col items-center justify-center rounded-xl bg-white p-10 text-center shadow">
          <div className="mb-4 text-5xl">🖼️</div>

          <h2 className="text-2xl font-bold text-[#7B1E2B]">
            No Images Yet
          </h2>

          <p className="mt-2 text-gray-500">
            Gallery images will appear here when our admin
            uploads them.
          </p>
        </div>
      ) : (
        /* Gallery */
        <div className="mx-auto max-w-7xl">
          <GalleryGrid
            items={filteredItems}
            onImageClick={setSelectedItem}
          />
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mx-auto mt-20 max-w-7xl border-t border-[#7B1E2B]/20 py-16 text-center">
        <h2 className="mb-6 text-3xl font-bold text-[#7B1E2B]">
          Craving Authentic Kumaoni Sweets?
        </h2>

        <div className="flex justify-center gap-4">
          <button
            className="rounded-full bg-[#D4AF37] px-8 py-3 font-semibold text-white transition hover:bg-[#D4AF37]/90"
            onClick={() => {
              window.location.href = "/products";
            }}
          >
            Shop Now
          </button>

          <button
            className="rounded-full border border-[#7B1E2B] px-8 py-3 font-semibold text-[#7B1E2B] transition hover:bg-[#7B1E2B] hover:text-white"
            onClick={() => {
              window.location.href = "/contact";
            }}
          >
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