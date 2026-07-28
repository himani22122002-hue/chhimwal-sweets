import { motion } from "framer-motion";

const StatCard = ({ title, value, color }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-3xl shadow-lg border-l-4" style={{ borderColor: color }}>
    <p className="text-gray-500 mb-2">{title}</p>
    <p className="text-3xl font-bold text-[#7B1E2B]">{value}</p>
  </motion.div>
);

const AdminDashboard = () => {
  const stats = [
    { title: "Total Products", value: "124", color: "#D4AF37" },
    { title: "Total Orders", value: "856", color: "#7B1E2B" },
    { title: "Revenue", value: "₹4.5L", color: "#22c55e" },
    { title: "Pending Orders", value: "12", color: "#ef4444" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#7B1E2B]">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>
    </div>
  );
};

export default AdminDashboard;
