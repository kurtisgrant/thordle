const CONFIRMED = 'confirmed';
const PRESENT = 'present';
const ELSEWHERE = 'elsewhere';
const ABSENT = 'absent';

const colorMap = {
  guessing: '#888888',
  confirmed: '#538d4e',
  present: '#bf9f3b',
  elsewhere: '#805285',
  absent: '#555555'
};

const answers = ['LIGHT', 'VISIT', 'GRAPE'];
const submittedGuesses = [
  ['REACT', 'PIOUS', 'STATE'],
  ['SMART', 'TIMES', 'TRACE'],
  ['FLINT', 'LISTS', 'GRAPE']
];

class GameState {
  constructor(answers, guesses) {
    this.answers = answers;
    this.guesses = guesses;

    // Map of alphabet. Each letter object contains:
    // letter, numInAnswers, boardStates, ansIndices
    // BoardStates can be: unknown|absent|hinted|present|confirmed
    // Methods for updating boardStates:
    // setAbsent, setPresent, setConfirmed, setHinted
    this.alphaMap = makeAlphaMap(answers);

    // 2D array of letters for each answer
    // State can be:
    // hidden, inGame, inWord, found
    this.answerStates = answers
      .map(answer => answer.split('')
        .map(letter => 'hidden'));

    // Loop through submitted guesses
    for (let i = 0; i < answers.length; i++) {
      const guessArr = guesses[i];
      this.evaluateGuessRow(guessArr);
    }
  }
  evaluateGuessRow(guesses) {
    const aMap = this.alphaMap;
    const mapLettersGuessed = [];

    // For each guessed word: i === boardIndex/answerIndex
    for (let i = 0; i < guesses.length; i++) {
      const guess = guesses[i];
      
      // For each letter: j === letterIndex
      for (let j = 0; j < guess.length; j++) {
        const letter = guess[j];
        const mLetter = aMap.get(letter);
        let state = 'absent'

        // If this letter is in this answer
        if (mLetter.ansIndices[i].length) {
          mLetter.setPresent(i);
          this.answerStates[i][j] = 'inWord';
          if (mLetter.ansIndices[i].contains(j)) {
            mLetter.setConfirmed(i);
            this.answerStates[i][j] = 'found';
          }
        } else {

        }

      }


      // Mark present

    }

    // Find hints (letters guessed in wrong word)

  }
}

function makeAlphaMap(answers) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const aMap = new Map();
  alphabet.split('').forEach(letter => {
    aMap.set(letter, new AlphaLetter(letter, answers));
  });
  return aMap;
}

class AlphaLetter {
  constructor(letter, answers) {
    this.letter = letter;
    this.numInAnswers = 0;
    this.boardStates = []; // unknown, absent, hinted, present, confirmed
    this.ansIndices = [];

    // For each answer
    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      this.boardStates.push('unknown');

      const indicesInThisAnswer = [];
      for (let i = 0; i < answer.length; i++) {
        if (answer[i] === letter) {
          this.numInAnswers++;
          indicesInThisAnswer.push(i);
        }
      }
      this.ansIndices.push(indicesInThisAnswer);
    }
  }
  setAbsent(boardIndex) {
    const prevState = this.boardStates[boardIndex];
    if (['present', 'confirmed'].includes(prevState)) {
      console.error(`Attempted to label "${this.letter}" as absent in board with index 
      #${boardIndex} when it had already been labelled ${prevState}`);
      return;
    }
    this.boardStates[boardIndex] = 'absent';
  }
  setPresent(boardIndex) {
    const prevState = this.boardStates[boardIndex];
    if (prevState === 'absent') {
      console.error(`Attempted to label "${this.letter}" as present in board with index 
      #${boardIndex} when it had already been labelled ${prevState}`);
      return;
    }
    if (prevState === 'confirmed') return;
    this.boardStates[boardIndex] = 'present';
  }
  setConfirmed(boardIndex) {
    const prevState = this.boardStates[boardIndex];
    if (prevState === 'absent') {
      console.error(`Attempted to label "${this.letter}" as confirmed in board with index 
      #${boardIndex} when it had already been labelled ${prevState}`);
      return;
    }
    this.boardStates[boardIndex] = 'confirmed';
  }
  setHinted(boardIndex) {
    const prevState = this.boardStates[boardIndex];
    if (prevState === 'absent') {
      console.error(`Attempted to label "${this.letter}" as hinted in board with index 
      #${boardIndex} when it had already been labelled ${prevState}`);
      return;
    }
    this.boardStates[boardIndex] = 'hinted';
  }
}





















class BoardState {
  constructor(answer, index) {
    this.answer = answer;
    this.boardIndex = index;

    this.answerArr = [];
    this.alphaMap = makeAlphaMap();

    // Push indices of answer letters onto
    // their inAnswer prop in the alphaMap
    for (let i = 0; i < answer.length; i++) {
      const ansLetter = answer[i];
      const alphaLetter = this.alphaMap.get(ansLetter);
      if (!alphaLetter.inAnswer) {
        alphaLetter.inAnswer = [];
      }
      alphaLetter.inAnswer.push(i);

      // Push AnswerLetter object onto answerArr
      this.answerArr.push(new AnswerLetter(ansLetter, i));
    }
  }
  locallyEvalGuess(guess) {

  }
}