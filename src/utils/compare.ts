export function compare(original: string, attempt: string) {
  const origWords = original.trim().toLowerCase().split(/\s+/);
  const attemptWords = attempt.trim().toLowerCase().split(/\s+/);

  let errors = 0;
  const result: { word: string; correct: boolean }[] = [];

  for (let i = 0; i < origWords.length; i++) {
    const correct = origWords[i] === attemptWords[i];
    if (!correct) errors++;
    result.push({ word: attemptWords[i] || "", correct });
  }

  return {
    total: origWords.length,
    errors,
    result,
  };
}
