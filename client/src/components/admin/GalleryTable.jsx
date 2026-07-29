import React from 'react';
import { motion } from 'framer-motion';

const GalleryTable = ({ images, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#FFF8E7] text-[#7B1E2B]">
            <th className="p-4 border-b">Image</th>
            <th className="p-4 border-b">Name</th>
            <th className="p-4 border-b">Category</th>
            <th className="p-4 border-b">Date</th>
            <th className="p-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <motion.tr 
              key={image.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hover:bg-gray-50 text-[#7B1E2B]"
            >
              <td className="p-4 border-b">
                <img src={image.url} alt={image.name} className="w-16 h-16 object-cover rounded" />
              </td>
              <td className="p-4 border-b">{image.name}</td>
              <td className="p-4 border-b">{image.category}</td>
              <td className="p-4 border-b">{new Date(image.date).toLocaleDateString()}</td>
              <td className="p-4 border-b">
                <button onClick={() => onEdit(image)} className="text-[#D4AF37] hover:underline mr-2">Edit</button>
                <button onClick={() => onDelete(image.id)} className="text-red-600 hover:underline">Delete</button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GalleryTable;
