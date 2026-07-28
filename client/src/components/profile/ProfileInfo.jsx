import { motion } from "framer-motion";

const ProfileInfo = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-3xl shadow-lg">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 bg-[#D4AF37]/20 rounded-full flex items-center justify-center text-[#7B1E2B] text-3xl font-bold">
          JD
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#7B1E2B]">John Doe</h2>
          <p className="text-gray-600">john.doe@example.com</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm text-gray-500">Mobile Number</label>
          <p className="font-semibold text-[#7B1E2B]">+91 98765 43210</p>
        </div>
      </div>
      <button className="mt-8 px-6 py-3 bg-[#7B1E2B] text-white rounded-xl hover:bg-[#7B1E2B]/90">
        Edit Profile
      </button>
    </motion.div>
  );
};

export default ProfileInfo;
