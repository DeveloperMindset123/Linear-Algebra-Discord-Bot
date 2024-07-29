const cubeVolume = (side) => {
  return Math.round(Math.pow(side, 3) * 1000) / 1000;
};

const rectangleCuboidVolume = (length, width, height) => {
  return Math.round(length * width * height * 1000) / 1000;
};

// Mathematical representation of the cylinder formula
const cylinderVolume = (radius, height) => {
  return Math.round(pi * (radius * radius) * height * 1000) / 1000;
};

const coneVolume = (radius, height) => {
  return Math.round(((pi * (radius * radius) * height) / 3) * 1000) / 1000;
};

const squareBasedPyramidVolume = (side, height) => {
  return Math.round(((side * side * height) / 3) * 1000) / 1000;
};

const rectangleBasedPyramidVolume = (length, width, height) => {
  return Math.round(((length * width * height) / 3) * 1000) / 1000;
};

const sphereVolume = (radius) => {
  return Math.round((4.0 / 3.0) * pi * Math.pow(radius, 3) * 1000) / 1000;
};

/*
export {
  cubeVolume,
  rectangleCuboidVolume,
  cylinderVolume,
  coneVolume,
  squareBasedPyramidVolume,
  rectangleBasedPyramidVolume,
  sphereVolume,
};
*/
