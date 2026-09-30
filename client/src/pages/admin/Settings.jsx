import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  getSettings,
  saveSettings,
} from "../../services/SettingsService";

import StoreSettingsForm from "../../components/admin/StoreSettingsForm";
import BusinessHours from "../../components/admin/BusinessHours";
import SocialLinks from "../../components/admin/SocialLinks";

const Settings = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getSettings();
        setSettings(data);
      } catch (err) {
        console.error("Failed to load settings:", err);
        setError(err.message || "Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");

      const updatedSettings = await saveSettings(settings);

      setSettings(updatedSettings);

      alert("Settings saved successfully!");
    } catch (err) {
      console.error("Failed to save settings:", err);
      setError(err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] p-8 flex items-center justify-center">
        <p className="text-[#7B1E2B] text-lg">
          Loading settings...
        </p>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] p-8">
        <div className="bg-red-50 text-red-600 rounded-lg p-4">
          {error || "Unable to load settings."}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#FFF8E7] min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#7B1E2B]">
            Store Settings
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your store information, social links, business hours and policies.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          disabled={saving}
          className="bg-[#7B1E2B] text-white px-6 py-2 rounded-lg font-semibold shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Save All Changes"}
        </motion.button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-red-600">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StoreSettingsForm
          settings={settings}
          onChange={setSettings}
        />

        <div className="space-y-8">
          <BusinessHours
            hours={settings.hours}
            onChange={(hours) =>
              setSettings({
                ...settings,
                hours,
              })
            }
          />

          <SocialLinks
            links={settings.contactInfo}
            onChange={(contactInfo) =>
              setSettings({
                ...settings,
                contactInfo,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;