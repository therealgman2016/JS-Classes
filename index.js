/*----- app's state (variables) -----*/
let game


/*----- cached element references -----*/
const boardEl = document.getElementById('board')
const msgEl = document.getElementById('message')
const button = document.querySelector('button')

/*----- classes -----*/
class Square {
	constructor(domElement) {
		this.domElement = domElement
		this.value = null
	}

	static renderLookup = {
		1: 'purple',
		'-1': 'orange',
		null: 'darkgray',
	}

    render() {
        this.domElement.style.backgroundColor = Square.renderLookup[this.value]
    }
}

class ImageSquare extends Square {
    constructor(domElement, secondsPerRotation = 0) {
        // Always initialize the superclass first
        super(domElement);
        // Specialize!
        this.domElement.style.animationDuration = `${secondsPerRotation}s`;
      }

    static renderLookup = {
        1: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png',
        '-1': 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png',
        null: 'darkgrey',
    }

    render() {
        if (this.value) {
            this.domElement.style.backgroundImage = `url(${ImageSquare.renderLookup[this.value]})`

        } else {
            this.domElement.style.backgroundImage = ''
        }
    }
}


class TicTacToeGame {
	// all the methods and properties will live happily here
	constructor(boardElement, messageElement) {
		// this adds the boardElement property to each instance of the objects we are creating
		this.boardElement = boardElement
		this.messageElement = messageElement
		// you don't need to pass in all of the properties we can just assign some
		this.squareEls = [...boardElement.querySelectorAll('div')]

        // if we didn't use a arrow function the `this` keyword would point to the `window` object
        this.boardElement.addEventListener('click', event => {
            const idx = this.squareEls.indexOf(event.target)

            if (
                idx === -1 ||
                this.squareEls[idx].value ||
                this.winner
            ) return

            this.squares[idx].value = this.turn
            this.turn *= -1
            this.winner = this.getWinner()
            this.render()
        })
	}

    getWinner() {
        const combos = TicTacToeGame.winningCombos
        for (let i = 0; i < combos.length; i++) {
            if (
                Math.abs(
                    this.squares[combos[i][0]].value +
                    this.squares[combos[i][1]].value +
                    this.squares[combos[i][2]].value
                ) === 3
            ) {
                return this.squares[combos[i][0]].value
            }
        }

        if (this.squares.some(square => square.value === null)) return null
        return 'T'
    }

	play() {
        // init the game state
        this.turn = 1;
        this.winner = null;
        this.squares = this.squareEls.map(el => new ImageSquare(el, 3)); // Initialize the squares array with ImageSquare instances
        this.render();
    }

	render() {
		this.squares.forEach(square => square.render())

        if (this.winner === 'T') {
            this.messageElement.innerHTML = 'TIE!!!'
        } else if (this.winner) {
            this.messageElement.innerHTML = `Player ${this.winner === 1 ? 1 : 2} Wins`
        } else {
            this.messageElement.innerHTML = `Player ${this.turn === 1 ? 1 : 2} Turn`
        }
	}

	toString() {
		return `Tic-Tac-Toe Game / winner -> ${this.winner}`
	}

	static about() {
		console.log("I'm a TTTGame class!")
	}

    // because winning combos will not change we can have this as a static property
	static winningCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]
}

/*----- functions -----*/
initialize()

function initialize() {
    // make sure to invoke your class
    // `game` is an instance of th TTTGame class
    game = new TicTacToeGame(boardEl, msgEl)
    game.play()
}

button.addEventListener('click', initialize)