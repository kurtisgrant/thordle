# Thordle (Wordle Adaptation)

## [Thordle.com](http://thordle.com) <-- Click me

[Thordle](https://thordle.com) is an adaptation of the popular word puzzle game [Wordle](https://www.nytimes.com/games/wordle/index.html). In addition as core gameplay logic, Thordle features complex conditional rendering, state management and CSS animations. It also supports light/dark mode and local storage of user stats.

## Instructions

Guess the THORDLE in five tries.

Each guess must be a valid five-letter word. Hit the enter button to submit.

After each guess, the color of the tiles will change to show how close your guess was to the word.

**Green** means the guessed letter was correct.

**Yellow** means the guessed letter is in the word, but not at this location.

**Purple** means the guessed letter is in a different word.

### Tech Stack:
- React
  - Hooks & custom hooks
  - Context API
- Styled Components
- Framer Motion

### Todo: 
***Most recent update: Apr 1, 2022***
- [X] Build react components for gameplay (board, keyboard, tiles, etc.).
- [X] Setup game logic and conditional component rendering.
- [X] Implement animations with Framer Motion.
- [X] Add navbar with animated dropdown menu.
- [X] Adjust game logic ()
- [X] Deploy to thordle.com
- [ ] Implement light/dark mode with switch in dropdown.
- [ ] Implement local storage for game state.
- [ ] Implement instructions & end-of-game modals.
- [ ] Implement local storage for user game statistics.
- [ ] Implement daily puzzles rather than random on every refresh.
