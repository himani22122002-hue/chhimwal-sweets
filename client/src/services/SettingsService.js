const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const SETTINGS_API = `${API_URL}/api/v1/settings`;

export const getSettings = async () => {
  const response = await fetch(SETTINGS_API);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Failed to fetch settings");
  }

  return result?.data;
};

export const saveSettings = async (settings) => {
  const response = await fetch(SETTINGS_API, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(settings),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Failed to save settings");
  }

  return result?.data;
};