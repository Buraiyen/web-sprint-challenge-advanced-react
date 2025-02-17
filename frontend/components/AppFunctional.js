import axios from 'axios';
import React, { useState } from 'react';

import { initialGrid, coordinates, nextIndexes } from './initialData';

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [grid, setGrid] = useState(initialGrid);
  const [moves, setMoves] = useState(0);
  const [coordinate, setCoordinate] = useState({ x: 2, y: 2 });
  const [formData, setFormData] = useState('');
  const [message, setMessage] = useState('');

  function getXY() {
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    return grid.indexOf(true);
  }

  function getXYMessage() {
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  /**
   * resets all states
   */
  function reset() {
    setGrid(initialGrid);
    setMoves(0);
    setCoordinate({ x: 2, y: 2 });
    setMessage('');
    setFormData('');
  }

  /**
   * @returns object of next possible moves
   */
  function getNextIndex() {
    const currentXY = getXY();
    return nextIndexes[currentXY];
  }

  /**
   * The function first gets an object that contains
   * the next possible moves. If the direction that
   * the user provided is not inside of that object,
   * then the function would notify the user saying
   * that move is not possible. Else, the grid will
   * update itself by setting the next position
   * to be true and the previous position to be
   * false
   *
   * @param {*} event - gets the direction
   */
  function move(event) {
    const direction = event.target.id;
    const nextIndexes = getNextIndex(direction);
    const nextPosition = nextIndexes[direction];

    if (nextIndexes[direction] === undefined) {
      setMessage(`You can't go ${direction}`);
      return;
    }

    const previousPosition = grid.indexOf(true);
    const gridCopy = [...grid];
    gridCopy[previousPosition] = false;
    gridCopy[nextPosition] = true;

    setCoordinate(coordinates[nextPosition]);
    setGrid(gridCopy);
    setMessage('');
    setMoves((current) => {
      return current + 1;
    });
  }

  function inputChangeHandler(event) {
    // You will need this to update the value of the input.
    const { value } = event.target;
    setFormData(value);
  }

  function submitHandler(event) {
    // Use a POST request to send a payload to the server.
    event.preventDefault();
    const data = {
      email: formData,
      x: coordinate.x,
      y: coordinate.y,
      steps: moves,
    };
    axios
      .post('http://localhost:9000/api/result', data)
      .then((res) => {
        setMessage(res.data.message);
      })
      .catch((err) => {
        let error = err.request.response;
        error = JSON.parse(error);
        setMessage(error.message);
      });
    setFormData('');
  }
  return (
    <div id='wrapper' className={props.className}>
      <div className='info'>
        <h3 id='coordinates'>
          Coordinates ({coordinate.x},{coordinate.y})
        </h3>
        <h3 id='steps'>
          You moved {moves} {moves === 1 ? 'time' : 'times'}
        </h3>
      </div>
      <div id='grid'>
        {grid.map((idx, i) => (
          <div key={i} className={`square${idx === true ? ' active' : ''}`}>
            {idx === true ? 'B' : null}
          </div>
        ))}
      </div>
      <div className='info'>
        <h3 id='message'>{message}</h3>
      </div>
      <div id='keypad'>
        <button id='left' onClick={move}>
          LEFT
        </button>
        <button id='up' onClick={move}>
          UP
        </button>
        <button id='right' onClick={move}>
          RIGHT
        </button>
        <button id='down' onClick={move}>
          DOWN
        </button>
        <button id='reset' onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={submitHandler}>
        <input
          id='email'
          type='email'
          placeholder='type email'
          onChange={inputChangeHandler}
          value={formData}
        ></input>
        <input id='submit' type='submit'></input>
      </form>
    </div>
  );
}
