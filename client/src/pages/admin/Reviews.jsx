import React, { useState, useEffect } from 'react';
import { ReviewService } from '../../services/ReviewService';
import ReviewTable from '../../components/admin/ReviewTable';
import ReviewDetailsModal from '../../components/admin/ReviewDetailsModal';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedReviews, setSelectedReviews] = useState([]);

  useEffect(() => {
    setReviews(ReviewService.getReviews());
  }, []);

  const handleStatusChange = (id, status) => {
    setReviews(ReviewService.updateReviewStatus(id, status));
  };

  const handleDelete = (id) => {
    setReviews(ReviewService.deleteReview(id));
  };

  const toggleSelectReview = (id) => {
    setSelectedReviews(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    setSelectedReviews(selectedReviews.length === reviews.length ? [] : reviews.map(r => r.id));
  };

  const handleBulkAction = (status) => {
    setReviews(ReviewService.bulkUpdateStatus(selectedReviews, status));
    setSelectedReviews([]);
  };

  const handleBulkDelete = () => {
    setReviews(ReviewService.bulkDeleteReviews(selectedReviews));
    setSelectedReviews([]);
  };

  return (
    <div className="p-6 bg-[#FFF8E7] min-h-screen text-[#7B1E2B]">
      <h1 className="text-2xl font-bold mb-6">Manage Reviews</h1>
      <div className="mb-4 flex gap-2">
        <button onClick={() => handleBulkAction('Approved')} className="bg-[#D4AF37] text-white px-4 py-2 rounded">Approve</button>
        <button onClick={() => handleBulkAction('Hidden')} className="bg-gray-500 text-white px-4 py-2 rounded">Hide</button>
        <button onClick={handleBulkDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
      </div>
      <ReviewTable
        reviews={reviews}
        onView={setSelectedReview}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        selectedReviews={selectedReviews}
        toggleSelectReview={toggleSelectReview}
        toggleSelectAll={toggleSelectAll}
      />
      <ReviewDetailsModal review={selectedReview} onClose={() => setSelectedReview(null)} />
    </div>
  );
};

export default ReviewsPage;
