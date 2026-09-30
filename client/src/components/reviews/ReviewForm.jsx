import { useState } from "react";
import { Star } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    rating: 0,
    title: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!user) {
      setError("Please login to submit a review.");
      return;
    }

    if (!formData.rating) {
      setError("Please select a rating.");
      return;
    }

    if (!formData.title.trim()) {
      setError("Please enter a review title.");
      return;
    }

    if (!formData.message.trim()) {
      setError("Please enter your review.");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        `${API_URL}/api/v1/reviews`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
            rating: formData.rating,
            title: formData.title.trim(),
            comment: formData.message.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to submit review"
        );
      }

      setFormData({
        rating: 0,
        title: "",
        message: "",
      });

      setSubmitted(true);

      if (onReviewSubmitted) {
        onReviewSubmitted(result.data);
      }

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error("Review submission error:", err);
      setError(
        err.message || "Failed to submit review"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg mt-8">
      <h3 className="text-xl font-bold text-[#7B1E2B] mb-6">
        Write a Review
      </h3>

      {!user ? (
        <p className="text-gray-600 text-center py-4">
          Please login to write a review.
        </p>
      ) : submitted ? (
        <p className="text-green-600 font-semibold text-center py-4">
          Review submitted successfully!
          <br />
          <span className="text-sm text-gray-500">
            It will appear after approval.
          </span>
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* USER NAME */}
          <input
            type="text"
            value={user.fullName || ""}
            disabled
            className="w-full p-3 rounded-xl border bg-gray-100 text-gray-600"
          />

          {/* RATING */}
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-2">
              Your Rating
            </p>

            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  type="button"
                  key={rating}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      rating,
                    })
                  }
                  className="focus:outline-none"
                >
                  <Star
                    size={24}
                    className={
                      rating <= formData.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          {/* TITLE */}
          <input
            type="text"
            placeholder="Review Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
            className="w-full p-3 rounded-xl border"
            required
          />

          {/* MESSAGE */}
          <textarea
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) =>
              setFormData({
                ...formData,
                message: e.target.value,
              })
            }
            className="w-full p-3 rounded-xl border"
            rows="4"
            required
          />

          {/* ERROR */}
          {error && (
            <p className="text-red-600 text-sm font-medium">
              {error}
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#7B1E2B] text-white py-3 rounded-xl hover:bg-[#7B1E2B]/90 disabled:opacity-60"
          >
            {submitting
              ? "Submitting..."
              : "Submit Review"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;