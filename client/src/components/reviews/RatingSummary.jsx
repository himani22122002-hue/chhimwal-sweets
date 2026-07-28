import { Star } from "lucide-react";

const RatingSummary = ({ reviews }) => {
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : 0;

  const getPercentage = (rating) => {
    if (totalReviews === 0) return 0;
    const count = reviews.filter((r) => Math.round(r.rating) === rating).length;
    return (count / totalReviews) * 100;
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg">
      <h2 className="text-2xl font-bold text-[#7B1E2B] mb-6">Customer Reviews</h2>
      <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
        <div className="text-center">
          <p className="text-5xl font-bold text-[#7B1E2B]">{averageRating}</p>
          <div className="flex text-yellow-400 my-2">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} className={i < Math.round(averageRating) ? "fill-current" : ""} />)}
          </div>
          <p className="text-gray-500">{totalReviews} Reviews</p>
        </div>
        <div className="flex-1 w-full space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <span className="text-sm w-12">{rating} Stars</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#D4AF37]" style={{ width: `${getPercentage(rating)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingSummary;
