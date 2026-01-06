import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, Mail } from 'lucide-react';
import { portfolioData } from '../data';
import { useRef } from 'react';

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${portfolioData.contact.whatsappNumber}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = `mailto:${portfolioData.contact.email}`;
  };

  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute top-20 right-20 w-40 h-40 border-2 border-gray-200 rounded-3xl rotate-12"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [100, -100]) }}
        className="absolute bottom-40 left-20 w-24 h-24 bg-gray-100 rounded-full"
      />

      <div ref={ref} className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">
            {portfolioData.contact.heading}
          </h2>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Ready to create something amazing together? Let's discuss your project and bring your vision to life.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.button
              onClick={handleWhatsApp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-[#25D366] text-white font-bold text-lg rounded-xl hover:bg-[#20BA5A] transition-colors flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
            >
              <MessageCircle size={24} />
              Chat on WhatsApp
            </motion.button>

            <motion.button
              onClick={handleEmail}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 border-2 border-gray-900 text-gray-900 font-bold text-lg rounded-xl hover:bg-gray-900 hover:text-white transition-all flex items-center justify-center gap-3"
            >
              <Mail size={24} />
              Send an Email
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="border-t border-gray-200 pt-12"
          >
            <p className="text-gray-500">
              © 2026 Samir B. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
