import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Edit, Trash, Eye } from "lucide-react";
import { products } from "../../data/products";

const Products = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#7B1E2B]">Products</h1>
        <Link to="/admin/products/add" className="bg-[#7B1E2B] text-white px-6 py-2 rounded-xl hover:bg-[#7B1E2B]/90">+ Add Product</Link>
      </div>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-sm">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-4"><img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover" /></td>
                <td className="p-4 font-semibold text-[#7B1E2B]">{p.name}</td>
                <td className="p-4">{p.category}</td>
                <td className="p-4">₹{p.variants[0].price}</td>
                <td className="p-4 flex gap-2">
                  <button className="text-blue-500"><Eye size={18} /></button>
                  <button className="text-[#D4AF37]"><Edit size={18} /></button>
                  <button className="text-red-500"><Trash size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
