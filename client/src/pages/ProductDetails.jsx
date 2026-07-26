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
    <div className="min-h-screen bg-[#FFF8E7] py-16 px-4 sm:px-6 lg:px-8 font-serif">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm font-medium text-[#7B1E2B]/70 mb-10">
          <Link to="/" className="hover:text-[#7B1E2B]">Home</Link> / 
          <Link to="/products" className="hover:text-[#7B1E2B]"> Shop</Link> / 
          <span className="text-[#7B1E2B]"> {product.name}</span>
        </nav>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-start">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <img src={product.image} alt={product.name} className="w-full h-auto rounded-3xl shadow-2xl border-4 border-white" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-6xl font-bold text-[#7B1E2B] mb-6 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-[#D4AF37] fill-current' : 'text-gray-300'}`} />)}
              </div>
              <span className="text-lg font-semibold text-gray-700">{product.rating} / 5.0</span>
            </div>
            <p className="text-4xl font-light text-[#7B1E2B] mb-8">₹{selectedVariant.price}</p>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed">{product.description}</p>
            
            {/* Weight/Variant Selector */}
            <div className="mb-10">
              <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Choose Size</p>
              <div className="flex flex-wrap gap-4">
                {product.variants.map((v) => (
                  <button
                    key={v.weight}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-8 py-3 rounded-xl border-2 font-semibold ${
                      selectedVariant.weight === v.weight
                        ? 'border-[#7B1E2B] bg-[#7B1E2B] text-white shadow-lg'
                        : 'border-[#7B1E2B] text-[#7B1E2B] hover:bg-[#FDF3D5]'
                    } transition-all`}
                  >
                    {v.weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
              <div className="flex items-center border-2 border-[#7B1E2B] rounded-xl p-1">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-[#7B1E2B]"><Minus size={22}/></button>
                <span className="px-6 font-bold text-xl w-16 text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-[#7B1E2B]"><Plus size={22}/></button>
              </div>
              <button className="flex-1 flex items-center justify-center gap-3 bg-[#7B1E2B] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#5a1620] transition-colors shadow-lg">
                <ShoppingCart size={24}/> Add to Cart
              </button>
              <button className="flex-1 flex items-center justify-center gap-3 bg-[#D4AF37] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-[#b8952b] transition-colors shadow-lg">
                <Zap size={24}/> Buy Now
              </button>
            </div>
            
            {/* Highlights */}
            <div className="grid grid-cols-3 gap-4 border-t pt-8 border-[#7B1E2B]/20">
              <div className="flex flex-col items-center text-center gap-2"><Award className="text-[#D4AF37]"/> <span className="text-sm font-semibold">100% Authentic</span></div>
              <div className="flex flex-col items-center text-center gap-2"><Truck className="text-[#D4AF37]"/> <span className="text-sm font-semibold">Fast Delivery</span></div>
              <div className="flex flex-col items-center text-center gap-2"><Package className="text-[#D4AF37]"/> <span className="text-sm font-semibold">Secure Packing</span></div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-[#7B1E2B]/20 pt-16">
            <h2 className="text-4xl font-bold text-[#7B1E2B] mb-12 text-center">You May Also Like</h2>
            <motion.div 
              className="flex gap-8 overflow-x-auto pb-8 snap-x scrollbar-hide"
              whileTap={{ cursor: "grabbing" }}
            >
              {relatedProducts.map((p) => (
                <div key={p.id} className="min-w-[300px] snap-center">
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
