import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Image as ImageIcon, Star, Users, Settings, LogOut } from "lucide-react";

const AdminSidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Products", path: "/admin/products", icon: Package },
    { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
    { name: "Gallery", path: "/admin/gallery", icon: ImageIcon },
    { name: "Reviews", path: "/admin/reviews", icon: Star },
    { name: "Customers", path: "/admin/customers", icon: Users },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="w-64 bg-[#7B1E2B] text-white min-h-screen p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-10 text-[#D4AF37]">Chhimwal Admin</h2>
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive ? "bg-[#D4AF37] text-[#7B1E2B] font-bold" : "hover:bg-[#7B1E2B]/50"
              }`
            }
          >
            <item.icon size={20} />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <button className="flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-[#7B1E2B]/50 rounded-xl">
        <LogOut size={20} /> Logout
      </button>
    </div>
  );
};

export default function AdminLayout() {
  return (
    <div className="flex bg-[#FFF8E7] min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
