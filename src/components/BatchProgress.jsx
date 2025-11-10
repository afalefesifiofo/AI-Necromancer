import { motion } from 'framer-motion';

export default function BatchProgress({ total, current, processing }) {
  const progress = (current / total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 rounded-lg p-6 border border-gray-800"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.span
            animate={{ scale: processing ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.5, repeat: processing ? Infinity : 0 }}
            className="text-4xl"
          >
            {processing ? '⚡' : '✨'}
          </motion.span>
          <div>
            <span className="text-2xl font-bold text-necro-lightning">
              {processing ? 'Mass Resurrection in Progress' : 'Resurrection Complete!'}
            </span>
            <p className="text-gray-400 text-sm mt-1">
              Processing file {current} of {total}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-necro-green">
            {Math.round(progress)}%
          </div>
          <div className="text-sm text-gray-500">
            {current}/{total} files
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-full h-6 overflow-hidden shadow-inner">
        <motion.div
          className="bg-gradient-to-r from-necro-purple via-necro-lightning to-necro-green h-full flex items-center justify-end pr-3"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}
