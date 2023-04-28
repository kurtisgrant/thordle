import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import Board from './Board';

const BoardsWrapper = styled.div`
width: 100%;
display: flex;
gap: 2rem;
max-height: calc(var(--vh, 1vh) * 60);
overflow-x: scroll;
scrollbar-width: none;
&::-webkit-scrollbar { width: 0 !important }
`;
const Spacer = styled.div`
min-width: 45vw;
flex: 0.5;
`;

function GameBoards(props) {
  return (
    <BoardsWrapper>
        <Spacer ></Spacer>
        {props.answers.map((answer, i) => {
          const bGuesses = props.guesses?.map(row => row[i]) || [];
          const bGuessEvals = props.guessEvals.map(row => row[i]);
          return <Board
            key={i}
            boardIndex={i}
            boardRefs={props.boardRefs}
            {...{ answer, bGuesses, bGuessEvals, ...props }}
          />;
        })}
        <Spacer ></Spacer>
    </BoardsWrapper>
  );
}

export default GameBoards;