import React from 'react';
import { motion } from 'framer-motion';

const BusinessHours = ({ hours, onChange }) => {
  const handleToggleClosed = (index) => {
    const updatedHours = [...hours];
    updatedHours[index].isClosed = !updatedHours[index].isClosed;
    onChange(updatedHours);
  };

  const handleTimeChange = (index, field, value) => {
    const updatedHours = [...hours];
    updatedHours[index][field] = value;
    onChange(updatedHours);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-[#D4AF37]/30">
      <h3 className="text-xl font-semibold text-[#7B1E2B] mb-4">Business Hours</h3>
      <div className="space-y-3">
        {hours.map((item, index) => (
          <motion.div 
            key={item.day}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 p-2 bg-[#FFF8E7]/50 rounded"
          >
            <span className="w-24 font-medium text-[#7B1E2B]">{item.day}</span>
            <input 
              type="checkbox" 
              checked={item.isClosed}
              onChange={() => handleToggleClosed(index)}
              className="accent-[#7B1E2B]"
            />
            <span className="text-sm text-[#7B1E2B]">Closed</span>
            
            {!item.isClosed && (
              <>
                <input 
                  type="time" 
                  value={item.open}
                  onChange={(e) => handleTimeChange(index, 'open', e.target.value)}
                  className="p-1 border border-[#D4AF37]/50 rounded text-sm"
                />
                <span className="text-[#7B1E2B]">to</span>
                <input 
                  type="time" 
                  value={item.close}
                  onChange={(e) => handleTimeChange(index, 'close', e.target.value)}
                  className="p-1 border border-[#D4AF37]/50 rounded text-sm"
                />
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BusinessHours;
