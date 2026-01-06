import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { portfolioData } from '../data';
import { useRef } from 'react';

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section className="py-32 px-6 bg-white relative overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute top-1/4 left-10 w-32 h-32 border border-gray-200 rounded-full"
      />

      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About Me
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {portfolioData.about.description}
            </p>
            <p className="text-lg text-gray-500 leading-relaxed">
              Every project is an opportunity to create something meaningful and lasting.
              I believe great design is invisible — it just works.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-3 gap-6">
              {portfolioData.about.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 2,
                    transition: { duration: 0.2 }
                  }}
                  className="bg-gray-900 text-white rounded-2xl p-6 text-center hover:shadow-2xl transition-shadow"
                >
                  <div className="text-4xl font-bold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm opacity-80">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 bg-gradient-to-br from-gray-900 to-gray-700 text-white rounded-2xl p-8 text-center relative overflow-hidden"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
              />
              <div className="relative z-10">
                <div className="text-5xl font-bold mb-2">3+</div>
                <div className="text-lg">Years Experience</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
