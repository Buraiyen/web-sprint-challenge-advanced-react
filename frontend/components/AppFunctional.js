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
    left: 0,
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

  function reset() {
    // Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction) {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    const currentXY = getXY();
    return nextIndexes[currentXY];
  }

  function move(event) {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const direction = event.target.id;
    const nextIndexes = getNextIndex(direction);
    const nextPosition = nextIndexes[direction];
    console.log(nextIndexes);
    if (nextIndexes[direction] === undefined) {
      console.log('Unable to move!');
      return;
    }
    let previousPosition = grid.indexOf(true);
    const gridCopy = [...grid];
    gridCopy[previousPosition] = false;
    gridCopy[nextPosition] = true;
    setGrid(gridCopy);
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
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved 0 times</h3>
      </div>
      <div id="grid">
        {grid.map((idx, i) => (
          <div key={i} className={`square${idx === true ? ' active' : ''}`}>
            {idx === true ? 'B' : `${i}`}
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
        <button id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
