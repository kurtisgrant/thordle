import { expect } from 'chai';
import evaluateGuessRow from '../src/helpers/gameState/evaluateGuessRow';
import evaluateAlpha, { AlphaEvaluation, AlphaMap } from '../src/helpers/gameState/evaluateAlpha';
export { }

describe('evaluate alpha possibilities', () => {

  const testAnswers = ['TRAIN', 'STRAP', 'YIKES'];

  const testGuessRows = [
    ['TRASH', 'ELECT', 'LIMIT'],
    ['TRAIL', 'TYPES', 'FINAL']
  ]

  const testGuessEvals = testGuessRows.map(row => evaluateGuessRow(testAnswers, row))

  const testAlphaMap1 = evaluateAlpha([testGuessRows[0]], [testGuessEvals[0]]);
  const testAlphaMap2 = evaluateAlpha([testGuessRows[1]], [testGuessEvals[1]]);


  it('should evaluate "correct" and "present" alpha states properly', () => {

    expectTheseAlphaStates(testAlphaMap2, 0, new Map([
      ['correct', ['T', 'R', 'A', 'I']]
    ]))
    expectTheseAlphaStates(testAlphaMap2, 1, new Map([
      ['present', ['T', 'P', 'S']]
    ]))
    expectTheseAlphaStates(testAlphaMap2, 2, new Map([
      ['correct', ['I']]
    ]))

  })
  it('should evaluate "hinted" alpha states properly', () => {

    expectTheseAlphaStates(testAlphaMap1, 0, new Map([
      ['correct', ['T', 'R', 'A']],
      ['hinted', ['E', 'I']],
      ['absent', ['H', 'L', 'C', 'M', 'T']]
    ]))
  })

})


function expectTheseAlphaStates(
  aMap: AlphaMap,
  bIndex: number,
  expectations: Map<AlphaEvaluation, string[]>
): void {
  aMap.forEach((alphaArr, letter) => {
    expectations.forEach((expectedLettersArr, expectedEvaluation) => {
      if (!expectedLettersArr.includes(letter)) return;
      const evaluation = alphaArr[bIndex]
      expect(evaluation).to.equal(expectedEvaluation);
    })
  })

}




function testCase(answers: string[], guessRows: string[][], expected: Map<string, string[]>) {
  // const evals = evaluateGuessRow(answers, guesses);
  // console.log('\n\nAnswers: ', answers)
  // console.log('Guesses: ', guesses)
  // console.log('Evaluation: ', evals)
  // expected.forEach((codedExpectation, bIndex) => {
  //   const answer = answers[bIndex];
  //   const guess = guesses[bIndex];
  //   return codedExpectation.split('').forEach((c, lIndex) => {
  //     const evl = evals[bIndex][lIndex];
  //     const guessedLetter = guesses[bIndex][lIndex];
  //     if (c === '_') return;
  //     const negated = /^[a-z]*$/.test(c);
  //     const cLower = c.toLowerCase();

  //     let state: string | undefined;
  //     switch (cLower) {
  //       case 'a':
  //         state = 'absent';
  //         break
  //       case 'e':
  //         state = 'elsewhere'
  //         break
  //       case 'p':
  //         state = 'present'
  //         break
  //       case 'c':
  //         state = 'correct'
  //         break
  //       default:
  //         console.error('Invalid expectation provided');
  //     }

  //     const errMsg = `'${guessedLetter}'[${lIndex}] of guess ${guess} for answer ${answer}`

  //     if (!negated) {
  //       expect(evl, errMsg).to.equal(state);
  //     } else {
  //       expect(evl, errMsg).to.not.equal(state);
  //     }
  //   })
  // });

}