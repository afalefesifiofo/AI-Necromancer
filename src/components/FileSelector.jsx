import { motion } from 'framer-motion';

export default function FileSelector({ files, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 rounded-lg p-6 mb-6"
    >
      <h3 className="text-xl font-bold mb-4 text-necro-green">
        📁 Extracted Files ({files.length})
      </h3>
      <p className="text-gray-400 mb-4">
        Select a file to resurrect:
      </p>
      <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
        {files.map((file, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02, x: 5 }}
            onClick={() => onSelect(file)}
            className="text-left bg-gray-800 hover:bg-necro-purple/20 p-4 rounded-lg border border-gray-700 hover:border-necro-purple transition-all"
          >
            <div className="font-mono text-necro-green font-bold">
              {file.name}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {file.path}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              {file.size} bytes • {file.content.split('\n').length} lines
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
