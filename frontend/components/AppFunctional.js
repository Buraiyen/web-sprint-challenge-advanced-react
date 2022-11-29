import React, { useState } from 'react';
// Suggested initial states
const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

const initialGrid = [
  false, //(1,1)
  false, //(1,2)
  false, //(1,3)
  false, //(2,1)
  true, //(2,2)
  false, //(2,3)
  false, //(3,1)
  false, //(3,2)
  false, //(3.3)
];

// TODO: refactor to be objects instead of strings
// const coordinates = [
//   '(1,1)',
//   '(1,2)',
//   '(1,3)',
//   '(2,1)',
//   '(2,2)',
//   '(2,3)',
//   '(3,1)',
//   '(3,2)',
//   '(3,3)',
// ];

const coordinates = [
  {
    x: 1,
    y: 1,
  },

  {
    x: 1,
    y: 2,
  },
  {
    x: 1,
    y: 3,
  },
  {
    x: 2,
    y: 1,
  },
  {
    x: 2,
    y: 2,
  },
  {
    x: 2,
    y: 3,
  },
  {
    x: 3,
    y: 1,
  },
  {
    x: 3,
    y: 2,
  },
  {
    x: 3,
    y: 3,
  },
];

const nextIndexes = [
  // (1,1)
  {
    right: 1,
    down: 3,
  },
  // (1, 2)
  {
    left: 0,
    right: 2,
    down: 4,
  },
  // (1,3)
  {
    left: 1,
    down: 5,
  },
  // (2,1)
  {
    up: 0,
    right: 4,
    down: 6,
  },
  // (2,2)
  {
    up: 1,
    down: 7,
    left: 3,
    right: 5,
  },
  // (2,3)
  {
    up: 2,
    down: 8,
    left: 4,
  },
  // (3,1)
  {
    up: 3,
    right: 7,
  },
  // (3,2)
  {
    up: 4,
    left: 6,
    right: 8,
  },
  // (3,3)
  {
    up: 5,
    left: 7,
  },
];

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [grid, setGrid] = useState(initialGrid);
  const [moves, setMoves] = useState(0);
  const [coordinate, setCoordinate] = useState({ x: 2, y: 2 });

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
      console.log('Unable to move!');
      return;
    }

    const previousPosition = grid.indexOf(true);
    const gridCopy = [...grid];
    gridCopy[previousPosition] = false;
    gridCopy[nextPosition] = true;

    setCoordinate(coordinates[nextPosition]);
    setGrid(gridCopy);
    setMoves((current) => {
      return current + 1;
    });
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">
          Coordinates ({coordinate.x},{coordinate.y})
        </h3>
        <h3 id="steps">You moved {moves} times</h3>
      </div>
      <div id="grid">
        {grid.map((idx, i) => (
          <div key={i} className={`square${idx === true ? ' active' : ''}`}>
            {idx === true ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>
          LEFT
        </button>
        <button id="up" onClick={move}>
          UP
        </button>
        <button id="right" onClick={move}>
          RIGHT
        </button>
        <button id="down" onClick={move}>
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
