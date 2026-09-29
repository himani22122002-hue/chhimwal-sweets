import logo from "../../assets/images/logo.png";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  Heart,
  ShoppingCart,
  ChevronDown,
  User,
  Package,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import SearchModal from "../search/SearchModal";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/products" },
  { name: "Categories", isDropdown: true },
  { name: "About", path: "/about" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

const CATEGORY_MAP = {
  "Baal Mithai": "baal-mithai",
  Singodi: "singodi",
  Peda: "peda",
  "Besan Laddu": "besan-laddu",
  "Milk Sweets": "milk-sweets",
  Jalebi: "jalebi",
};

const CATEGORIES = Object.keys(CATEGORY_MAP);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { totalItems } = useCart();
  const { wishlist } = useWishlist();

  // Real authentication state
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      isMenuOpen || isSearchOpen ? "hidden" : "unset";

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
        setIsProfileOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen, isSearchOpen]);

  const navLinkClass = ({ isActive }) =>
    `text-lg font-medium transition-all duration-300 py-1 border-b-2 ${
      isActive
        ? "text-[#7B1E2B] border-[#D4AF37]"
        : "text-gray-700 border-transparent hover:text-[#7B1E2B]"
    }`;

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
      setIsMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const renderUserMenu = () => {
    if (!user) {
      return (
        <NavLink
          to="/login"
          className="bg-[#7B1E2B] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#D4AF37] transition-all"
        >
          Login / Register
        </NavLink>
      );
    }

    const isAdmin = user.role === "ADMIN";

    return (
      <div className="relative">
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          className="flex items-center gap-2 text-[#7B1E2B] hover:text-[#D4AF37] transition"
        >
          <div className="h-10 w-10 rounded-full bg-[#7B1E2B] text-[#FFF8E7] flex items-center justify-center font-bold">
            {user.fullName?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <span className="font-semibold max-w-[120px] truncate">
            {user.fullName || "Account"}
          </span>

          <ChevronDown
            size={17}
            className={`transition-transform ${
              isProfileOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 top-12 w-56 bg-[#FFF8E7] rounded-xl shadow-2xl border border-[#D4AF37]/20 py-2 z-[100]">

            {/* User info */}
            <div className="px-4 py-3 border-b border-[#7B1E2B]/10">
              <p className="font-bold text-[#7B1E2B] truncate">
                {user.fullName}
              </p>

              <p className="text-xs text-gray-500 truncate">
                {user.email}
              </p>

              {isAdmin && (
                <span className="inline-block mt-1 text-xs font-bold text-[#D4AF37]">
                  ADMIN
                </span>
              )}
            </div>

            {/* Admin */}
            {isAdmin && (
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate("/admin");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-[#FDF3D5] hover:text-[#7B1E2B]"
              >
                <LayoutDashboard size={18} />
                Admin Dashboard
              </button>
            )}

            {/* Profile */}
            <button
              onClick={() => {
                setIsProfileOpen(false);
                navigate("/profile");
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-[#FDF3D5] hover:text-[#7B1E2B]"
            >
              <User size={18} />
              My Profile
            </button>

            {/* Orders */}
            <button
              onClick={() => {
                setIsProfileOpen(false);
                navigate("/profile");
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-[#FDF3D5] hover:text-[#7B1E2B]"
            >
              <Package size={18} />
              My Orders
            </button>

            <div className="border-t border-[#7B1E2B]/10 my-1" />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderDesktopActions = () => (
    <div className="hidden lg:flex items-center gap-5">
      <button
        aria-label="Search"
        onClick={() => setIsSearchOpen(true)}
        className="text-gray-700 hover:text-[#7B1E2B]"
      >
        <Search size={22} />
      </button>

      <NavLink
        to="/wishlist"
        className="relative text-gray-700 hover:text-[#7B1E2B]"
        aria-label="Wishlist"
      >
        <Heart size={22} />

        {wishlist.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
            {wishlist.length}
          </span>
        )}
      </NavLink>

      <NavLink
        to="/cart"
        className="relative text-gray-700 hover:text-[#7B1E2B]"
        aria-label="Cart"
      >
        <ShoppingCart size={22} />

        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
            {totalItems}
          </span>
        )}
      </NavLink>

      {renderUserMenu()}
    </div>
  );

  return (
    <header
      className={`sticky top-0 z-50 bg-[#FFF8E7] transition-all duration-300 ${
        isScrolled ? "shadow-md py-2" : "shadow-none py-4"
      }`}
    >
      <nav className="container mx-auto px-4 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={logo}
            alt="Chhimwal Sweets"
            className="h-16 w-auto object-contain"
          />
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) =>
            link.isDropdown ? (
              <div key={link.name} className="relative group">
                <button className="flex items-center gap-1 text-lg font-medium text-gray-700 hover:text-[#7B1E2B] transition-colors py-1">
                  Categories
                  <ChevronDown size={18} />
                </button>

                <div className="absolute top-full left-0 mt-2 w-48 bg-[#FFF8E7] rounded-xl shadow-2xl py-2 border border-[#D4AF37]/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0">
                  {CATEGORIES.map((cat) => (
                    <NavLink
                      key={cat}
                      to={`/products/${CATEGORY_MAP[cat]}`}
                      className="block px-4 py-2 text-gray-700 hover:text-[#7B1E2B] hover:bg-[#FDF3D5] transition-colors"
                    >
                      {cat}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink
                key={link.name}
                to={link.path}
                className={navLinkClass}
              >
                {link.name}
              </NavLink>
            )
          )}
        </div>

        {renderDesktopActions()}

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-[#7B1E2B]"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open Menu"
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[#FFF8E7] z-[70] transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } p-6 flex flex-col overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-8">
          <span className="font-bold text-xl text-[#7B1E2B]">
            Menu
          </span>

          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close Menu"
          >
            <X size={28} className="text-[#7B1E2B]" />
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="flex flex-col gap-4 mb-8">

          <button
            className="flex items-center gap-3 text-lg font-medium text-gray-700"
            onClick={() => {
              setIsMenuOpen(false);
              setIsSearchOpen(true);
            }}
          >
            <Search size={20} />
            Search
          </button>

          <NavLink
            to="/wishlist"
            className="flex items-center gap-3 text-lg font-medium text-gray-700"
            onClick={() => setIsMenuOpen(false)}
          >
            <Heart size={20} />
            Wishlist ({wishlist.length})
          </NavLink>

          <NavLink
            to="/cart"
            className="flex items-center gap-3 text-lg font-medium text-gray-700"
            onClick={() => setIsMenuOpen(false)}
          >
            <ShoppingCart size={20} />
            Cart ({totalItems})
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/profile"
                className="flex items-center gap-3 text-lg font-medium text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={20} />
                My Profile
              </NavLink>

              <NavLink
                to="/profile"
                className="flex items-center gap-3 text-lg font-medium text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package size={20} />
                My Orders
              </NavLink>

              {user.role === "ADMIN" && (
                <NavLink
                  to="/admin"
                  className="flex items-center gap-3 text-lg font-medium text-[#7B1E2B]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LayoutDashboard size={20} />
                  Admin Dashboard
                </NavLink>
              )}

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 text-lg font-medium text-red-600"
              >
                <LogOut size={20} />
                Logout
              </button>
            </>
          )}
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-6 border-t pt-6">

          {NAV_LINKS.map((link) =>
            link.isDropdown ? (
              <div key={link.name} className="flex flex-col gap-2">
                <span className="text-xl font-bold text-[#7B1E2B]">
                  {link.name}
                </span>

                {CATEGORIES.map((cat) => (
                  <NavLink
                    key={cat}
                    to={`/products/${CATEGORY_MAP[cat]}`}
                    className="pl-4 text-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {cat}
                  </NavLink>
                ))}
              </div>
            ) : (
              <NavLink
                key={link.name}
                to={link.path}
                className="text-xl font-medium text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            )
          )}

          {/* Login for logged-out users */}
          {!user && (
            <NavLink
              to="/login"
              className="w-full bg-[#7B1E2B] text-white py-3 rounded-full font-semibold mt-4 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Login / Register
            </NavLink>
          )}
        </div>
      </div>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </header>
  );
}