const canvas = document.getElementById('root');
const ctx = canvas.getContext('2d');

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


const points = [];

function init () {
  points.push({ x: -(CANVAS_SIZE / 2), y: randomBetween(-(CANVAS_SIZE / 2), CANVAS_SIZE / 2) });
  points.push({ x: CANVAS_SIZE / 2, y: randomBetween(ORIGIN, MAX_DISTANCE) });
  points.push(generatePoint());

  loop();
}

function loop () {
  requestAnimationFrame(loop);

  update();
  render();
}

function update () {
}

function render () {
  canvas.width = canvas.width;

  const xOffset = CANVAS_SIZE / 2;
  const yOffset = CANVAS_SIZE / 2;

  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(xOffset, yOffset, 5, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
  ctx.fillStyle = 'black';

  points.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x + xOffset, p.y + yOffset, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  });
}

init();
console.log(points);
