import React, { useEffect, useState } from "react";
import ReviewTable from "../../components/admin/ReviewTable";
import ReviewDetailsModal from "../../components/admin/ReviewDetailsModal";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // LOAD REAL REVIEWS
  // =========================

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/v1/reviews`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message || "Failed to fetch reviews"
          );
        }

        const reviewData = Array.isArray(result?.data)
          ? result.data
          : [];

        setReviews(reviewData);
      } catch (err) {
        console.error("Reviews loading error:", err);

        setError(
          err.message || "Failed to load reviews"
        );
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  // =========================
  // SELECT REVIEW
  // =========================

  const toggleSelectReview = (id) => {
    setSelectedReviews((prev) =>
      prev.includes(id)
        ? prev.filter((reviewId) => reviewId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const allIds = reviews.map(
      (review) => review.id
    );

    const allSelected =
      allIds.length > 0 &&
      allIds.every((id) =>
        selectedReviews.includes(id)
      );

    if (allSelected) {
      setSelectedReviews([]);
    } else {
      setSelectedReviews(allIds);
    }
  };

  // =========================
  // STATUS
  // =========================
  // Backend currently only has GET reviews API.
  // So don't fake status updates.

  const handleStatusChange = () => {
    alert(
      "Review status update API is not connected yet."
    );
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = () => {
    alert(
      "Review delete API is not connected yet."
    );
  };

  // =========================
  // BULK ACTIONS
  // =========================

  const handleBulkAction = () => {
    if (selectedReviews.length === 0) {
      alert("Please select at least one review.");
      return;
    }

    alert(
      "Bulk review status API is not connected yet."
    );
  };

  const handleBulkDelete = () => {
    if (selectedReviews.length === 0) {
      alert("Please select at least one review.");
      return;
    }

    alert(
      "Bulk review delete API is not connected yet."
    );
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="p-6 bg-[#FFF8E7] min-h-screen text-[#7B1E2B] flex items-center justify-center">
        <p className="text-lg font-semibold">
          Loading reviews...
        </p>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="p-6 bg-[#FFF8E7] min-h-screen text-[#7B1E2B]">
        <h1 className="text-2xl font-bold mb-6">
          Manage Reviews
        </h1>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <p className="text-red-600 font-semibold mb-4">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-[#7B1E2B] text-white px-5 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#FFF8E7] min-h-screen text-[#7B1E2B]">
      <h1 className="text-2xl font-bold mb-6">
        Manage Reviews
      </h1>

      {/* BULK ACTIONS */}
      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={handleBulkAction}
          className="bg-[#D4AF37] text-white px-4 py-2 rounded"
        >
          Approve
        </button>

        <button
          type="button"
          onClick={handleBulkAction}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Hide
        </button>

        <button
          type="button"
          onClick={handleBulkDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>

      {/* REAL REVIEWS */}
      <ReviewTable
        reviews={reviews}
        onView={setSelectedReview}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
        selectedReviews={selectedReviews}
        toggleSelectReview={toggleSelectReview}
        toggleSelectAll={toggleSelectAll}
      />

      <ReviewDetailsModal
        review={selectedReview}
        onClose={() => setSelectedReview(null)}
      />
    </div>
  );
};

export default ReviewsPage;