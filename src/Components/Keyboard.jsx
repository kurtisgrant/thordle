import React from 'react';
import Key from './Key';
import styled from 'styled-components';

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

function Keyboard() {

  const qweKeyRow = [];
  const qweLetters = 'qwertyuiop';
  for (let letter of qweLetters) {
    qweKeyRow.push(<Key key={letter}>{letter}</Key>);
  }

  const asdKeyRow = [];
  const asdLetters = 'asdfghjkl';
  for (let letter of asdLetters) {
    asdKeyRow.push(<Key key={letter}>{letter}</Key>);
  }

  const zxcKeyRow = [];
  const zxcLetters = 'zxcvbnm';
  for (let letter of zxcLetters) {
    zxcKeyRow.push(<Key key={letter}>{letter}</Key>);
  }

  return (
    <StyledKeyboard>
      <KeyRowWrapper>{qweKeyRow}</KeyRowWrapper>
      <KeyRowWrapper>{asdKeyRow}</KeyRowWrapper>
      <KeyRowWrapper>{zxcKeyRow}</KeyRowWrapper>
    </StyledKeyboard>
  );
}

export default Keyboard;