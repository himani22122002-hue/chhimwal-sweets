import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getSettings, saveSettings } from '../../services/SettingsService';
import StoreSettingsForm from '../../components/admin/StoreSettingsForm';
import BusinessHours from '../../components/admin/BusinessHours';
import SocialLinks from '../../components/admin/SocialLinks';

const Settings = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const handleSave = () => {
    saveSettings(settings);
    alert('Settings saved successfully!');
  };

  if (!settings) return <div className="p-8 text-[#7B1E2B]">Loading...</div>;

  return (
    <div className="p-8 bg-[#FFF8E7] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#7B1E2B]">Store Settings</h1>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="bg-[#7B1E2B] text-white px-6 py-2 rounded-lg font-semibold shadow-lg"
        >
          Save All Changes
        </motion.button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StoreSettingsForm settings={settings} onChange={setSettings} />
        <div className="space-y-8">
          <BusinessHours hours={settings.hours} onChange={(hours) => setSettings({...settings, hours})} />
          <SocialLinks links={settings.contactInfo} onChange={(contactInfo) => setSettings({...settings, contactInfo})} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
