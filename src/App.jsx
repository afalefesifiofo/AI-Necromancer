import { useState } from 'react';
import { motion } from 'framer-motion';
import BatchLaboratory from './components/BatchLaboratory';
import FileUpload from './components/FileUpload';
import VibeSwitch from './components/VibeSwitch';
import TargetLanguageSelector from './components/TargetLanguageSelector';

export default function App() {
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const [vibe, setVibe] = useState('necromancer');
  const [targetLanguage, setTargetLanguage] = useState('modernize');

  const handleReset = () => {
    setUploadedFiles(null);
  };

  return (
    <div className="min-h-screen bg-necro-dark">
      <header className="border-b border-necro-purple/30 p-6 bg-gradient-to-r from-necro-dark to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl font-bold text-necro-lightning flex items-center gap-3">
            ⚡ AI Necromancer
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            We bring legacy code back from the dead — analyzed, re-written, and re-animated with AI.
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Upload ZIP archives to resurrect entire projects • No servers • Fully client-side
          </p>
        </motion.div>
      </header>

      <main className="container mx-auto p-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          <div className="flex-1">
            <VibeSwitch currentVibe={vibe} onVibeChange={setVibe} />
          </div>
        </div>
        
        {!uploadedFiles ? (
          <>
            <TargetLanguageSelector 
              selected={targetLanguage} 
              onChange={setTargetLanguage} 
            />
            <FileUpload onUpload={setUploadedFiles} />
            <div className="mt-4 text-center">
              <button
                onClick={() => {
                  // Test with hardcoded files
                  const testFiles = [
                    {
                      name: 'test.js',
                      path: 'test.js',
                      content: 'var x = 1;\nconsole.log(x);',
                      size: 25,
                    },
                    {
                      name: 'test.php',
                      path: 'test.php',
                      content: '<?php\necho "Hello";\n?>',
                      size: 23,
                    },
                  ];
                  console.log('Using test files:', testFiles);
                  setUploadedFiles(testFiles);
                }}
                className="bg-yellow-600 hover:bg-yellow-500 px-6 py-3 rounded-lg font-bold transition-colors"
              >
                🧪 Test with Sample Files
              </button>
            </div>
          </>
        ) : (
          <BatchLaboratory 
            files={uploadedFiles} 
            vibe={vibe}
            targetLanguage={targetLanguage}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="border-t border-necro-purple/30 p-6 text-center text-gray-500 text-sm mt-12">
        <p>Built with React + Framer Motion + Kiro AI • Fully Client-Side</p>
      </footer>
    </div>
  );
}
