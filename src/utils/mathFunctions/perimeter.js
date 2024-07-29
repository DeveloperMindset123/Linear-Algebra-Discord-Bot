// file containing the mathemtical logic for calculating the perimeters of various commonly used geometric shapes
// TODO : convert to arrow function and module export to imporve readabillity
const squarePerimeter = (side) => {
  return Math.round(side * 4 * 1000) / 1000;
};

const rectanglePerimeter = (length, width) => {
  return Math.round((length * 2 + width * 2) * 1000) / 1000;
};

const circlePerimeter = (radius) => {
  return Math.round(radius * 2 * pi * 1000) / 1000;
};

const trianglePerimeter = (base, side1, side2) => {
  return Math.round((base + side1 + side2) * 1000) / 1000;
};

const parallelogramPerimeter = (side1, side2) => {
  return Math.round((side1 * 2 + side2 * 2) * 1000) / 1000;
};

const trapezePerimeter = (base1, base2, side1, side2) => {
  return Math.round((base1 + base2 + side1 + side2) * 1000) / 1000;
};

const diamondPerimeter = (side) => {
  return Math.round(side * 4 * 1000) / 1000;
};

export {
  squarePerimeter,
  rectanglePerimeter,
  circlePerimeter,
  trianglePerimeter,
  parallelogramPerimeter,
  trapezePerimeter,
  diamondPerimeter,
};
