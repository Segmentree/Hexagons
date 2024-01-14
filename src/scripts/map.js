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
    this.createRow(leftCorner.x, leftCorner.y);
  }

  createRow(X, Y) {
    for (
      let x = X, y = Y, j = 0, index = 0;
      index < this.columns;
      x += this.radius * (1 + Math.cos(this.angle)),
        y += (-1) ** j++ * this.radius * Math.sin(this.angle),
        ++index
    ) {
      this.hexagons.push(new Hexagon({ x, y }, this.radius, this.angle));
    }
  }
}
