import { toDeg } from '../utils';
import Face from './Face';
import Edge from './Edge';

class TriFace extends Face {
  getEdges() {
    const edges = super.getEdges();

    const magnitudes = edges.map(edge => edge.getMagnitude());
    const maxMagnitude = Math.max(...magnitudes);
    const maxIndex = magnitudes.indexOf(maxMagnitude);

    return [
      // Max has to be first for DIV to be formed correctly
      edges[maxIndex],
      edges[(maxIndex + 1) % 3],
      edges[(maxIndex + 2) % 3],
    ];
  }

  getView(scale) {
    const edges = this.getEdges();

    const right = Math.abs(edges[1].getMagnitude() * Math.cos(toDeg(edges[1].getAngle(edges[0]))));
    const left = Math.abs(edges[2].getMagnitude() * Math.cos(toDeg(edges[2].getAngle(edges[0]))));
    const height = Math.abs(edges[1].getMagnitude() * Math.sin(toDeg(edges[1].getAngle(edges[0]))));

    let center;
    {
      const ratio = left / (right + left);
      const midBase = edges[0].getMiddle(ratio);
      const delta = new Edge(midBase, edges[1][1]).getAbsolute();
      const corner = edges[0][1].add(delta);

      center = new Edge(edges[0][0], corner).getMiddle();
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
