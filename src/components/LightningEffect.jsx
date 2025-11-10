import { motion } from 'framer-motion';

export default function LightningEffect({ active }) {
  if (!active) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0, 1, 0] }}
      transition={{ duration: 0.3, times: [0, 0.2, 0.4, 0.6, 1] }}
      className="fixed inset-0 pointer-events-none z-50"
    >
      <div className="absolute inset-0 bg-necro-lightning opacity-20" />
      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d="M 50 0 L 45 30 L 55 30 L 50 60"
          stroke="#fbbf24"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 0.3 }}
        />
      </svg>
    </motion.div>
  );
}
