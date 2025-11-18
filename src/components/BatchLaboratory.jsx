import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BatchProgress from './BatchProgress';
import FileResultCard from './FileResultCard';
import DebugPanel from './DebugPanel';
import ApiStatusBanner from './ApiStatusBanner';
import { runArchaeologist } from '../agents/archaeologist';
import { runNecromancer } from '../agents/necromancer';
import { runChronicler } from '../agents/chronicler';
import { KiroAgent } from '../services/kiroAgent';
import JSZip from 'jszip';

export default function BatchLaboratory({ files, vibe, targetLanguage, onReset }) {
  const [processing, setProcessing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [kiroAgent] = useState(() => new KiroAgent(vibe, targetLanguage));
  const [hasStarted, setHasStarted] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [useFallbackMode, setUseFallbackMode] = useState(false);

  useEffect(() => {
    if (!hasStarted && files && files.length > 0) {
      setHasStarted(true);
      kiroAgent.setVibe(vibe);
      kiroAgent.setTargetLanguage(targetLanguage);
      processAllFiles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const processAllFiles = async () => {
    console.log('Starting batch processing of', files.length, 'files');
    setProcessing(true);
    setResults([]);
    setCurrentIndex(0);
    const processedResults = [];

    for (let i = 0; i < files.length; i++) {
      console.log(`Processing file ${i + 1}/${files.length}:`, files[i].name);
      setCurrentIndex(i);
      const file = files[i];

      try {
        // Analyze
        console.log('  - Analyzing...');
        const analysis = await runArchaeologist([file], vibe, kiroAgent);
        
        // Modernize
        console.log('  - Modernizing...');
        const revived = await runNecromancer([file], analysis, vibe, kiroAgent, useFallbackMode);
        
        // Document
        console.log('  - Documenting...');
        const docs = await runChronicler([file], revived, analysis, vibe, kiroAgent);

        processedResults.push({
          file,
          analysis,
          revived,
          docs,
          status: 'success',
        });
        console.log('  ✓ Success');
      } catch (error) {
        console.error('  ✗ Error:', error);
        console.log('Error message:', error.message);
        console.log('Use fallback mode:', useFallbackMode);
        
        // Check if it's a quota error
        const errorMsg = error.message || '';
        const isQuotaError = errorMsg.includes('quota') || errorMsg.includes('429') || errorMsg.includes('exceeded');
        console.log('Is quota error:', isQuotaError);
        
        if (isQuotaError && !useFallbackMode) {
          console.log('Setting API error and stopping processing');
          setApiError(error.message);
          setProcessing(false);
          return; // Stop processing
        }
        
        processedResults.push({
          file,
          status: 'error',
          error: error.message || 'Unknown error',
        });
      }

      setResults([...processedResults]);
    }

    console.log('Batch processing complete!');
    setProcessing(false);
    setCurrentIndex(files.length);
  };

  const downloadAll = async () => {
    const zip = new JSZip();
    const modernFolder = zip.folder('modernized');

    results.forEach((result) => {
      if (result.status === 'success') {
        modernFolder.file(result.file.name, result.revived.code);
      }
    });

    // Add a README
    const readmeContent = `# Modernized Code - AI Necromancer

## Summary
- Total files processed: ${results.length}
- Successfully modernized: ${results.filter(r => r.status === 'success').length}
- Errors: ${results.filter(r => r.status === 'error').length}

## Vibe: ${vibe}

Generated on ${new Date().toLocaleString()}
`;
    
    zip.file('README.md', readmeContent);

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resurrected-project.zip';
    a.click();
  };

  const handleUseFallback = () => {
    setApiError(null);
    setUseFallbackMode(true);
    // Restart processing with fallback mode
    processAllFiles();
  };

  const handleDismissError = () => {
    setApiError(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <ApiStatusBanner 
        error={apiError}
        onUseFallback={handleUseFallback}
        onDismiss={handleDismissError}
      />
      
      <DebugPanel files={files} />
      
      {useFallbackMode && (
        <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4 text-center">
          <p className="text-yellow-400 font-bold">🔄 Fallback Mode Active</p>
          <p className="text-yellow-200 text-sm mt-1">
            Using basic transformations without AI API
          </p>
        </div>
      )}
      
      <BatchProgress
        total={files.length}
        current={currentIndex + 1}
        processing={processing}
      />

      {!processing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-4 mb-6"
        >
          <button
            onClick={downloadAll}
            className="bg-necro-green hover:bg-necro-green/80 px-8 py-4 rounded-lg font-bold text-lg transition-colors flex items-center gap-2"
          >
            📦 Download All ({results.filter(r => r.status === 'success').length} files)
          </button>
          <button
            onClick={onReset}
            className="bg-gray-800 hover:bg-gray-700 px-8 py-4 rounded-lg font-bold text-lg transition-colors"
          >
            ← Upload New Project
          </button>
        </motion.div>
      )}

      <div className="space-y-4">
        {results.map((result, index) => (
          <FileResultCard key={index} result={result} index={index} />
        ))}
      </div>

      {processing && currentIndex < files.length && (
        <div className="text-center text-gray-400 py-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="text-6xl mb-4 inline-block"
          >
            ⚡
          </motion.div>
          <p className="text-xl">
            Resurrecting {files[currentIndex]?.name}...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            File {currentIndex + 1} of {files.length}
          </p>
        </div>
      )}

      {!processing && results.length === 0 && (
        <div className="text-center text-red-400 py-8">
          <p className="text-xl">No files were processed. Check console for errors.</p>
        </div>
      )}
    </motion.div>
  );
}
