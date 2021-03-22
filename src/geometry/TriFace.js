import { toDeg } from '../utils';
import Face from './Face';
import Vector from './Vector';
import Vertex from './Vertex';

class TriFace extends Face {
  getVectors() {
    const vecs = super.getVectors();

    const magnitudes = vecs.map(vec => vec.getMagnitude());
    const maxMagnitude = Math.max(...magnitudes);
    const maxIndex = magnitudes.indexOf(maxMagnitude);

    return [
      // Max has to be first for DIV to be formed correctly
      vecs[maxIndex],
      vecs[(maxIndex + 1) % 3],
      vecs[(maxIndex + 2) % 3],
    ];
  }

  getView(scale) {
    const vecs = this.getVectors();

    const right = Math.abs(vecs[1].getMagnitude() * Math.cos(toDeg(vecs[1].getAngle(vecs[0]))));
    const left = Math.abs(vecs[2].getMagnitude() * Math.cos(toDeg(vecs[2].getAngle(vecs[0]))));
    const height = Math.abs(vecs[1].getMagnitude() * Math.sin(toDeg(vecs[1].getAngle(vecs[0]))));

    let center;
    {
      const ratio = left / (right + left);
      const midBase = vecs[0].getMiddle(ratio);
      const delta = new Vector(midBase, vecs[1][1]).getAbsolute();
      const corner = vecs[0][1].add(delta);

      center = new Vector(vecs[0][0], corner).getMiddle();
    }

    const div = document.createElement('div');

    // TODO: Control color
    div.style.position = 'absolute';
    div.style.borderColor = 'transparent transparent blue';
    div.style.borderWidth = `0 ${right * scale}px ${height * scale}px ${left * scale}px`;
    div.style.transform = `translate3d(${center[0] * scale}px, ${center[1] * scale}px, ${center[2] * scale}px)`;
    div.style.borderStyle = 'solid';
    div.style.width = '0';
    div.style.height = '0';
    div.style.left = '0';
    div.style.top = '0';

    return div;
  }
}

export default TriFace;
