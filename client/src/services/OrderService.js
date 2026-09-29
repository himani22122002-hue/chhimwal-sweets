const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

// Get all orders for ADMIN
export const getOrders = async () => {
  const response = await fetch(
    `${API_URL}/api/v1/orders/admin/all`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to fetch orders"
    );
  }

  return result?.data || [];
};

// Update order status - ADMIN
export const updateOrderStatus = async (id, status) => {
  const response = await fetch(
    `${API_URL}/api/v1/orders/admin/${id}/status`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result?.message || "Failed to update order status"
    );
  }

  return result?.data;
};