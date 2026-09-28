import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await register({ 
        fullName: formData.fullName, 
        phone: formData.phone, 
        email: formData.email, 
        password: formData.password 
      });
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.message || "Registration failed. Please check your network and try again.";
      alert(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-[#7B1E2B] mb-8 text-center">Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#7B1E2B] mb-1">Full Name</label>
            <input 
              type="text" 
              className="w-full p-3 rounded-xl border border-[#7B1E2B]/20" 
              required 
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[#7B1E2B] mb-1">Mobile Number</label>
            <input 
              type="tel" 
              className="w-full p-3 rounded-xl border border-[#7B1E2B]/20" 
              required 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[#7B1E2B] mb-1">Email</label>
            <input 
              type="email" 
              className="w-full p-3 rounded-xl border border-[#7B1E2B]/20" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[#7B1E2B] mb-1">Password</label>
            <input 
              type="password" 
              className="w-full p-3 rounded-xl border border-[#7B1E2B]/20" 
              required 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[#7B1E2B] mb-1">Confirm Password</label>
            <input 
              type="password" 
              className="w-full p-3 rounded-xl border border-[#7B1E2B]/20" 
              required 
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>
          <button className="w-full bg-[#7B1E2B] text-white py-3 rounded-xl font-bold text-lg hover:bg-[#7B1E2B]/90 transition mt-4">Create Account</button>
        </form>
        <p className="mt-6 text-center text-[#7B1E2B]">
          Already have an account? <Link to="/login" className="font-bold hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
