import { motion } from "framer-motion";
import heroImage from "../../assets/hero.png";

export const Hero = () => {
  return (
    <div className="bg-[#FFF8E7] text-[#7B1E2B] font-sans">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 space-y-6"
        >
          <span className="inline-block bg-[#D4AF37]/20 text-[#7B1E2B] px-4 py-1 rounded-full text-sm font-semibold tracking-wider uppercase">
            Since 1998
          </span>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Authentic <span className="text-[#D4AF37]">Kumaoni</span> Sweets
          </h1>
          <p className="text-lg text-[#7B1E2B]/80 max-w-lg">
            Experience the rich taste of handmade Baal Mithai, Singodi, Peda, Jalebi and other traditional sweets prepared with premium ingredients.
          </p>
          <div className="flex gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#7B1E2B] text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-[#5e1721] transition-colors"
            >
              Shop Now
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-[#7B1E2B] text-[#7B1E2B] px-8 py-3 rounded-lg font-semibold hover:bg-[#7B1E2B]/10 transition-colors"
            >
              Explore Categories
            </motion.button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 mt-12 md:mt-0 relative"
        >
          <div className="absolute inset-0 bg-[#D4AF37]/30 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
          <img 
            src={heroImage} 
            alt="Authentic Kumaoni Sweets" 
            className="relative z-10 w-full max-w-lg mx-auto rounded-3xl shadow-2xl"
          />
        </motion.div>
      </div>

      {/* Feature Cards */}
      <div className="container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Fresh Ingredients", desc: "Sourced daily for premium quality" },
            { title: "Homemade Taste", desc: "Authentic recipes, traditional methods" },
            { title: "Fast Delivery", desc: "Delivered fresh to your doorstep" },
          ].map((feature, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-[#7B1E2B]/10"
            >
              <div className="text-[#D4AF37] text-3xl mb-4">✓</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-[#7B1E2B]/70">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
