import React, { useEffect, useMemo, useState } from "react";
import {
  getGalleryImages,
  saveGalleryImage,
  deleteGalleryImage,
} from "../../services/GalleryService";
import GalleryTable from "../../components/admin/GalleryTable";
import GalleryUploadModal from "../../components/admin/GalleryUploadModal";

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const itemsPerPage = 10;

  const loadImages = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getGalleryImages();
      setImages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load gallery:", err);
      setError(err.message || "Failed to load gallery images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const categories = useMemo(() => {
    return [
      ...new Set(
        images.map((img) => img.category).filter(Boolean)
      ),
    ];
  }, [images]);

  const handleSave = async (formData) => {
    try {
      setError("");

      await saveGalleryImage(
        formData,
        editingImage?.id || null
      );

      setIsModalOpen(false);
      setEditingImage(null);

      await loadImages();
    } catch (err) {
      console.error("Failed to save gallery image:", err);
      setError(err.message || "Failed to save gallery image.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteGalleryImage(id);
      await loadImages();
    } catch (err) {
      console.error("Failed to delete gallery image:", err);
      setError(err.message || "Failed to delete gallery image.");
    }
  };

  const filteredImages = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return images.filter((img) => {
      const matchesSearch =
        !search ||
        img.title?.toLowerCase().includes(search) ||
        img.category?.toLowerCase().includes(search);

      const matchesCategory =
        !filterCategory || img.category === filterCategory;

      return matchesSearch && matchesCategory;
    });
  }, [images, searchTerm, filterCategory]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredImages.length / itemsPerPage)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedImages = filteredImages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openAddModal = () => {
    setEditingImage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (image) => {
    setEditingImage(image);
    setIsModalOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setFilterCategory(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#7B1E2B]">
            Gallery Management
          </h1>

          <p className="mt-1 text-sm text-gray-600">
            Manage your sweets and store gallery images.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="rounded bg-[#D4AF37] px-5 py-2.5 font-semibold text-white transition hover:opacity-90"
        >
          + Add Image
        </button>
      </div>

      {error && (
        <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mb-5 flex flex-col gap-3 rounded-lg bg-white p-4 shadow md:flex-row">
        <input
          type="text"
          placeholder="Search by image title or category..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full rounded border border-[#D4AF37] p-2.5 outline-none focus:ring-2 focus:ring-[#D4AF37] md:flex-1"
        />

        <select
          value={filterCategory}
          onChange={handleCategoryChange}
          className="rounded border border-[#D4AF37] bg-white p-2.5 outline-none focus:ring-2 focus:ring-[#D4AF37] md:w-52"
        >
          <option value="">All Categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="rounded-lg bg-white p-10 text-center shadow">
          <p className="text-[#7B1E2B]">Loading gallery...</p>
        </div>
      ) : paginatedImages.length > 0 ? (
        <GalleryTable
          images={paginatedImages}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      ) : (
        <div className="rounded-lg bg-white p-10 text-center shadow">
          <p className="text-lg font-semibold text-[#7B1E2B]">
            No gallery images found
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Click "Add Image" to upload your first gallery image.
          </p>
        </div>
      )}

      {filteredImages.length > itemsPerPage && (
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
            className="rounded border border-[#D4AF37] px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm font-medium text-[#7B1E2B]">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
            className="rounded border border-[#D4AF37] px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      <GalleryUploadModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingImage(null);
        }}
        onSave={handleSave}
        editingImage={editingImage}
      />
    </div>
  );
};

export default GalleryPage;