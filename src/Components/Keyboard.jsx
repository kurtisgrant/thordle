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

function Keyboard({ addLetter, removeLetter, submitGuess }) {

  const qweKeyRow = [];
  const qweLetters = 'QWERTYUIOP';
  for (let letter of qweLetters) {
    qweKeyRow.push(<Key
      key={letter}
      onClick={() => addLetter(letter)}
    >{letter}</Key>);
  }

  const asdKeyRow = [];
  const asdLetters = 'ASDFGHJKL';
  for (let letter of asdLetters) {
    asdKeyRow.push(<Key
      key={letter}
      onClick={() => addLetter(letter)}
    >{letter}</Key>);
  }

  const zxcKeyRow = [];
  const zxcLetters = 'ZXCVBNM';
  for (let letter of zxcLetters) {
    zxcKeyRow.push(<Key
      key={letter}
      onClick={() => addLetter(letter)}
    >{letter}</Key>);
  }

  return (
    <StyledKeyboard>
      <KeyRowWrapper>{qweKeyRow}</KeyRowWrapper>
      <KeyRowWrapper>{asdKeyRow}</KeyRowWrapper>
      <KeyRowWrapper>
        <Key onClick={submitGuess} wide>Enter</Key>
        {zxcKeyRow}
        <Key onClick={removeLetter} wide><Backspace /></Key>
      </KeyRowWrapper>
    </StyledKeyboard>
  );
}

export default Keyboard;