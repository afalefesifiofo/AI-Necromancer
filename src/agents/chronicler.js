// Agent 3: The Chronicler — generates documentation

export async function runChronicler(originalFiles, revivedCode, analysis, vibe, kiroAgent) {
  const docs = await kiroAgent.document(
    originalFiles[0].content,
    revivedCode.code,
    analysis
  );

  const narrations = {
    mentor: `Documentation generated. Your code is now well-explained and ready to use. I've included a migration guide.`,
    engineer: `README and changelog created. All changes documented with ${analysis.issues.length} fixes noted.`,
    necromancer: `📜 The chronicle is written! Your resurrection is complete and documented for eternity! The tale of ${analysis.language}'s rebirth!`,
  };

  return {
    ...docs,
    narration: narrations[vibe],
  };
}
