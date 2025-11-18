# AI Necromancer Backend

Backend service that uses OpenAI's GPT API to analyze, modernize, and translate legacy code.

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure OpenAI API Key**:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```
   
   Get your API key from: https://platform.openai.com/api-keys

3. **Start the server**:
   ```bash
   npm start
   ```
   
   Server will run on http://localhost:3001

## API Endpoints

### POST /api/analyze
Analyzes code to detect language, purpose, and issues.

**Request:**
```json
{
  "code": "string",
  "filename": "string",
  "vibe": "necromancer|mentor|professional"
}
```

**Response:**
```json
{
  "language": "string",
  "purpose": "string",
  "issues": ["string"],
  "lineCount": number
}
```

### POST /api/modernize
Modernizes or translates code to target language.

**Request:**
```json
{
  "code": "string",
  "analysis": { "language": "string", "purpose": "string", "issues": [] },
  "vibe": "string",
  "targetLanguage": "modernize|javascript|python|typescript|rust|go"
}
```

**Response:**
```json
{
  "code": "string"
}
```

### POST /api/document
Generates documentation for the transformation.

**Request:**
```json
{
  "analysis": { "language": "string", "purpose": "string", "issues": [], "lineCount": number },
  "vibe": "string",
  "targetLanguage": "string"
}
```

**Response:**
```json
{
  "readme": "markdown string",
  "changelog": "markdown string"
}
```

## Features

- **GPT-4 Powered**: Uses OpenAI's GPT-4o-mini for intelligent code transformation
- **Multi-Language**: Supports COBOL, PHP, ActionScript, JavaScript, Python, and more
- **Translation**: Convert between languages (COBOL→Python, PHP→JavaScript, etc.)
- **Vibe Modes**: Adjusts AI tone (dramatic, educational, or professional)
- **Fallback**: Basic transformations if API key is missing

## Cost Optimization

- Uses `gpt-4o-mini` model for cost-effective processing
- Limits token usage with max_tokens parameter
- Caches analysis results when possible
