import React from 'react';
import styled from 'styled-components';
import Row from './Row';

const StyledBoard = styled.div`
  display: grid;
  gap: .3rem;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  max-width: 300px;
`;

function Board() {

  return (
    <StyledBoard>
      <Row word='tease' guess='water' confirmed={true} row={1} />
      <Row word='tease' guess='plate' confirmed={true} row={2} />
      <Row word='tease' guess='stake' confirmed={true} row={3} />
      <Row word='tease' guess='teas' confirmed={false} row={4} />
      <Row word='tease' guess='' confirmed={false} row={5} />
      <Row word='tease' guess='' confirmed={false} row={6} />
    </StyledBoard>
  );
}

export default Board;