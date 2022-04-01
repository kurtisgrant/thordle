
type AlphaStates = ('unknown' | 'absent' | 'hinted' | 'present' | 'correct')
type AnswerStates = ('unknown' | 'hinted' | 'presence' | 'location')
type TileStates = ('absent' | 'elsewhere' | 'present' | 'correct')

export default class GameState {
  guessRows: string[][];
  alphaMap: Map<string, AlphaStates[]>;
  answerStates: AnswerState[][];
  tiles: Tile[][][];
  constructor(answers: string[], guessRows: string[][]) {
    this.guessRows = guessRows;
    this.alphaMap = makeAlphaMap(answers.length);

    // 2D Array of answer letters
    // for tracking what's known 
    // about each through the game.
    // States: unknown, hinted, presence, location
    this.answerStates = answers
      .map((answer, boardIndex) => answer
        .split('')
        .map((letter, letterIndex) => {
          return new AnswerState(letter, answer, letterIndex, boardIndex);
        })
      );

    // Make 3D Array of tiles [guessRows [singleGuesses [letters] ] ]
    this.tiles = [];
    if (guessRows.length) {
      this.tiles = guessRows.map((guessRow, rowIndex) => {
        return guessRow.map((guess, boardIndex) => {
          return guess.split('').map((letter, letterIndex) => {
            const answer = answers[boardIndex];
            return new Tile(letter, guess, answer, boardIndex, rowIndex, letterIndex);
          });
        });
      });
    }

    // Evaluate rows of guesses
    for (let i = 0; i < guessRows.length; i++) {
      this.evaluateGuessRow(i);
    }

    // Populate alpha map
    this.populateAlphaMap();
  }
  evaluateGuessRow(rowIndex: number) {

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

      const hinted: AnswerState[] = [];
      
      guess.split('').forEach((guessLetter, lIndex) => {
        const tile = guessTiles[lIndex];
        if (tile.state !== 'absent') return;


        const found = answerLettsNotKnown.flat().find(aLett => {
          if (aLett.letter !== guessLetter) return false;
          if (aLett.boardIndex === bIndex) return false;
          if (aLett.hintedThisGuess) return false;
          if (!['unknown', 'hinted'].includes(aLett.knownState)) return false;
          return true;
        })

        if (found) {
          tile.state = 'elsewhere';
          found.know('hinted');
          hinted.push(found);
          
          // Ensure this answer letter only leads to 
          // one guess letter being highlighted as 'hinted'
          found.hintedThisGuess = true;
        }
      });
      // Reset 'hintedThisGuess' for next guess
      hinted.forEach(aLett => aLett.hintedThisGuess = false);

    });

  }
  populateAlphaMap() {
    const aMap = this.alphaMap;

    const allTilesArr = this.tiles.flat(10);
    for (let tile of allTilesArr) {
      const tileLetter = tile.letter;
      const letterStates: AlphaStates[] | undefined = aMap.get(tileLetter);

      if (typeof letterStates === 'undefined') continue;
      if (tile.state === 'elsewhere' || tile.state === 'absent') {
        letterStates[tile.boardIndex] = 'absent';
      } else {
        letterStates[tile.boardIndex] = tile.state;
      }
    }

    const allAnswerStatesArr = this.answerStates.flat(10);
    for (let answerState of allAnswerStatesArr) {
      const answerLetter = answerState.letter;
      const letterStates = aMap.get(answerLetter);
      if (typeof letterStates === 'undefined') continue;
      if (answerState.knownState === 'hinted') {
        letterStates[answerState.boardIndex] = 'hinted';
      }
    }
  }

}

class Tile {
  letter: string;
  guess: string;
  answer: string;
  boardIndex: number;
  rowIndex: number;
  letterIndex: number;
  answerLetter: string;
  state: TileStates;

  constructor(letter: string, guess: string, answer: string, boardIndex: number, rowIndex: number, letterIndex: number) {
    this.letter = letter;
    this.answerLetter = answer[letterIndex];
    this.boardIndex = boardIndex;
    this.rowIndex = rowIndex;
    this.letterIndex = letterIndex;

    this.answer = answer;
    this.guess = guess;
    this.state = 'absent';
  }
  tileName() {
    return `Tile B${this.boardIndex}-R${this.rowIndex}-L${this.letterIndex}`;
  }
}

class AnswerState {
  letter: string;
  answer: string;
  letterIndex: number;
  boardIndex: number;
  knownState: AnswerStates;
  hintedThisGuess: boolean;

  constructor(letter: string, answer: string, letterIndex: number, boardIndex: number) {
    this.letter = letter;
    this.answer = answer;
    this.letterIndex = letterIndex;
    this.boardIndex = boardIndex;
    this.knownState = 'unknown';
    this.hintedThisGuess = false;
  }
  know(state: AnswerStates): void {
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
  clearHint(): void {
    if (this.knownState !== 'hinted') return;
    this.knownState = 'unknown';
  }
}

function makeAlphaMap(boards: number): Map<string, AlphaStates[]> {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const aMap = new Map();
  alphabet.split('').forEach(letter => {
    const letterStates = new Array(boards).fill('unknown'); 
    aMap.set(letter, letterStates);
  });
  return aMap;
}
