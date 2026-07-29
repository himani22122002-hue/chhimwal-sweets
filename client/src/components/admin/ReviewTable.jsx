import React from 'react';
import { Trash2, Eye, CheckCircle, XCircle, EyeOff } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const styles = {
    Approved: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Hidden: 'bg-gray-100 text-gray-800',
    Rejected: 'bg-red-100 text-red-800',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.Pending}`}>
      {status}
    </span>
  );
};

const ReviewTable = ({ reviews, onView, onStatusChange, onDelete, selectedReviews, toggleSelectReview, toggleSelectAll }) => {
  return (
    <div className="overflow-x-auto bg-[#FFF8E7] rounded-lg shadow">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-[#7B1E2B] text-white">
          <tr>
            <th className="p-4"><input type="checkbox" onChange={toggleSelectAll} checked={selectedReviews.length === reviews.length && reviews.length > 0} /></th>
            <th className="p-4">Customer</th>
            <th className="p-4">Product</th>
            <th className="p-4">Rating</th>
            <th className="p-4">Title</th>
            <th className="p-4">Date</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody className="text-[#7B1E2B]">
          {reviews.map((review) => (
            <tr key={review.id} className="border-b border-[#D4AF37]/20 hover:bg-[#D4AF37]/10">
              <td className="p-4"><input type="checkbox" checked={selectedReviews.includes(review.id)} onChange={() => toggleSelectReview(review.id)} /></td>
              <td className="p-4 font-medium">{review.customer}</td>
              <td className="p-4">{review.product}</td>
              <td className="p-4">{review.rating}</td>
              <td className="p-4">{review.title}</td>
              <td className="p-4">{review.date}</td>
              <td className="p-4"><StatusBadge status={review.status} /></td>
              <td className="p-4 flex gap-2">
                <button onClick={() => onView(review)} className="text-[#D4AF37] hover:text-[#7B1E2B]"><Eye size={18} /></button>
                <button onClick={() => onStatusChange(review.id, 'Approved')} className="text-green-600"><CheckCircle size={18} /></button>
                <button onClick={() => onStatusChange(review.id, 'Hidden')} className="text-gray-600"><EyeOff size={18} /></button>
                <button onClick={() => onDelete(review.id)} className="text-red-600"><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewTable;
