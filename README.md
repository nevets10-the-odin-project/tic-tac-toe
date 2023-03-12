# tic-tac-toe
Tic Tac Toe project from the Full Stack JavaScript path

Project prompt: https://www.theodinproject.com/lessons/node-path-javascript-tic-tac-toe

## Game Plan

I am documenting my current ideas for the development before actually writing the code. This is mostly following the prompt's instructions and the article that's referenced in 4.2.

---

High level steps:
1. Create game ~~board~~ engine module
2. Create player factory function
3. Run through a game via the console to validate functionality
4. Create UI
5. Create DOMController module
6. Run through a game with the UI to validate functionality
7. Create AIController
8. Run through a game with the AI to validate functionality

---

Modules; single instance items:
1. Game engine object
  * Controls the flow of the game
  * Determines whose turn it is
  * Keeps track of the board spots that players have taken
  * Checks for the win/tie condition
2. DOMController
  * Contains methods to update all elements on the page
  * Holds UI variables and event listeners
3. AIController (Extra credit)
  * Controls the AI's player object

---

Factory objects; multiple instance items created with factory functions:
1. Player object
  * Holds variables for the individual player
    1. Name
    2. Score
    3. Is AI
    4. Other variables

---

Notes
1. ~~Due to the complexity (or lack thereof) of the game, it seems like having a single module to manage the game board and engine will suffice. However, it might be necessary to split those out into separate modules later on.~~
2. Re-reading the prompt again, it does mention having an object to control the flow of the game. I think that instead of a game board module, it would be a game engine module that holds everything. This would technically achieve the goal of having a little global code as possible because it's all in a module...? My thoughts for tackling the project seems to differ a bit from the prompt; I'm not immediately seeing the benefit of having the board array inside of an object by itself.