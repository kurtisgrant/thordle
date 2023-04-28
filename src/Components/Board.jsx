import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import scrabbleWords from '../data/172820-scrabble-words';
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
  const { boardIndex, bGuesses, bGuessEvals, answer, curGuesses, boardRefs } = props;
  const [isInvalid, setInvalid] = useState(false)

  const curGuess = curGuesses[boardIndex]

  useEffect(() => {

    if (curGuess.length === 5) {
      const valid = scrabbleWords.includes(curGuess.toLowerCase());
      if (!valid){
        setInvalid(true);
      }
    } else {
      if (isInvalid) setInvalid(false);
    }
  }, [curGuess])

  const Rows = [0, 1, 2, 3, 4].map(rowIndex => {
    let confirmed, rowInvalid, rowGuess = '', rowEvals;

    if (rowIndex <= bGuesses.length - 1) {
      // If this row is a submitted guess
      confirmed = true;
      rowGuess = bGuesses[rowIndex];
      rowEvals = bGuessEvals[rowIndex];

    } else if (rowIndex === bGuesses.length) {
      // If this row is for current guesses
      rowGuess = curGuess;
      rowInvalid = isInvalid;
    }

    const rowProps = {
      key: `${boardIndex}-${rowIndex}`,
      guess: rowGuess,
      guessEval: rowEvals,
      answer,
      invalid: rowInvalid,
      confirmed,
      rowIndex,
      boardIndex
    };
    return <Row {...rowProps} />;
  });

  return (
    <BoardWrapper>
      <StyledBoard ref={el => boardRefs.current[boardIndex] = el}>
        {Rows}
      </StyledBoard>
    </BoardWrapper>
  );
}

export default Board;