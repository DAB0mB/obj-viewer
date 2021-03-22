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

  getCenter() {
    throw Error('Face::getCenter() was not implemented');
  }

  getView() {
    throw Error('Face::getView() was not implemented');
  }
}

export default Face;
