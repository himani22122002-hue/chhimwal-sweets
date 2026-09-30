import React from "react";
import { motion } from "framer-motion";

const platformLabels = {
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "Twitter / X",
  youtube: "YouTube",
  whatsapp: "WhatsApp",
};

const SocialLinks = ({ links, onChange }) => {
  const handleChange = (platform, value) => {
    onChange({
      ...links,
      [platform]: value,
    });
  };

  const platforms = [
    "facebook",
    "instagram",
    "twitter",
    "youtube",
    "whatsapp",
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-[#D4AF37]/30">
      <h3 className="text-xl font-semibold text-[#7B1E2B] mb-4">
        Social Media Links
      </h3>

      <p className="text-sm text-gray-500 mb-5">
        Add your social media links whenever you are ready. Leave any field
        blank if you don't want it displayed on the customer website.
      </p>

      <div className="space-y-4">
        {platforms.map((platform) => (
          <motion.div
            key={platform}
            className="flex flex-col gap-1"
          >
            <label className="text-sm font-medium text-[#7B1E2B]">
              {platformLabels[platform]}
            </label>

            <input
              type="url"
              value={links?.[platform] || ""}
              onChange={(e) =>
                handleChange(platform, e.target.value)
              }
              placeholder={`Enter ${platformLabels[platform]} URL`}
              className="p-2 border border-[#D4AF37]/50 rounded focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;