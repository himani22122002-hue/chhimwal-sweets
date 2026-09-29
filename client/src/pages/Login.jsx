import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const result = await login({
        email,
        password,
      });

      const loggedInUser = result?.data;

      // Admin → Admin Dashboard
      if (loggedInUser?.role === "ADMIN") {
        navigate("/admin");
      } else {
        // Normal User → Home
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);

      setError(
        error?.message || "Invalid email or password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-4xl font-bold text-[#7B1E2B] mb-8 text-center">
          Login
        </h1>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-[#7B1E2B] mb-2">
              Email
            </label>

            <input
              type="email"
              className="w-full p-3 rounded-xl border border-[#7B1E2B]/20 focus:outline-none focus:border-[#7B1E2B]"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-[#7B1E2B] mb-2">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-3 rounded-xl border border-[#7B1E2B]/20 focus:outline-none focus:border-[#7B1E2B]"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-10 text-[#7B1E2B]/50 hover:text-[#7B1E2B]"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-[#7B1E2B] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7B1E2B] text-white py-3 rounded-xl font-bold text-lg hover:bg-[#7B1E2B]/90 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Guest */}
          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full bg-[#D4AF37] text-white py-3 rounded-xl font-bold text-lg hover:bg-[#D4AF37]/90 transition"
          >
            Continue as Guest
          </button>
        </form>

        <p className="mt-6 text-center text-[#7B1E2B]">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-bold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;