import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const SearchResult = ({ item, onClick }) => {
  return (
    <Link 
      to={`/products/${item.id}`} 
      onClick={onClick}
      className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#7B1E2B]/5 transition"
    >
      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
      <div className="flex-1">
        <h4 className="font-bold text-[#7B1E2B]">{item.name}</h4>
        <p className="text-sm text-[#7B1E2B]/70">{item.category}</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-[#D4AF37]">₹{item.variants[0].price}</p>
        <div className="flex items-center text-xs text-gray-500">
          <Star size={12} className="text-yellow-400 fill-current mr-1" />
          {item.rating}
        </div>
      </div>
    </Link>
  );
};

export default SearchResult;
