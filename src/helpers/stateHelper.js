

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
          return new Tile(this, letter, boardIndex, rowIndex, letterIndex);
        });
      });
    });
  }
  evaluateGuessRow(rowIndex) {

    
    
    const guessRow = this.guessRows[rowIndex];
    const rowTiles = this.tiles[rowIndex];
    
    // Main guess loop
    guessRow.forEach((guess, bIndex) => {
      const gAnswerStates = this.answerStates[bIndex]

      const guessTiles = rowTiles[bIndex];
      // const aStates = rowAnswerStates[bIndex];
      const answer = this.answers[bIndex];

      // Set state for correct letters & 
      // create arrays of letters still not found
      const unaccountedFor = gAnswerStates
        .filter((aLetterObj, lIndex) => {
          const tile = guessTiles[lIndex];

          if (aLetterObj.letter === guess[lIndex]) {
            // Set answerLetter's state to confirmed and
            // don't include in lettersNotFoundFromWords
            aLetterObj.knownState = 'location'
            tile.state = 'correct'
            return false;
          }
          return true;
        });

      // Set state for letters out of place
      guess.split('').forEach((guessLetter, lIndex) => {
        const tile = guessTiles[lIndex];
        const letterUnaccountedFor = unaccountedFor.includes(guessLetter);
        if (letterUnaccountedFor && aStates[lIndex] === 'hidden') {
          aStates[lIndex] = 'present';
          const foundIndex = unaccountedFor.indexOf(guessLetter);
          unaccountedFor.splice(foundIndex, 1);
        }
      });



    });

  }
  getGuessWord(boardIndex, rowIndex) {
    return this.tiles[rowIndex][boardIndex];
  }
}

class Tile {
  constructor(game, letter, boardIndex, rowIndex, letterIndex) {
    this.game = game;
    this.letter = letter;
    this.boardIndex = boardIndex;
    this.rowIndex = rowIndex;
    this.letterIndex = letterIndex;

    this.answerWord = answers[boardIndex];
    this.answerLetter = this.answerWord[letterIndex];
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
    this.knownState = 'unknown' // unknown, hinted, presence, location
  }
  know(state) {
    const prev = this.knownState;
    if (state === 'hinted') {

      if (['location', 'presence'].includes(prev)) return;
      this.knownState = 'hinted'

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