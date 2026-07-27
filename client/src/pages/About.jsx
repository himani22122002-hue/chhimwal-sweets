import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Award, Leaf, ShieldCheck, Heart, ChefHat, Flame, Truck, Users, Calendar, Utensils } from 'lucide-react';
import aboutImage from "../assets/images/About.png";

const Counter = ({ from, to }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, to, { duration: 2 });
    return () => controls.stop();
  }, [count, to]);

  return <motion.span>{rounded}</motion.span>;
};

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stats = [
    { label: 'Years of Experience', value: 25, icon: Calendar, suffix: '+' },
    { label: 'Happy Customers', value: 1000, icon: Users, suffix: '+' },
    { label: 'Traditional Recipes', value: 10, icon: Utensils, suffix: '+' },
    { label: 'Daily Orders', value: 50, icon: Truck, suffix: '+' },
  ];

  const processSteps = [
    { title: 'Fresh Ingredients', icon: Leaf },
    { title: 'Preparation', icon: ChefHat },
    { title: 'Traditional Cooking', icon: Flame },
    { title: 'Fresh Delivery', icon: Truck },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-[#FFF8E7] min-h-screen text-[#7B1E2B]"
    >
      {/* Hero Banner */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7B1E2B]/80 to-transparent z-10" />
        <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=2000" alt="Sweets" className="absolute inset-0 w-full h-full object-cover" />
        <motion.div variants={itemVariants} className="relative z-20 text-white max-w-3xl px-4">
          <h1 className="text-6xl font-extrabold mb-4">Our Story</h1>
          <p className="text-xl">Embark on a journey of authentic Kumaoni sweetness, crafted with heritage and love since 1998.</p>
        </motion.div>
      </section>

      {/* Brand Story */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Since 1998: A Heritage of Taste</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              At Chhimwal Sweets, we believe that sweets are not just food—they are emotions, celebrations, and traditions. Established in 1998, we have been dedicated to bringing the authentic, rich flavors of the Kumaon region to your doorstep.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Every sweet we create is handmade with passion, following family recipes passed down through generations. Our commitment to quality and tradition ensures that each bite takes you on a nostalgic journey to the hills.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={aboutImage}
              alt="Handmade Sweets"
              className="w-full h-[450px] object-cover rounded-3xl"
            />
          </div>
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Us</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: 'Premium Ingredients', icon: Award },
              { title: 'Handmade Daily', icon: ChefHat },
              { title: 'Authentic Recipes', icon: Flame },
              { title: 'Hygienic Preparation', icon: ShieldCheck },
            ].map((feature, i) => (
              <motion.div variants={itemVariants} key={i} className="text-center p-6 bg-[#FFF8E7] rounded-3xl shadow-sm border border-[#D4AF37]/20 hover:shadow-lg transition">
                <feature.icon className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process & Stats */}
      <section className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-20">
        <div>
          <h2 className="text-4xl font-bold mb-12">The Sweet Making Process</h2>
          <div className="grid grid-cols-2 gap-6">
            {processSteps.map((step, i) => (
              <motion.div variants={itemVariants} key={i} className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm">
                <step.icon className="w-10 h-10 text-[#D4AF37] mb-3" />
                <span className="font-semibold">{step.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-4xl font-bold mb-6">Our Impact</h2>
          <p className="text-gray-600 mb-12 italic">Proudly serving authentic Kumaoni sweets with quality and tradition since 1998.</p>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                variants={itemVariants} 
                key={i} 
                className="p-6 bg-[#7B1E2B] text-white rounded-2xl shadow-lg cursor-pointer"
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                transition={{ duration: 0.3 }}
              >
                <stat.icon className="w-8 h-8 text-[#D4AF37] mb-3" />
                <div className="text-3xl font-bold mb-1">
                  <Counter from={0} to={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-[#D4AF37] text-white">
        <motion.div variants={itemVariants} className="max-w-2xl mx-auto px-4">
          <h2 className="text-5xl font-bold mb-8">Experience the Taste of Tradition</h2>
          <div className="flex gap-4 justify-center">
            <Link to="/products" className="bg-[#7B1E2B] text-white px-8 py-4 rounded-full font-bold hover:bg-[#5a1620] transition shadow-lg">Shop Now</Link>
            <Link to="/contact" className="bg-white text-[#7B1E2B] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">Contact Us</Link>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default About;
