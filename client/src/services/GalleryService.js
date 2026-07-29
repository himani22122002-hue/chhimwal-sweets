const STORAGE_KEY = 'chhimwal_sweets_gallery';

export const getGalleryImages = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveGalleryImage = (image) => {
  const images = getGalleryImages();
  if (image.id) {
    const updatedImages = images.map((img) => (img.id === image.id ? image : img));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
  } else {
    const newImage = { ...image, id: Date.now().toString(), date: new Date().toISOString() };
    images.push(newImage);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
  }
};

export const deleteGalleryImage = (id) => {
  const images = getGalleryImages();
  const updatedImages = images.filter((img) => img.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
};
