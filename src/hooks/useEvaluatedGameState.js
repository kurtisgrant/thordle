import { useState, useEffect } from "react";
import evaluateGuessRow from '../helpers/gameState/evaluateGuessRow';
import evaluateAlpha from '../helpers/gameState/evaluateAlpha';

export default function useEvaluatedGameState(answers, guesses) {

  const [guessEvals, setGuessEvals] = useState([]);
  const [alphaMap, setAlphaMap] = useState(new Map());

  useEffect(() => {
    const guessEvals = guesses.map(row => evaluateGuessRow(answers, row));
    const aMap = evaluateAlpha(guesses, guessEvals);
    setGuessEvals(guessEvals);
    setAlphaMap(aMap);
  }, [guesses]);

  return { guessEvals, alphaMap };
}