import { TileEvaluation } from "./evaluateGuessRow";

export type AlphaEvaluation = ('unknown' | 'absent' | 'hinted' | 'present' | 'correct');
export type AlphaMap = Map<string, AlphaEvaluation[]>;


/**
 * 
 * @param guessRows - A 2D array of 'guess rows', each an array containing three guess strings
 * @param guessEvals - A 3D array of 'guess rows', each an array containing three arrays of 'tile evaluation' strings
 * @returns 
 */
export default function evaluateAlpha(
  guessRows: string[][],
  guessEvals: TileEvaluation[][][]
): AlphaMap {

  const alphaMapKeyValsArray: [string, AlphaEvaluation[]][] =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => {
      const letterStates: AlphaEvaluation[] = new Array(3).fill('unknown');
      return [letter, letterStates];
    });
  const aMap: AlphaMap = new Map(alphaMapKeyValsArray);

  const tilesLabelledElsewhere = [];

  // Rows loop
  for (let rIndex = 0; rIndex < guessRows.length; rIndex++) {
    const guesses = guessRows[rIndex];
    const guessesEvals = guessEvals[rIndex];

    // Boards loop
    for (let bIndex = 0; bIndex < guesses.length; bIndex++) {
      const guessLetters = guesses[bIndex].split('');
      const guessEvals = guessesEvals[bIndex];

      // Letter Loop
      for (let lIndex = 0; lIndex < guessLetters.length; lIndex++) {
        const guessLetter = guessLetters[lIndex];
        const guessEval = guessEvals[lIndex];
        const alphaArr = aMap.get(guessLetter);
        if (typeof alphaArr === 'undefined') continue;

        const prev = alphaArr[bIndex]
        switch (guessEval) {
          // If ever an eval is 'correct', set the letter on this board to correct.
          case 'correct':
            alphaArr[bIndex] = 'correct';
            break;
          // If ever an eval is 'present', set the letter on this board to 'present' unless it's already set to 'correct'.
          case 'present':
            if (prev === 'correct') break;
            alphaArr[bIndex] = 'present';
            break;
          // If ever an eval is 'absent', set the letter on this board to 'absent' unless it's already set to 'correct' or 'present'.
          // Also, if all boards for this letter are currently labelled 'absent' or 'unknown', set all boards to 'absent'. 
          case 'absent':
            if (prev === 'correct' || 
            prev === 'present') break;
            alphaArr[bIndex] = 'absent';
            if (alphaArr.some(s => s === 'correct' || 
            s === 'present' ||
            s === 'hinted')) break;
            alphaArr.fill('absent');
            break;
          // If ever an eval is 'elsewhere', add it to 'tilesLabelledElsewhere' to revisit it later.
          // Also, set the letter on this board to 'absent'.
          case 'elsewhere':
            tilesLabelledElsewhere.push([rIndex, bIndex, lIndex]);
            alphaArr[bIndex] = 'absent';
        }
      }
    }
  }

  tilesLabelledElsewhere.forEach(tileArr => {
    const [rIndex, bIndex, lIndex] = tileArr;
    const letter = guessRows[rIndex][bIndex][lIndex];
    const alphaArr = aMap.get(letter);

    alphaArr?.forEach((alphaEval, i) => {
      if (i === bIndex) return;
      if (alphaEval === 'present' ||
        alphaEval === 'correct') return;
      alphaArr[i] = 'hinted';
    })
  })

  return aMap;
}

