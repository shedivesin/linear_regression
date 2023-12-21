function det2(a, b, c, d) {
  return a * d - b * c;
}

function det3(a, b, c, d, e, f, g, h, i) {
  return a * det2(e, f, h, i) - b * det2(d, f, g, i) + c * det2(d, e, g, h);
}

class Regression2D {
  constructor() {
    this.n  = 0;
    this.x  = 0;
    this.y  = 0;
    this.xx = 0;
    this.xy = 0;
  }

  add(x, y) {
    this.n  ++;
    this.x  += (x     - this.x ) / this.n;
    this.y  += (y     - this.y ) / this.n;
    this.xx += (x * x - this.xx) / this.n;
    this.xy += (x * y - this.xy) / this.n;

    return this;
  }

  done() {
    const d = det2(1, this.x, this.x, this.xx);

    return [
      det2(this.y, this.x, this.xy, this.xx) / d,
      det2(     1, this.y, this.x , this.xy) / d,
    ];
  }
}

class Regression3D {
  constructor() {
    this.n  = 0;
    this.x  = 0;
    this.y  = 0;
    this.z  = 0;
    this.xx = 0;
    this.xy = 0;
    this.xz = 0;
    this.yy = 0;
    this.yz = 0;
  }

  add(x, y, z) {
    this.n  ++;
    this.x  += (x     - this.x ) / this.n;
    this.y  += (y     - this.y ) / this.n;
    this.z  += (z     - this.z ) / this.n;
    this.xx += (x * x - this.xx) / this.n;
    this.xy += (x * y - this.xy) / this.n;
    this.xz += (x * z - this.xz) / this.n;
    this.yy += (y * y - this.yy) / this.n;
    this.yz += (y * z - this.yz) / this.n;

    return this;
  }

  done() {
    const d = det3(1, this.x, this.y, this.x, this.xx, this.xy, this.y, this.xy, this.yy);

    return [
      det3(this.z, this.x, this.y, this.xz, this.xx, this.xy, this.yz, this.xy, this.yy) / d,
      det3(     1, this.z, this.y, this.x , this.xz, this.xy, this.y , this.yz, this.yy) / d,
      det3(     1, this.x, this.z, this.x , this.xx, this.xz, this.y , this.xy, this.yz) / d,
    ];
  }
}

export {Regression2D, Regression3D};
