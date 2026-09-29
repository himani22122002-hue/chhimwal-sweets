import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileInfo from "../components/profile/ProfileInfo";
import MyOrders from "../components/profile/MyOrders";
import AddressBook from "../components/profile/AddressBook";
import Wishlist from "./Wishlist";

const Profile = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const tabFromUrl = searchParams.get("tab");

  const getInitialTab = () => {
    switch (tabFromUrl) {
      case "orders":
        return "My Orders";

      case "addresses":
        return "Saved Addresses";

      case "wishlist":
        return "Wishlist";

      default:
        return "My Profile";
    }
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    if (tab === "My Orders") {
      setSearchParams({ tab: "orders" });
    } else if (tab === "Saved Addresses") {
      setSearchParams({ tab: "addresses" });
    } else if (tab === "Wishlist") {
      setSearchParams({ tab: "wishlist" });
    } else {
      setSearchParams({});
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "My Profile":
        return <ProfileInfo />;

      case "My Orders":
        return <MyOrders />;

      case "Saved Addresses":
        return <AddressBook />;

      case "Wishlist":
        return <Wishlist />;

      default:
        return (
          <div className="p-8 bg-white rounded-3xl shadow-lg">
            Content for {activeTab}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

        <div className="md:w-1/4">
          <ProfileSidebar
            activeTab={activeTab}
            setActiveTab={handleTabChange}
          />
        </div>

        <div className="md:w-3/4">
          <motion.h1
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-4xl font-bold text-[#7B1E2B] mb-8"
          >
            {activeTab}
          </motion.h1>

          {renderContent()}
        </div>

      </div>
    </div>
  );
};

export default Profile;