import { expect } from 'chai';
import evaluateGuessRow from '../src/helpers/gameState/evaluateGuessRow';
import evaluateAlpha, { AlphaEvaluation, AlphaMap } from '../src/helpers/gameState/evaluateAlpha';
export { }

describe('evaluate alpha possibilities', () => {

  const testAnswers = ['TRAIN', 'STRAP', 'YIKES'];

  it('should evaluate "correct" and "present" alpha states properly', () => {

    testCase(
      testAnswers,
      [['TRAIL', 'TYPES', 'FINAL']],
      0,
      new Map([
        ['correct', ['T', 'R', 'A', 'I']]
      ])
    )
    testCase(
      testAnswers,
      [['TRAIL', 'TYPES', 'FINAL']],
      1,
      new Map([
        ['present', ['T', 'P', 'S']]
      ])
    )
    testCase(
      testAnswers,
      [['TRAIL', 'TYPES', 'FINAL']],
      2,
      new Map([
        ['correct', ['I']]
      ])
    )

  })
  it('should evaluate "hinted" alpha states properly', () => {

    // Failed due to second "E" in "ELECT" overwriting the "hinted" alpha-state
    testCase(
      testAnswers,
      [['TRASH', 'ELECT', 'LIMIT']],
      0,
      new Map([
        ['correct', ['T', 'R', 'A']],
        ['hinted', ['E', 'I']],
        ['absent', ['H', 'L', 'C', 'M']]
      ])
    )

  })

})

function testCase(
  answers: string[],
  guessRows: string[][],
  bIndex: number,
  expectations: Map<AlphaEvaluation, string[]>
){
  const guessEvals = guessRows.map(guesses => evaluateGuessRow(answers, guesses));
  const aMap = evaluateAlpha(guessRows, guessEvals);
  expectTheseAlphaStates(aMap, bIndex, expectations)
}

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
