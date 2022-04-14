import { useState, useEffect } from "react";
import dayjs from 'dayjs';
import useLocalStorage from './useLocalStorage';
import useEvaluatedGameState from "./useEvaluatedGameState";
import scrabbleWords from '../data/172820-scrabble-words';

const GUESS_NUM = 5;

const INIT_USER_DATA = {
  lastWonGameDate: null,
  gamesWon: 0,
  gamesLost: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: [0, 0, 0, 0, 0],
};
const INIT_GAME_DATA = {
  gameStatus: 'active',
  gameDate: startOfToday().valueOf(),
  guesses: []
};

export default function useGameLogic({ answers }) {

  const [curGuesses, setCurGuesses] = useState(['', '', '']);
  const [curGuessInd, setCurGuessInd] = useState(0);

  const [userData, setUserData] =
    useLocalStorage('thordle-user-data', INIT_USER_DATA);
  const [{ gameStatus, gameDate, guesses }, setGameData] =
    useLocalStorage('thordle-game-data', INIT_GAME_DATA);

  const { guessEvals, alphaMap } = useEvaluatedGameState(answers, guesses);

  // Changes to current guess row
  useEffect(() => {

    // Update "curGuessInd"
    const newGuessInd = curGuesses.findIndex((g, i) => (
      g.length === answers[i].length) &&
      !scrabbleWords.includes(curGuesses[i].toLowerCase()) ||
      g.length < answers[i].length);

    if (newGuessInd === curGuessInd) return;
    if (newGuessInd === answers.length) return;
    if (newGuessInd < 0) return;
    setCurGuessInd(newGuessInd);

  }, [curGuesses]);

  // Changes to submitted guesses
  useEffect(() => {
    checkGameStatus();
  }, [guesses]);

  function refreshGame() {
    console.log('Refreshing...', dayjs().format('YYYY-MM-DD  hh:mm:ss A'));

    // If today is a new day
    if (gameDate !== startOfToday().valueOf()) {
      console.log('Clearing stale game data');
      setGameData(INIT_GAME_DATA);

      // End current streak if didn't get yesterday's puzzle
      const yesterday = startOfToday().subtract(1, 'day').valueOf();
      if (userData.currentStreak > 0 && yesterday !== userData.lastWonGameDate) {
        setUserData(prevUserData => {
          const finishedStreak = prevUserData.currentStreak;
          const prevMaxStreak = prevUserData.maxStreak;
          return {
            ...prevUserData,
            currentStreak: 0,
            maxStreak: finishedStreak > prevMaxStreak ? finishedStreak : prevMaxStreak
          };
        });
      }
    }
  }

  function checkGameStatus() {
    console.log('Checking game status...');
    if (gameStatus !== 'active') return;
    const latestGuessRow = guesses[guesses.length - 1];
    if (!latestGuessRow) return;

    if (answers.every((a, i) => a === latestGuessRow[i])) {
      // Winning case

      console.log('Winner');
      setGameData(prev => {
        return {
          ...prev,
          gameStatus: 'won'
        };
      });
      setUserData(prev => {

        // Increment guess distribution value
        const numGuesses = guesses.length;
        const newGuessDistribution = [...prev.guessDistribution];
        newGuessDistribution[numGuesses - 1]++;

        // Adjust streaks
        const newStreak = prev.currentStreak + 1;
        const newMaxStreak = newStreak > prev.maxStreak ? newStreak : prev.maxStreak;

        // Increment games won & update lastWonGameDate in return
        return {
          ...prev,
          gamesWon: prev.gamesWon + 1,
          lastWonGameDate: startOfToday().valueOf(),
          guessDistribution: newGuessDistribution,
          currentStreak: newStreak,
          maxStreak: newMaxStreak,
        };
      });
    } else if (guesses.length >= GUESS_NUM) {
      // Losing case

      console.log('Game over');
      setGameData(prev => {
        return {
          ...prev,
          gameStatus: 'lost'
        }
      })
      setUserData(prev => {
        return {
          ...prev,
          gamesLost: prev.gamesLost + 1,
          currentStreak: 0
        };
      });
    }

  }

  function addLetter(letter) {

    const curGuess = curGuesses[curGuessInd] || '';
    if (curGuesses[curGuessInd].length === answers[curGuessInd].length) return;

    // Do nothing if all tiles are full
    if (curGuesses.join('').length >= answers.join('').length) return;

    // If starting new word
    if (!curGuess.length && curGuessInd > 0) {

      // Only start new word if previous one is valid
      const lowerWord = curGuesses[curGuessInd - 1].toLowerCase();
      if (!scrabbleWords.includes(lowerWord)) return;
    }

    setCurGuesses(prev => {
      const newGuesses = [...prev];
      newGuesses[curGuessInd] = prev[curGuessInd] + letter;
      return newGuesses;
    });
  };

  function removeLetter() {
    let curGuess = curGuesses[curGuessInd];
    let curGuessing = curGuessInd;

    // Move to previous guess if current is already empty
    if (!curGuess.length && curGuessInd > 0) {
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
        guesses: [...prev.guesses, curGuesses],
        gameIsActive: curGuessesStr !== answersStr
      };
    });
  };

  return { addLetter, removeLetter, submitGuess, gameStatus, refreshGame, guesses, guessEvals, curGuesses, alphaMap, curGuessInd };
}

function startOfToday() {
  return dayjs().set('h', 0).set('m', 0).set('s', 0).set('ms', 0);
}