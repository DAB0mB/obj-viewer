import { toDeg } from '../utils';
import Feature from './Feature';
import Vector from './Vector';
import Vertex from './Vertex';

class Face extends Feature {
  constructor(...vxs) {
    vxs = vxs.map(vx => new Vertex(...vx));

    super(...vxs);
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

  getView(scale = 1) {
    const vecs = this.getVectors();
    const right = vecs[1].getMagnitude() * Math.cos(toDeg(vecs[1].getAngle(vecs[0]))) * scale;
    const left = vecs[2].getMagnitude() * Math.cos(toDeg(vecs[2].getAngle(vecs[0]))) * scale;
    const height = vecs[1].getMagnitude() * Math.sin(toDeg(vecs[1].getAngle(vecs[0]))) * scale;

    const div = document.createElement('div');

    div.style.borderColor = 'blue transparent transparent';
    div.style.borderWidth = `${height}px ${left}px 0 ${right}px`;
    div.style.borderStyle = 'solid';
    div.style.width = '0';
    div.style.height = '0';

    return div;
  }
}

export default Face;
