import React, { useEffect, useState } from "react";
import {
  Eye,
  CheckCircle,
  EyeOff,
  Trash2,
  Star,
  RefreshCw,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH REVIEWS
  // ==========================================
  const fetchReviews = async () => {
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

      setReviews(result?.data || []);
      setSelectedIds([]);
    } catch (err) {
      console.error("Fetch reviews error:", err);
      setError(
        err.message || "Failed to load reviews."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // ==========================================
  // UPDATE SINGLE REVIEW
  // ==========================================
  const updateStatus = async (reviewId, status) => {
    try {
      setUpdating(true);

      const response = await fetch(
        `${API_URL}/api/v1/reviews/${reviewId}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Failed to update review status"
        );
      }

      // Directly update current row
      setReviews((prev) =>
        prev.map((review) =>
          review.id === reviewId
            ? {
                ...review,
                status: result?.data?.status || status,
              }
            : review
        )
      );

      return true;
    } catch (err) {
      console.error("Status update error:", err);

      alert(
        err.message ||
          "Failed to update review status."
      );

      return false;
    } finally {
      setUpdating(false);
    }
  };

  // ==========================================
  // APPROVE
  // ==========================================
  const handleApprove = async (id) => {
    await updateStatus(id, "APPROVED");
  };

  // ==========================================
  // HIDE
  // ==========================================
  const handleHide = async (id) => {
    await updateStatus(id, "HIDDEN");
  };

  // ==========================================
  // SELECT ONE
  // ==========================================
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // ==========================================
  // SELECT ALL
  // ==========================================
  const toggleSelectAll = () => {
    if (
      selectedIds.length === reviews.length &&
      reviews.length > 0
    ) {
      setSelectedIds([]);
    } else {
      setSelectedIds(
        reviews.map((review) => review.id)
      );
    }
  };

  // ==========================================
  // BULK STATUS
  // ==========================================
  const handleBulkStatus = async (status) => {
    if (selectedIds.length === 0) {
      alert("Please select at least one review.");
      return;
    }

    try {
      setUpdating(true);

      const ids = [...selectedIds];

      for (const id of ids) {
        const response = await fetch(
          `${API_URL}/api/v1/reviews/${id}/status`,
          {
            method: "PATCH",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status,
            }),
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message ||
              "Failed to update review"
          );
        }
      }

      // Update all selected rows
      setReviews((prev) =>
        prev.map((review) =>
          ids.includes(review.id)
            ? {
                ...review,
                status,
              }
            : review
        )
      );

      setSelectedIds([]);

      alert(
        `${ids.length} review${
          ids.length > 1 ? "s" : ""
        } ${
          status === "APPROVED"
            ? "approved"
            : "hidden"
        } successfully.`
      );
    } catch (err) {
      console.error(
        "Bulk status update error:",
        err
      );

      alert(
        err.message ||
          "Failed to update reviews."
      );
    } finally {
      setUpdating(false);
    }
  };

  // ==========================================
  // STATUS STYLE
  // ==========================================
  const getStatusStyle = (status) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-700";

      case "HIDDEN":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center">
        <p className="text-[#7B1E2B] font-semibold text-lg">
          Loading Reviews...
        </p>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================
  if (error) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] p-8">
        <div className="bg-white rounded-2xl p-8 text-center shadow">
          <p className="text-red-600 font-semibold mb-4">
            {error}
          </p>

          <button
            onClick={fetchReviews}
            className="bg-[#7B1E2B] text-white px-6 py-3 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8E7] p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#7B1E2B]">
            Manage Reviews
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            {reviews.length} review
            {reviews.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <button
          onClick={fetchReviews}
          disabled={loading || updating}
          className="flex items-center gap-2 border border-[#7B1E2B] text-[#7B1E2B] px-4 py-2 rounded-lg hover:bg-[#7B1E2B] hover:text-white transition"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* BULK BUTTONS */}
      <div className="flex gap-2 mb-4">

        <button
          onClick={() =>
            handleBulkStatus("APPROVED")
          }
          disabled={
            updating || selectedIds.length === 0
          }
          className="px-5 py-2 rounded-lg bg-[#D4AF37] text-white font-semibold disabled:opacity-40"
        >
          Approve
        </button>

        <button
          onClick={() =>
            handleBulkStatus("HIDDEN")
          }
          disabled={
            updating || selectedIds.length === 0
          }
          className="px-5 py-2 rounded-lg bg-gray-500 text-white font-semibold disabled:opacity-40"
        >
          Hide
        </button>

        {selectedIds.length > 0 && (
          <span className="flex items-center text-sm text-gray-600 ml-2">
            {selectedIds.length} selected
          </span>
        )}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#7B1E2B]/10">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#7B1E2B] text-white">
              <tr>

                <th className="px-4 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={
                      reviews.length > 0 &&
                      selectedIds.length ===
                        reviews.length
                    }
                    onChange={toggleSelectAll}
                    className="w-4 h-4"
                  />
                </th>

                <th className="px-4 py-4 text-left text-sm">
                  CUSTOMER
                </th>

                <th className="px-4 py-4 text-left text-sm">
                  PRODUCT
                </th>

                <th className="px-4 py-4 text-left text-sm">
                  RATING
                </th>

                <th className="px-4 py-4 text-left text-sm">
                  TITLE
                </th>

                <th className="px-4 py-4 text-left text-sm">
                  DATE
                </th>

                <th className="px-4 py-4 text-left text-sm">
                  STATUS
                </th>

                <th className="px-4 py-4 text-left text-sm">
                  ACTIONS
                </th>

              </tr>
            </thead>

            <tbody>

              {reviews.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-12 text-gray-500"
                  >
                    No reviews found.
                  </td>
                </tr>
              ) : (
                reviews.map((review) => (

                  <tr
                    key={review.id}
                    className="border-b hover:bg-[#FFF8E7]/60"
                  >

                    {/* CHECKBOX */}
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(
                          review.id
                        )}
                        onChange={() =>
                          toggleSelect(review.id)
                        }
                        className="w-4 h-4"
                      />
                    </td>

                    {/* CUSTOMER */}
                    <td className="px-4 py-4">
                      <span className="font-semibold text-[#7B1E2B]">
                        {review.customer ||
                          "Customer"}
                      </span>
                    </td>

                    {/* PRODUCT */}
                    <td className="px-4 py-4">
                      {review.product ||
                        "Product"}
                    </td>

                    {/* RATING */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <span className="font-semibold">
                          {review.rating}
                        </span>

                        <Star
                          size={15}
                          className="text-yellow-500 fill-yellow-500"
                        />
                      </div>
                    </td>

                    {/* TITLE */}
                    <td className="px-4 py-4">
                      {review.title || "Review"}
                    </td>

                    {/* DATE */}
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {review.date
                        ? new Date(
                            review.date
                          ).toLocaleString(
                            "en-IN"
                          )
                        : "-"}
                    </td>

                    {/* STATUS */}
                    <td className="px-4 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(
                          review.status
                        )}`}
                      >
                        {review.status ||
                          "PENDING"}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-4 py-4">

                      <div className="flex items-center gap-3">

                        {/* VIEW */}
                        <button
                          title="View review"
                          className="text-yellow-600 hover:scale-110 transition"
                          onClick={() =>
                            alert(
                              `${review.customer}\n\n${review.title}\n\n${review.message}`
                            )
                          }
                        >
                          <Eye size={18} />
                        </button>

                        {/* APPROVE */}
                        <button
                          title="Approve review"
                          disabled={updating}
                          onClick={() =>
                            handleApprove(
                              review.id
                            )
                          }
                          className="text-green-600 hover:scale-110 transition disabled:opacity-40"
                        >
                          <CheckCircle
                            size={18}
                          />
                        </button>

                        {/* HIDE */}
                        <button
                          title="Hide review"
                          disabled={updating}
                          onClick={() =>
                            handleHide(
                              review.id
                            )
                          }
                          className="text-gray-600 hover:scale-110 transition disabled:opacity-40"
                        >
                          <EyeOff size={18} />
                        </button>

                        {/* DELETE - NOT CONNECTED */}
                        <button
                          title="Delete"
                          onClick={() =>
                            alert(
                              "Delete review API is not connected yet."
                            )
                          }
                          className="text-red-600 hover:scale-110 transition"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))
              )}

            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default Reviews;