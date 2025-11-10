import { motion } from 'framer-motion';
import { useState } from 'react';

export default function FileResultCard({ result, index }) {
  const [expanded, setExpanded] = useState(false);

  if (result.status === 'error') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-red-900/20 border border-red-800 rounded-lg p-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">❌</span>
          <div className="flex-1">
            <div className="font-bold text-red-400">{result.file.name}</div>
            <div className="text-sm text-red-300">{result.error}</div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden hover:border-necro-purple/50 transition-colors"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left hover:bg-gray-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">✅</span>
          <div className="flex-1">
            <div className="font-bold text-necro-green">{result.file.name}</div>
            <div className="text-sm text-gray-400">{result.file.path}</div>
            <div className="text-xs text-gray-500 mt-1">
              {result.analysis.language} • {result.analysis.lineCount} lines • {result.analysis.issues.length} issues fixed
            </div>
          </div>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            className="text-2xl text-gray-400"
          >
            ▼
          </motion.span>
        </div>
      </button>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-gray-800"
        >
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-bold text-gray-400 mb-2">💀 Before</div>
                <pre className="bg-gray-950 p-3 rounded text-xs overflow-auto max-h-64 text-gray-300">
                  <code>{result.file.content}</code>
                </pre>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-400 mb-2">✨ After</div>
                <pre className="bg-gray-950 p-3 rounded text-xs overflow-auto max-h-64 text-gray-300">
                  <code>{result.revived.code}</code>
                </pre>
              </div>
            </div>

            <div className="bg-gray-800 p-3 rounded">
              <div className="text-sm font-bold text-necro-green mb-2">📜 Chronicle</div>
              <p className="text-sm text-gray-300">{result.analysis.narration}</p>
              <p className="text-sm text-gray-300 mt-2">{result.revived.narration}</p>
              <p className="text-sm text-gray-300 mt-2">{result.docs.narration}</p>
            </div>

            <button
              onClick={() => {
                const blob = new Blob([result.revived.code], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = result.file.name;
                a.click();
              }}
              className="bg-necro-purple hover:bg-necro-purple/80 px-4 py-2 rounded text-sm font-bold transition-colors"
            >
              Download This File
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
