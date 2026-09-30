import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ProductService } from "../../services/ProductService";

const emptyVariant = {
  id: undefined,
  sku: "",
  weight: "",
  price: "",
  discountedPrice: "",
  stock: "",
};

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [product, setProduct] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    categoryId: "",
    featured: false,
    active: true,
    variants: [{ ...emptyVariant }],
  });

  // --------------------------------
  // Load categories
  // --------------------------------
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch("/api/v1/categories");

        if (!response.ok) {
          throw new Error("Failed to load categories");
        }

        const result = await response.json();

        const categoryData =
          Array.isArray(result?.data)
            ? result.data
            : Array.isArray(result?.data?.categories)
            ? result.data.categories
            : [];

        setCategories(categoryData);
      } catch (err) {
        console.error("Failed to load categories:", err);
        setError("Failed to load categories.");
      }
    };

    loadCategories();
  }, []);

  // --------------------------------
  // Load product for edit
  // --------------------------------
  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const loadProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await ProductService.getProductById(id);

        if (!data) {
          throw new Error("Product not found");
        }

        setProduct({
          name: data.name || "",
          slug: data.slug || "",
          description: data.description || "",
          image: data.image || "",
          categoryId: data.categoryId || data.category?.id || "",
          featured: Boolean(data.featured),
          active: data.active !== false,
          variants:
            Array.isArray(data.variants) && data.variants.length > 0
              ? data.variants.map((variant) => ({
                  id: variant.id,
                  sku: variant.sku || "",
                  weight: variant.weight || "",
                  price: variant.price?.toString() || "",
                  discountedPrice:
                    variant.discountedPrice != null
                      ? variant.discountedPrice.toString()
                      : "",
                  stock:
                    variant.stock != null
                      ? variant.stock.toString()
                      : "",
                }))
              : [{ ...emptyVariant }],
        });
      } catch (err) {
        console.error("Failed to load product:", err);
        setError(err.message || "Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  // --------------------------------
  // Input changes
  // --------------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // --------------------------------
  // Variant changes
  // --------------------------------
  const handleVariantChange = (index, field, value) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, variantIndex) =>
        variantIndex === index
          ? {
              ...variant,
              [field]: value,
            }
          : variant
      ),
    }));
  };

  // --------------------------------
  // Add variant
  // --------------------------------
  const addVariant = () => {
    setProduct((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          ...emptyVariant,
          id: undefined,
        },
      ],
    }));
  };

  // --------------------------------
  // Remove variant
  // --------------------------------
  const removeVariant = (index) => {
    if (product.variants.length === 1) {
      return;
    }

    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.filter(
        (_, variantIndex) => variantIndex !== index
      ),
    }));
  };

  // --------------------------------
  // Submit
  // --------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      if (!product.categoryId) {
        throw new Error("Please select a category.");
      }

      if (!product.variants.length) {
        throw new Error("Please add at least one variant.");
      }

      const variants = product.variants.map((variant) => {
        const formattedVariant = {
          sku: variant.sku.trim(),
          weight: variant.weight.trim(),
          price: Number(variant.price),
          stock: Number(variant.stock),
        };

        if (variant.discountedPrice !== "") {
          formattedVariant.discountedPrice = Number(
            variant.discountedPrice
          );
        } else {
          formattedVariant.discountedPrice = null;
        }

        // Existing variant → keep ID for update
        if (variant.id) {
          formattedVariant.id = variant.id;
        }

        return formattedVariant;
      });

      const payload = {
        name: product.name.trim(),
        slug: product.slug.trim(),
        description: product.description.trim(),
        image: product.image.trim(),
        categoryId: product.categoryId,
        featured: Boolean(product.featured),
        active: Boolean(product.active),
        variants,
      };

      const API_URL = "/api/v1/products";

      const response = await fetch(
        id ? `${API_URL}/${id}` : API_URL,
        {
          method: id ? "PUT" : "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message ||
            result?.error ||
            "Failed to save product."
        );
      }

      alert(
        id
          ? "Product updated successfully!"
          : "Product added successfully!"
      );

      navigate("/admin/products");
    } catch (err) {
      console.error("Failed to save product:", err);

      setError(
        err.message || "Failed to save product. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------
  // Loading
  // --------------------------------
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg font-semibold text-[#7B1E2B]">
          Loading product...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-[#FFF8E7] rounded-3xl"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#7B1E2B]">
          {id ? "Edit Product" : "Add Product"}
        </h1>

        <p className="text-gray-500 mt-1">
          {id
            ? "Update product details and variants."
            : "Add a new sweet or product to your store."}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[#7B1E2B]">
            Product Information
          </h2>

          <div>
            <label className="block text-sm font-medium text-[#7B1E2B] mb-1">
              Product Name
            </label>

            <input
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-[#D4AF37] outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#7B1E2B] mb-1">
              Slug
            </label>

            <input
              name="slug"
              placeholder="product-slug"
              value={product.slug}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-[#D4AF37] outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#7B1E2B] mb-1">
              Category
            </label>

            <select
              name="categoryId"
              value={product.categoryId}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-[#D4AF37] outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#7B1E2B] mb-1">
              Image URL
            </label>

            <input
              name="image"
              type="text"
              placeholder="https://..."
              value={product.image}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl border border-[#D4AF37] outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#7B1E2B] mb-1">
              Description
            </label>

            <textarea
              name="description"
              placeholder="Product description"
              value={product.description}
              onChange={handleChange}
              rows={5}
              required
              className="w-full p-3 rounded-xl border border-[#D4AF37] outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
            />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-[#7B1E2B]">
              <input
                name="featured"
                type="checkbox"
                checked={product.featured}
                onChange={handleChange}
              />
              Featured
            </label>

            <label className="flex items-center gap-2 text-[#7B1E2B]">
              <input
                name="active"
                type="checkbox"
                checked={product.active}
                onChange={handleChange}
              />
              Active
            </label>
          </div>
        </div>

        {/* Variants */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between gap-3 mb-5">
            <div>
              <h2 className="text-lg font-bold text-[#7B1E2B]">
                Product Variants
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Add different weights, prices and stock quantities.
              </p>
            </div>

            <button
              type="button"
              onClick={addVariant}
              className="bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-semibold"
            >
              + Add Variant
            </button>
          </div>

          <div className="space-y-5">
            {product.variants.map((variant, index) => (
              <div
                key={variant.id || index}
                className="border border-[#D4AF37]/40 rounded-2xl p-4 bg-[#FFF8E7]/40"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-[#7B1E2B]">
                    Variant {index + 1}
                  </h3>

                  {product.variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(index)}
                      className="text-red-500 text-sm font-semibold hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    value={variant.sku}
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        "sku",
                        e.target.value
                      )
                    }
                    placeholder="SKU"
                    required
                    className="p-3 rounded-xl border border-[#D4AF37]"
                  />

                  <input
                    value={variant.weight}
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        "weight",
                        e.target.value
                      )
                    }
                    placeholder="Weight e.g. 250g"
                    required
                    className="p-3 rounded-xl border border-[#D4AF37]"
                  />

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={variant.price}
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        "price",
                        e.target.value
                      )
                    }
                    placeholder="Price"
                    required
                    className="p-3 rounded-xl border border-[#D4AF37]"
                  />

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={variant.discountedPrice}
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        "discountedPrice",
                        e.target.value
                      )
                    }
                    placeholder="Discounted Price (optional)"
                    className="p-3 rounded-xl border border-[#D4AF37]"
                  />

                  <input
                    type="number"
                    min="0"
                    value={variant.stock}
                    onChange={(e) =>
                      handleVariantChange(
                        index,
                        "stock",
                        e.target.value
                      )
                    }
                    placeholder="Stock"
                    required
                    className="p-3 rounded-xl border border-[#D4AF37]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#7B1E2B] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#7B1E2B]/90 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving
              ? "Saving..."
              : id
              ? "Update Product"
              : "Save Product"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            disabled={saving}
            className="bg-gray-200 text-[#7B1E2B] px-6 py-3 rounded-xl font-semibold hover:bg-gray-300 disabled:opacity-60"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProductForm;