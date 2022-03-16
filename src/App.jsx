import { useState, useEffect } from 'react';
import Keyboard from './Components/Keyboard';
import Board from './Components/Board';
import styled from 'styled-components';
import words5 from './data/962-5-letter-words';
import scrabbleWords from './data/172820-scrabble-words';

const StyledApp = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: #111;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const AppWrapper = styled.div`
  padding-top: 2rem;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
`;

function App() {
  const [guesses, setGuesses] = useState([]);
  const [curGuess, setCurGuess] = useState('');
  const [word, setWord] = useState(
    words5[Math.floor(Math.random() * words5.length)].toUpperCase()
  );

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
    const g = curGuess.toLowerCase();
    if (g.length !== 5 || !scrabbleWords.includes(g)) return;
    setGuesses(prev => [...prev, curGuess]);
    setCurGuess('');
  };


  return (
    <StyledApp>
      <AppWrapper>
        <Board {...{word, guesses, current: curGuess}} />
        <Keyboard {...{word, guesses, addLetter, removeLetter, submitGuess}} />
      </AppWrapper>
    </StyledApp>
  );
}

export default App;