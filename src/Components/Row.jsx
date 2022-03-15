import React from 'react'
import Square from './Square'


function Row({rowInd, word, guess, confirmed}) {

  const squares = [];
  if (!confirmed) {
    for (let i = 0; i < 5; i++) {
      const lett = guess[i];
        squares.push(<Square 
        key={`${rowInd}-${i}`} 
        letter={lett || ''} 
        state='guessing' 
        />)
    }
  } else {
    const states = Array(5).fill('incorrect');
    const remainingLetts = word.split('').filter((lett, i) => {
      if (lett === guess[i]) {
        states[i] = 'correct'
        return false
      }
      return true
    });
    for (let i = 0; i < 5; i++) {
      if (remainingLetts.includes(guess[i]) && states[i] === 'incorrect') {
        states[i] = 'partial';
        const ind = remainingLetts.indexOf(guess[i]);
        remainingLetts[ind] = ''
      }
      squares.push(<Square
        key={`${rowInd}-${i}`} 
        letter={guess[i] || ''} 
        state={states[i]}
        />)
    }
  }


  return (
    <>{squares}</>
  )
}

export default Row