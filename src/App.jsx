import { useState, useEffect } from 'react';
import Keyboard from './Components/Keyboard';
import Board from './Components/Board';
import styled from 'styled-components';
import { motion } from 'framer-motion';
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
  margin: 1rem;
  width: 100%;
  height: 100%;
  align-items: center;
`;

const BoardWrapper = styled(motion.div)`
position: relative;
width: 100%;
display: flex;
gap: 2rem;
max-height: calc(var(--vh, 1vh) * 60);
overflow-x: scroll;
scrollbar-width: none;
&::-webkit-scrollbar {
    width: 0 !important
  }
`;

const words = getWords(words5);

function App() {
  const [allGuesses, setAllGuesses] = useState([]);
  const [curGuess, setCurGuess] = useState('');
  const [curBoard, setCurBoard] = useState(0);

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
    if ([5, 10].includes(curGuess.length)) {
      const lastWord = curGuess.slice(-5).toLowerCase();
      if (!scrabbleWords.includes(lastWord)) return; 
    }
    setCurGuess(prev => prev + letter.toUpperCase());
  };
  const removeLetter = () => {
    if (!curGuess.length) return;
    setCurGuess(prev => prev.slice(0, -1));
  };
  const submitGuess = () => {
    const guessWords = curGuess.match(/.{1,5}/g).map(w => w.toLowerCase());
    if (curGuess.length !== 15) return;
    if (guessWords.some(w => !scrabbleWords.includes(w))) return;
    setCurGuess('');
    setAllGuesses(prev => [...prev, curGuess]);
  };


  const boards = [0, 1, 2].map(i => {
    const startInd = i * 5;
    const endInd = startInd + 5;
    const word = words.slice(startInd, endInd);
    const guess = curGuess.slice(startInd, endInd);
    const guesses = allGuesses.map(guess => guess.slice(startInd, endInd));
    const key = i;
    return <Board {...{ key, word, guesses, guess }} />;
  });

  const keyGuesses = ['hello', 'array'];
  const keyWord = words.slice(curBoard * 5, 5 + curBoard * 5);


  return (
    <StyledApp>
      <Navbar />
      <AppWrapper>
        <BoardWrapper
          animate={{}}
        >
          {boards}
        </BoardWrapper>
        <Keyboard {...{ word: keyWord, guesses: keyGuesses, addLetter, removeLetter, submitGuess }} />
      </AppWrapper>
    </StyledApp>
  );
}

export default App;

function getWords(wordsArray) {
  const words = [];
  for (let i = 0; i < 3; i++) {
    let word = wordsArray[Math.floor(Math.random() * wordsArray.length)].toUpperCase();
    words.push(word);
  }
  return words.join('');
}