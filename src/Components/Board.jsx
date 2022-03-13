import React from 'react';
import styled from 'styled-components';
import Square from './Square';

const StyledBoard = styled.div`
  display: grid;
  gap: 0.4em;
  grid-template-columns: repeat(5, 1fr);
  min-height: 300px;
  width: 300px;
  // background-color: purple;
`;

function Board() {
  return (
    <StyledBoard>
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
      <Square key='a' letter='a' />
    </StyledBoard>
  );
}

export default Board;