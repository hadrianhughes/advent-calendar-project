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


let points = [];

function init () {
  // Generate points
  points = [
    { x: -(CANVAS_SIZE / 2), y: randomBetween(-(CANVAS_SIZE / 2), CANVAS_SIZE / 2) },
    { x: CANVAS_SIZE / 2, y: randomBetween(ORIGIN, MAX_DISTANCE) },
    generatePoint()
  ];

  loop();
}

function loop () {
  requestAnimationFrame(loop);

  update();
  render();
}

function update () {
  const p = points[0];
  const pp = points[1];
  const mid = { x: (p.x + pp.x) / 2, y: (p.y + pp.y) / 2 };
  const cp1 = { x: (mid.x + p.x) / 2, y: p.y };
  const cp2 = { x: (mid.x + pp.x) / 2, y: pp.y };
  const sledOnLine = getCubicBezierXYatPercent(p, pp, cp1, cp2, 0.5);

  points = points.map(point => ({ x: point.x - sledOnLine.x, y: point.y - sledOnLine.y }));
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

function getCubicBezierXYatPercent (start, end, cp1, cp2, percent) {
  const x = CubicN(percent, start.x, cp1.x, cp2.x, end.x);
  const y = CubicN(percent, start.y, cp1.y, cp2.y, end.y);
  return { x, y };
}

// cubic helper formula at percent distance
function CubicN (pct, a, b, c, d) {
  const t2 = pct * pct;
  const t3 = t2 * pct;
  return a + (-a * 3 + pct * (3 * a - a * pct)) * pct
  + (3 * b + pct * (-6 * b + b * 3 * pct)) * pct
  + (c * 3 - c * 3 * pct) * t2
  + d * t3;
}
