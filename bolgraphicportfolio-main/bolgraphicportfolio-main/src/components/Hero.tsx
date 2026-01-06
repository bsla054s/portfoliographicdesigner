import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, ArrowDown } from 'lucide-react';
import { portfolioData } from '../data';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${portfolioData.hero.whatsappNumber}`, '_blank');
  };

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <motion.div
        style={{ y, opacity: 0.3 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-20 left-10 w-96 h-96 bg-gray-100 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-100 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '20%']) }}
        className="absolute inset-0 pointer-events-none"
      >
        <svg className="absolute top-1/4 right-1/4 w-32 h-32 text-gray-200" viewBox="0 0 100 100" fill="none">
          <rect x="10" y="10" width="80" height="80" stroke="currentColor" strokeWidth="0.5" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.5" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </motion.div>

      <motion.div
        style={{ scale, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-6 text-center pb-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 tracking-tight">
            Hi, I'm {portfolioData.hero.name}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-900 mb-3 font-light">
            {portfolioData.hero.headline}
          </p>
          <p className="text-lg text-gray-600 mb-12">
            {portfolioData.hero.location}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#work" className="group">
            <button className="px-8 py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all hover:scale-105 active:scale-95">
              View My Work
            </button>
          </a>
          <button
            onClick={handleWhatsApp}
            className="px-8 py-4 border-2 border-gray-900 text-gray-900 font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
          >
            <MessageCircle size={20} />
            WhatsApp Me
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="text-gray-400" size={32} />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '80%']) }}
        className="absolute bottom-20 left-20 w-8 h-8 border-2 border-gray-300 rotate-45"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '90%']) }}
        className="absolute top-40 right-32 w-4 h-4 bg-gray-300 rounded-full"
      />
    </div>
  );
}
