import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ProductService } from "../../services/ProductService";

const categories = ["Sweets", "Namkeen", "Gift Boxes"];

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    category: "Sweets",
    description: "",
    imageUrl: "",
    price: "",
    stock: "",
    featured: false,
    active: true,
  });

  useEffect(() => {
    if (id) {
      const allProducts = ProductService.getProducts();
      const p = allProducts.find((item) => item.id === id);
      if (p) setProduct(p);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ProductService.saveProduct({ ...product, id: id || undefined });
    navigate("/admin/products");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-[#FFF8E7] rounded-3xl"
    >
      <h1 className="text-2xl font-bold text-[#7B1E2B] mb-6">
        {id ? "Edit Product" : "Add Product"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-xl border border-[#D4AF37]"
        />
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border border-[#D4AF37]"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border border-[#D4AF37]"
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          value={product.imageUrl}
          onChange={handleChange}
          className="w-full p-3 rounded-xl border border-[#D4AF37]"
        />
        <div className="flex gap-4">
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
            className="flex-1 p-3 rounded-xl border border-[#D4AF37]"
          />
          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={product.stock}
            onChange={handleChange}
            required
            className="flex-1 p-3 rounded-xl border border-[#D4AF37]"
          />
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input name="featured" type="checkbox" checked={product.featured} onChange={handleChange} />
            Featured
          </label>
          <label className="flex items-center gap-2">
            <input name="active" type="checkbox" checked={product.active} onChange={handleChange} />
            Active
          </label>
        </div>
        <button
          type="submit"
          className="bg-[#7B1E2B] text-white px-6 py-3 rounded-xl hover:bg-[#7B1E2B]/90"
        >
          {id ? "Update Product" : "Save Product"}
        </button>
      </form>
    </motion.div>
  );
};

export default ProductForm;
