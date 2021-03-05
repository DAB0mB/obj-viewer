import Parser from '../Parser';
import FaceParser from './FaceParser';
import VertextParser from './VertextParser';

class ObjParser extends Parser {
  parse() {
    const vertecies = [];
    const faces = [];

    this.cursor.next();

    while (this.cursor.value) {
      switch (this.cursor.value) {
        case 'v': {
          const vertex = new VertextParser(this.cursor).parse();
          vertecies.push(vertex);
          break;
        }
        case 'f': {
          const face = new FaceParser(this.cursor).parse();
          faces.push(face);
          break;
        }
        default: {
          this.cursor.next();
        }
      }
    }

    for (let face of faces) {
      for (let [i, vi] of Object.entries(face)) {
        face[i] = vertecies[vi - 1];
      }
    }

    return {
      vertecies,
      faces,
    };
  }
}

export default ObjParser;
