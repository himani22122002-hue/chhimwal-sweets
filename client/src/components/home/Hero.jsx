import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import heroBanner from "../../assets/images/hero-banner.png";

export const Hero = () => {
  const features = [
    {
      title: "Fresh Ingredients",
      desc: "Sourced daily for premium quality",
      icon: "🌿",
    },
    {
      title: "Homemade Taste",
      desc: "Authentic recipes, traditional methods",
      icon: "🥣",
    },
    {
      title: "Fast Delivery",
      desc: "Delivered fresh to your doorstep",
      icon: "🚚",
    },
  ];

  return (
    <section className="bg-[#FFF8E7]">
      {/* Hero */}
      <div className="container mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 items-center gap-12">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block border border-[#D4AF37] text-[#7B1E2B] px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
              Since 1998
            </span>

            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-[#7B1E2B]">
              Authentic{" "}
              <span className="text-[#D4AF37]">
                Kumaoni
              </span>{" "}
              Sweets
            </h1>

            <p className="mt-6 text-lg text-gray-700 leading-8 max-w-xl">
              Experience the rich taste of handmade Baal Mithai,
              Singodi, Peda, Jalebi and other traditional sweets
              prepared with premium ingredients.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#7B1E2B] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-[#5d1723]"
                >
                  Shop Now →
                </motion.button>
              </Link>

              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-[#7B1E2B] text-[#7B1E2B] px-8 py-4 rounded-xl font-semibold hover:bg-[#7B1E2B] hover:text-white transition"
                >
                  Explore Categories
                </motion.button>
              </Link>
            </div>
          </motion.div>
{/* Right Hero Background */}
          <motion.div
  initial={{ opacity: 0, x: 60 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="relative flex justify-end items-center"
>
  <div className="absolute w-[550px] h-[550px] rounded-full bg-[#F8E8B8] blur-[120px] opacity-50"></div>

  <motion.img
    src={heroBanner}
    alt="Authentic Kumaoni Sweets"
    draggable={false}
    initial={{ y: 0 }}
    animate={{ y: [0, -8, 0] }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="relative z-10 w-full max-w-[700px] lg:max-w-[760px] object-contain scale-110 select-none drop-shadow-[0_20px_45px_rgba(123,30,43,0.15)]"
  />
</motion.div>

        </div>
      </div>

      {/* Feature Cards */}
      <div className="container mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-[#F0E2C2]"
            >
              <div className="w-16 h-16 rounded-full bg-[#7B1E2B] text-white flex items-center justify-center text-3xl mb-5">
                {feature.icon}
              </div>

              <h3 className="text-2xl font-bold text-[#7B1E2B]">
                {feature.title}
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                {feature.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};