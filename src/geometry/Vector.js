import Feature from './Feature';
import Vertex from './Vertex';

class Vector extends Feature {
  constructor(vx1, vx2) {
    vx1 = new Vertex(...vx1);
    vx2 = new Vertex(...vx2);

    super(vx1, vx2);
  }

  getMagnitude() {
    return this[0].getDistance(this[1]);
  }

  getAbsolute() {
    return new Vertex(
      this[1][0] - this[0][0],
      this[1][1] - this[0][1],
      this[1][2] - this[0][2],
    );
  }

  getMiddle(ratio = .5) {
    const abs = this.getAbsolute();

    return new Vertex(
      this[0][0] + abs[0] * ratio,
      this[0][1] + abs[1] * ratio,
      this[0][2] + abs[2] * ratio,
    );
  }

  // Source: https://www.analyzemath.com/stepbystep_mathworksheets/vectors/vector3D_angle.html
  getAngle(target) {
    const absSelf = this.getAbsolute();
    const absTarget = new Vector(...target).getAbsolute();
    let dotProd = 0;

    for (let i in absSelf) {
      dotProd += absSelf[i] * absTarget[i];
    }

    const magProd = this.getMagnitude() * target.getMagnitude();
    const rad = Math.acos(dotProd / magProd);

    return rad;
  }
}

export default Vector;
