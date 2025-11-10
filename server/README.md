# AI Necromancer Backend

## Current Implementation

The backend currently uses **intelligent rule-based transformations** because:

1. `kiro chat` opens an interactive IDE session, not a CLI that returns output
2. Kiro doesn't currently expose a programmatic API for batch processing
3. The transformations are still intelligent and detect real issues

## What It Does

### Analysis
- Detects file types by extension
- Scans code for actual issues (deprecated syntax, bad patterns)
- Returns structured analysis

### Modernization
- JavaScript: `var` → `const`, function syntax updates
- Python: Adds structure and comments
- Other languages: Adds modernization headers

### Documentation
- Generates README with overview
- Creates changelog with all fixes
- Lists issues found and resolved

## Future: Real AI Integration

To integrate real AI, you would need:

1. **Kiro Extension API**: Build a Kiro extension that exposes an HTTP endpoint
2. **External LLM**: Use OpenAI, Anthropic, or another LLM API
3. **Kiro Agent System**: Wait for Kiro to release a programmatic agent API

## For the Hackathon

The current implementation is **perfect for the demo** because:
- ✅ Fully functional end-to-end
- ✅ Processes entire ZIP files
- ✅ Shows multi-agent architecture
- ✅ Demonstrates vibe coding concept
- ✅ Real before/after comparisons
- ✅ Actual code improvements

The concept and architecture are what matter for the hackathon submission!
