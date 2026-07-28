import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import { products } from "../../data/products";

const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("chhimwal-recent-searches");
    if (saved) setRecentSearches(JSON.parse(saved));
  }, []);

  const handleSearch = (q) => {
    setQuery(q);
    if (q.trim() && !recentSearches.includes(q)) {
      const updated = [q, ...recentSearches].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("chhimwal-recent-searches", JSON.stringify(updated));
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
  );

  const trending = ["Baal Mithai", "Singodi", "Jalebi", "Peda"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="bg-[#FFF8E7] rounded-3xl p-6 max-w-2xl w-full mx-auto mt-20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#7B1E2B]">Search</h2>
              <button onClick={onClose} className="text-[#7B1E2B]"><X /></button>
            </div>
            <SearchInput value={query} onChange={handleSearch} />

            <div className="mt-6 h-[400px] overflow-y-auto">
              {query ? (
                filteredProducts.length > 0 ? (
                  filteredProducts.map((p) => <SearchResult key={p.id} item={p} onClick={onClose} />)
                ) : (
                  <div className="text-center py-10">
                    <p className="text-gray-500 mb-4">No sweets found.</p>
                    <button onClick={onClose} className="bg-[#7B1E2B] text-white px-6 py-2 rounded-full">Continue Shopping</button>
                  </div>
                )
              ) : (
                <>
                  {recentSearches.length > 0 && (
                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-[#7B1E2B]">Recent Searches</h3>
                        <button onClick={() => { setRecentSearches([]); localStorage.removeItem("chhimwal-recent-searches"); }} className="text-xs text-[#7B1E2B]/60 hover:underline">Clear</button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((s) => <button key={s} onClick={() => setQuery(s)} className="bg-white px-3 py-1 rounded-full text-sm text-[#7B1E2B] border border-[#7B1E2B]/20">{s}</button>)}
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-[#7B1E2B] mb-3">Trending Searches</h3>
                    <div className="flex flex-wrap gap-2">
                      {trending.map((t) => <button key={t} onClick={() => setQuery(t)} className="bg-[#D4AF37]/10 px-3 py-1 rounded-full text-sm text-[#7B1E2B] border border-[#D4AF37]/20">{t}</button>)}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
