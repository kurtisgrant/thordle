import React, { useEffect, useState } from 'react';
import Square from './Square';


function Row({ boardIndex, rowIndex, answer, tileObjs, guess, confirmed }) {

  // Unconfirmed (unused guesses)
  if (!confirmed) {
    const squares = Array(answer.length)
      .fill(undefined)
      .map((e, i) => {
        return <Square
          key={`${boardIndex}-${rowIndex}-${i}`}
          letter={guess[i] || ''}
          state='guessing'
        />;
      });
    return <>{squares}</>;
  }

  // Confirmed guesses
  const squares = [];

  tileObjs.forEach(t => {
    squares.push(<Square
      key={`${t.boardIndex}-${t.rowIndex}-${t.letterIndex}`}
      letter={t.letter}
      state={t.state}
    />);
  })


  // const states = Array(answer.length).fill('absent');

  // // Set state for correct letters & 
  // // create array of letters still not found
  // const lettersNotFoundFromWord = answer.split('').filter((lett, i) => {
  //   if (guess.length - 1 < i) return true;
  //   if (lett === guess[i]) {
  //     states[i] = 'confirmed';
  //     return false;
  //   }
  //   return true;
  // });

  // // Set state for letters out of place &
  // // add square components to squares array
  // for (let i = 0; i < answer.length; i++) {
  //   if (lettersNotFoundFromWord.includes(guess[i]) && states[i] === 'absent') {
  //     states[i] = 'present';
  //     const ind = lettersNotFoundFromWord.indexOf(guess[i]);
  //     lettersNotFoundFromWord[ind] = '';
  //   }
  //   if (states[i] === 'absent') {
  //     const elsewhere = answers.some((ans, ind) => {
  //       const letterPresent = ans.includes(guess[i]);
  //       if (letterPresent && !submittedGuesses[rowIndex][ind].includes(guess[i])) {
  //         return true;
  //       }
  //     })
  //     if (elsewhere) states[i] = 'elsewhere';
  //   }
  //   squares.push(<Square
  //     key={`${boardIndex}-${rowIndex}-${i}`}
  //     letter={guess[i]}
  //     state={states[i]}
  //   />);
  // }
  return (
    <>{squares}</>
  );
}

export default Row;