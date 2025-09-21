// This function calculates the Levenshtein distance between two strings.
// It's a measure of how different two words are.
const calculateLevenshteinDistance = (a, b) => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) {
    matrix[0][i] = i;
  }
  for (let j = 0; j <= b.length; j++) {
    matrix[j][0] = j;
  }

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // Deletion
        matrix[j - 1][i] + 1, // Insertion
        matrix[j - 1][i - 1] + cost // Substitution
      );
    }
  }

  return matrix[b.length][a.length];
};

// This function finds the closest match from a list of words.
export const getClosestMatch = (input, wordList) => {
  let closestWord = null;
  let minDistance = Infinity;
  // We set a threshold to avoid suggesting completely unrelated words.
  // For example, if the user types "apple", we don't want to suggest "arbok".
  const threshold = 3;

  for (const word of wordList) {
    const distance = calculateLevenshteinDistance(input, word);
    if (distance < minDistance) {
      minDistance = distance;
      closestWord = word;
    }
  }

  // Only return a suggestion if it's reasonably close to the input.
  return minDistance <= threshold ? closestWord : null;
};
