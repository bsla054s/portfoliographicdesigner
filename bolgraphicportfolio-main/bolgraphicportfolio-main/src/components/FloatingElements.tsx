import { motion, useScroll, useTransform } from 'framer-motion';

export default function FloatingElements() {
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 150]);
  const rotate1 = useTransform(scrollY, [0, 1000], [0, 360]);
  const rotate2 = useTransform(scrollY, [0, 1000], [0, -360]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        style={{ y: y1, rotate: rotate1 }}
        className="absolute top-1/4 right-1/4 w-2 h-2 bg-gray-300 rounded-full"
      />

      <motion.div
        style={{ y: y2, rotate: rotate2 }}
        className="absolute top-1/3 left-1/4 w-16 h-16 border border-gray-200"
      />

      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-1/4 right-1/3 w-24 h-24 border-2 border-gray-200 rounded-full"
      />

      <motion.svg
        style={{ y: y1, rotate: rotate1 }}
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

      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-gray-300"
      />
    </div>
  );
}
