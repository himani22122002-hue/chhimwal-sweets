import React from 'react';
import { motion } from 'framer-motion';

const SocialLinks = ({ links, onChange }) => {
  const handleChange = (platform, value) => {
    onChange({ ...links, [platform]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-[#D4AF37]/30">
      <h3 className="text-xl font-semibold text-[#7B1E2B] mb-4">Social Media Links</h3>
      <div className="space-y-4">
        {Object.entries(links).map(([platform, url]) => (
          <motion.div key={platform} className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#7B1E2B] capitalize">{platform}</label>
            <input 
              type="url"
              value={url}
              onChange={(e) => handleChange(platform, e.target.value)}
              placeholder={`Enter ${platform} URL`}
              className="p-2 border border-[#D4AF37]/50 rounded focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
