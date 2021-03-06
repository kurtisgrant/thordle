
export type TileEvaluation = ('absent' | 'elsewhere' | 'present' | 'correct');

export default function evaluateGuessRow(answers: string[], guesses: string[]): TileEvaluation[][] {
  const states: TileEvaluation[][] = answers.map(ans => ans.split('').map(char => 'absent'));


  const remainingInAnswers = [];

  // Loop through guess/answers
  for (let bIndex = 0; bIndex < guesses.length; bIndex++) {
    const answer = answers[bIndex];
    const guess = guesses[bIndex];
    // console.log('\n\nouter loop: ', answer, guess);

    const remainingInAnswer = answer.split('');

    // Loop through letter indices labelling 'correct'
    for (let lIndex = 0; lIndex < answer.length; lIndex++) {
      const answerLetter = answer[lIndex];
      const guessLetter = guess[lIndex];
      // console.log('\ncorrect loop: ', answerLetter, guessLetter);
      // console.log('     rem: ', JSON.stringify(remainingInAnswer));

      if (answerLetter === guessLetter) {
        states[bIndex][lIndex] = 'correct';
        remainingInAnswer[lIndex] = '_'
        // console.log('-correct');
      }
    }

    // Loop through letter indices labelling 'present'
    for (let lIndex = 0; lIndex < answer.length; lIndex++) {
      const guessLetter = guess[lIndex];
      const state = states[bIndex][lIndex];
      // console.log('\npresent loop: ', answerLetter, guessLetter);
      // console.log('     rem: ', JSON.stringify(remainingInAnswer));

      if (remainingInAnswer.includes(guessLetter) && state === 'absent') {
        const location = remainingInAnswer.indexOf(guessLetter);
        states[bIndex][lIndex] = 'present'
        remainingInAnswer[location] = '_'
        // console.log('-present');
      }
    }

    // console.log('EVAL: ', states[bIndex]);

    remainingInAnswers.push(remainingInAnswer);
  }


  for (let bIndex = 0; bIndex < guesses.length; bIndex++) {
    const answer = answers[bIndex];
    const guess = guesses[bIndex];

    const remainingInAnswersCopy = remainingInAnswers.map(i => i.map(j => j));

    for (let lIndex = 0; lIndex < answer.length; lIndex++) {
      if (states[bIndex][lIndex] !== 'absent') continue;

      const guessLetter = guess[lIndex];

      const bLocation = remainingInAnswersCopy.findIndex(ans => ans.includes(guessLetter));
      const found = bLocation >= 0;
      if (found) {
        const lLocation = remainingInAnswersCopy[bLocation].indexOf(guessLetter);
        states[bIndex][lIndex] = 'elsewhere';
        remainingInAnswersCopy[bLocation][lLocation] = '_'
      }

    }
  }

  return states;
}
