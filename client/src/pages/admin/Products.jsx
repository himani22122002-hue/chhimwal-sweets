import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Edit,
  Trash,
  Eye,
  Plus,
  Search,
} from "lucide-react";
import { ProductService } from "../../services/ProductService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const itemsPerPage = 10;

  // --------------------------------
  // Load products from API
  // --------------------------------
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await ProductService.getProducts();

      const productList = Array.isArray(result)
        ? result
        : Array.isArray(result?.products)
        ? result.products
        : Array.isArray(result?.data)
        ? result.data
        : Array.isArray(result?.data?.products)
        ? result.data.products
        : [];

      setProducts(productList);
    } catch (err) {
      console.error("Failed to load products:", err);
      setError("Failed to load products.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // --------------------------------
  // Delete product
  // --------------------------------
  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setDeleteLoading(true);

      await ProductService.deleteProduct(deleteId);

      setDeleteId(null);

      await loadProducts();
    } catch (err) {
      console.error("Failed to delete product:", err);

      alert(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to delete product."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // --------------------------------
  // Helpers
  // --------------------------------
  const getCategoryName = (product) => {
    if (typeof product?.category === "string") {
      return product.category;
    }

    return (
      product?.category?.name ||
      product?.categoryName ||
      "Uncategorized"
    );
  };

  const getImage = (product) => {
    return (
      product?.image ||
      product?.imageUrl ||
      product?.images?.[0] ||
      "/images/placeholder.jpg"
    );
  };

  const getPrice = (product) => {
    if (product?.price != null) {
      return Number(product.price);
    }

    if (product?.variants?.length > 0) {
      return Number(product.variants[0]?.price || 0);
    }

    return 0;
  };

  const getStock = (product) => {
    if (product?.stock != null) {
      return Number(product.stock);
    }

    if (product?.variants?.length > 0) {
      return product.variants.reduce(
        (total, variant) =>
          total + Number(variant?.stock || 0),
        0
      );
    }

    return 0;
  };

  const isProductActive = (product) => {
    if (typeof product?.active === "boolean") {
      return product.active;
    }

    if (typeof product?.isActive === "boolean") {
      return product.isActive;
    }

    return true;
  };

  // --------------------------------
  // Filter + Search
  // --------------------------------
  const filteredProducts = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return products.filter((product) => {
      const name = String(product?.name || "").toLowerCase();

      const category = getCategoryName(product).toLowerCase();

      const matchesSearch =
        !search ||
        name.includes(search) ||
        category.includes(search);

      const active = isProductActive(product);

      const matchesFilter =
        filterActive === "All" ||
        (filterActive === "Active" && active) ||
        (filterActive === "Inactive" && !active);

      return matchesSearch && matchesFilter;
    });
  }, [products, searchTerm, filterActive]);

  // --------------------------------
  // Pagination
  // --------------------------------
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage)
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const paginatedProducts = filteredProducts.slice(
    (safeCurrentPage - 1) * itemsPerPage,
    safeCurrentPage * itemsPerPage
  );

  // Reset page when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterActive]);

  // --------------------------------
  // Loading
  // --------------------------------
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg font-semibold text-[#7B1E2B]">
          Loading products...
        </p>
      </div>
    );
  }

  // --------------------------------
  // Error
  // --------------------------------
  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-md p-8 text-center">
          <p className="text-red-600 font-semibold mb-4">
            {error}
          </p>

          <button
            type="button"
            onClick={loadProducts}
            className="bg-[#7B1E2B] text-white px-6 py-3 rounded-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#7B1E2B]">
            Products
          </h1>

          <p className="text-gray-500 mt-1">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        <Link
          to="/admin/products/add"
          className="flex items-center justify-center gap-2 bg-[#7B1E2B] text-white px-6 py-3 rounded-xl hover:bg-[#7B1E2B]/90 transition"
        >
          <Plus size={20} />
          Add Product
        </Link>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-2xl shadow">
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            placeholder="Search products..."
            className="w-full p-3 pl-10 border rounded-lg outline-none focus:ring-2 focus:ring-[#D4AF37]"
          />
        </div>

        <select
          value={filterActive}
          onChange={(e) =>
            setFilterActive(e.target.value)
          }
          className="p-3 border rounded-lg outline-none focus:ring-2 focus:ring-[#D4AF37]"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#FFF8E7] text-[#7B1E2B]">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="p-10 text-center text-gray-500"
                  >
                    No products found.
                  </td>
                </tr>
              ) : (
                paginatedProducts.map((product) => {
                  const active =
                    isProductActive(product);

                  return (
                    <tr
                      key={product.id}
                      className="border-t hover:bg-[#FFF8E7]/50 transition"
                    >
                      {/* Image */}
                      <td className="p-4">
                        <img
                          src={getImage(product)}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "/images/placeholder.jpg";
                          }}
                        />
                      </td>

                      {/* Name */}
                      <td className="p-4 font-semibold text-[#7B1E2B]">
                        {product.name}
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        {getCategoryName(product)}
                      </td>

                      {/* Price */}
                      <td className="p-4">
                        ₹
                        {getPrice(product).toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      {/* Stock */}
                      <td className="p-4">
                        {getStock(product)}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        {active ? (
                          <span className="text-green-600 font-semibold">
                            Active
                          </span>
                        ) : (
                          <span className="text-red-600 font-semibold">
                            Inactive
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/products/${product.id}`}
                            className="text-gray-500 hover:text-[#7B1E2B]"
                            title="View"
                          >
                            <Eye size={18} />
                          </Link>

                          <Link
                            to={`/admin/products/edit/${product.id}`}
                            className="text-[#D4AF37] hover:text-[#7B1E2B]"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              setDeleteId(product.id)
                            }
                            className="text-red-500 hover:text-red-700"
                            title="Delete"
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {filteredProducts.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-2">
          <button
            type="button"
            disabled={safeCurrentPage === 1}
            onClick={() =>
              setCurrentPage((page) =>
                Math.max(1, page - 1)
              )
            }
            className="px-4 py-2 rounded-lg border disabled:opacity-40"
          >
            Previous
          </button>

          <span className="px-4 py-2 font-semibold text-[#7B1E2B]">
            {safeCurrentPage} / {totalPages}
          </span>

          <button
            type="button"
            disabled={safeCurrentPage === totalPages}
            onClick={() =>
              setCurrentPage((page) =>
                Math.min(totalPages, page + 1)
              )
            }
            className="px-4 py-2 rounded-lg border disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md"
            >
              <h2 className="text-xl font-bold mb-4 text-[#7B1E2B]">
                Confirm Delete
              </h2>

              <p className="text-gray-600">
                Are you sure you want to delete this
                product?
              </p>

              <div className="flex gap-4 mt-6 justify-end">
                <button
                  type="button"
                  onClick={() => setDeleteId(null)}
                  disabled={deleteLoading}
                  className="bg-gray-200 px-5 py-2 rounded-lg disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="bg-red-500 text-white px-5 py-2 rounded-lg disabled:opacity-50"
                >
                  {deleteLoading
                    ? "Deleting..."
                    : "Yes, Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Products;