import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const ProfileInfo = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
        <p className="text-gray-500">
          Please login to view your profile.
        </p>
      </div>
    );
  }

  const fullName = user.fullName || "User";

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-8 rounded-3xl shadow-lg"
    >
      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 bg-[#D4AF37]/20 rounded-full flex items-center justify-center text-[#7B1E2B] text-3xl font-bold">
          {initials}
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#7B1E2B]">
            {fullName}
          </h2>

          <p className="text-gray-600">
            {user.email}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-500">
            Mobile Number
          </label>

          <p className="font-semibold text-[#7B1E2B]">
            {user.phone || "Not provided"}
          </p>
        </div>

        <div>
          <label className="block text-sm text-gray-500">
            Account Type
          </label>

          <p className="font-semibold text-[#7B1E2B]">
            {user.role === "ADMIN" ? "Admin" : "Customer"}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="mt-8 px-6 py-3 bg-[#7B1E2B] text-white rounded-xl hover:bg-[#7B1E2B]/90"
      >
        Edit Profile
      </button>
    </motion.div>
  );
};

export default ProfileInfo;