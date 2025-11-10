import { motion } from 'framer-motion';

const vibes = [
  { id: 'mentor', icon: '👨‍🏫', label: 'Mentor' },
  { id: 'engineer', icon: '⚙️', label: 'Engineer' },
  { id: 'necromancer', icon: '⚡', label: 'Necromancer' },
];

export default function VibeSwitch({ currentVibe, onVibeChange }) {
  return (
    <div className="flex gap-3 mb-8">
      <span className="text-gray-400 font-bold self-center mr-2">Vibe:</span>
      {vibes.map((vibe) => (
        <motion.button
          key={vibe.id}
          onClick={() => onVibeChange(vibe.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${
            currentVibe === vibe.id
              ? 'bg-necro-purple text-white shadow-lg shadow-necro-purple/50'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <span className="text-xl">{vibe.icon}</span>
          {vibe.label}
        </motion.button>
      ))}
    </div>
  );
}
