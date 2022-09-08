import React from 'react';
import styled from 'styled-components';

import Modal from './Modal';
import Square from '../Square';

const StyledInstructions = styled.div`
  p {
    margin: 0.8rem 0;
  }
  .example-row {
    display: grid;
    gap: .3rem;
    grid-template-columns: repeat(5, 1fr);
    width: 100%;
    max-width: 240px;
  }
  .example-text {
    margin-top: 0.4rem;
    b {
      font-weight: 900;
    }
  }
`;

const SmallerSquare = styled(Square)`
  height: 44px;
  font-size: 1.3rem;
`;

function InstructionsModal({ handleClose }) {
  return (
    <Modal handleClose={handleClose}>
      <StyledInstructions>
        <h2>How to Play</h2>
        <p>Guess the THORDLE in five tries.</p>
        <p>Type your guesses for three valid five-letter words then hit the enter button to submit.</p>
        <p>After submitting your guesses, the color of the tiles will change to show how close your guesses were to the answers.</p>
        <hr />
        <h3>Examples:</h3>
        <div className="example-row">
          <SmallerSquare letter="O" state="correct" />
          <SmallerSquare letter="U" state="guessing" />
          <SmallerSquare letter="I" state="guessing" />
          <SmallerSquare letter="J" state="guessing" />
          <SmallerSquare letter="A" state="guessing" />
        </div>
        <p className="example-text">The letter <b>O</b> is in the correct spot</p>
        <div className="example-row">
          <SmallerSquare letter="D" state="guessing" />
          <SmallerSquare letter="R" state="present" />
          <SmallerSquare letter="O" state="guessing" />
          <SmallerSquare letter="L" state="guessing" />
          <SmallerSquare letter="L" state="guessing" />
        </div>
        <p className="example-text">The letter <b>R</b> is in this word, but in a different spot</p>
        <div className="example-row">
          <SmallerSquare letter="Y" state="guessing" />
          <SmallerSquare letter="A" state="guessing" />
          <SmallerSquare letter="C" state="guessing" />
          <SmallerSquare letter="H" state="elsewhere" />
          <SmallerSquare letter="T" state="guessing" />
        </div>
        <p className="example-text">The letter <b>H</b> is in a different word</p>
        <div className="example-row">
          <SmallerSquare letter="I" state="absent" />
          <SmallerSquare letter="V" state="guessing" />
          <SmallerSquare letter="O" state="guessing" />
          <SmallerSquare letter="R" state="guessing" />
          <SmallerSquare letter="Y" state="guessing" />
        </div>
        <p className="example-text">The letter <b>I</b> is not in any of the words</p>
      </StyledInstructions>
    </Modal>
  );
}

export default InstructionsModal;