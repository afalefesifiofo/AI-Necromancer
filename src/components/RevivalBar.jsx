import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import LightningEffect from './LightningEffect';

const stages = {
  analyzing: { label: 'Analyzing Ancient Code...', progress: 33, icon: '🔍', color: 'from-blue-500 to-purple-500' },
  reviving: { label: 'Channeling Resurrection Energy...', progress: 66, icon: '⚡', color: 'from-necro-purple to-necro-lightning' },
  documenting: { label: 'Inscribing the Chronicle...', progress: 90, icon: '📝', color: 'from-necro-lightning to-necro-green' },
  complete: { label: 'Resurrection Complete!', progress: 100, icon: '✨', color: 'from-necro-green to-necro-green' },
};

export default function RevivalBar({ stage }) {
  const current = stages[stage];
  const [showLightning, setShowLightning] = useState(false);

  useEffect(() => {
    if (stage === 'reviving') {
      setShowLightning(true);
      const timer = setTimeout(() => setShowLightning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <>
      <LightningEffect active={showLightning} />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 rounded-lg p-6 border border-gray-800"
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.span
            animate={{ scale: stage === 'reviving' ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.5, repeat: stage === 'reviving' ? Infinity : 0 }}
            className="text-4xl"
          >
            {current.icon}
          </motion.span>
          <span className="text-2xl font-bold text-necro-lightning">{current.label}</span>
        </div>
        <div className="bg-gray-800 rounded-full h-6 overflow-hidden shadow-inner">
          <motion.div
            className={`bg-gradient-to-r ${current.color} h-full flex items-center justify-end pr-3`}
            initial={{ width: 0 }}
            animate={{ width: `${current.progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="text-white text-sm font-bold">{current.progress}%</span>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
