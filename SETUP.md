# AI Necromancer - Setup Guide

## Prerequisites

- Node.js 18+ installed
- Kiro IDE installed and configured
- Terminal access

## Installation

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Verify Kiro CLI

Make sure Kiro CLI is available:

```bash
kiro --version
```

If not installed, follow Kiro's installation guide.

## Running the Application

### Option 1: Start Everything (Recommended)

```bash
npm run dev:full
```

This starts both frontend and backend simultaneously.

### Option 2: Start Manually

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run server
```

## Verification

### Check Frontend
Open http://localhost:5174 in your browser. You should see the AI Necromancer interface.

### Check Backend
Open http://localhost:3001/api/health in your browser. You should see:
```json
{
  "status": "ok",
  "message": "AI Necromancer backend is running"
}
```

### Check Kiro Integration
1. Upload a test file in the UI
2. Check the backend terminal for logs like:
   - `📊 Analyzing filename.ext with necromancer vibe`
   - `✓ Analysis complete: COBOL`

## Troubleshooting

### Backend Won't Start

**Error:** `Cannot find module 'express'`
**Solution:**
```bash
cd server
npm install
cd ..
```

### Kiro Agent Fails

**Error:** `Failed to start Kiro agent`
**Solution:**
1. Verify Kiro CLI is installed: `kiro --version`
2. Check that you're in the project directory
3. Verify steering documents exist in `.kiro/steering/`

### Frontend Can't Connect to Backend

**Error:** `Backend service not running`
**Solution:**
1. Make sure backend is running on port 3001
2. Check for port conflicts: `netstat -ano | findstr :3001`
3. Try restarting the backend

### CORS Errors

**Error:** `Access-Control-Allow-Origin`
**Solution:** The backend already has CORS enabled. If you still see errors:
1. Clear browser cache
2. Restart both frontend and backend
3. Check browser console for specific error details

## Development Tips

### Hot Reload
- Frontend: Vite provides instant hot reload
- Backend: Restart manually after changes (or use nodemon)

### Debugging
- Frontend: Use browser DevTools (F12)
- Backend: Check terminal output for logs
- Kiro Agent: Logs appear in backend terminal

### Testing Without UI
Test backend endpoints directly:

```bash
# Health check
curl http://localhost:3001/api/health

# Analyze code
curl -X POST http://localhost:3001/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"var x = 1;","filename":"test.js","vibe":"necromancer"}'
```

## Production Build

```bash
# Build frontend
npm run build

# The dist/ folder contains the production build
# Serve it with any static file server
```

## Environment Variables

Create `.env` file in project root (optional):

```env
# Backend port (default: 3001)
PORT=3001

# Frontend port (default: 5174)
VITE_PORT=5174

# Backend URL for frontend
VITE_BACKEND_URL=http://localhost:3001
```

## Next Steps

Once everything is running:
1. Try the test button: "🧪 Test with Sample Files"
2. Upload `examples/legacy-project.zip`
3. Watch the AI transform your code!
4. Check the before/after comparisons
5. Download the modernized project

## Support

If you encounter issues:
1. Check this guide's troubleshooting section
2. Review backend terminal logs
3. Check browser console for errors
4. Verify all dependencies are installed
5. Ensure Kiro CLI is properly configured
