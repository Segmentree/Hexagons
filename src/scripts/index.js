const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const angle = (2 * Math.PI) / 6;
const radius = 50;

function drawHexagon(x, y) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    ctx.lineTo(
      x + radius * Math.cos(angle * i),
      y + radius * Math.sin(angle * i)
    );
  }
  ctx.closePath();
  ctx.stroke();
}

function init() {
  drawHexagon(100, 100);
}

init();
