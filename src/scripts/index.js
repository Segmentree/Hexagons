import { HexagonMap } from './map.js';

class Canvas {
  constructor(canvasId) {
    const canvas = document.getElementById(canvasId);
    const radius = 50;
    const rows = 6;
    const columns = 10;

    this.context = canvas.getContext('2d');
    this.context.canvas.width = window.innerWidth;
    this.context.canvas.height = window.innerHeight;
    this.map = new HexagonMap({ x: 100, y: 100 }, rows, columns, radius);
    this.background = new HexagonMap({ x: 110, y: 120 }, rows, columns, radius);
  }

  fillShape(hexagon, color = 'red') {
    this.context.beginPath();
    for (let i = 0; i < hexagon.perimeter.length; i++) {
      const { x, y } = hexagon.perimeter[i];
      this.context.lineTo(x, y);
    }
    this.context.closePath();
    this.context.fillStyle = color;
    this.context.fill();
  }

  drawBorder(hexagon, color = 'blue') {
    for (let i = 1; i < hexagon.perimeter.length; i++) {
      const { x: fromX, y: fromY } = hexagon.perimeter[i - 1];
      const { x: toX, y: toY } = hexagon.perimeter[i];
      this.context.moveTo(fromX, fromY);
      this.context.lineTo(toX, toY);
      this.context.lineWidth = 2;
      this.context.strokeStyle = color;
      this.context.stroke();
      this.context.closePath();
    }
  }

  drawRow() {
    this.background.hexagons.forEach((row) => {
      row.forEach((hexagon) => {
        this.fillShape(hexagon, 'grey');
      });
    });
    this.map.hexagons.forEach((row) => {
      row.forEach((hexagon) => {
        this.fillShape(hexagon);
        this.drawBorder(hexagon);
      });
    });
  }

  colorAdjacentElements(I, J) {
    const adjacentElements = this.map.getAdjacentElements(I, J);
    adjacentElements.forEach((hexagon) => {
      this.fillShape(hexagon, 'green');
      this.drawBorder(hexagon, 'yellow');
    });
  }
}

function init() {
  const canvas = new Canvas('canvas');
  canvas.drawRow();
  canvas.colorAdjacentElements(3, 0);
}

init();
