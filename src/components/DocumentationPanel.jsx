import { motion } from 'framer-motion';
import { useState } from 'react';

export default function DocumentationPanel({ docs }) {
  const [activeTab, setActiveTab] = useState('readme');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 rounded-lg overflow-hidden"
    >
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setActiveTab('readme')}
          className={`px-6 py-3 font-bold transition-colors ${
            activeTab === 'readme'
              ? 'bg-gray-800 text-necro-green'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          📖 README
        </button>
        <button
          onClick={() => setActiveTab('changelog')}
          className={`px-6 py-3 font-bold transition-colors ${
            activeTab === 'changelog'
              ? 'bg-gray-800 text-necro-green'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          📝 Changelog
        </button>
      </div>
      <div className="p-6">
        <pre className="text-sm text-gray-300 whitespace-pre-wrap">
          {activeTab === 'readme' ? docs.readme : docs.changelog}
        </pre>
      </div>
    </motion.div>
  );
}
