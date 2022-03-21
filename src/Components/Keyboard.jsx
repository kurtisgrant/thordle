import React from 'react';
import Key from './Key';
import styled from 'styled-components';
import { ReactComponent as Backspace } from '../assets/delete.svg';

const KeyRowWrapper = styled.div`
display: flex;
max-height: 3.2rem;
min-height: 1.6rem;
flex: 1;
width: 100%;
justify-content: center;
align-items: center;
flex-direction: row;
gap: 3px;
`;
const StyledKeyboard = styled.div`
display: flex;
padding: 0 0 1rem 0;
flex: 1;
max-height: 12rem;
width: 100%;
flex-direction: column;
align-items: center;
justify-content: flex-end;
gap: 3px;
`;

function Keyboard({ word, guesses, addLetter, removeLetter, submitGuess }) {

  const letterRows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
  const keyRows = [];

  for (let lRow of letterRows) {
    const keyRow = [];
    for (let letter of lRow) {
      const state = getLetterState(letter, word, guesses);
      keyRow.push(<Key
        key={letter}
        state={state}
        onClick={() => addLetter(letter)}
      >{letter}</Key>);
    }
    keyRows.push(keyRow);
  }

  return (
    <StyledKeyboard>
      <KeyRowWrapper>{keyRows[0]}</KeyRowWrapper>
      <KeyRowWrapper>{keyRows[1]}</KeyRowWrapper>
      <KeyRowWrapper>
        <Key onClick={submitGuess} wide style={{fontSize: '0.9rem'}}>ENTER</Key>
        {keyRows[2]}
        <Key onClick={removeLetter} wide><Backspace /></Key>
      </KeyRowWrapper>
    </StyledKeyboard>
  );
}


function getLetterState(lett, word, guesses) {
  const letterIndicesInWord = [];
  for (let i = 0; i < word.length; i++) {
    if (word[i] === lett) {
      letterIndicesInWord.push(i);
    }
  }

  let used, present, confirmed;

  for (let guess of guesses) {
    if (guess.includes(lett)) used = true;
    if (word.includes(lett) && used) present = true;

    for (let location of letterIndicesInWord) {
      if (guess[location] === lett) confirmed = true;
    }
  }

  return confirmed ? 'confirmed' :
    present ? 'present' :
      used ? 'absent' :
        'unused';
}

export default Keyboard;