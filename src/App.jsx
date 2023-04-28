import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import GameBoards from './components/GameBoards';
import Keyboard from './components/Keyboard';
import InstructionsModal from './components/Modal/InstructionsModal';
import UserStatsModal from './components/Modal/UserStatsModal';

import words5 from './data/962-5-letter-words';
import randomWordsByDate from './helpers/randomWordsByDate';
import useGameLogic from './hooks/useGameLogic';

const StyledApp = styled.div`
  width: 100vw;
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
  background-color: #111;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  width: 100%;
  height: 100%;
  align-items: center;
  .footer {
    margin-top: 1rem;
    color: #ccc;
    a {
      font-weight: 800;
      text-decoration: underline;
      color: #b079b6;
    }
  }
`;

const answers = randomWordsByDate(words5);

function App() {

  const [currentModal, setCurrentModal] = useState(null);
  const [init, setInit] = useState(true);
  const boardRefs = useRef([]);

  const scrollBoardToCenter = (boardIndex) => {
    const board = boardRefs.current[boardIndex];
    if (board) {
      setTimeout(() => {
        board.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }, 300);
    }
  };

  const {
    addLetter, removeLetter, submitGuess,
    gameStatus, userData, refreshGame,
    guesses, guessEvals, alphaMap,
    curGuesses, curGuessInd
  } = useGameLogic({ answers, openModal, scrollBoardToCenter });

  function handleKeyPress(e) {
    if (gameStatus !== 'active') return;
    if (65 <= e.keyCode && e.keyCode <= 90) {
      addLetter(e.key.toUpperCase());
    } else if (e.keyCode === 8) {
      removeLetter();
    } else if (e.keyCode === 13) {
      submitGuess();
    }
  };

  function openModal(modal) {
    setCurrentModal(modal);
  }

  function closeModal() {
    setCurrentModal(null);
  }

  useEffect(() => {
    // On first render
    if (init) {
      setAppHeight();
      refreshGame();
      scrollBoardToCenter(0);
      window.onresize = setAppHeight;
      gameStatus !== 'active' ? openModal('stats') : openModal('instructions');
      setInit(false);
    }
  }, [init, gameStatus, refreshGame]);

  // On every render
  useEffect(() => {
    document
      .addEventListener('keydown', handleKeyPress);
    return () => document
      .removeEventListener('keydown', handleKeyPress);
  });

  return (
    <StyledApp>
      <Navbar answers={answers} openModal={openModal} />
      <AnimatePresence initial="false" exitBeforeEnter="true">
        {currentModal === 'instructions' &&
          <InstructionsModal handleClose={closeModal} />}
        {currentModal === 'stats' &&
          <UserStatsModal handleClose={closeModal} userStats={userData} gameStatus={gameStatus} answers={answers} />}
      </AnimatePresence>
      <GameWrapper>
        <GameBoards {...{
          answers,
          guesses,
          guessEvals,
          curGuesses,
          boardRefs
        }} />
        <Keyboard {...{
          addLetter,
          removeLetter,
          submitGuess,
          alphaMap,
          curGuessInd
        }} />
        <div className="footer">Hire the developer! <a target="_blank" href="https://kurtisgrant.com">Kurtis Grant</a></div>
      </GameWrapper>
    </StyledApp>
  );
}

export default App;

function setAppHeight() {
  // Set CSS vh variable to window innerheight. 
  // This sets proper page sizes for mobile browsers.
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};