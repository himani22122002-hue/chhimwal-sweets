import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProfileSidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    "My Profile",
    "My Orders",
    "Saved Addresses",
    "Wishlist",
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-4">
      {/* Profile */}
      <button
        type="button"
        onClick={() => handleTabClick("My Profile")}
        className={`w-full text-left px-4 py-3 rounded-xl mb-1 transition ${
          activeTab === "My Profile"
            ? "bg-[#7B1E2B] text-white"
            : "text-[#7B1E2B] hover:bg-[#FFF8E7]"
        }`}
      >
        My Profile
      </button>

      {/* Orders */}
      <button
        type="button"
        onClick={() => handleTabClick("My Orders")}
        className={`w-full text-left px-4 py-3 rounded-xl mb-1 transition ${
          activeTab === "My Orders"
            ? "bg-[#7B1E2B] text-white"
            : "text-[#7B1E2B] hover:bg-[#FFF8E7]"
        }`}
      >
        My Orders
      </button>

      {/* Addresses */}
      <button
        type="button"
        onClick={() => handleTabClick("Saved Addresses")}
        className={`w-full text-left px-4 py-3 rounded-xl mb-1 transition ${
          activeTab === "Saved Addresses"
            ? "bg-[#7B1E2B] text-white"
            : "text-[#7B1E2B] hover:bg-[#FFF8E7]"
        }`}
      >
        Saved Addresses
      </button>

      {/* Wishlist */}
      <button
        type="button"
        onClick={() => handleTabClick("Wishlist")}
        className={`w-full text-left px-4 py-3 rounded-xl mb-1 transition ${
          activeTab === "Wishlist"
            ? "bg-[#7B1E2B] text-white"
            : "text-[#7B1E2B] hover:bg-[#FFF8E7]"
        }`}
      >
        Wishlist
      </button>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="w-full text-left px-4 py-3 rounded-xl text-[#7B1E2B] hover:bg-red-50 hover:text-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileSidebar;