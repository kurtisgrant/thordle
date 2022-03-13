import React from 'react';
import styled from 'styled-components';

const StyledSquare = styled.div`
  background-color: #333;
  display: grid;
  place-items: center;
  color: white;
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

function Square(props) {

  return (
    <StyledSquare>{props.letter}</StyledSquare>
  );
}

export default Square;