/*----- app's state (variables) -----*/
let game

/*----- cached element references -----*/
const boardEl = document.getElementById('board')
const msgEl = document.getElementById('message')
const button = document.querySelector('button')

/*----- classes -----*/

class Square {
    constructor(domElement) {
        this.domElemment = domElement
        this.value = null
    }

    static renderLookup = {
        1: 'purple',
        '-1': 'orange',
        null: 'darkgray'
    }

    render() {
        this.domElement.style.backgroundColor = Square.renderLookup[this.value];

    }
}

class TicTacToeGame {
	// all the methods and properties will live happily here
	constructor(boardElement, messageElement) {
        this.boardElement = boardElement;
        this.messageElement = messageElement;
        this.squareEls = [...boardElement.querySelectorAll('div')];

        // NEW CODE BELOW
        // Attach a delegated event listener
        // Arrow function is necessary to ensure 'this'
        // is set to the game object
        this.boardElement.addEventListener('click', (evt) => {
          // Obtain index of square
          const idx = this.squareEls.indexOf(evt.target);
          // Guards
          if (
            // Didn't click <div> in grid
            idx === -1 ||
            // Square already taken
            this.squares[idx].value ||
            // Game over
            this.winner
          ) return;
          // Update the square object
          this.squares[idx].value = turn;  // common typo 
          // Update other state (turn, winner)
          this.turn *= -1;
          this.winner = this.getWinner();
          // Render updated state
          this.render();
        });
      }

    play() {
        // init game state
        this.turn = 1
        this.winner = null
        // .map returns a new array the same length as the one its called on
        // this.squareEls - array of divs which is the same gameboard
        // cb function - makigna  new object that  will hold the div elemnet
        // this.squares - saving those new Square instances
        this.squares = this.squareEls.map(el => new Square(el));

        // set our game state, render
        this.render()
    }

    getWinner() {
        // Shortcut variable
        const combos = TicTacToeGame.winningCombos;
        for (let i = 0; i < combos.length; i++) {
          if (Math.abs(this.squares[combos[i][0]].value + this.squares[combos[i][1]].value + this.squares[combos[i][2]].value) === 3)
            return this.squares[combos[i][0]].value;
        }
        // Array.prototype.some iterator method!
        if (this.squares.some(square => square.value === null)) return null;
        return 'T';
    }

    render() {
        // Square objects are responsible for rendering themselves
        this.squares.forEach(square => square.render());
        // NEW CODE BELOW
        if (this.winner === 'T') {
            this.messageElement.innerHTML = 'Rats, another tie!';
        } else if (this.winner) {
            this.messageElement.innerHTML = `Player ${this.winner === 1 ? 1 : 2} Wins!`;
        } else {
            this.messageElement.innerHTML = `Player ${this.turn === 1 ? 1 : 2}'s Turn`;
        }
    }


    toString() {
        return `Tic-Tac-Toe game / winner -> ${this.winner}`
    }

    static about() {
        console.log("i'm a TTT class")
    }

    // bc winning combos wont change, we can have this as a staic property
    static winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ]
}

/*----- functions -----*/
initialize()

function initialize() {
    // make sure to invoke your class
    // `game` is an instance of th TTTGame class
    game = new TicTacToeGame(boardEl, msgEl)
}

button.addEventListener('click', initialize)