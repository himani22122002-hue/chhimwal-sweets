import { Search } from "lucide-react";

const SearchInput = ({ value, onChange, placeholder = "Search sweets..." }) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-4 top-3.5 text-[#7B1E2B]/50" size={20} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 rounded-full border border-[#7B1E2B]/20 focus:outline-none focus:border-[#7B1E2B] transition"
      />
    </div>
  );
};

export default SearchInput;
