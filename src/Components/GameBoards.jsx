import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import Board from './Board';

const BoardsWrapper = styled(motion.div)`
width: 100%;
display: flex;
gap: 2rem;
max-height: calc(var(--vh, 1vh) * 60);
overflow-x: scroll;
scrollbar-width: none;
&::-webkit-scrollbar { width: 0 !important }
`;

function GameBoards(props) {
  return (
    <BoardsWrapper>
      {props.answers.map((answer, i) => {
        const tiles2D = props.tiles3D.map(row => row[i])
        return <Board
          key={i}
          boardIndex={i}
          {...{ answer, tiles2D, ...props }}
        />;
      })}
    </BoardsWrapper>
  );
}

export default GameBoards;