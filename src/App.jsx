import { useState, useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';

import Navbar from './components/Navbar';
import GameBoards from './components/GameBoards';
import Keyboard from './components/Keyboard';

import scrabbleWords from './data/172820-scrabble-words';
import words5 from './data/962-5-letter-words';
import useLocalStorage from './hooks/useLocalStorage';
import randomWordsByDate from './helpers/randomWordsByDate';
import evaluateGuessRow from './helpers/gameState/evaluateGuessRow';
import evaluateAlpha from './helpers/gameState/evaluateAlpha';

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


  const [submittedGuessEvals, setSubmittedEvals] = useState([]);
  const [alphaMap, setAlphaMap] = useState(new Map());

  // Guess Context
  const [curGuesses, setCurGuesses] = useState(['', '', '']);
  const [guessing, setGuessing] = useState(0);

  const initialUserData = {
    lastGameDate: null,
    gamesWon: 0,
    gamesLost: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: [0, 0, 0, 0, 0],
  };
  const [userData, setUserData] = useLocalStorage('thordle-user-data', initialUserData);

  const initialGameData = {
    gameIsActive: true,
    gameDate: dayjs().set('h', 0).set('m', 0).set('s', 0).set('ms', 0).valueOf(),
    submittedGuesses: []
  };
  const [gameData, setGameData] = useLocalStorage('thordle-game-data', initialGameData);


  function updateGameState() {
    const submittedGuesses = gameData.submittedGuesses;
    const guessEvals = submittedGuesses.map(row => evaluateGuessRow(answers, row));
    const aMap = evaluateAlpha(submittedGuesses, guessEvals);
    setSubmittedEvals(guessEvals);
    setAlphaMap(aMap);
  }

  useEffect(() => {
    setAppHeight();
    window.onresize = setAppHeight;
    updateGameState();
  }, []);

  useEffect(() => {
    const newGuessing = curGuesses.findIndex((g, i) => (
      g.length === answers[i].length) &&
      !scrabbleWords.includes(curGuesses[i].toLowerCase()) ||
      g.length < answers[i].length);
    if (newGuessing === guessing) return;
    if (newGuessing === answers.length) return;
    if (newGuessing < 0) return;
    setGuessing(newGuessing);

  }, [curGuesses]);

  useEffect(() => {
    updateGameState();
  }, [gameData.submittedGuesses]);

  function handleKeyPress(e) {

    if (!gameData.gameIsActive) return;
    if (65 <= e.keyCode && e.keyCode <= 90) {
      addLetter(e.key.toUpperCase());
    } else if (e.keyCode === 8) {
      removeLetter();
    } else if (e.keyCode === 13) {
      submitGuess();
    }
  };

  function addLetter(letter) {

    const curGuess = curGuesses[guessing] || '';
    if (curGuesses[guessing].length === answers[guessing].length) return;

    // Do nothing if all tiles are full
    if (curGuesses.join('').length >= answers.join('').length) return;

    // If starting new word
    if (!curGuess.length && guessing > 0) {

      // Only start new word if previous one is valid
      const lowerWord = curGuesses[guessing - 1].toLowerCase();
      if (!scrabbleWords.includes(lowerWord)) return;
    }

    setCurGuesses(prev => {
      const newGuesses = [...prev];
      newGuesses[guessing] = prev[guessing] + letter;
      return newGuesses;
    });
  };

  function removeLetter() {
    let curGuess = curGuesses[guessing];
    let curGuessing = guessing;

    // Move to previous guess if current is already empty
    if (!curGuess.length && guessing > 0) {
      curGuessing--;
      curGuess = curGuesses[curGuessing];
    }

    // If nothing typed, return
    if (!curGuess.length) return;

    const newGuesses = [...curGuesses];
    newGuesses[curGuessing] = curGuess.slice(0, -1);
    setCurGuesses(newGuesses);
  };

  function submitGuess() {
    const curGuessesStr = curGuesses.join('');
    const answersStr = answers.join('');

    // Do nothing if current guesses incomplete
    if (curGuessesStr.length !== answersStr.length) return 'Wrong number of letters';

    // Do nothing if any words aren't valid
    if (curGuesses.some(w => !scrabbleWords.includes(w.toLowerCase()))) return 'Some word not valid';

    setCurGuesses(['', '', '']);
    setGameData(prev => {
      return {
        ...prev,
        submittedGuesses: [...prev.submittedGuesses, curGuesses],
        gameIsActive: curGuessesStr !== answersStr
      };
    });
  };


  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  });

  return (
    <StyledApp>
      <Navbar answers={answers} />
      <GameWrapper>
        <GameBoards {...{
          answers,
          submittedGuesses: gameData.submittedGuesses,
          submittedGuessEvals,
          curGuesses
        }} />
        <Keyboard {...{ answers, alphaMap, guessing, addLetter, removeLetter, submitGuess }} />
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