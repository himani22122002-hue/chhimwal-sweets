import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ReviewDetailsModal = ({ review, onClose }) => {
  if (!review) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-[#FFF8E7] p-6 rounded-lg max-w-lg w-full text-[#7B1E2B]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Review Details</h2>
            <button onClick={onClose}><X size={24} /></button>
          </div>
          <div className="space-y-3">
            <p><strong>Customer:</strong> {review.customer}</p>
            <p><strong>Product:</strong> {review.product}</p>
            <p><strong>Rating:</strong> {review.rating} / 5</p>
            <p><strong>Title:</strong> {review.title}</p>
            <p><strong>Message:</strong> {review.message}</p>
            <p><strong>Date:</strong> {review.date}</p>
            <p><strong>Status:</strong> {review.status}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReviewDetailsModal;
