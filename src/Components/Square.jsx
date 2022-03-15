import React from 'react';
import styled from 'styled-components';

const StyledSquare = styled.div`
  box-sizing: border-box;
  font-weight: 800;
  font-size: 1.6rem;
  display: grid;
  place-items: center;
  color: white;
  width: 100%;
  height: 55px;
  ${props => {
    if (props.state !== 'guessing') return;
    return `border: ${props.letter ? '#ffffff60' : '#ffffff40'} solid 2px;`
    }
  }}
  ${props => {
    switch(props.state) {
      case 'guessing':
        return
      case 'correct':
        return 'background-color: #538d4e;'
      case 'incorrect':
        return 'background-color: #444'
      case 'partial':
        return 'background-color: #bf9f3b'
    }
  }}
`;

function Square(props) {

  return (
    <StyledSquare letter={props.letter} state={props.state}>{props.letter?.toUpperCase()}</StyledSquare>
  );
}

export default Square;