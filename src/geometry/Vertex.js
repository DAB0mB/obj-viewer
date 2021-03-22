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
}

export default Vertex;
