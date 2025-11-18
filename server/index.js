// AI Necromancer Backend - Bridges React app with OpenAI GPT
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { analyzeCode, modernizeCode, generateDocumentation } from './kiro-agent.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI Necromancer backend is running' });
});

// Analyze code endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { code, filename, vibe } = req.body;
    
    console.log(`📊 Analyzing ${filename} with ${vibe} vibe`);
    
    const analysis = await analyzeCode(code, filename, vibe);
    analysis.lineCount = code.split('\n').length;
    
    console.log(`✓ Analysis complete: ${analysis.language}`);
    res.json(analysis);
  } catch (error) {
    console.error('❌ Analysis error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Modernize code endpoint
app.post('/api/modernize', async (req, res) => {
  try {
    const { code, analysis, vibe, targetLanguage, useFallback } = req.body;
    
    console.log(`⚡ Modernizing ${analysis.language} to ${targetLanguage} with ${vibe} vibe${useFallback ? ' (fallback mode)' : ''}`);
    
    const modernized = await modernizeCode(code, analysis, vibe, targetLanguage, useFallback);
    
    console.log(`✓ Modernization complete: ${modernized.length} characters`);
    res.json({ code: modernized });
  } catch (error) {
    console.error('❌ Modernization error:', error);
    
    // Check if it's a quota error
    const isQuotaError = error.message.includes('quota') || error.message.includes('429');
    const statusCode = isQuotaError ? 429 : 500;
    console.log(`Returning status ${statusCode}, isQuotaError: ${isQuotaError}`);
    res.status(statusCode).json({ 
      error: error.message,
      code: isQuotaError ? 'quota_exceeded' : 'error',
    });
  }
});

// Document code endpoint
app.post('/api/document', async (req, res) => {
  try {
    const { analysis, vibe, targetLanguage } = req.body;
    
    console.log(`📝 Generating documentation with ${vibe} vibe`);
    
    const docs = await generateDocumentation(analysis, vibe, targetLanguage);
    
    console.log(`✓ Documentation generated`);
    res.json(docs);
  } catch (error) {
    console.error('❌ Documentation error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🧟 AI Necromancer backend running on http://localhost:${PORT}`);
  console.log(`📡 Ready to receive requests from React app`);
  console.log(`🤖 Using Kiro AI for code transformation`);
});
