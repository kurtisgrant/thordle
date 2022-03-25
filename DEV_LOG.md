# Project Timeline & Dev Log

> ## Mar 13 - Day 1:
> - ### Create React App project initialized

> ## Mar 15 - Day 3:
> - Functioning [Wordle](https://www.nytimes.com/games/wordle/) clone built
> - Typing via keyboard input or virtual keyboard input supported
> - Tile colours work as expected
> - Keyboard key colours work as expected

> ## Mar 17 - Day 5:
> - General refinements
> - Flexbox layout improved
> - UX improvements

> ## Mar 17 - Day 5:
> - General refinements
> - Flexbox layout improved
> - UX improvements

> ## Mar 18 - Day 6:
> - Framer motion added to project
> - Tile bounce animation added for typed characters

> ## Mar 22 - Day 10:
> - Navbar & dropdown components added
> - Dropdown menus and submenus supported
> - Dropdown animates open/closed
> - Dropdown animates between submenus

> ## Mar 24 - Day 12:
> - Gameplay overhaul started
>   - Thordle—my adaptation of the game Wordle—will have 3 game boards played simultaneously. 
>   - Each row will accept 3 **different** guessed words (this is in contrast to other adaptaions like [Quordle](https://www.quordle.com/) which accept a single word as the guess for all game boards). 
>   - A new tile colour, purple, will indicate that a letter is in ***some*** word, but ***not*** the one it was guessed in.
> - Began implementation of useContext

> ## Mar 25 - Day 13:
> I'm learning about the concept of derived state. I know it is relevant to my application because my app state can be minimally defined by two very simple things: an array of answers, and a 2D array of guesses. The 2D array is an array of row submissions which are each arrays containing the 3 guessed words for that row. Despite the fact that my whole app's state can be represented by this small amount of information, if I only store that in the app's state, I will be forced to utilize LOT of derived state in order to calculate (and re-calculate) tile colours and keyboard key colours throughout gameplay. 
> 
> I'm now racking my brain trying to come up with the best way to memoize more of these contextual insights used to colour my tiles and keyboard directly into the app's state. This will allow me to minimize unnessesary computation and component re-rendering.
>
> This article: [4 options to prevent extra rerenders with React context](https://blog.axlight.com/posts/4-options-to-prevent-extra-rerenders-with-react-context/) helped me make the decision to use multiple contexts to avoid unnessesary re-rendering of my tiles and virtual keyboard while drafting a row of guesses.