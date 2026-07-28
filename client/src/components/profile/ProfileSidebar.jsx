import { motion } from "framer-motion";

const ProfileSidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = ["My Profile", "My Orders", "Saved Addresses", "Wishlist", "Logout"];

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-white p-6 rounded-3xl shadow-lg h-fit"
    >
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item)}
            className={`text-left px-4 py-3 rounded-xl transition-all ${
              activeTab === item
                ? "bg-[#7B1E2B] text-white"
                : "text-[#7B1E2B] hover:bg-[#7B1E2B]/10"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>
    </motion.div>
  );
};

export default ProfileSidebar;
