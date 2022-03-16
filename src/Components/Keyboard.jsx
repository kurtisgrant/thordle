import React from 'react';
import Key from './Key';
import styled from 'styled-components';
import { ReactComponent as Backspace } from '../assets/backspace.svg';

const StyledKeyboard = styled.div`
display: flex;
width: 100%;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 3px;
`;
const KeyRowWrapper = styled.div`
display: flex;
width: 100%;
justify-content: center;
flex-direction: row;
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
        <Key onClick={submitGuess} wide>Enter</Key>
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