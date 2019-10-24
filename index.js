const canvas = document.getElementById('root');
const ctx = canvas.getContext('2d');

const CANVAS_SIZE = 200;
const POINT_X = CANVAS_SIZE + 200;
const ACTIVE_INDEX = 1;
const MAX_Y_OFFSET = 10;
const SPEED = 0.03;

const sledImg = document.getElementById('sled');

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let points = [];
let percentCounter = 0.5;

const random = (max = 1, min = 0) => Math.floor(Math.random() * (max - min)) + min;
const last = arr => arr.length > 0 ? arr[arr.length - 1] : undefined;

const generatePoint = (pts, x, y) => {
  const lastPoint = last(pts);
  const lastY = lastPoint ? lastPoint.y : CANVAS_SIZE / 2;
  const isBigDrop = Math.random() > 0.8;
  const maxYOffset = isBigDrop ? 50 : MAX_Y_OFFSET;

  return {
    x: isNaN(x) ? POINT_X : x,
    y: isNaN(y) ? random(lastY + maxYOffset, lastY - maxYOffset) : y
  };
};

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
  points = [
    generatePoint(points, -CANVAS_SIZE),
    generatePoint(points, 0),
    generatePoint(points, CANVAS_SIZE),
    generatePoint(points)
  ];

  loop();
}

function loop () {
  requestAnimationFrame(loop);

  update();
  render();
}

function update () {
  percentCounter += SPEED;
  if (percentCounter > 1) {
    points = [ ...points.slice(1), generatePoint(points) ];
    percentCounter = SPEED;
  }

  const p = points[ACTIVE_INDEX];
  const pp = points[ACTIVE_INDEX + 1];
  const mid = { x: (p.x + pp.x) / 2, y: (p.y + pp.y) / 2 };
  const cp1 = { x: (mid.x + p.x) / 2, y: p.y };
  const cp2 = { x: (mid.x + pp.x) / 2, y: pp.y };
  const sledOnLine = getCubicBezierXYatPercent(p, pp, cp1, cp2, percentCounter);
  const differenceY = (CANVAS_SIZE / 2) - sledOnLine.y;
  const differenceX = (CANVAS_SIZE / 2) - sledOnLine.x;

  points = points.map(point => ({ x: point.x + differenceX, y: point.y + differenceY }));
}

function render () {
  canvas.width = canvas.width;

  // Render terrain
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 0;i < points.length - 1;i += 1) {
    const p = points[i];
    const pp = points[i + 1];
    const mid = { x: (p.x + pp.x) / 2, y: (p.y + pp.y) / 2 };
    const cp1 = { x: (mid.x + p.x) / 2, y: p.y };
    const cp2 = { x: (mid.x + pp.x) / 2, y: pp.y };

    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, pp.x, pp.y);
  }
  ctx.lineTo(points[points.length - 1].x + 50, 300);
  ctx.lineTo(points[0].x, 300);
  ctx.fillStyle = '#EBE8DF';
  ctx.fill();

  ctx.closePath();

  // Render sled
  const p = points[ACTIVE_INDEX];
  const pp = points[ACTIVE_INDEX + 1];
  const mid = { x: (p.x + pp.x) / 2, y: (p.y + pp.y) / 2 };
  const cp1 = { x: (mid.x + p.x) / 2, y: p.y };
  const cp2 = { x: (mid.x + pp.x) / 2, y: pp.y };

  const p1 = getCubicBezierXYatPercent(p, pp, cp1, cp2, percentCounter);
  const p2 = getCubicBezierXYatPercent(p, pp, cp1, cp2, percentCounter + SPEED);
  const dy = p2.y - p1.y;
  const dx = p2.x - p1.x;
  const angle = Math.atan2(dy, dx);

  ctx.translate(CANVAS_SIZE / 2, CANVAS_SIZE / 2);
  ctx.rotate(angle);
  ctx.translate(-CANVAS_SIZE / 2, -CANVAS_SIZE / 2);
  ctx.drawImage(sledImg, CANVAS_SIZE / 2 - sledImg.width / 2, CANVAS_SIZE / 2 - sledImg.height);
  ctx.closePath();
}

init();
