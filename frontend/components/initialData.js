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

const coordinates = [
  {
    x: 1,
    y: 1,
  },
  {
    x: 2,
    y: 1,
  },
  {
    x: 3,
    y: 1,
  },
  {
    x: 1,
    y: 2,
  },
  {
    x: 2,
    y: 2,
  },
  {
    x: 3,
    y: 2,
  },
  {
    x: 1,
    y: 3,
  },

  {
    x: 2,
    y: 3,
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

export { initialGrid, coordinates, nextIndexes };
