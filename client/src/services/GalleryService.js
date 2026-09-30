const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const GALLERY_API = `${API_URL}/api/v1/gallery`;

export const getGalleryImages = async () => {
  const response = await fetch(GALLERY_API);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to fetch gallery images"
    );
  }

  return result?.data || [];
};

export const saveGalleryImage = async (formData, id = null) => {
  const url = id
    ? `${GALLERY_API}/${id}`
    : GALLERY_API;

  const response = await fetch(url, {
    method: id ? "PUT" : "POST",
    credentials: "include",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to save gallery image"
    );
  }

  return result?.data;
};

export const deleteGalleryImage = async (id) => {
  const response = await fetch(
    `${GALLERY_API}/${id}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to delete gallery image"
    );
  }

  return result?.data;
};