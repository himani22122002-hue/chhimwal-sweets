import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Placeholder for API integration
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-[#7B1E2B] mb-8 text-center">Forgot Password</h1>
        {submitted ? (
          <div className="text-center">
            <p className="text-lg text-[#7B1E2B] mb-6">Password reset link sent successfully.</p>
            <Link to="/login" className="block w-full bg-[#7B1E2B] text-white py-3 rounded-xl font-bold text-lg hover:bg-[#7B1E2B]/90 transition">Back to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#7B1E2B] mb-2">Email</label>
              <input type="email" className="w-full p-3 rounded-xl border border-[#7B1E2B]/20" required />
            </div>
            <button className="w-full bg-[#7B1E2B] text-white py-3 rounded-xl font-bold text-lg hover:bg-[#7B1E2B]/90 transition">Send Reset Link</button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
