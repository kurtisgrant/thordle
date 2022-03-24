import { useState, useEffect } from 'react';
import Keyboard from './Components/Keyboard';
import Board from './Components/Board';
import styled from 'styled-components';
import words5 from './data/962-5-letter-words';
import scrabbleWords from './data/172820-scrabble-words';
import Navbar from './Components/Navbar';

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

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* max-width: 500px; */
  align-items: center;
`;

const BoardWrapper = styled.div`
width: 100%;
display: flex;
max-height: calc(var(--vh, 1vh) * 60);
overflow-x: scroll;
scrollbar-width: none;
&::-webkit-scrollbar {
    width: 0 !important
  }
`;

function App() {
  const [allGuesses, setAllGuesses] = useState([]);
  const [curGuess, setCurGuess] = useState('');
  const [curBoard, setCurBoard] = useState(0);
  const [words, setWords] = useState(
    getRandomFromArr(words5) +
    getRandomFromArr(words5) +
    getRandomFromArr(words5)
  );

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

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  const handleKeyPress = (e) => {
    if (65 <= e.keyCode && e.keyCode <= 90) {
      addLetter(e.key);
    } else if (e.keyCode === 8) {
      removeLetter();
    } else if (e.keyCode === 13) {
      submitGuess();
    }
  };

  const addLetter = letter => {
    if (curGuess.length >= 15) return;
    setCurGuess(prev => prev + letter.toUpperCase());
  };
  const removeLetter = () => {
    if (!curGuess.length) return;
    setCurGuess(prev => prev.slice(0, -1));
  };
  const submitGuess = () => {
    const g = curGuess;
    const gLower = g.toLowerCase();
    if (g.length !== 15 || !scrabbleWords.includes(gLower)) return;
    setCurGuess('');
    setAllGuesses(prev => [...prev, g]);
  };


  const boards = [0, 1, 2].map(i => {
    const startInd = i * 5;
    const endInd = startInd + 5;
    const word = words.slice(startInd, endInd);
    const guess = curGuess.slice(startInd, endInd);
    const guesses = allGuesses.map(guess => guess.slice(startInd, endInd));
    const key = i;
    return <Board {...{key, word, guesses, guess }} />
  });

  const keyGuesses = ['hello', 'array'];
  const keyWord = words.slice(curBoard * 5, 5 + curBoard * 5);


  return (
    <StyledApp>
        <Navbar />
      <AppWrapper>
        <BoardWrapper>
          { boards }
        </BoardWrapper>
        <Keyboard {...{ word: keyWord, guesses: keyGuesses, addLetter, removeLetter, submitGuess }} />
      </AppWrapper>
    </StyledApp>
  );
}

export default App;

function getRandomFromArr(array) {
  const word = array[Math.floor(Math.random() * array.length)].toUpperCase();
  console.log(word);
  return word
}