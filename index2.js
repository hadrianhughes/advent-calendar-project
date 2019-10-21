const canvas = document.getElementById('root');
const ctx = canvas.getContext('2d');

const CANVAS_SIZE = 200;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

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

loop();
