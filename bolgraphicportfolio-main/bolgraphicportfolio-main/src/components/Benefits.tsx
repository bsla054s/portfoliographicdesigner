import { motion, useInView } from 'framer-motion';
import { Zap, MessageCircle, Sparkles, Eye, LucideIcon } from 'lucide-react';
import { portfolioData } from '../data';
import { useRef } from 'react';

const iconMap: Record<string, LucideIcon> = {
  Zap,
  MessageCircle,
  Sparkles,
  Eye,
};

export default function Benefits() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="py-32 px-6 bg-gray-50 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Why Work With Me
          </h2>
          <p className="text-xl text-gray-600">
            What sets me apart
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {portfolioData.benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className="text-center group"
              >
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 bg-gray-900 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="text-white" size={32} />
                </motion.div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {benefit.title}
                </h3>

                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
