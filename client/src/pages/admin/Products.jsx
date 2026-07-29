import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Edit, Trash, Eye, Plus, Search, Filter } from "lucide-react";
import { ProductService } from "../../services/ProductService";

const Products = () => {
  const [products, setProducts] = useState(ProductService.getProducts());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const itemsPerPage = 10;

  const handleDelete = () => {
    ProductService.deleteProduct(deleteId);
    setProducts(ProductService.getProducts());
    setDeleteId(null);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterActive === "All" || (filterActive === "Active" ? p.active : !p.active);
      return matchesSearch && matchesFilter;
    });
  }, [products, searchTerm, filterActive]);

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#7B1E2B]">Products</h1>
        <Link to="/admin/products/add" className="flex items-center gap-2 bg-[#7B1E2B] text-white px-6 py-2 rounded-xl hover:bg-[#7B1E2B]/90"><Plus size={20} /> Add Product</Link>
      </div>

      <div className="flex gap-4 bg-white p-4 rounded-2xl shadow">
        <input placeholder="Search products..." className="flex-1 p-2 border rounded-lg" onChange={(e) => setSearchTerm(e.target.value)} />
        <select onChange={(e) => setFilterActive(e.target.value)} className="p-2 border rounded-lg">
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
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
            {paginatedProducts.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-4"><img src={p.imageUrl} alt={p.name} className="w-12 h-12 rounded-lg object-cover" /></td>
                <td className="p-4 font-semibold text-[#7B1E2B]">{p.name}</td>
                <td className="p-4">{p.category}</td>
                <td className="p-4">₹{p.price}</td>
                <td className="p-4">{p.stock}</td>
                <td className="p-4">{p.active ? <span className="text-green-600">Active</span> : <span className="text-red-600">Inactive</span>}</td>
                <td className="p-4 flex gap-2">
                  <Link to={`/admin/products/edit/${p.id}`} className="text-[#D4AF37]"><Edit size={18} /></Link>
                  <button onClick={() => setDeleteId(p.id)} className="text-red-500"><Trash size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {deleteId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
              <p>Are you sure you want to delete this product?</p>
              <div className="flex gap-4 mt-6">
                <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded-lg">Yes, Delete</button>
                <button onClick={() => setDeleteId(null)} className="bg-gray-200 px-4 py-2 rounded-lg">Cancel</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Products;
