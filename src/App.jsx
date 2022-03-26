import { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { GameContextProvider } from './context/GameContext';
// import { CurrentGuessContextProvider } from './context/CurrentGuessContext';
// import { GameContext, GuessContext } from './helpers/contexts';
import words5 from './data/962-5-letter-words';
import scrabbleWords from './data/172820-scrabble-words';

import Navbar from './components/Navbar';
import GameBoards from './components/GameBoards';
import Keyboard from './components/Keyboard';

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

const answers = getAnswers(words5);
console.log('answers: ', answers);

function App() {

  const setAppHeight = () => {
    // Set CSS vh variable to window innerheight. 
    // This sets proper page sizes for mobile browsers.
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  useEffect(() => {
    setAppHeight();
    window.onresize = setAppHeight;
  }, []);

  // Game Context
  const [gameIsActive, setGameIsActive] = useState(true);
  const [submittedGuesses, setSubmittedGuesses] = useState([]);
  // const gameContextValue = { answers, gameIsActive, setGameIsActive, submittedGuesses, setSubmittedGuesses };

  // Guess Context
  const [curGuesses, setCurGuesses] = useState(['', '', '']);
  const [guessing, setGuessing] = useState(0);

  useEffect(() => {
    for (let i = 0; i < answers.length; i++) {
      if (curGuesses[i].length < answers[i].length) {
        setGuessing(i);
        break;
      }
    }
  }, [curGuesses]);

  function handleKeyPress(e) {
    if (!gameIsActive) return;
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
    console.log('submitting guess');
    const curGuessesStr = curGuesses.join('');
    const answersStr = answers.join('');

    // Do nothing if current guesses incomplete
    if (curGuessesStr.length !== answersStr.length) return 'Wrong number of letters';
    log(1)
    // Do nothing if any words aren't valid
    if (curGuesses.some(w => !scrabbleWords.includes(w.toLowerCase()))) return 'Some word not valid';
    log(2)
    
    // If guesses are correct, end game
    if (curGuessesStr === answersStr) setGameIsActive(false);
    log(3)

    const guessesToSubmit = [...curGuesses]
    setCurGuesses(['','','']);
    setSubmittedGuesses(prev => [...prev, curGuesses]);
    return 'Submitted';
  };

  const guessContextValue = { curGuesses, guessing, addLetter, removeLetter, submitGuess };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  });

  return (
    <StyledApp>
      <Navbar />
      <GameWrapper>
        <GameBoards {...{ answers, submittedGuesses, curGuesses }} />
        <Keyboard {...{ answers, submittedGuesses, guessing, addLetter, removeLetter, submitGuess }} />
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

function log(name, thing = ' ') {
  console.log(`${name}: `, thing);
}