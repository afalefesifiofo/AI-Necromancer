# ⚡ AI Necromancer

**Tagline:** "We bring legacy code back from the dead — analyzed, re-written, and re-animated with AI."

## 💡 Overview

AI Necromancer is a browser-based tool that resurrects obsolete codebases using multi-agent AI orchestration. Upload any "dead" project — COBOL, PHP 5, Flash — and watch an on-device AI necromancer analyze, modernize, and narrate its revival in real time.

**No backend, no servers** — just the user, the code, and an intelligent ghost in the browser.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start both frontend and backend
npm run dev:full
```

This will start:
- **Frontend** on http://localhost:5174
- **Backend** on http://localhost:3001

Then:
1. **Select a Vibe**: Choose Necromancer (dramatic), Mentor (educational), or Engineer (technical)
2. **Choose Target Language**: Modernize or translate to JavaScript, Python, TypeScript, Rust, or Go
3. **Upload ZIP**: Drag and drop your legacy project archive
4. **Watch the Magic**: Real-time processing with lightning effects and AI narration
5. **Download Results**: Get all transformed files as a ZIP with documentation

### Try It Now
Use the included `examples/legacy-project.zip` to test with sample COBOL, PHP, and JavaScript files!

### Manual Start (Alternative)
```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend
npm run server
```

## 🧩 How It Works

1. **Select Target Language**: Choose to modernize or translate to JavaScript, Python, TypeScript, Rust, or Go
2. **Upload ZIP**: Drag and drop a ZIP archive containing your legacy project
3. **Auto-Extract**: All code files are automatically extracted from folders
4. **Batch Process**: Each file goes through three AI agents:
   - **Agent 1 – The Archaeologist**: Detects language, structure, and purpose
   - **Agent 2 – The Necromancer**: Modernizes OR translates to target language
   - **Agent 3 – The Chronicler**: Generates explanations and documentation
5. **Download All**: Get a ZIP with all transformed files + README
6. **Vibe Modes**: Switch between Mentor, Engineer, or Necromancer tones

## 🌐 Language Translation

Transform legacy code into modern languages:
- **COBOL → Python**: Mainframe business logic to modern Python
- **PHP 5 → JavaScript**: Old web apps to Node.js
- **ActionScript → TypeScript**: Flash games to modern web
- **Any → Rust/Go**: Rewrite in memory-safe, performant languages
- **Modernize**: Keep the same language but update to latest syntax

## ⚙️ Architecture

- **Frontend**: React + Framer Motion
- **AI Agents**: Kiro API (real AI-powered modernization)
- **Context**: Local memory / browser state
- **Storage**: LocalStorage / IndexedDB
- **Theme**: Tailwind + dark "Frankenstein lab" UI

## 🤖 AI Integration

The app uses the Kiro API for intelligent code modernization:

1. **In Kiro IDE**: Automatically uses `window.kiro.chat()` API
2. **Standalone**: Set `VITE_KIRO_API_KEY` in `.env` file
3. **Fallback**: Uses rule-based transformations if API unavailable

The AI agents use the selected "vibe" (Mentor/Engineer/Necromancer) to adjust their tone and style.

## 🗓️ Development Plan

- **Week 1**: File upload + Archaeologist agent
- **Week 2**: Necromancer refactor logic + text UI
- **Week 3**: Chronicler documentation + animated interface
- **Week 4**: Vibe switching, theme polish, final demo

## 🎨 Features

- Haunted laboratory interface
- Before/After code panels
- Animated "revival bar" with lightning flashes
- AI Narration Log describing each transformation
- Vibe switcher: adjust tone live (Mentor ↔ Engineer ↔ Necromancer)

---

**"No servers. No backend. Just pure resurrection — right in your browser."**
