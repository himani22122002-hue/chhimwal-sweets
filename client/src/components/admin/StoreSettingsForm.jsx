import React from 'react';

const StoreSettingsForm = ({ settings, onChange }) => {
  const handleChange = (section, field, value) => {
    onChange({
      ...settings,
      [section]: { ...settings[section], [field]: value }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-[#D4AF37]/30 space-y-6">
      <h3 className="text-xl font-semibold text-[#7B1E2B]">Store Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['name', 'email', 'phone', 'address'].map(field => (
          <div key={field} className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#7B1E2B] capitalize">{field}</label>
            <input 
              type="text"
              value={settings.storeInfo[field]}
              onChange={(e) => handleChange('storeInfo', field, e.target.value)}
              className="p-2 border border-[#D4AF37]/50 rounded"
            />
          </div>
        ))}
      </div>

      <hr className="border-[#D4AF37]/30" />
      
      <h3 className="text-xl font-semibold text-[#7B1E2B]">SEO Settings</h3>
      <div className="space-y-4">
        {['title', 'description'].map(field => (
          <div key={field} className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#7B1E2B] capitalize">{field}</label>
            <input 
              type="text"
              value={settings.seo[field]}
              onChange={(e) => handleChange('seo', field, e.target.value)}
              className="p-2 border border-[#D4AF37]/50 rounded"
            />
          </div>
        ))}
      </div>

      <hr className="border-[#D4AF37]/30" />

      <h3 className="text-xl font-semibold text-[#7B1E2B]">Policies</h3>
      <div className="space-y-4">
        {['shipping', 'refund'].map(field => (
          <div key={field} className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#7B1E2B] capitalize">{field} Policy</label>
            <textarea 
              value={settings.policies[field]}
              onChange={(e) => handleChange('policies', field, e.target.value)}
              className="p-2 border border-[#D4AF37]/50 rounded h-24"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreSettingsForm;
