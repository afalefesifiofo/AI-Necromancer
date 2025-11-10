// Agent 2: The Necromancer — refactors/translates to modern syntax

export async function runNecromancer(files, analysis, vibe, kiroAgent) {
  const modernCode = await kiroAgent.modernize(files[0].content, analysis);

  const narrations = {
    mentor: `I've refactored your code using modern best practices. The structure is cleaner and more maintainable now.`,
    engineer: `Transformation complete. Applied modern patterns and syntax. ${analysis.issues.length} issues resolved.`,
    necromancer: `⚡ ALIVE! Your code rises again, reborn in modern form! The ancient curses are broken!`,
  };

  return {
    code: modernCode,
    narration: narrations[vibe],
  };
}
