import { motion } from "framer-motion";

const orders = [
  { id: "#CS1001", date: "2026-07-25", product: "Baal Mithai", status: "Delivered", price: "₹420" },
  { id: "#CS1002", date: "2026-07-28", product: "Singodi", status: "Processing", price: "₹250" },
];

const MyOrders = () => {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <motion.div key={order.id} initial={{ y: 20 }} animate={{ y: 0 }} className="bg-white p-6 rounded-3xl shadow-lg flex justify-between items-center">
          <div>
            <h3 className="font-bold text-[#7B1E2B]">{order.product}</h3>
            <p className="text-sm text-gray-500">{order.id} • {order.date}</p>
            <p className="font-bold text-[#D4AF37]">{order.price}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-sm ${order.status === "Delivered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
              {order.status}
            </span>
            <button className="text-[#7B1E2B] hover:underline">View Details</button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MyOrders;
