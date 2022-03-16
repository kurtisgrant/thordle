import React from 'react';
import styled from 'styled-components';

const colorMap = {
  guessing: '#888888',
  absent: '#555555',
  present: '#bf9f3b',
  confirmed: '#538d4e'
};

const StyledSquare = styled.div`
  box-sizing: border-box;
  font-weight: 800;
  font-size: 1.6rem;
  display: grid;
  place-items: center;
  color: white;
  width: 100%;
  height: 55px;
  user-select: none;
  ${props => {
    if (props.state !== 'guessing') return;
    return `border: ${props.letter ? '#ffffff60' : '#ffffff30'} solid 2px;`
    }
  }}
  ${props => {
    if (props.state === 'guessing') return;
    return `background-color: ${colorMap[props.state]};`
  }}
`;

function Square(props) {

  return (
    <StyledSquare letter={props.letter} state={props.state}>{props.letter?.toUpperCase()}</StyledSquare>
  );
}

export default Square;