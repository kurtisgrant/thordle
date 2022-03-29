import React from 'react';
import styled from 'styled-components';
import Row from './Row';

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 300px;
  width: 100%;
  flex: 1.5;
`;

const StyledBoard = styled.div`
  display: grid;
  margin: 1rem 0 1rem;
  gap: .3rem;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  max-width: 300px;
`;

function Board(props) {
  const { boardIndex, tiles2D, answer, curGuesses } = props;

  const curGuess = curGuesses[boardIndex];
  const boardGuesses = tiles2D;

  const Rows = [0, 1, 2, 3, 4].map(rowIndex => {
    let confirmed, guess = '';

    if (rowIndex <= boardGuesses.length - 1) {
      // If this row is a submitted guess
      confirmed = true;

    } else if (rowIndex === boardGuesses.length) {
      // If this row is for current guesses
      guess = curGuess;
    }

    const rowProps = {
      key: `${boardIndex}-${rowIndex}`,
      tileObjs: boardGuesses[rowIndex],
      answer,
      guess,
      confirmed,
      rowIndex,
      boardIndex
    };
    return <Row {...rowProps} />;
  });

  return (
    <BoardWrapper>
      <StyledBoard>
        {Rows}
      </StyledBoard>
    </BoardWrapper>
  );
}

export default Board;