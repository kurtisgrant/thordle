import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import Backdrop from './Backdrop';

const StyledModal = styled(motion.div)`
  width: clamp(50%, 700px,75%);
  height: min-content(50%, 300px);
  margin: auto;
  padding: 1rem;
  border: solid white 1px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8rem;
  font-weight: 600;
  h2 {
    text-align: center;
    text-transform: uppercase;
  }
  .close-button {
    position: absolute;
    top: 0;
    right: 0;
    background: none;
    font-size: 1.2rem;
    font-weight: 900;
    color: white;
    outline: none;
    border: none;
    padding: 0.8rem 1rem;
    cursor: pointer;
    :hover {
      opacity: 0.7;
    }
  }
`;

const animationSteps = {
  hidden: {
    y: '-100vh',
    opacity: 0
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500
    }
  },
  exit: {
    y: '100vh',
    opacity: 0
  }
};

function Modal({ children, handleClose }) {
  return (
    <Backdrop onClick={handleClose}>
      <StyledModal
        onClick={(e) => e.stopPropagation()}
        variants={animationSteps}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
        <button className="close-button" onClick={handleClose}>X</button>
      </StyledModal>

    </Backdrop>
  );
}

export default Modal;