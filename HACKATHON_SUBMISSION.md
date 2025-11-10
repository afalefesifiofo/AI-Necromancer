# AI Necromancer - Kiro Hackathon Submission

## 🎯 Category
**Developer Tools & Productivity**

## 💡 Project Overview

**AI Necromancer** is a browser-based tool that resurrects obsolete codebases using Kiro's AI capabilities. Upload any "dead" project — COBOL, PHP 5, Flash, ActionScript — and watch as multi-agent AI analyzes, modernizes, and translates it into modern languages in real-time.

**Tagline:** "We bring legacy code back from the dead — analyzed, re-written, and re-animated with AI."

## 🚀 Key Features

### 1. **Multi-Agent AI Orchestration**
Three specialized AI agents work in sequence:
- **The Archaeologist**: Analyzes code, detects language, identifies issues
- **The Necromancer**: Modernizes or translates to target language
- **The Chronicler**: Generates documentation and changelogs

### 2. **Language Translation**
Transform legacy code into modern languages:
- COBOL → Python (mainframe to modern)
- PHP 5 → JavaScript (old web to Node.js)
- ActionScript → TypeScript (Flash to modern web)
- Any language → Rust/Go (memory-safe rewrites)
- Modernize in-place (same language, latest syntax)

### 3. **Batch Processing**
- Upload entire ZIP archives
- Automatically extracts and processes all code files
- Shows real-time progress with animated UI
- Download all transformed files as ZIP

### 4. **Vibe Coding Integration**
Three distinct AI personalities using Kiro's steering system:
- **Necromancer**: Dramatic and theatrical ("⚡ Behold! Your code rises again!")
- **Mentor**: Educational and patient (explains the "why" behind changes)
- **Engineer**: Precise and technical (facts and metrics)

## 🛠️ Kiro Features Used

### ✅ Steering Documents
Located in `.kiro/steering/`:
- `necromancer.md` - Theatrical, dramatic tone
- `mentor.md` - Educational, patient tone
- `engineer.md` - Precise, technical tone

These steering docs dynamically adjust the AI's personality based on user selection.

### ✅ Vibe Coding
The entire app uses "vibe coding" principles:
- User selects a vibe (Necromancer/Mentor/Engineer)
- AI agents adapt their narration and explanations
- Creates an immersive, themed experience

### ✅ Multi-Agent System
Three specialized agents with distinct roles:
- Each agent has specific prompts and responsibilities
- Agents pass context between each other
- Sequential processing with state management

### ✅ Browser-Based AI
- Fully client-side (no backend required)
- Uses Kiro IDE API when available (`window.kiro.chat()`)
- Graceful fallback to rule-based transformations
- Works standalone or in Kiro IDE

## 🎨 Technical Implementation

### Architecture
```
Frontend: React + Framer Motion (animations)
AI: Kiro API (browser runtime)
Processing: JSZip (archive handling)
Styling: Tailwind CSS (dark "Frankenstein lab" theme)
State: React hooks (local state management)
```

### File Structure
```
ai-necromancer/
├── .kiro/steering/          # Vibe steering documents
├── src/
│   ├── agents/              # Three AI agents
│   ├── components/          # React UI components
│   ├── services/            # Kiro API integration
│   └── utils/               # File processing
├── examples/                # Sample legacy code
└── README.md
```

## 🎭 User Experience

1. **Select Vibe**: Choose AI personality (Necromancer/Mentor/Engineer)
2. **Choose Target**: Modernize or translate to JavaScript/Python/TypeScript/Rust/Go
3. **Upload ZIP**: Drag and drop entire legacy project
4. **Watch Magic**: Real-time progress with lightning effects and narration
5. **Download**: Get modernized/translated code as ZIP with documentation

## 🌟 Innovation Highlights

### 1. **Theatrical Experience**
- Haunted laboratory interface
- Lightning effects during "resurrection"
- Animated progress bars
- Dramatic narration based on selected vibe

### 2. **Practical Utility**
- Solves real problem: legacy code modernization
- Supports 15+ file types
- Batch processes entire projects
- Generates documentation automatically

### 3. **Kiro Integration**
- Showcases steering documents
- Demonstrates vibe coding
- Multi-agent orchestration
- Browser-based AI execution

## 📊 Demo Scenarios

### Scenario 1: COBOL to Python
```
Input: Legacy COBOL mainframe code
Target: Python 3
Vibe: Necromancer
Output: Modern Python with type hints + dramatic narration
```

### Scenario 2: PHP 5 to JavaScript
```
Input: Old PHP web application
Target: JavaScript (ES6+)
Vibe: Mentor
Output: Node.js code + educational explanations
```

### Scenario 3: Flash to TypeScript
```
Input: ActionScript 2.0 game
Target: TypeScript
Vibe: Engineer
Output: Type-safe modern web code + technical changelog
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
http://localhost:5174
```

## 🎯 Why This Wins

1. **Solves Real Problem**: Legacy code modernization is a billion-dollar industry problem
2. **Showcases Kiro**: Uses steering, vibe coding, and multi-agent systems
3. **Polished UX**: Theatrical theme with smooth animations
4. **Practical Tool**: Actually useful for developers
5. **No Backend**: Fully client-side, runs anywhere
6. **Extensible**: Easy to add more languages and features

## 📹 Demo Video Script

1. **Opening** (0:00-0:15)
   - Show haunted lab interface
   - "AI Necromancer - Resurrecting Dead Code"

2. **Feature Tour** (0:15-0:45)
   - Select vibe (show personality change)
   - Choose target language
   - Upload COBOL ZIP

3. **Processing** (0:45-1:15)
   - Watch real-time progress
   - Show lightning effects
   - Display narration chronicle

4. **Results** (1:15-1:45)
   - Expand file cards
   - Show before/after comparison
   - Download modernized ZIP

5. **Closing** (1:45-2:00)
   - "No servers. No backend. Just pure resurrection."

## 🏆 Competition Category Fit

**Developer Tools & Productivity**
- Increases developer productivity by automating legacy code modernization
- Saves countless hours of manual refactoring
- Makes legacy codebases accessible to modern developers
- Educational tool for learning language differences

## 📝 Additional Notes

- All code is original and created during hackathon
- Uses only open-source dependencies
- Fully functional demo available
- Comprehensive documentation included
- Example files provided for testing

## 🔗 Links

- GitHub Repository: [Your repo URL]
- Live Demo: [Deployed URL if available]
- Video Demo: [YouTube/Loom link]

---

**Built with ⚡ by [Your Name]**
**Powered by Kiro AI**
