import Feature from './Feature';

class Vertex extends Feature {
  getDistance(target) {
    let prod = 0;

    for (let i in this) {
      const selfValue = this[i];
      const targetValue = target[i];

      prod += (targetValue - selfValue) ** 2;
    }

    return Math.sqrt(prod);
  }

  getMagnitude() {
    return this.getDistance([0, 0, 0]);
  }

  // Source: https://www.analyzemath.com/stepbystep_mathworksheets/vectors/vector3D_angle.html
  getAngle(target) {
    target = new Vertex(...target);
    let dotProd = 0;

    for (let i in this) {
      dotProd += this[i] * target[i];
    }

    const magProd = this.getMagnitude() * target.getMagnitude();
    const rad = Math.acos(dotProd / magProd);

    return rad;
  }

  getRotation() {
    const x = new Vertex(0, this[1], this[2]).getAngle([0, 0, 1]);
    const y = new Vertex(this[0], 0, this[2]).getAngle([1, 0, 0]);
    const z = new Vertex(this[0], this[1], 0).getAngle([0, 1, 0]);

    return new Vertex(x, y, z);
  }

  add(target) {
    return new Vertex(
      this[0] + target[0],
      this[1] + target[1],
      this[2] + target[2],
    );
  }

  sub(target) {
    return new Vertex(
      this[0] - target[0],
      this[1] - target[1],
      this[2] - target[2],
    );
  }

  mul(target) {
    return new Vertex(
      this[0] * target[0],
      this[1] * target[1],
      this[2] * target[2],
    );
  }

  div(target) {
    return new Vertex(
      this[0] / target[0],
      this[1] / target[1],
      this[2] / target[2],
    );
  }
}

export default Vertex;
