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
    const currentGame = this.getCurrentGame();
    const squares = currentGame.squares.slice();
    const winner = this.calculateWinner(squares);

    // determine if we have a winner yet
    // this prevents bad clicks
    if (winner || squares[i]) {
      return;
    }

    // adjust currentBoard
    squares[i] = this.state.xIsCurrentPlayer ? 'X' : 'O';

    // add new state to history
    this.setState({
      gameHistory: this.state.gameHistory.concat([{
        squares: squares,
        winner: winner
      }]),
      xIsCurrentPlayer: !this.state.xIsCurrentPlayer
    });
  }

  render() {
    const currentGame = this.getCurrentGame();

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
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)