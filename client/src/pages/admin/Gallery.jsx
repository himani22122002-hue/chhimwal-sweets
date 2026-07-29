import React, { useState, useEffect } from 'react';
import { getGalleryImages, saveGalleryImage, deleteGalleryImage } from '../../services/GalleryService';
import GalleryTable from '../../components/admin/GalleryTable';
import GalleryUploadModal from '../../components/admin/GalleryUploadModal';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    setImages(getGalleryImages());
  }, []);

  const handleSave = (image) => {
    saveGalleryImage(image);
    setImages(getGalleryImages());
    setEditingImage(null);
  };

  const handleDelete = (id) => {
    deleteGalleryImage(id);
    setImages(getGalleryImages());
  };

  const filteredImages = images.filter(img => 
    img.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterCategory === '' || img.category === filterCategory)
  );

  const paginatedImages = filteredImages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 bg-[#FFF8E7] min-h-screen">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#7B1E2B]">Gallery Management</h1>
        <button onClick={() => { setEditingImage(null); setIsModalOpen(true); }} className="bg-[#D4AF37] text-white px-4 py-2 rounded">Add Image</button>
      </div>
      
      <div className="flex gap-4 mb-4">
        <input type="text" placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} className="p-2 rounded border border-[#D4AF37]"/>
      </div>

      <GalleryTable images={paginatedImages} onEdit={(img) => { setEditingImage(img); setIsModalOpen(true); }} onDelete={handleDelete} />
      
      <GalleryUploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} editingImage={editingImage} />
    </div>
  );
};

export default GalleryPage;
