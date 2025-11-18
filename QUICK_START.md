# 🚀 AI Necromancer - Quick Start

## Prerequisites

- Node.js 18+ installed
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Setup (First Time Only)

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Configure OpenAI API Key

```bash
# Navigate to server directory
cd server

# Copy example env file
cp .env.example .env
```

Edit `server/.env` and add your OpenAI API key:
```
OPENAI_API_KEY=sk-your-actual-key-here
```

### 3. Verify Setup

```bash
# From root directory
npm run setup:check
```

You should see:
```
✓ Node.js version: v22.x.x
✓ OPENAI_API_KEY found
✓ OpenAI API connection successful!
✅ Setup complete!
```

## Start the Application

```bash
npm run dev:full
```

This starts:
✅ Frontend on http://localhost:5173
✅ Backend on http://localhost:3001
✅ GPT-4 powered code transformation

## Test It Right Now

1. Open http://localhost:5173 in your browser
2. Select a vibe (Necromancer is most fun! 🧟)
3. Choose target language (try Python or TypeScript)
4. Upload `examples/legacy-project.zip`
5. Watch GPT-4 analyze, modernize, and document your code!
6. Download the transformed code as a ZIP

## What You'll See

- **Real-time AI processing** with lightning effects ⚡
- **Code analysis** detecting language and issues
- **Smart modernization** or translation to target language
- **Auto-generated documentation** (README + changelog)
- **Before/After comparison** for each file

## Troubleshooting

**"OPENAI_API_KEY environment variable is not set"**
- Make sure `server/.env` file exists
- Check that your API key is correctly added
- Restart the backend server

**"Backend service not running"**
```bash
# Start backend manually
cd server
npm start
```

**"OpenAI API error: 401"**
- Your API key is invalid or expired
- Get a new key from https://platform.openai.com/api-keys

**Frontend not loading?**
```bash
# Start frontend manually
npm run dev
```

**Port already in use?**
- Backend uses port 3001
- Frontend uses port 5173
- Close other apps using these ports

**Need to restart everything?**
```bash
# Stop all (Ctrl+C in both terminals)
npm run dev:full
```

## Cost Information

The app uses GPT-4o-mini which is very affordable:
- Small file (100 lines): ~$0.001
- Medium file (500 lines): ~$0.005
- Large file (2000 lines): ~$0.02

Set usage limits in your OpenAI account dashboard.

## Alternative: Manual Start

If you prefer to run servers separately:

```bash
# Terminal 1 - Backend
cd server
npm start

# Terminal 2 - Frontend (new terminal)
npm run dev
```

## That's It!

You're ready to resurrect some dead code with real AI! ⚡🧟

---

**Detailed setup:** See `SETUP.md`
**Full documentation:** See `README.md`
**Demo script:** See `DEMO_SCRIPT.md`
**API details:** See `server/README.md`
