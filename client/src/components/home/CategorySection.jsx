import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  { id: 'baal-mithai', name: 'Baal Mithai', image: '/images/baal-mithai.jpg' },
  { id: 'singodi', name: 'Singodi', image: '/images/singodi.jpg' },
  { id: 'peda', name: 'Peda', image: '/images/peda.jpg' },
  { id: 'jalebi', name: 'Jalebi', image: '/images/jalebi.jpg' },
  { id: 'besan-laddu', name: 'Besan Laddu', image: '/images/besan-laddu.jpg' },
  { id: 'milk-sweets', name: 'Milk Sweets', image: '/images/milk-sweets.jpg' },
];

const CategorySection = () => {
  return (
    <section className="py-16 px-4 bg-[#FFF8E7]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#7B1E2B] mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-700">Discover our handcrafted traditional Kumaoni sweets.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-transparent hover:border-[#D4AF37] transition-colors duration-300"
            >
              <Link to={`/products/${category.id}`} className="block">
                <div className="h-64 bg-gray-200">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://placehold.co/400x300?text=Sweets'; }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#7B1E2B]/80 to-transparent text-white">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
