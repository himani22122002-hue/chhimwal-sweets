import { useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const ReviewForm = ({ onAddReview }) => {
  const [formData, setFormData] = useState({ name: "", rating: 0, title: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.rating || !formData.name || !formData.title || !formData.message) return;
    
    onAddReview({ ...formData, date: new Date().toLocaleDateString() });
    setFormData({ name: "", rating: 0, title: "", message: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg mt-8">
      <h3 className="text-xl font-bold text-[#7B1E2B] mb-6">Write a Review</h3>
      {submitted ? (
        <p className="text-green-600 font-semibold text-center py-4">Review submitted successfully!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Your Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 rounded-xl border" required />
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(r => (
              <Star key={r} size={24} className={`cursor-pointer ${r <= formData.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} onClick={() => setFormData({...formData, rating: r})} />
            ))}
          </div>
          <input type="text" placeholder="Review Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 rounded-xl border" required />
          <textarea placeholder="Your Message" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full p-3 rounded-xl border" rows="4" required />
          <button type="submit" className="w-full bg-[#7B1E2B] text-white py-3 rounded-xl hover:bg-[#7B1E2B]/90">Submit Review</button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
