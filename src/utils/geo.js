export const getVector = (vx1, vx2) => {
  const v = [vx1[0] - vx2[0], vx1[1] - vx2[1], vx1[2] - vx2[2], vx1.w - vx2.w];

  return v;
};

export const getMagnitude = (vec) => {
  return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]);
};

export const getNormal = (vec) => {
  const mag = getMagnitude(vec);

  return [vec[0] / mag, vec[1] / mag, vec[2] / mag];
};

export const getDotProduct = (vec1, vec2) => {
  const norm1 = getNormal(vec1);
  const norm2 = getNormal(vec2);

  return vec1norm[0] * vec2norm[0] + vec1norm[1] * vec2norm[1] + vec1norm[2] * vec2norm[2];
};

// Source: https://stackoverflow.com/questions/19729831/angle-between-3-points-in-3d-space
export const getAngle = (vx1, vx2, vx3) => {
  const vec1 = getVector(vx1, vx2);
  const vec2 = getVector(vx2, vx3);
  const dotProd = getDotProduct(vec1, vec2);

  return Math.acos(dotProd);
};
