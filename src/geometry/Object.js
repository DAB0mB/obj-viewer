import Face from './Face';
import Feature from './Feature';

class Object extends Feature {
  constructor(...faces) {
    faces = faces.map(f => new Face(...f));

    super(...faces);
  }

  getMeshes(scale) {
    const views = [];

    for (let f of this) {
      views.push(...f.getMeshes(scale));
    }

    return views;
  }
}

export default Object;
