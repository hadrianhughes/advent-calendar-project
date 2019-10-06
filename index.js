const canvas = document.getElementById('root');
const context = canvas.getContext('2d');

const CANVAS_WIDTH = 200;
const CANVAS_HEIGHT = 200;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
