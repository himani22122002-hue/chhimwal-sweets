const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const PRODUCTS_API = `${API_URL}/api/v1/products`;

export const ProductService = {
  getProducts: async (params = {}) => {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.append(key, value);
      }
    });

    const response = await fetch(
      `${PRODUCTS_API}${
        query.toString() ? `?${query.toString()}` : ""
      }`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const result = await response.json();

    return result.data;
  },

  getProductById: async (id) => {
    const response = await fetch(`${PRODUCTS_API}/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }

    const result = await response.json();

    return result.data;
  },
};