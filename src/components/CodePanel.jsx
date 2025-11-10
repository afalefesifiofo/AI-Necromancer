import { motion } from 'framer-motion';

export default function CodePanel({ title, code }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-necro-purple/50 transition-colors"
    >
      <div className="bg-gray-800 px-4 py-3 font-bold text-necro-green flex items-center gap-2">
        {title}
      </div>
      <pre className="p-4 overflow-auto max-h-96 text-sm text-gray-300 font-mono">
        <code>{code}</code>
      </pre>
    </motion.div>
  );
}
