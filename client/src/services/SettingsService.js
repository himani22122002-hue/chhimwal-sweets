const STORAGE_KEY = 'chhimwal_sweets_settings';

const defaultSettings = {
  storeInfo: { name: 'Chhimwal Sweets', email: '', phone: '', address: '' },
  contactInfo: { facebook: '', instagram: '', twitter: '' },
  seo: { title: '', description: '' },
  policies: { shipping: '', refund: '' },
  hours: [
    { day: 'Monday', open: '09:00', close: '21:00', isClosed: false },
    { day: 'Tuesday', open: '09:00', close: '21:00', isClosed: false },
    { day: 'Wednesday', open: '09:00', close: '21:00', isClosed: false },
    { day: 'Thursday', open: '09:00', close: '21:00', isClosed: false },
    { day: 'Friday', open: '09:00', close: '21:00', isClosed: false },
    { day: 'Saturday', open: '10:00', close: '22:00', isClosed: false },
    { day: 'Sunday', open: '10:00', close: '20:00', isClosed: false },
  ],
};

export const getSettings = () => {
  const settings = localStorage.getItem(STORAGE_KEY);
  return settings ? JSON.parse(settings) : defaultSettings;
};

export const saveSettings = (settings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};
