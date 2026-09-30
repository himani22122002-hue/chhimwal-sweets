import React from "react";
import { motion } from "framer-motion";

const GalleryTable = ({ images, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="w-full min-w-[700px] border-collapse text-left">
        <thead>
          <tr className="bg-[#FFF8E7] text-[#7B1E2B]">
            <th className="border-b p-4">Image</th>
            <th className="border-b p-4">Title</th>
            <th className="border-b p-4">Category</th>
            <th className="border-b p-4">Date</th>
            <th className="border-b p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {images.map((image) => (
            <motion.tr
              key={image.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[#7B1E2B] transition hover:bg-gray-50"
            >
              <td className="border-b p-4">
                <img
                  src={image.image}
                  alt={image.title || "Gallery image"}
                  className="h-16 w-16 rounded object-cover"
                />
              </td>

              <td className="border-b p-4 font-medium">
                {image.title || "-"}
              </td>

              <td className="border-b p-4">
                {image.category || "-"}
              </td>

              <td className="border-b p-4">
                {image.createdAt
                  ? new Date(
                      image.createdAt
                    ).toLocaleDateString()
                  : "-"}
              </td>

              <td className="border-b p-4">
                <button
                  onClick={() => onEdit(image)}
                  className="mr-3 font-medium text-[#D4AF37] hover:underline"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(image.id)}
                  className="font-medium text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GalleryTable;