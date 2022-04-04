import { TileEvaluation } from "./evaluateGuessRow";

export type AlphaEvaluation = ('unknown' | 'absent' | 'hinted' | 'present' | 'correct');
export type AlphaMap = Map<string, AlphaEvaluation[]>;

export default function evaluateAlpha(
  guessRows: string[][],
  guessEvals: TileEvaluation[][][]
): AlphaMap {

  const alphaMapKeyValsArray: [string, AlphaEvaluation[]][] =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => {
      const letterStates: AlphaEvaluation[] = new Array(guessRows[0].length).fill('unknown');
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
          case 'correct':
            alphaArr[bIndex] = 'correct';
            break;
          case 'present':
            if (prev === 'correct') break;
            alphaArr[bIndex] = 'present';
            break;
          case 'absent':
            if (prev === ('correct' || 'present')) break;
            alphaArr[bIndex] = 'absent';
            if (alphaArr.some(s => s === ('correct' || 'present' || 'hinted'))) break;
            alphaArr.fill('absent');
            break;
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
      if (alphaEval !== 'unknown') return;
      alphaArr[i] = 'hinted';
    })
  })

  return aMap;
}

