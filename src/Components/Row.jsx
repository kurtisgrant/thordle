import React from 'react'
import Square from './Square'


function Row(props) {

  const squares = [];
  if (!props.confirmed) {
    for (let i = 0; i < 5; i++) {
      const lett = props.guess[i];
        squares.push(<Square 
        key={`${props.row}-${i}`} 
        letter={lett || ''} 
        state='guessing' 
        />)
    }
  } else {
    const states = Array(5).fill('absent');
    const remainingLetts = props.word.split('').filter((lett, i) => {
      if (props.guess.length -1 < i) return true;
      if (lett === props.guess[i]) {
        states[i] = 'confirmed'
        return false
      }
      return true
    });
    for (let i = 0; i < 5; i++) {
      if (remainingLetts.includes(props.guess[i]) && states[i] === 'absent') {
        states[i] = 'present';
        const ind = remainingLetts.indexOf(props.guess[i]);
        remainingLetts[ind] = ''
      }
      squares.push(<Square
        key={`${props.row}-${i}`} 
        letter={props.guess[i] || ''} 
        state={states[i]}
        />)
    }
  }


  return (
    <>{squares}</>
  )
}

export default Row