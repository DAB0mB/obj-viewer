export const roundTo = (n, p, round = Math.round) => {
  return round(n / p) * p;
};

export const fixFloat = (n) => {
  return roundTo(n, Number.EPSILON);
};

export const toDeg = (rad) => {
  return rad * 180 / Math.PI;
};
