import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

const ProfileInfo = () => {
  const { user, loading } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const currentFullName = user.fullName || "User";

  const initials = currentFullName
    .split(" ")
    .filter(Boolean)
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleEdit = () => {
    setFullName(user.fullName || "");
    setPhone(user.phone || "");
    setError("");
    setSuccess("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError("");
    setSuccess("");
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setError("Full name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await fetch("/api/v1/auth/profile", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          phone: phone.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to update profile."
        );
      }

      setSuccess("Profile updated successfully.");

      setIsEditing(false);

      // Refresh so AuthContext gets the latest database data
      setTimeout(() => {
        window.location.reload();
      }, 700);
    } catch (error) {
      console.error("Profile update failed:", error);
      setError(
        error?.message || "Something went wrong while updating profile."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-8 rounded-3xl shadow-lg"
    >
      {!isEditing ? (
        <>
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 bg-[#D4AF37]/20 rounded-full flex items-center justify-center text-[#7B1E2B] text-3xl font-bold">
              {initials}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#7B1E2B]">
                {currentFullName}
              </h2>

              <p className="text-gray-600">
                {user.email}
              </p>
            </div>
          </div>

          {/* Profile Details */}
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

          {/* Success Message */}
          {success && (
            <p className="mt-6 text-green-600 font-medium">
              {success}
            </p>
          )}

          {/* Edit Button */}
          <button
            type="button"
            onClick={handleEdit}
            className="mt-8 px-6 py-3 bg-[#7B1E2B] text-white rounded-xl hover:bg-[#7B1E2B]/90"
          >
            Edit Profile
          </button>
        </>
      ) : (
        /* Edit Form */
        <form onSubmit={handleSave}>
          <h2 className="text-2xl font-bold text-[#7B1E2B] mb-6">
            Edit Profile
          </h2>

          {/* Full Name */}
          <div className="mb-5">
            <label className="block text-sm text-gray-500 mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7B1E2B]"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm text-gray-500 mb-2">
              Email
            </label>

            <input
              type="email"
              value={user.email || ""}
              disabled
              className="w-full border border-gray-200 bg-gray-100 text-gray-500 rounded-xl px-4 py-3 cursor-not-allowed"
            />

            <p className="text-xs text-gray-400 mt-1">
              Email cannot be changed here.
            </p>
          </div>

          {/* Phone */}
          <div className="mb-5">
            <label className="block text-sm text-gray-500 mb-2">
              Mobile Number
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#7B1E2B]"
              placeholder="Enter your mobile number"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="mb-5 text-red-600 text-sm">
              {error}
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 bg-[#7B1E2B] text-white rounded-xl hover:bg-[#7B1E2B]/90 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="px-6 py-3 border border-[#7B1E2B] text-[#7B1E2B] rounded-xl hover:bg-[#FFF8E7] disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
};

export default ProfileInfo;