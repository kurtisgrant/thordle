import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const colorMap = {
  guessing: '#888888',
  absent: '#555555',
  present: '#bf9f3b',
  confirmed: '#538d4e',
  elsewhere: '#6E4656'
};

const StyledSquare = styled(motion.div)`
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
    return `border: ${props.letter ? '#ffffff60' : '#ffffff30'} solid 2px;`;
  }
  };
  ${props => {
    if (props.state === 'guessing') return;
    return `background-color: ${colorMap[props.state]};`;
  }};
`;

function Square(props) {
  const [transformY, setTransformY] = useState(0);

  useEffect(() => {
    if (props.letter?.length) {
      setTransformY(-3);
      setTimeout(() => setTransformY(0), 100);
    }
  }, [props.letter]);

  return (
    <StyledSquare
      {...props}
      animate={{ y: transformY }}
    >{props.letter?.toUpperCase()}</StyledSquare>
  );
}

export default Square;