import React, { useState } from 'react';
import axios from 'axios';
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
      coordinate: coordinates[nextPosition],
      grid: gridCopy,
      message: '',
      moves: updatedMoves,
    });
  };

  inputChangeHandler = (event) => {
    const { value } = event.target;
    this.setState({ formData: value });
  };

  submitHandler = (event) => {
    event.preventDefault();
    const data = {
      email: this.state.formData,
      x: this.state.coordinate.x,
      y: this.state.coordinate.y,
      steps: this.state.moves,
    };
    axios
      .post('http://localhost:9000/api/result', data)
      .then((res) => {
        this.setState({ message: res.data.message });
      })
      .catch((err) => {
        let error = err.request.response;
        error = JSON.parse(error);
        this.setState({ message: error.message });
      });
  };

  render() {
    const { className } = this.props;
    return (
      <div id='wrapper' className={className}>
        <div className='info'>
          <h3 id='coordinates'>
            Coordinates ({this.state.coordinate.x},{this.state.coordinate.y})
          </h3>
          <h3 id='steps'>
            You moved {this.state.moves}{' '}
            {this.state.moves === 1 ? 'time' : 'times'}
          </h3>
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
          <button id='reset' onClick={this.reset}>
            reset
          </button>
        </div>
        <form onSubmit={this.submitHandler}>
          <input
            id='email'
            type='email'
            placeholder='type email'
            onChange={this.inputChangeHandler}
            value={this.state.formData}
          ></input>
          <input id='submit' type='submit'></input>
        </form>
      </div>
    );
  }
}
