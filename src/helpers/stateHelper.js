

class Game {
  constructor(answers, guessRows) {
    this.answers = answers;
    this.guesses = guesses;

    this.tileRows = guessRows
      .map((guessRow, rowIndex) => {
        return new TileRow(this, guessRow, rowIndex)
      });
  }
}

class TileRow {
  constructor(game, guessRow, rowIndex) {
    this.game = game;
    this.tiles = guessRow.map((guess, boardIndex) => {
      return guess
        .split('')
        .map((letter, letterIndex) => {
          return new Tile(letter, answers, boardIndex, rowIndex, letterIndex);
        });
    });
  }
}

class Tile {
  constructor(letter, answers, boardIndex, rowIndex, letterIndex) {
    this.
  }
}