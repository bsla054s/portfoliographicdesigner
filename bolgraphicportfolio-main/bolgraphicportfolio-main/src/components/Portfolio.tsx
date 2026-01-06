import { motion, useInView, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const getAspectRatioClass = (aspectRatio: string) => {
    switch (aspectRatio) {
      case 'portrait':
        return 'md:row-span-2';
      case 'landscape':
        return 'md:col-span-2';
      default:
        return '';
    }
  };

  return (
    <>
      <section id="work" className="py-32 px-6 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl opacity-50" />

        <div ref={ref} className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Selected Work
            </h2>
            <p className="text-xl text-gray-600">
              Recent projects that made an impact
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-6">
            {portfolioData.portfolio.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  transition: { duration: 0.2 }
                }}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${getAspectRatioClass(project.aspectRatio)}`}
                onClick={() => setSelectedProject(project.id)}
              >
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundColor: project.color }}
                />

                <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/60" />

                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    className="transform translate-y-4 group-hover:translate-y-0 transition-transform"
                  >
                    <span className="text-sm font-medium opacity-80 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold mt-1">
                      {project.title}
                    </h3>
                  </motion.div>
                </div>

                <div className="absolute top-4 right-4 w-12 h-12 border border-white/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedProject(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
              onClick={() => setSelectedProject(null)}
            >
              <X className="text-gray-900" size={24} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="max-w-4xl w-full aspect-video rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {portfolioData.portfolio.map((project) =>
                project.id === selectedProject && (
                  <div
                    key={project.id}
                    className="w-full h-full flex items-center justify-center text-white text-center p-12"
                    style={{ backgroundColor: project.color }}
                  >
                    <div>
                      <p className="text-sm uppercase tracking-wider opacity-80 mb-4">
                        {project.category}
                      </p>
                      <h3 className="text-4xl font-bold mb-4">
                        {project.title}
                      </h3>
                      <p className="text-lg opacity-90">
                        Project details and description would go here
                      </p>
                    </div>
                  </div>
                )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
