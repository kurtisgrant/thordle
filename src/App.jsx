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
  max-height: 900px;
  max-width: 500px;
  // justify-content: space-around;
  align-items: center;
`;

function App() {
  const [guesses, setGuesses] = useState([]);
  const [curGuess, setCurGuess] = useState('');
  const [word, setWord] = useState(
    words5[Math.floor(Math.random() * words5.length)].toUpperCase()
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
    if (curGuess.length >= 5) return;
    setCurGuess(prev => prev + letter.toUpperCase());
  };
  const removeLetter = () => {
    if (!curGuess.length) return;
    setCurGuess(prev => prev.slice(0, -1));
  };
  const submitGuess = () => {
    const g = curGuess;
    const gLower = g.toLowerCase();
    if (g.length !== 5 || !scrabbleWords.includes(gLower)) return;
    setCurGuess('');
    setGuesses(prev => [...prev, g]);
  };


  return (
    <StyledApp>
        <Navbar />
      <AppWrapper>
        <Board {...{ word, guesses, guess: curGuess }} />
        <Keyboard {...{ word, guesses, addLetter, removeLetter, submitGuess }} />
      </AppWrapper>
    </StyledApp>
  );
}

export default App;
