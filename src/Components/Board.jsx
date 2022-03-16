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

function Board({word, current, guesses}) {

  const rows = []
  for (let i = 0; i < 6; i++) {
    if (i <= guesses.length -1) {
      rows.push(<Row key={i} row={i} word={word} guess={guesses[i]} confirmed />)
    } else if (i === guesses.length) {
      rows.push(<Row key={i} row={i} word={word} guess={current} />)
    } else {
      rows.push(<Row key={i} row={i} word={word} guess="" />)
    }
  }

  return (
    <StyledBoard>
      {rows}
    </StyledBoard>
  );
}

export default Board;