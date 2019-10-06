const canvas = document.getElementById('root');
const context = canvas.getContext('2d');

const CANVAS_SIZE = 200;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const ORIGIN = 0;
const MAX_DISTANCE = 400;
const SPEED = 5;

const randomBetween = (lower, upper) => {
  const rand = Math.floor(Math.random() * (upper - lower));
  return rand + lower;
};

const generateCoord = () => randomBetween(ORIGIN + CANVAS_SIZE / 2, MAX_DISTANCE);
const generatePoint = () => ({ x: generateCoord(), y: generateCoord() });

