import { expect } from 'chai';
import evaluateGuessRow from '../src/helpers/gameState/evaluateGuessRow';
export { }

xdescribe('Evaluate row of guesses', () => {

  it('should evaluate test cases properly', () => {
    testCase(
      ['REACT', 'PIOUS', 'STATE'],
      ['WRONG', 'STORY', 'HORNY'],
      ['APAAA', 'PECAA', 'AAAAA']
    )
    testCase(
      ['GOOSE', 'PARTY', 'GRAPE'],
      ['MONEY', 'PUPPY', 'SWELL'],
      ['ACAPA', 'CAEAC', 'EAPAA']
    )
  })
  it('should evaluate "correct" tiles properly', () => {
    testCase(
      ['REACT', 'PIOUS', 'STATE'],
      ['REACT', 'PIOUS', 'STATE'],
      ['CCCCC', 'CCCCC', 'CCCCC']
    )
    testCase(
      ['PUFFY', 'SOLVE', 'TIGHT'],
      ['SOLVE', 'TIGHT', 'PUFFY'],
      ['ccccc', 'ccccc', 'ccccc']
    )
    testCase(
      ['REACT', 'PIOUS', 'STATE'],
      ['ROUND', 'LIMIT', 'PLANE'],
      ['Ccccc', 'cCccc', 'ccCcC']
    )
  })
  it('should evaluate "present" tiles properly', () => {
    testCase(
      ['BOOTH', 'STRAP', 'LIMIT'],
      ['COLON', 'AGREE', 'SPILL'],
      ['pppPp', 'Ppppp', 'ppPPp']
    )
    testCase(
      ['YOUNG', 'TREAT', 'RHYME'],
      ['ROUND', 'GRAPE', 'BRING'],
      ['ppppp', 'ppPpP', 'pPppp']
    )
  })
  it('should evaluate "elsewhere" tiles properly', () => {
    testCase(
      ['PUFFY', 'SOLVE', 'TIGHT'],
      ['SOLVE', 'TIGHT', 'PUFFY'],
      ['EEEEE', 'EEEEE', 'EEEEE']
    )
    testCase(
      ['GRAPE', 'PARTY', 'YIKES'],
      ['SOLVE', 'STORY', 'PUPPY'],
      ['Eeeee', 'Eeeee', 'EeEee']
    )
  })
})

function testCase(answers: string[], guesses: string[], expected: string[]) {
  const evals = evaluateGuessRow(answers, guesses);
  // console.log('\n\nAnswers: ', answers)
  // console.log('Guesses: ', guesses)
  // console.log('Evaluation: ', evals)


  expected.forEach((codedExpectation, bIndex) => {
    const answer = answers[bIndex];
    const guess = guesses[bIndex];
    return codedExpectation.split('').forEach((c, lIndex) => {
      const evl = evals[bIndex][lIndex];
      const guessedLetter = guesses[bIndex][lIndex];
      if (c === '_') return;
      const negated = /^[a-z]*$/.test(c);
      const cLower = c.toLowerCase();

      let state: string | undefined;
      switch (cLower) {
        case 'a':
          state = 'absent';
          break
        case 'e':
          state = 'elsewhere'
          break
        case 'p':
          state = 'present'
          break
        case 'c':
          state = 'correct'
          break
        default:
          console.error('Invalid expectation provided');
      }

      const errMsg = `'${guessedLetter}'[${lIndex}] of guess ${guess} for answer ${answer}`

      if (!negated) {
        expect(evl, errMsg).to.equal(state);
      } else {
        expect(evl, errMsg).to.not.equal(state);
      }
    })
  });

}