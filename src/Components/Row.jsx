import React, { useEffect, useState } from 'react';
import Square from './Square';


function Row({ row, word, guess, confirmed }) {
  // Unconfirmed (unused guesses)
  if (!confirmed) {
    const squares = Array(word.length)
      .fill(undefined)
      .map((e, i) => {
        return <Square
          key={`${row}-${i}`}
          letter={guess[i] || ''}
          state='guessing'
        />;
      });
    return <>{squares}</>;
  }

  // Confirmed guesses
  const squares = [];
  const states = Array(word.length).fill('absent');

  // Set state for correct letters & 
  // create array of letters still not found
  const lettersNotFoundFromWord = word.split('').filter((lett, i) => {
    if (guess.length - 1 < i) return true;
    if (lett === guess[i]) {
      states[i] = 'confirmed';
      return false;
    }
    return true;
  });

  // Set state for letters out of place &
  // add square components to squares array
  for (let i = 0; i < word.length; i++) {
    if (lettersNotFoundFromWord.includes(guess[i]) && states[i] === 'absent') {
      states[i] = 'present';
      const ind = lettersNotFoundFromWord.indexOf(guess[i]);
      lettersNotFoundFromWord[ind] = '';
    }
    squares.push(<Square
      key={`${row}-${i}`}
      letter={guess[i]}
      state={states[i]}
    />);
  }
  return (
    <>{squares}</>
  );
}

export default Row;