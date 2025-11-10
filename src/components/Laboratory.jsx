import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodePanel from './CodePanel';
import RevivalBar from './RevivalBar';
import DocumentationPanel from './DocumentationPanel';
import { runArchaeologist } from '../agents/archaeologist';
import { runNecromancer } from '../agents/necromancer';
import { runChronicler } from '../agents/chronicler';
import { KiroAgent } from '../services/kiroAgent';

export default function Laboratory({ code, vibe, onReset }) {
  const [stage, setStage] = useState('analyzing');
  const [analysis, setAnalysis] = useState(null);
  const [revivedCode, setRevivedCode] = useState(null);
  const [documentation, setDocumentation] = useState(null);
  const [chronicle, setChronicle] = useState([]);
  const [kiroAgent] = useState(() => new KiroAgent(vibe));

  useEffect(() => {
    kiroAgent.setVibe(vibe);
    resurrectCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, vibe]);

  const resurrectCode = async () => {
    setStage('analyzing');
    setChronicle([]);
    
    const analysisResult = await runArchaeologist(code, vibe, kiroAgent);
    setAnalysis(analysisResult);
    setChronicle(prev => [...prev, analysisResult.narration]);

    setStage('reviving');
    const revived = await runNecromancer(code, analysisResult, vibe, kiroAgent);
    setRevivedCode(revived);
    setChronicle(prev => [...prev, revived.narration]);

    setStage('documenting');
    const docs = await runChronicler(code, revived, analysisResult, vibe, kiroAgent);
    setDocumentation(docs);
    setChronicle(prev => [...prev, docs.narration]);

    setStage('complete');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <RevivalBar stage={stage} />
      
      <div className="grid grid-cols-2 gap-6">
        <CodePanel title="💀 Before (Dead)" code={code?.[0]?.content || ''} />
        <CodePanel title="✨ After (Alive)" code={revivedCode?.code || '⚡ Resurrection in progress...'} />
      </div>

      <div className="bg-gray-900 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-necro-green">
          📜 Resurrection Chronicle
        </h3>
        <div className="space-y-3 font-mono text-sm">
          {chronicle.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.3 }}
              className="text-gray-300 border-l-2 border-necro-purple pl-4 py-2"
            >
              {entry}
            </motion.div>
          ))}
        </div>
      </div>

      {documentation && (
        <DocumentationPanel docs={documentation} />
      )}

      {stage === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center gap-4"
        >
          <button
            onClick={onReset}
            className="bg-necro-purple hover:bg-necro-purple/80 px-8 py-3 rounded-lg font-bold transition-colors"
          >
            Resurrect Another
          </button>
          <button
            onClick={() => {
              const blob = new Blob([revivedCode.code], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'resurrected-code.txt';
              a.click();
            }}
            className="bg-necro-green hover:bg-necro-green/80 px-8 py-3 rounded-lg font-bold transition-colors"
          >
            Download Code
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
