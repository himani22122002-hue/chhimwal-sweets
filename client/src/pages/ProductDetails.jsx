import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Minus, Plus, ShoppingCart, Zap } from 'lucide-react';
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
    <div className="min-h-screen bg-[#FFF8E7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm font-medium text-[#7B1E2B]/70 mb-8">
          <Link to="/" className="hover:text-[#7B1E2B]">Home</Link> / 
          <Link to="/products" className="hover:text-[#7B1E2B]"> Products</Link> / 
          <span className="text-[#7B1E2B]"> {product.name}</span>
        </nav>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <img src={product.image} alt={product.name} className="w-full h-auto rounded-3xl shadow-2xl" />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl font-bold text-[#7B1E2B] mb-4">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-lg font-semibold text-gray-700">{product.rating}</span>
            </div>
            <p className="text-3xl font-bold text-[#D4AF37] mb-6">₹{selectedVariant.price}</p>
            <p className="text-gray-600 text-lg mb-6">{product.description}</p>
            
            {/* Weight Selector */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-gray-700 mb-3">Select Size/Weight:</p>
              <div className="flex gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v.weight}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-6 py-2 rounded-full border ${
                      selectedVariant.weight === v.weight
                        ? 'border-[#7B1E2B] bg-[#7B1E2B] text-white'
                        : 'border-[#7B1E2B] text-[#7B1E2B] hover:bg-[#FDF3D5]'
                    } transition-all`}
                  >
                    {v.weight}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-[#7B1E2B] rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-[#7B1E2B]"><Minus size={20}/></button>
                <span className="px-4 font-bold text-lg">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-[#7B1E2B]"><Plus size={20}/></button>
              </div>
              <button className="flex items-center gap-2 bg-[#7B1E2B] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#5a1620]">
                <ShoppingCart size={20}/> Add to Cart
              </button>
              <button className="flex items-center gap-2 bg-[#D4AF37] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#b8952b]">
                <Zap size={20}/> Buy Now
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-[#7B1E2B] mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
