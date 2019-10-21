const canvas = document.getElementById('root');
const ctx = canvas.getContext('2d');

const CANVAS_SIZE = 200;
const POINT_X = CANVAS_SIZE + 50;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let points = [];

const random = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;

const generatePoint = (x, y) => ({
  x: x || POINT_X,
  y: y || random(CANVAS_SIZE)
});

function init () {
  points = [ generatePoint(-50), generatePoint() ];
  console.log(points);

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

  // Render sled
  ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, 5, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
}

init();
