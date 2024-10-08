// TODO : convert to arrow functions instead and use module style export later in the development phase
function add(a, b) {
  return Math.round((a + b) * 1000) / 1000;
}

function subtract(a, b) {
  return Math.round((a - b) * 1000) / 1000;
}

function multiply(a, b) {
  return Math.round(a * b * 1000) / 1000;
}

function divide(a, b) {
  return Math.round((a / b) * 1000) / 1000;
}

function modulo(a, b) {
  return Math.round((a % b) * 1000) / 1000;
}

function map(value, start1, stop1, start2, stop2) {
  return (
    1.0 * start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1))
  );
}

module.exports = {
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide,
  modulo: modulo,
  percentageAugmentation: map,
};
