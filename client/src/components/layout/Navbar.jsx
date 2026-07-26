import logo from "../../assets/images/logo.png";
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Search, Heart, ShoppingCart, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/products' },
  { name: 'Categories', isDropdown: true },
  { name: 'About', path: '/about' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

const CATEGORY_MAP = {
  'Baal Mithai': 'baal-mithai',
  'Singodi': 'singodi',
  'Peda': 'peda',
  'Besan Laddu': 'besan-laddu',
  'Milk Sweets': 'milk-sweets',
  'Jalebi': 'jalebi'
};

const CATEGORIES = Object.keys(CATEGORY_MAP);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    const handleEsc = (e) => { if (e.key === 'Escape') setIsMenuOpen(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isMenuOpen]);

  const navLinkClass = ({ isActive }) =>
    `text-lg font-medium transition-all duration-300 py-1 border-b-2 ${
      isActive
        ? 'text-[#7B1E2B] border-[#D4AF37]'
        : 'text-gray-700 border-transparent hover:text-[#7B1E2B]'
    }`;

  const renderDesktopActions = () => (
    <div className="hidden lg:flex items-center gap-5">
      <button aria-label="Search" className="text-gray-700 hover:text-[#7B1E2B]"><Search size={22} /></button>
      <button aria-label="Wishlist" className="text-gray-700 hover:text-[#7B1E2B]"><Heart size={22} /></button>
      <NavLink to="/cart" className="relative text-gray-700 hover:text-[#7B1E2B]" aria-label="Cart">
        <ShoppingCart size={22} />
        <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">0</span>
      </NavLink>
      <button className="bg-[#7B1E2B] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#D4AF37] transition-all">
        Login / Register
      </button>
    </div>
  );

  return (
    <header className={`sticky top-0 z-50 bg-[#FFF8E7] transition-all duration-300 ${isScrolled ? 'shadow-md py-2' : 'shadow-none py-4'}`}>
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center">
  <img
    src={logo}
    alt="Chhimwal Sweets"
    className="h-16 w-auto object-contain"
  />
</NavLink>

        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            link.isDropdown ? (
              <div key={link.name} className="relative group">
                <button className="flex items-center gap-1 text-lg font-medium text-gray-700 hover:text-[#7B1E2B] transition-colors py-1">
                  Categories <ChevronDown size={18} />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-[#FFF8E7] rounded-xl shadow-2xl py-2 border border-[#D4AF37]/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0">
                  {CATEGORIES.map((cat) => (
                    <NavLink key={cat} to={`/products/${CATEGORY_MAP[cat]}`} className="block px-4 py-2 text-gray-700 hover:text-[#7B1E2B] hover:bg-[#FDF3D5] transition-colors">
                      {cat}
                    </NavLink>
                  ))}
                </div>
              </div>
            ) : (
              <NavLink key={link.name} to={link.path} className={navLinkClass}>{link.name}</NavLink>
            )
          ))}
        </div>

        {renderDesktopActions()}

        <button className="lg:hidden text-[#7B1E2B]" onClick={() => setIsMenuOpen(true)} aria-label="Open Menu">
          <Menu size={28} />
        </button>
      </nav>

      {isMenuOpen && <div className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setIsMenuOpen(false)} />}

      <div className={`fixed top-0 right-0 h-full w-72 bg-[#FFF8E7] z-[70] transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} p-6 flex flex-col`}>
        <div className="flex justify-between items-center mb-8">
          <span className="font-bold text-xl text-[#7B1E2B]">Menu</span>
          <button onClick={() => setIsMenuOpen(false)} aria-label="Close Menu"><X size={28} className="text-[#7B1E2B]" /></button>
        </div>
        <div className="flex flex-col gap-4 mb-8">
            <button className="flex items-center gap-3 text-lg font-medium text-gray-700"><Search size={20} /> Search</button>
            <button className="flex items-center gap-3 text-lg font-medium text-gray-700"><Heart size={20} /> Wishlist</button>
            <NavLink to="/cart" className="flex items-center gap-3 text-lg font-medium text-gray-700"><ShoppingCart size={20} /> Cart</NavLink>
        </div>
        <div className="flex flex-col gap-6 border-t pt-6">
          {NAV_LINKS.map((link) => (
             link.isDropdown ? (
                <div key={link.name} className="flex flex-col gap-2">
                    <span className="text-xl font-bold text-[#7B1E2B]">{link.name}</span>
                    {CATEGORIES.map(cat => <NavLink key={cat} to={`/products/${CATEGORY_MAP[cat]}`} className="pl-4 text-gray-600" onClick={() => setIsMenuOpen(false)}>{cat}</NavLink>)}
                </div>
             ) : (
                <NavLink key={link.name} to={link.path} className="text-xl font-medium text-gray-700" onClick={() => setIsMenuOpen(false)}>{link.name}</NavLink>
             )
          ))}
          <button className="w-full bg-[#7B1E2B] text-white py-3 rounded-full font-semibold mt-4">Login / Register</button>
        </div>
      </div>
    </header>
  );
}
