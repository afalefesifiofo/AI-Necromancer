// Agent 1: The Archaeologist — detects language, structure, and purpose

export async function runArchaeologist(files, vibe, kiroAgent) {
  const file = files[0];
  const analysis = await kiroAgent.analyze(file.content, file.name);
  
  const narrations = {
    mentor: `I've examined your ${analysis.language} code. Found ${analysis.lineCount} lines with ${analysis.issues.length} areas to improve. Let's modernize this together.`,
    engineer: `Analysis complete: ${analysis.language} detected. ${analysis.lineCount} lines, ${analysis.issues.length} issues identified.`,
    necromancer: `⚡ Behold! Ancient ${analysis.language} emerges from the crypt... ${analysis.lineCount} lines of forgotten magic! I sense ${analysis.issues.length} curses to break!`,
  };

  return {
    ...analysis,
    narration: narrations[vibe],
  };
}
