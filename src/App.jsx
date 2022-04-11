import { useState, useEffect } from 'react';
import styled from 'styled-components';

import Navbar from './components/Navbar';
import GameBoards from './components/GameBoards';
import Keyboard from './components/Keyboard';

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
`;

// const answers = getAnswers(words5);
const answers = randomWordsByDate(words5);
// const answers = ['TRAIN', 'STRAP', 'YIKES']

function App() {

  const {
    addLetter, removeLetter, submitGuess, 
    gameStatus, refreshGame,
    guesses, guessEvals, alphaMap,
    curGuesses, curGuessInd
  } = useGameLogic({ answers });

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

  // On first render
  useEffect(() => {
    setAppHeight();
    refreshGame();
    window.onresize = setAppHeight;
  }, []);

  // On every render
  useEffect(() => {
    document
      .addEventListener('keydown', handleKeyPress);
    return () => document
      .removeEventListener('keydown', handleKeyPress);
  });

  return (
    <StyledApp>
      <Navbar answers={answers} />
      <GameWrapper>
        <GameBoards {...{
          answers,
          guesses,
          guessEvals,
          curGuesses
        }} />
        <Keyboard {...{
          addLetter,
          removeLetter,
          submitGuess,
          alphaMap,
          curGuessInd
        }} />
      </GameWrapper>
    </StyledApp>
  );
}

export default App;

function getAnswers(wordsArray) {
  const words = [];
  for (let i = 0; i < 3; i++) {
    let word = wordsArray[Math.floor(Math.random() * wordsArray.length)].toUpperCase();
    words.push(word);
  }
  return words;
}

function setAppHeight() {
  // Set CSS vh variable to window innerheight. 
  // This sets proper page sizes for mobile browsers.
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

function log(name, thing = ' ') {
  console.log(`${name}: `, thing);
}