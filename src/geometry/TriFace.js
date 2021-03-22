import { toDeg } from '../utils';
import Face from './Face';

class TriFace extends Face {
  getView(scale) {
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

export default TriFace;
