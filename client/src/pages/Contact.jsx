import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, MessageSquare, ChevronDown } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const ContactInfoCard = ({ icon: Icon, title, content, link }) => {
  const CardContent = (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 h-full"
    >
      <div className="bg-[#FFF8E7] p-3 rounded-xl text-[#D4AF37]">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="font-bold text-[#7B1E2B] mb-1">{title}</h3>
        <p className="text-gray-600 whitespace-pre-line text-sm">{content}</p>
      </div>
    </motion.div>
  );

  return link ? <a href={link} className="block">{CardContent}</a> : CardContent;
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left font-semibold text-[#7B1E2B]"
      >
        {question}
        <ChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
            <p className="pb-6 text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Contact = () => {
  const faqs = [
    { question: 'Do you deliver outside Uttarakhand?', answer: 'Yes, we ship our dry sweets and namkeens across India via reliable courier partners.' },
    { question: 'How can I place bulk orders?', answer: 'For bulk orders for weddings or events, please contact us directly via phone or email for customized pricing.' },
    { question: 'Do you offer Cash on Delivery?', answer: 'Yes, we offer Cash on Delivery for most locations within Uttarakhand.' },
    { question: 'How long do sweets stay fresh?', answer: 'Our milk-based sweets are best consumed within 3-5 days, while our dry items last for up to 2-3 weeks.' },
    { question: 'Can I customize gift boxes?', answer: 'Absolutely! We offer curated gift boxes for festivals and corporate gifting. Please reach out to discuss your requirements.' }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#FFF8E7] min-h-screen py-12 relative">
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917668179315"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <FaWhatsapp size={28} />
      </a>

      {/* Hero */}
      <section className="text-center mb-16 px-4">
        <h1 className="text-5xl font-extrabold text-[#7B1E2B] mb-6">Contact Us</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">We'd love to hear from you. Reach out for orders, inquiries, or feedback.</p>
      </section>

      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-8">
        {/* Info & Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid sm:grid-cols-2 gap-4">
            <ContactInfoCard icon={MapPin} title="Address" content={`Chhimwal Sweets
GHQ4+99M, NH 109
Suyalbari, Chaphi
Uttarakhand 263135`} />
            <ContactInfoCard icon={Phone} title="Phone" content="+91 7668179315" link="tel:+917668179315" />
            <ContactInfoCard icon={Mail} title="Email" content="info@chhimwalsweets.com" link="mailto:info@chhimwalsweets.com" />
            <ContactInfoCard icon={Clock} title="Business Hours" content={`Monday – Sunday
8:00 AM – 8:00 PM`} />
          </div>

          <form className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-[#7B1E2B] mb-6">Send us a Message</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" className="w-full p-3 rounded-lg border border-gray-200" required />
              <input type="tel" placeholder="Mobile Number" className="w-full p-3 rounded-lg border border-gray-200" required />
              <input type="email" placeholder="Email Address" className="w-full p-3 rounded-lg border border-gray-200 sm:col-span-2" required />
              <input type="text" placeholder="Subject" className="w-full p-3 rounded-lg border border-gray-200 sm:col-span-2" />
              <textarea placeholder="Message" rows="4" className="w-full p-3 rounded-lg border border-gray-200 sm:col-span-2" required />
            </div>
            <div className="flex gap-4 mt-6">
              <button type="submit" className="bg-[#7B1E2B] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#5a1620]">Send Message</button>
              <button type="reset" className="bg-gray-100 text-[#7B1E2B] px-8 py-3 rounded-lg font-bold hover:bg-gray-200">Reset</button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-[#7B1E2B] text-white p-8 rounded-3xl text-center">
            <MessageSquare className="mx-auto mb-4" size={40} />
            <h3 className="text-xl font-bold mb-2">Chat with us on WhatsApp</h3>
            <a href="https://wa.me/917668179315" target="_blank" rel="noreferrer" className="inline-block bg-[#D4AF37] text-white px-6 py-2 rounded-full font-bold mt-4">Start Chat</a>
          </motion.div>

          <div className="bg-white p-6 rounded-3xl shadow-sm">
            <h3 className="font-bold text-[#7B1E2B] mb-4">Find Us</h3>
            <div className="h-48 rounded-xl mb-4 overflow-hidden">
                <iframe 
                    title="Chhimwal Sweets Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3448.3370604230626!2d79.5298877!3d29.4190875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a0937a505e6083%3A0x62955f1067e4526d!2sChhimwal%20Sweets!5e0!3m2!1sen!2sin!4v1722067756811!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <a href="https://www.google.com/maps/dir/?api=1&destination=Chhimwal+Sweets+GHQ4+99M+NH+109+Suyalbari+Chaphi+Uttarakhand+263135" target="_blank" rel="noreferrer" className="block w-full text-center bg-[#FFF8E7] text-[#7B1E2B] py-2 rounded-lg font-semibold hover:bg-[#FDF3D5]">Get Directions</a>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-[#7B1E2B] text-center mb-12">Frequently Asked Questions</h2>
        {faqs.map((faq, i) => <FAQItem key={i} {...faq} />)}
      </section>
      
      {/* Social Media */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center text-[#7B1E2B] mb-8">Follow Us</h2>
        <div className="flex justify-center gap-8 text-4xl">
          <a href="#" className="text-[#7B1E2B] hover:text-[#D4AF37] transition"><FaFacebook /></a>
          <a href="#" className="text-[#7B1E2B] hover:text-[#D4AF37] transition"><FaInstagram /></a>
          <a href="#" className="text-[#7B1E2B] hover:text-[#D4AF37] transition"><FaYoutube /></a>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#D4AF37] text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-8">Let's Make Every Celebration Sweeter</h2>
        <div className="flex gap-4 justify-center">
          <Link to="/products" className="bg-[#7B1E2B] text-white px-8 py-3 rounded-full font-bold hover:bg-[#5a1620]">Shop Now</Link>
          <a href="tel:+917668179315" className="bg-white text-[#7B1E2B] px-8 py-3 rounded-full font-bold hover:bg-gray-100">Call Us</a>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
