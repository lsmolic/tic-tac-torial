import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
  
  Following the FB tutorial:
  
    https://facebook.github.io/react/tutorial/tutorial.html

*/


// Controller Component Example 

// class Square extends React.Component {
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value}
//       </button>
//     )
//   }
// }

// Functional Component Example

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)} 
      />
    );
  }

  render() {
    return ( 
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
         <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
         <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      gameHistory: [{
        squares: Array(9).fill(null),
        winner: null        
      }],
      stepNumber: 0,
      xIsCurrentPlayer: true
    }
  }

  calculateWinner(squares){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[b] === squares[b] && squares[a] === squares[c]){
        return squares[a];
      }
    }
    return null;
  }

  getCurrentGame() {
    const gameHistory = this.state.gameHistory;
    return gameHistory[gameHistory.length - 1];
  }

  handleClick(i) {
    const gameHistory = this.state.gameHistory.slice(0, this.state.stepNumber + 1);
    const currentGame = this.getCurrentGame();
    const squares = currentGame.squares.slice();
    let winner = null;

    // determine if we have a winner yet
    // this prevents bad clicks
    if (currentGame.winner || squares[i]) {
      return;
    }

    // adjust currentBoard
    squares[i] = this.state.xIsCurrentPlayer ? 'X' : 'O';
    winner = this.calculateWinner(squares);

    // add new state to history
    this.setState({
      gameHistory: gameHistory.concat([{
        squares: squares,
        winner: winner,        
      }]),
      stepNumber: gameHistory.length,
      xIsCurrentPlayer: !this.state.xIsCurrentPlayer
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsCurrentPlayer: (step % 2) ? false : true
    })
  }

  render() {
    const currentGame = this.getCurrentGame();

    const moves = this.state.gameHistory.map((step, move) => {
      const description = move ? `Move #${move}` : 'Game start';
      return ( 
        <li key={move}>
          <a href="#" onClick={() => this.jumpTo(move)}>{description}</a>
        </li>
      )
    })

    let gameStatus;
    if (currentGame.winner){
      gameStatus = `Winner: ${currentGame.winner}`
    } else {
      gameStatus = `Current player: ${(this.state.xIsCurrentPlayer ? 'X' : 'O')}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={currentGame.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{gameStatus}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)