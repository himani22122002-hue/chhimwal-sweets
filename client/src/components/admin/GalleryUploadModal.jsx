import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GalleryUploadModal = ({
  isOpen,
  onClose,
  onSave,
  editingImage,
}) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setSelectedFile(null);

    if (editingImage) {
      setTitle(editingImage.title || "");
      setCategory(editingImage.category || "");
      setPreviewUrl(editingImage.image || "");
    } else {
      setTitle("");
      setCategory("");
      setPreviewUrl("");
    }
  }, [editingImage, isOpen]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      return;
    }

    setSelectedFile(file);

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter image title.");
      return;
    }

    if (!category.trim()) {
      setError("Please enter image category.");
      return;
    }

    if (!editingImage && !selectedFile) {
      setError("Please choose an image.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title.trim());
    formData.append("category", category.trim());

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      setLoading(true);
      setError("");

      await onSave(formData);
    } catch (err) {
      setError(err.message || "Failed to save image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-[#FFF8E7] p-6 shadow-xl"
        >
          <h2 className="mb-5 text-xl font-bold text-[#7B1E2B]">
            {editingImage
              ? "Edit Gallery Image"
              : "Add Gallery Image"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Choose Image
              </label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#D4AF37] bg-white p-6 transition hover:bg-[#FFF8E7]">
                <span className="mb-2 text-3xl">
                  🖼️
                </span>

                <span className="font-medium text-[#7B1E2B]">
                  {selectedFile
                    ? "Change Image"
                    : "Choose Image"}
                </span>

                <span className="mt-1 text-xs text-gray-500">
                  JPG, PNG, WEBP • Maximum 5 MB
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {previewUrl && (
              <div>
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Preview
                </p>

                <div className="overflow-hidden rounded-lg border bg-white p-2">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-48 w-full rounded object-cover"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Image Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Baal Mithai"
                className="w-full rounded border border-[#D4AF37] bg-white p-2.5 outline-none focus:ring-2 focus:ring-[#D4AF37]"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Category
              </label>

              <input
                type="text"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                placeholder="Sweets"
                className="w-full rounded border border-[#D4AF37] bg-white p-2.5 outline-none focus:ring-2 focus:ring-[#D4AF37]"
                required
              />
            </div>

            {error && (
              <div className="rounded bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="rounded px-4 py-2 text-gray-600 hover:bg-gray-200 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded bg-[#7B1E2B] px-5 py-2 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Uploading..."
                  : editingImage
                  ? "Update"
                  : "Upload Image"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryUploadModal;