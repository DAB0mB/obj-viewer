import { getAngle, getVector } from '../utils';
import Shape from './Shape';

class Triangle extends Shape {
  constructor(vx1, vx2, vx3) {
    const combs = [
      {
        angle: getAngle(vx1, vx2, vx3),
        vertecies: [vx1, vx2, vx3],
      },
      {
        angle: getAngle(vx2, vx1, vx3),
        vertecies: [vx2, vx1, vx3],
      },
      {
        angle: getAngle(vx1, vx3, vx2),
        vertecies: [vx1, vx3, vx2],
      },
    ];

    const { vertecies } = combs.reduce((max, comb) => {
      return comb.angle > max.angle ? comb : max;
    });

    super(vertecies);

    this.basis = getVector(vertecies[0], vertecies[1]);
  }
}
