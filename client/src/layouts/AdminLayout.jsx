import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Image as ImageIcon,
  Star,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      name: "Gallery",
      path: "/admin/gallery",
      icon: ImageIcon,
    },
    {
      name: "Reviews",
      path: "/admin/reviews",
      icon: Star,
    },
    {
      name: "Customers",
      path: "/admin/customers",
      icon: Users,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Admin logout failed:", error);
      navigate("/");
    }
  };

  return (
    <div className="w-64 bg-[#7B1E2B] text-white min-h-screen p-6 flex flex-col">
      {/* Logo / Title */}
      <h2 className="text-2xl font-bold mb-10 text-[#D4AF37]">
        Chhimwal Admin
      </h2>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  isActive
                    ? "bg-[#D4AF37] text-[#7B1E2B] font-bold"
                    : "hover:bg-white/10"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 text-red-300 hover:bg-white/10 rounded-xl transition"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default function AdminLayout() {
  const { user, loading } = useAuth();

  // Check authentication while user data is loading
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center">
        <p className="text-[#7B1E2B] font-semibold">
          Checking admin access...
        </p>
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Only ADMIN and SUPER_ADMIN can access admin dashboard
  if (!["ADMIN", "SUPER_ADMIN"].includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Admin / Super Admin
  return (
    <div className="flex bg-[#FFF8E7] min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}