const canvas = document.getElementById('root');
const ctx = canvas.getContext('2d');

const CANVAS_SIZE = 200;
const POINT_X = CANVAS_SIZE + 50;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let points = [];

const random = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;

const generatePoint = (x, y) => ({
  x: isNaN(x) ? POINT_X : x,
  y: isNaN(y) ? random(CANVAS_SIZE) : y
});

function CubicN (pct, a, b, c, d) {
  const t2 = pct * pct;
  const t3 = t2 * pct;
  return a + (-a * 3 + pct * (3 * a - a * pct)) * pct
  + (3 * b + pct * (-6 * b + b * 3 * pct)) * pct
  + (c * 3 - c * 3 * pct) * t2
  + d * t3;
}

function getCubicBezierXYatPercent (start, end, cp1, cp2, percent) {
  const x = CubicN(percent, start.x, cp1.x, cp2.x, end.x);
  const y = CubicN(percent, start.y, cp1.y, cp2.y, end.y);
  return { x, y };
}

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
  const p = points[0];
  const pp = points[1];
  const mid = { x: (p.x + pp.x) / 2, y: (p.y + pp.y) / 2 };
  const cp1 = { x: (mid.x + p.x) / 2, y: p.y };
  const cp2 = { x: (mid.x + pp.x) / 2, y: pp.y };
  const sledOnLine = getCubicBezierXYatPercent(p, pp, cp1, cp2, 0.5);
  const differenceY = (CANVAS_SIZE / 2) - sledOnLine.y;
  const differenceX = (CANVAS_SIZE / 2) - sledOnLine.x;

  points = points.map(point => ({ x: point.x + differenceX, y: point.y + differenceY }));
}

function render () {
  canvas.width = canvas.width;

  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 0;i < points.length - 1;i += 1) {
    const p = points[i];
    const pp = points[i + 1];
    const mid = { x: (p.x + pp.x) / 2, y: (p.y + pp.y) / 2 };
    const cp1 = { x: (mid.x + p.x) / 2, y: p.y };
    const cp2 = { x: (mid.x + pp.x) / 2, y: pp.y };

    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, pp.x, pp.y);
    ctx.stroke();
  }

  ctx.closePath();

  // Render sled
  ctx.beginPath();
  ctx.arc(CANVAS_SIZE / 2, CANVAS_SIZE / 2, 5, 0, 2 * Math.PI);
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
}

init();
