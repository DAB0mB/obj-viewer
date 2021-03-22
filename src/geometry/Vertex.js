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
