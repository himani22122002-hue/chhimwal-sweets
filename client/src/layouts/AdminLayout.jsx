import { useState } from "react";
import {
  NavLink,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Image as ImageIcon,
  Star,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const AdminSidebar = ({ mobileOpen, setMobileOpen }) => {
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

  const handleNavigation = () => {
    setMobileOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setMobileOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Admin logout failed:", error);
      navigate("/");
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close admin menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky
          top-0 left-0
          z-50
          h-screen
          w-64
          shrink-0
          bg-[#7B1E2B]
          text-white
          p-5 sm:p-6
          flex flex-col
          overflow-y-auto
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8 lg:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-[#D4AF37]">
            Chhimwal Admin
          </h2>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/admin"}
                onClick={handleNavigation}
                className={({ isActive }) =>
                  `
                    flex items-center gap-3
                    px-4 py-3
                    rounded-xl
                    transition-colors
                    text-sm sm:text-base
                    ${
                      isActive
                        ? "bg-[#D4AF37] text-[#7B1E2B] font-bold"
                        : "hover:bg-white/10"
                    }
                  `
                }
              >
                <Icon size={20} className="shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          type="button"
          onClick={handleLogout}
          className="
            flex items-center gap-3
            px-4 py-3
            text-red-300
            hover:bg-white/10
            rounded-xl
            transition
            text-sm sm:text-base
          "
        >
          <LogOut size={20} className="shrink-0" />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
};

export default function AdminLayout() {
  const { user, loading } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center px-4">
        <p className="text-[#7B1E2B] font-semibold text-center">
          Checking admin access...
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    !["ADMIN", "SUPER_ADMIN"].includes(user.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-[#FFF8E7] lg:flex">
      <AdminSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Area */}
      <div className="flex-1 min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 bg-[#FFF8E7] border-b border-[#7B1E2B]/10 px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg text-[#7B1E2B] hover:bg-[#7B1E2B]/10"
            aria-label="Open admin menu"
          >
            <Menu size={26} />
          </button>

          <div className="min-w-0">
            <p className="font-bold text-[#7B1E2B] truncate">
              Chhimwal Admin
            </p>

            <p className="text-xs text-gray-500">
              Admin Panel
            </p>
          </div>
        </header>

        {/* Page Content */}
        <main className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}