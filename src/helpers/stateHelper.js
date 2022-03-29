

class Game {
  constructor(answers, guessRows) {
    this.answers = answers;
    this.guessRows = guessRows;

    // 2D Array of answer letters
    // for tracking what's known 
    // about each through the game.
    // States: unknown, hinted, presence, location
    this.answerStates = answers
      .map((answer, boardIndex) => answer
        .split('')
        .map((letter, letterIndex) => {
          return new AnswerState({
            letter,
            answer,
            letterIndex,
            boardIndex
          });
        })
      );

    // Make 3D Array of tiles [guessRows [singleGuesses [letters] ] ]
    this.tiles = guessRows.map((guessRow, rowIndex) => {
      return guessRow.map((guess, boardIndex) => {
        return guess.split('').map((letter, letterIndex) => {
          const answer = this.answers[boardIndex];
          return new Tile(letter, guess, answer, boardIndex, rowIndex, letterIndex);
        });
      });
    });
  }
  evaluateGuessRow(rowIndex) {

    const guessRow = this.guessRows[rowIndex];
    const rowTiles = this.tiles[rowIndex];

    // Guess loop that marks correct & present tiles for each guess
    const answerLettsNotKnown = guessRow.map((guess, bIndex) => {

      const guessTiles = rowTiles[bIndex];
      const gAnswerStates = this.answerStates[bIndex];

      // Set state for correct letters & 
      // create array of letters still not found
      let unaccountedFor = gAnswerStates
        .filter((aLetterObj, lIndex) => {
          const tile = guessTiles[lIndex];

          if (aLetterObj.letter === guess[lIndex]) {
            // Set answerLetter's state to confirmed and
            // don't include in lettersNotFoundFromWords
            aLetterObj.know('location');
            tile.state = 'correct';

            return false;
          }
          return true;
        });

      // Set state for letters present but out of place
      guess.split('').forEach((guessLetter, lIndex) => {
        const tile = guessTiles[lIndex];
        if (tile.state === 'correct') return;

        const foundAnsLett = unaccountedFor.find(aLett => aLett.letter === guessLetter);

        if (foundAnsLett) {
          // Set answerLetter's state to present and
          // remove from unaccountedFor
          foundAnsLett.know('presence');
          tile.state = 'present';
          unaccountedFor.filter(aLett => aLett.letterIndex !== foundAnsLett.letterIndex);
          return;
        }

      });

      return unaccountedFor;
    });

    // Guess loop that marks tiles as elsewhere
    guessRow.forEach((guess, bIndex) => {

      const guessTiles = rowTiles[bIndex];

      guess.split('').forEach((guessLetter, lIndex) => {
        const tile = guessTiles[lIndex];
        if (tile.state !== 'absent') return;

        const foundElsewhere = answerLettsNotKnown
          .flat()
          .filter(aLett => (
            aLett.knownState === 'unknown' &&
            aLett.letter === guessLetter &&
            aLett.boardIndex !== bIndex));

        if (foundElsewhere.length) {

          // console.log('In ELSEWHERE SETTING IF STATEMENT', foundElsewhere, tile);
          tile.state = 'elsewhere';
          foundElsewhere.forEach(aLett => aLett.know('hinted'));
        }
      });

    });

  }

}

class Tile {
  constructor(letter, guess, answer, boardIndex, rowIndex, letterIndex) {
    this.letter = letter;
    this.answerLetter = answer[letterIndex];
    this.boardIndex = boardIndex;
    this.rowIndex = rowIndex;
    this.letterIndex = letterIndex;

    this.answer = answer;
    this.guess = guess;
    this.state = 'absent'; // States: absent, elsewhere, present, correct
  }
  tileName() {
    return `Tile B${this.boardIndex}-R${this.rowIndex}-L${letterIndex}`;
  }
}

class AnswerState {
  constructor(props) {
    this.letter = props.letter,
      this.answer = props.answer,
      this.letterIndex = props.letterIndex,
      this.boardIndex = props.boardIndex,
      this.knownState = 'unknown'; // unknown, hinted, presence, location
  }
  know(state) {
    const prev = this.knownState;
    if (state === 'hinted') {

      if (['location', 'presence'].includes(prev)) return;
      this.knownState = 'hinted';

    } else if (state === 'presence') {

      if (prev === 'location') return;
      this.knownState = 'presence';

    } else if (state === 'location') {

      this.knownState = 'location';

    } else {
      console.error('Invalid state');
    }
  }
}


const answers = ['LIGHT', 'VISIT', 'GRAPE'];
const submittedGuesses = [
  ['REACT', 'PIOUS', 'STATE'],
  ['SMART', 'TIMES', 'TRACE'],
  ['FLINT', 'LISTS', 'GRAPE']
];

const gameState = new Game(answers, submittedGuesses);
console.log('---------------------------------------------------------- 0');
console.dir(gameState, { depth: null });
console.log('---------------------------------------------------------- 1');

gameState.evaluateGuessRow(0);
console.dir(gameState, { depth: null });
console.log('---------------------------------------------------------- 2');
gameState.evaluateGuessRow(1);
console.dir(gameState, { depth: null });
console.log('---------------------------------------------------------- 3');
gameState.evaluateGuessRow(2);
console.dir(gameState, { depth: null });
console.log('---------------------------------------------------------- 4');