import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryUploadModal = ({ isOpen, onClose, onSave, editingImage }) => {
  const [formData, setFormData] = useState({ url: '', name: '', category: '' });

  useEffect(() => {
    if (editingImage) {
      setFormData(editingImage);
    } else {
      setFormData({ url: '', name: '', category: '' });
    }
  }, [editingImage, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-[#FFF8E7] p-6 rounded-lg shadow-lg w-full max-w-md"
        >
          <h2 className="text-xl font-bold text-[#7B1E2B] mb-4">{editingImage ? 'Edit' : 'Upload'} Image</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="text" placeholder="Image URL" value={formData.url}
              onChange={(e) => setFormData({...formData, url: e.target.value})}
              className="w-full p-2 border border-[#D4AF37] rounded" required
            />
            <input 
              type="text" placeholder="Name" value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2 border border-[#D4AF37] rounded" required
            />
            <input 
              type="text" placeholder="Category" value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full p-2 border border-[#D4AF37] rounded" required
            />
            <div className="flex justify-end gap-2">
              <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-[#7B1E2B] text-white rounded">Save</button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryUploadModal;
