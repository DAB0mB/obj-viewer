import Feature from './Feature';
import Vector from './Vector';
import Vertex from './Vertex';

class Face extends Feature {
  constructor(...vxs) {
    if (new.target !== Face) {
      vxs = vxs.map(vx => new Vertex(...vx));

      return super(...vxs);
    }

    switch (vxs.length) {
      case 3: return new (require('./TriFace').default)(...vxs);
      default: throw Error(`Face with ${vxs.length} vertecies not supported`);
    }
  }

  getVectors() {
    const vecs = [];

    for (let i in this) {
      const vx1 = this[i];
      const vx2 = this[(i + 1) % this.length];

      vecs.push(new Vector(vx1, vx2));
    }

    return vecs;
  }

  // Source: https://stackoverflow.com/questions/1966587/given-3-points-how-do-i-calculate-the-normal-vector
  getNormal() {
    const [a, b, c] = this;
    const dir = b.sub(a).mul(c.sub(a));
    const mag = dir.getMagnitude();
    const norm = dir.div([mag, mag, mag]);

    return norm;
  }

  getView() {
    throw Error('Face::getView() was not implemented');
  }
}

export default Face;
