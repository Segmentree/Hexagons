class Hexagon {
  constructor(center, radius, angle) {
    this.center = center;
    this.radius = radius;
    this.angle = angle;
    this.createPerimeter();
  }

  createPerimeter() {
    this.perimeter = [];
    for (let i = 0; i <= 6; i++) {
      const x = this.center.x + this.radius * Math.cos(this.angle * i);
      const y = this.center.y + this.radius * Math.sin(this.angle * i);
      this.perimeter.push({ x, y });
    }
  }
}

export class HexagonMap {
  constructor(leftCorner, rows, columns, radius, angle = (2 * Math.PI) / 6) {
    this.leftCorner = leftCorner;
    this.rows = rows;
    this.columns = columns;
    this.radius = radius;
    this.angle = angle;
    this.hexagons = [];
    this.directions = {
      0: [
        [-1, 0],
        [-1, -1],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, 0],
      ],
      1: [
        [-1, 0],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ],
    };
    for (let row = 0; row < rows; row++) {
      const X = this.leftCorner.x;
      const Y =
        this.leftCorner.y + row * this.radius * 2 * Math.sin(this.angle);
      this.createRow(X, Y);
    }
  }

  createRow(X, Y) {
    const row = [];
    for (
      let x = X, y = Y, j = 0, index = 0;
      index < this.columns;
      x += this.radius * (1 + Math.cos(this.angle)),
        y += (-1) ** j++ * this.radius * Math.sin(this.angle),
        ++index
    ) {
      row.push(new Hexagon({ x, y }, this.radius, this.angle));
    }
    this.hexagons.push(row);
  }

  getAdjacentElements(I, J) {
    const adjacentElements = [];
    const directions = this.directions[J % 2];
    for (let idx = 0; idx < directions.length; idx++) {
      const direction = directions[idx];
      const [di, dj] = direction;
      const i = I + di;
      const j = J + dj;
      if (i < 0 || i >= this.rows || j < 0 || j >= this.columns) continue;
      adjacentElements.push(this.hexagons[i][j]);
    }
    return adjacentElements;
  }
}
