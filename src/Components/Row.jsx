import React, { useEffect, useState } from 'react';
import scrabbleWords from '../data/172820-scrabble-words';
import Square from './Square';


function Row({ boardIndex, rowIndex, answer, sGuess, sGuessEval, guess, invalid, confirmed }) {

  // Unconfirmed (unused guesses)
  if (!confirmed) {

    const squares = Array(answer.length)
      .fill(undefined)
      .map((e, i) => {


        return <Square
          key={`${boardIndex}-${rowIndex}-${i}`}
          letter={guess[i] || ''}
          state={invalid ? 'invalid' : 'guessing'}
        />;
      });
    return <>{squares}</>;
  }

  // Confirmed guesses
  const squares = [];

  sGuess.split('').forEach((letter, lIndex) => {
    const state = sGuessEval ? sGuessEval[lIndex] : 'absent'
    squares.push(<Square
      key={`${boardIndex}-${rowIndex}-${lIndex}`}
      letter={letter}
      state={state}
    />);
  })

  return (
    <>{squares}</>
  );
}

export default Row;