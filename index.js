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

  ctx.moveTo(points[0].x + xOffset, points[0].y + yOffset);
  for (let i = 0;i < points.length - 1;i += 1) {
    const p = points[i];
    const pp = points[i + 1];
    const mid = { x: (p.x + pp.x) / 2, y: (p.y + pp.y) / 2 };
    const cp1 = { x: (mid.x + p.x) / 2, y: p.y };
    const cp2 = { x: (mid.x + pp.x) / 2, y: pp.y };

    ctx.bezierCurveTo(
      cp1.x + xOffset,
      cp1.y + yOffset,
      cp2.x + xOffset,
      cp2.y + yOffset,
      pp.x + xOffset,
      pp.y + yOffset
    );
  }
  ctx.stroke();
}

init();
