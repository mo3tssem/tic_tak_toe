import React, { useState } from "react"
import ReactDOM from "react-dom"
import "./index.css"

function Square(props) {
  return (
    <button onClick={props.onClick} className="square">
      {props.value}
    </button>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function Board(props) {
  const renderSquare = (i, props) => {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />
  }
  return (
    <div>
      <div className="board-row">
        {renderSquare(0, props)}
        {renderSquare(1, props)}
        {renderSquare(2, props)}
      </div>
      <div className="board-row">
        {renderSquare(3, props)}
        {renderSquare(4, props)}
        {renderSquare(5, props)}
      </div>
      <div className="board-row">
        {renderSquare(6, props)}
        {renderSquare(7, props)}
        {renderSquare(8, props)}
      </div>
    </div>
  )
}

function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ])

  const [xIsNext, setXIsNext] = useState(true)
  const [stepNumber, setStepNumber] = useState(0)

  const handleClick = (i) => {
    const aHistory = history.slice(0, stepNumber + 1)
    const current = aHistory[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = xIsNext ? "X" : "O"

    setStepNumber(aHistory.length)
    setHistory(aHistory.concat([{ squares: squares }]))
    setXIsNext(!xIsNext)
  }

  const jumpTo = (step) => {
    setXIsNext(step % 2 === 0)
    setStepNumber(step)
  }

  const aHistory = history

  const current = aHistory[stepNumber]
  const winner = "" + calculateWinner(current.squares)

  const moves = aHistory.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start"
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  let status = ""
  if (winner) {
    status = "winner: " + winner
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>{" "}
      </div>
    </div>
  )
}

ReactDOM.render(<Game />, document.getElementById("root"))
