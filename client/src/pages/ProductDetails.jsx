import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Minus, Plus, ShoppingCart, Zap, Package, Truck, Award } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/products/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF8E7]">
        <h2 className="text-2xl font-bold text-[#7B1E2B]">Product not found</h2>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FFF8E7] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-xs font-semibold text-[#7B1E2B]/60 mb-8 uppercase tracking-widest">
          <Link to="/" className="hover:text-[#7B1E2B]">Home</Link> / 
          <Link to="/products" className="hover:text-[#7B1E2B]"> Shop</Link> / 
          <span className="text-[#7B1E2B]"> {product.name}</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full aspect-square object-cover rounded-3xl shadow-xl" 
            />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
            <h1 className="text-5xl font-extrabold text-[#7B1E2B] leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-[#D4AF37] fill-current' : 'text-gray-300'}`} />)}
              </div>
              <span className="text-sm font-bold text-[#7B1E2B]">{product.rating} / 5.0 Rating</span>
            </div>

            <p className="text-4xl font-bold text-[#7B1E2B]">₹{selectedVariant.price}</p>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
            
            {/* Weight/Variant Selector */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Select Size</p>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v.weight}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-6 py-2 rounded-lg border text-sm font-semibold ${
                      selectedVariant.weight === v.weight
                        ? 'border-[#7B1E2B] bg-[#7B1E2B] text-white'
                        : 'border-[#D4AF37]/50 text-[#7B1E2B] hover:bg-[#D4AF37]/10'
                    } transition-all`}
                  >
                    {v.weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center border border-[#7B1E2B] rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-[#7B1E2B] hover:bg-[#D4AF37]/10"><Minus size={18}/></button>
                <span className="px-4 font-bold text-lg w-12 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-[#7B1E2B] hover:bg-[#D4AF37]/10"><Plus size={18}/></button>
              </div>
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#7B1E2B] text-white py-3 rounded-lg font-bold hover:bg-[#5a1620] transition-colors">
                <ShoppingCart size={20}/> Add to Cart
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#D4AF37] text-white py-3 rounded-lg font-bold hover:bg-[#b8952b] transition-colors">
                <Zap size={20}/> Buy Now
              </button>
            </div>
            
            {/* Highlights */}
            <div className="grid grid-cols-3 gap-4 border-t border-[#7B1E2B]/10 pt-6 mt-6">
              <div className="flex flex-col items-center gap-2 text-[#7B1E2B]"><Award size={24}/> <span className="text-xs font-bold uppercase">Authentic</span></div>
              <div className="flex flex-col items-center gap-2 text-[#7B1E2B]"><Truck size={24}/> <span className="text-xs font-bold uppercase">Fast Delivery</span></div>
              <div className="flex flex-col items-center gap-2 text-[#7B1E2B]"><Package size={24}/> <span className="text-xs font-bold uppercase">Safe Pack</span></div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-[#7B1E2B]/10 pt-16">
            <h2 className="text-3xl font-extrabold text-[#7B1E2B] mb-10 text-center">You May Also Like</h2>
            <motion.div 
              className="flex gap-6 overflow-x-auto pb-6 snap-x scrollbar-hide"
              whileTap={{ cursor: "grabbing" }}
            >
              {relatedProducts.map((p) => (
                <div key={p.id} className="min-w-[280px] snap-center">
                  <ProductCard product={p} />
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
