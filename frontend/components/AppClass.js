import React, { useState } from 'react';

import { initialGrid, coordinates, nextIndexes } from './initialData';

export default class AppClass extends React.Component {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  constructor() {
    super();
    this.state = {
      grid: initialGrid,
      moves: 0,
      coordinate: { x: 2, y: 2 },
      formData: '',
      message: '',
    };
  }
  getXY = () => {
    return this.state.grid.indexOf(true);
  };

  reset = () => {
    this.setState({ grid: initialGrid, moves: 0, coordinate: { x: 2, y: 2 } });
  };

  getNextIndex = () => {
    const currentXY = this.getXY();
    return nextIndexes[currentXY];
  };

  move = (event) => {
    const direction = event.target.id;
    const nextIndexes = this.getNextIndex(direction);
    if (nextIndexes[direction] === undefined) {
      this.setState({ message: `You can't go ${direction}` });
      return;
    }
    const nextPosition = nextIndexes[direction];
    const previousPosition = this.state.grid.indexOf(true);
    const gridCopy = [...this.state.grid];
    gridCopy[previousPosition] = false;
    gridCopy[nextPosition] = true;

    const updatedMoves = this.state.moves + 1;
    this.setState({
      coordinates: coordinates[nextPosition],
      grid: gridCopy,
      message: '',
      moves: updatedMoves,
    });
  };

  onChange = (evt) => {
    // You will need this to update the value of the input.
  };

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
  };

  render() {
    const { className } = this.props;
    return (
      <div id='wrapper' className={className}>
        <div className='info'>
          <h3 id='coordinates'>Coordinates (2, 2)</h3>
          <h3 id='steps'>You moved {this.state.moves} times</h3>
        </div>
        <div id='grid'>
          {this.state.grid.map((idx, i) => (
            <div key={i} className={`square${idx === true ? ' active' : ''}`}>
              {idx === true ? 'B' : null}
            </div>
          ))}
        </div>
        <div className='info'>
          <h3 id='message'>{this.state.message}</h3>
        </div>
        <div id='keypad'>
          <button id='left' onClick={this.move}>
            LEFT
          </button>
          <button id='up' onClick={this.move}>
            UP
          </button>
          <button id='right' onClick={this.move}>
            RIGHT
          </button>
          <button id='down' onClick={this.move}>
            DOWN
          </button>
          <button id='reset'>reset</button>
        </div>
        <form>
          <input id='email' type='email' placeholder='type email'></input>
          <input id='submit' type='submit'></input>
        </form>
      </div>
    );
  }
}
