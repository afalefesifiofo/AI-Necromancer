// Kiro Agent Service - handles AI interactions using Kiro API
// ONLY uses real AI - no simulations

export class KiroAgent {
  constructor(vibe = 'necromancer', targetLanguage = 'modernize') {
    this.vibe = vibe;
    this.targetLanguage = targetLanguage;
    this.context = [];
    this.apiKey = import.meta.env.VITE_KIRO_API_KEY || '';
    this.apiEndpoint = 'https://api.kiro.ai/v1/chat'; // Update with actual endpoint
  }

  setVibe(vibe) {
    this.vibe = vibe;
  }

  setTargetLanguage(language) {
    this.targetLanguage = language;
  }

  async callBackendAPI(endpoint, data) {
    const backendURL = 'http://localhost:3001';
    
    try {
      console.log(`Calling backend API: ${endpoint}`);
      const response = await fetch(`${backendURL}/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Backend API error: ${response.status}`);
      }

      const result = await response.json();
      console.log(`✓ Got response from backend`);
      return result;
    } catch (error) {
      if (error.message.includes('fetch')) {
        throw new Error('Backend service not running. Please start it with: npm run server');
      }
      throw error;
    }
  }

  async analyze(code, filename) {
    const response = await this.callBackendAPI('analyze', {
      code,
      filename,
      vibe: this.vibe,
    });
    
    return {
      ...response,
      lineCount: code.split('\n').length,
    };
  }

  async modernize(code, analysis) {
    console.log('Modernize called with targetLanguage:', this.targetLanguage);
    
    const response = await this.callBackendAPI('modernize', {
      code,
      analysis,
      vibe: this.vibe,
      targetLanguage: this.targetLanguage,
    });
    
    return response.code;
  }

  async document(originalCode, modernCode, analysis) {
    const systemPrompt = `You are a chronicler documenting code transformations. Be ${this.vibe === 'necromancer' ? 'theatrical about the resurrection' : this.vibe === 'mentor' ? 'educational' : 'concise'}.`;
    
    const transformationType = this.targetLanguage === 'modernize' 
      ? `modernization from ${analysis.language}`
      : `translation from ${analysis.language} to ${this.targetLanguage}`;
    
    const prompt = `Generate documentation for this code ${transformationType}.

Return a JSON object with:
{
  "readme": "markdown README content with overview and usage examples",
  "changelog": "markdown changelog detailing all changes made"
}

Original had ${analysis.issues.length} issues. Code was ${analysis.lineCount} lines.
${this.targetLanguage !== 'modernize' ? `Translated to ${this.targetLanguage}.` : ''}

Return ONLY the JSON object.`;

    const response = await this.callBackendAPI('document', {
      analysis,
      vibe: this.vibe,
      targetLanguage: this.targetLanguage,
    });
    
    if (!response) {
      throw new Error('No response from backend API for documentation');
    }
    
    // Backend returns the docs object directly with readme and changelog
    return response;
  }

}
