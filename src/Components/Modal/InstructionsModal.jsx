import React from 'react';
import styled from 'styled-components';

import Modal from './Modal';

function InstructionsModal({ handleClose }) {
  return (
    <Modal handleClose={handleClose}>
      <div>
        <h2>How to Play</h2>
        <p>Guess the THORDLE in five tries.</p>
        <p>Each guess must be a valid five-letter word. Hit the enter button to submit.</p>
        <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
        <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
        <p>**Green** means the guessed letter was correct.</p>
        <p>**Yellow** means the guessed letter is in the word, but not at this location.</p>
        <p>**Purple** means the guessed letter is in a different word.</p>
      </div>
    </Modal>
  );
}

export default InstructionsModal;