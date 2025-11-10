# AI Necromancer Integration - Design Document

## Overview

This document outlines the technical design for integrating the AI Necromancer React application with Kiro's AI capabilities through a Node.js backend service.

## Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────┐
│   React App     │  HTTP   │  Express Backend │  CLI    │  Kiro AI    │
│  (Browser)      │ ◄─────► │   (Node.js)      │ ◄─────► │  (Agent)    │
│  Port 5174      │         │   Port 3001      │         │             │
└─────────────────┘         └──────────────────┘         └─────────────┘
```

### Components

1. **React Frontend**
   - User interface for file upload and results
   - Communicates with backend via REST API
   - Displays real-time progress and results

2. **Express Backend**
   - REST API server
   - Bridges React app with Kiro CLI
   - Handles file processing requests

3. **Kiro Agent**
   - Invoked via CLI by backend
   - Uses steering documents for personality
   - Performs actual AI transformations

## Data Flow

### 1. Analysis Flow
```
User uploads file
  → React sends POST /api/analyze
    → Backend calls Kiro agent with code
      → Kiro analyzes using steering doc
        → Returns JSON analysis
          → Backend forwards to React
            → React displays results
```

### 2. Modernization Flow
```
React requests modernization
  → Backend receives code + target language
    → Kiro agent transforms code
      → Returns modernized code
        → Backend sends to React
          → React shows before/after
```

### 3. Documentation Flow
```
React requests documentation
  → Backend receives analysis data
    → Kiro generates README + changelog
      → Returns documentation
        → React displays in tabs
```

## API Endpoints

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "AI Necromancer backend is running"
}
```

### POST /api/analyze
Analyzes code and detects language/issues.

**Request:**
```json
{
  "code": "string",
  "filename": "string",
  "vibe": "necromancer|mentor|engineer"
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
Modernizes or translates code.

**Request:**
```json
{
  "code": "string",
  "analysis": {
    "language": "string",
    "issues": ["string"]
  },
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
Generates documentation.

**Request:**
```json
{
  "analysis": {
    "language": "string",
    "issues": ["string"],
    "lineCount": number
  },
  "vibe": "string",
  "targetLanguage": "string"
}
```

**Response:**
```json
{
  "readme": "string (markdown)",
  "changelog": "string (markdown)"
}
```

## Kiro Agent Integration

### Agent Invocation
The backend uses Node.js `child_process.spawn()` to invoke Kiro CLI:

```javascript
spawn('kiro', ['agent', 'run', '--steering', '.kiro/steering/necromancer.md'])
```

### Steering Documents
Three steering documents control AI personality:

- `.kiro/steering/necromancer.md` - Dramatic, theatrical
- `.kiro/steering/mentor.md` - Educational, patient
- `.kiro/steering/engineer.md` - Precise, technical

### Prompt Structure

**Analysis Prompt:**
```
Analyze this {filename} file and return a JSON object with:
{
  "language": "detected language and version",
  "purpose": "main purpose in one sentence",
  "issues": ["issue1", "issue2", "issue3"]
}

Code:
```
{code}
```

Return ONLY the JSON object, no other text.
```

**Modernization Prompt:**
```
Modernize this {language} code to the latest version:
- Update to latest syntax and best practices
- Replace deprecated functions
- Improve structure and readability
- Keep original functionality intact
- Add brief comments explaining major changes

Original code:
```
{code}
```

Return ONLY the modernized code, no explanations outside the code.
```

**Translation Prompt:**
```
Translate this {source_language} code to {target_language}:
- Preserve all functionality and logic
- Use idiomatic {target_language} patterns
- Add type annotations if supported
- Include brief comments explaining translation
- Ensure production-ready code

Original code:
```
{code}
```

Return ONLY the translated code.
```

## Error Handling

### Frontend Errors
- Network errors: Show "Backend not running" message
- API errors: Display error message to user
- Timeout: Show retry option

### Backend Errors
- Kiro CLI not found: Return 500 with setup instructions
- Agent execution fails: Log error and return 500
- Invalid JSON response: Retry or return error

### Kiro Agent Errors
- Parsing failures: Return structured error
- Timeout: Kill process and return error
- Invalid steering doc: Fall back to default

## Performance Considerations

### Concurrency
- Backend handles multiple requests sequentially
- Each Kiro agent invocation is isolated
- No shared state between requests

### Timeouts
- Frontend: 60 seconds per request
- Backend: 45 seconds for Kiro agent
- Kiro agent: Configurable via CLI

### Memory
- Large files (>1MB): Stream processing
- ZIP extraction: In-memory (limited to 10MB)
- Response caching: Not implemented (stateless)

## Security

### Input Validation
- File size limits: 10MB per request
- Code length: Truncate to 50,000 characters
- Filename sanitization: Remove path traversal

### CORS
- Allow origin: http://localhost:5174
- Methods: GET, POST
- Headers: Content-Type, Authorization

### Rate Limiting
- Not implemented (local development)
- Production: Add rate limiting middleware

## Testing Strategy

### Unit Tests
- Backend API endpoints
- Kiro agent wrapper functions
- Error handling logic

### Integration Tests
- Full flow: Upload → Analyze → Modernize → Document
- Error scenarios: Missing Kiro, invalid input
- Multiple file types: COBOL, PHP, JavaScript

### Manual Testing
- Use test button in UI
- Upload example ZIP files
- Verify all three vibes work
- Test all target languages

## Deployment

### Development
```bash
npm run dev:full
```

### Production
1. Build frontend: `npm run build`
2. Serve static files from `dist/`
3. Run backend: `node server/index.js`
4. Use process manager (PM2) for backend

### Environment Variables
- `PORT`: Backend port (default: 3001)
- `VITE_BACKEND_URL`: Backend URL for frontend
- `KIRO_CLI_PATH`: Custom Kiro CLI path (optional)

## Future Enhancements

### Phase 2
- WebSocket for real-time progress
- Batch processing optimization
- Response caching
- Agent result streaming

### Phase 3
- Docker containerization
- Cloud deployment support
- API authentication
- Usage analytics

## Dependencies

### Frontend
- React 18
- Framer Motion
- JSZip
- Tailwind CSS

### Backend
- Express 4
- CORS middleware
- Node.js 18+

### External
- Kiro CLI (required)
- Kiro steering documents
