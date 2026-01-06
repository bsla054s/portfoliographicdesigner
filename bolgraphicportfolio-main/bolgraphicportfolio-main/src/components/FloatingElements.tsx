import { motion, useScroll, useTransform } from 'framer-motion';
import { useParallax } from '../hooks/useParallax';

export default function FloatingElements() {
  const { scrollY } = useScroll();

  // Scroll-based parallax (existing)
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 150]);
  const rotate1 = useTransform(scrollY, [0, 1000], [0, 360]);
  const rotate2 = useTransform(scrollY, [0, 1000], [0, -360]);

  // Mouse/touch/gyroscope-based parallax (new)
  // Different intensities for each element create depth
  const parallax1 = useParallax({ intensity: 0.5, maxMovement: 15 });
  const parallax2 = useParallax({ intensity: 1.2, maxMovement: 20 });
  const parallax3 = useParallax({ intensity: 0.8, maxMovement: 12 });
  const parallax4 = useParallax({ intensity: 1.5, maxMovement: 25 });
  const parallax5 = useParallax({ intensity: 0.6, maxMovement: 10 });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Small dot - subtle movement */}
      <motion.div
        style={{ 
          y: y1, 
          rotate: rotate1,
          transform: `translate3d(${parallax1.x}px, ${parallax1.y}px, 0)`,
        }}
        className="absolute top-1/4 right-1/4 w-2 h-2 bg-gray-300 rounded-full"
      />

      {/* Square - more pronounced movement */}
      <motion.div
        style={{ 
          y: y2, 
          rotate: rotate2,
          transform: `translate3d(${parallax2.x}px, ${parallax2.y}px, 0)`,
        }}
        className="absolute top-1/3 left-1/4 w-16 h-16 border border-gray-200"
      />

      {/* Circle - medium movement */}
      <motion.div
        style={{ 
          y: y3,
          transform: `translate3d(${parallax3.x}px, ${parallax3.y}px, 0)`,
        }}
        className="absolute bottom-1/4 right-1/3 w-24 h-24 border-2 border-gray-200 rounded-full"
      />

      {/* Triangle - most pronounced movement */}
      <motion.svg
        style={{ 
          y: y1, 
          rotate: rotate1,
          transform: `translate3d(${parallax4.x}px, ${parallax4.y}px, 0)`,
        }}
        className="absolute top-1/2 left-1/3 w-12 h-12 text-gray-200"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M50 10 L90 90 L10 90 Z"
          stroke="currentColor"
          strokeWidth="2"
        />
      </motion.svg>

      {/* Small square - subtle movement */}
      <motion.div
        style={{ 
          y: y2,
          transform: `translate3d(${parallax5.x}px, ${parallax5.y}px, 0)`,
        }}
        className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-gray-300"
      />
    </div>
  );
}
