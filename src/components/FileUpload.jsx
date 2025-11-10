import { useState } from 'react';
import { motion } from 'framer-motion';
import { readFiles } from '../utils/fileReader';

export default function FileUpload({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    setIsProcessing(true);
    try {
      console.log('Files dropped:', e.dataTransfer.files.length);
      const files = await readFiles(e.dataTransfer.files);
      console.log('Files extracted:', files.length, files);
      if (files.length === 0) {
        alert('No code files found in the upload. Make sure your ZIP contains code files.');
        setIsProcessing(false);
        return;
      }
      onUpload(files);
    } catch (error) {
      console.error('Error processing files:', error);
      alert('Error processing files: ' + error.message);
      setIsProcessing(false);
    }
  };

  const handleChange = async (e) => {
    setIsProcessing(true);
    try {
      console.log('Files selected:', e.target.files.length);
      const files = await readFiles(e.target.files);
      console.log('Files extracted:', files.length, files);
      if (files.length === 0) {
        alert('No code files found in the upload. Make sure your ZIP contains code files.');
        setIsProcessing(false);
        return;
      }
      onUpload(files);
    } catch (error) {
      console.error('Error processing files:', error);
      alert('Error processing files: ' + error.message);
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      className={`border-4 border-dashed rounded-lg p-16 text-center transition-all ${
        isDragging
          ? 'border-necro-lightning bg-necro-purple/10 scale-105'
          : 'border-necro-purple/50 hover:border-necro-purple'
      }`}
    >
      {isProcessing ? (
        <div className="space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="text-8xl"
          >
            ⚡
          </motion.div>
          <p className="text-2xl font-bold text-necro-lightning">
            Extracting ZIP archive...
          </p>
        </div>
      ) : (
        <>
          <motion.div
            animate={{ rotate: isDragging ? [0, -10, 10, -10, 0] : 0 }}
            transition={{ duration: 0.5 }}
            className="text-8xl mb-6"
          >
            🧟
          </motion.div>
          <h2 className="text-3xl font-bold mb-3 text-necro-lightning">
            Drop Your Dead Code Here
          </h2>
          <p className="text-gray-400 mb-4 text-lg">
            Upload ZIP archives to resurrect entire projects
          </p>
          <p className="text-gray-500 mb-6">
            All files will be automatically processed and modernized
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-6 text-sm text-gray-500">
            <span className="bg-gray-800 px-3 py-1 rounded">📦 .zip</span>
            <span className="bg-gray-800 px-3 py-1 rounded">.cob</span>
            <span className="bg-gray-800 px-3 py-1 rounded">.php</span>
            <span className="bg-gray-800 px-3 py-1 rounded">.as</span>
            <span className="bg-gray-800 px-3 py-1 rounded">.js</span>
            <span className="bg-gray-800 px-3 py-1 rounded">.py</span>
            <span className="bg-gray-800 px-3 py-1 rounded">.rb</span>
          </div>
          <input
            type="file"
            multiple
            accept=".zip,.cob,.cobol,.php,.as,.js,.jsx,.ts,.tsx,.py,.rb,.java,.c,.cpp,.cs,.go,.rs"
            onChange={handleChange}
            className="hidden"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="inline-block bg-necro-purple hover:bg-necro-purple/80 px-8 py-4 rounded-lg cursor-pointer transition-all font-bold text-lg hover:scale-105"
          >
            Browse Files or ZIP Archives
          </label>
        </>
      )}
    </motion.div>
  );
}
