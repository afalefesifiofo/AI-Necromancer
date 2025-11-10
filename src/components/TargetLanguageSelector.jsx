import { motion } from 'framer-motion';

const languages = [
  { id: 'modernize', label: '✨ Modernize (Same Language)', icon: '🔄' },
  { id: 'javascript', label: 'JavaScript (ES6+)', icon: '🟨' },
  { id: 'typescript', label: 'TypeScript', icon: '🔷' },
  { id: 'python', label: 'Python 3', icon: '🐍' },
  { id: 'rust', label: 'Rust', icon: '🦀' },
  { id: 'go', label: 'Go', icon: '🐹' },
];

export default function TargetLanguageSelector({ selected, onChange }) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-800">
      <h3 className="text-lg font-bold mb-4 text-necro-green">
        🎯 Target Language
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {languages.map((lang) => (
          <motion.button
            key={lang.id}
            onClick={() => onChange(lang.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 rounded-lg font-bold transition-all text-left ${
              selected === lang.id
                ? 'bg-necro-purple text-white border-2 border-necro-lightning'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border-2 border-transparent'
            }`}
          >
            <div className="text-2xl mb-1">{lang.icon}</div>
            <div className="text-sm">{lang.label}</div>
          </motion.button>
        ))}
      </div>
      <p className="text-gray-500 text-sm mt-4">
        {selected === 'modernize' 
          ? 'Will update code to modern syntax while keeping the same language'
          : `Will translate all code to ${languages.find(l => l.id === selected)?.label}`
        }
      </p>
    </div>
  );
}
