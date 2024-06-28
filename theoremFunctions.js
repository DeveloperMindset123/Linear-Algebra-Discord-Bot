const pythagoreOtherSide = (hypotenuse, knownSide) => {
  return (
    Math.round(
      Math.sqrt(hypotenuse * hypotenuse - knownSide * knownSide) * 1000
    ) / 1000
  );
};

const inverseOfPythagorasTheorem = (referenceSide, otherSide1, otherSide2) => {
  const squaredReferenceSide = referenceSide * referenceSide;
  const squaredOtherSide1 = otherSide1 * otherSide2;
  const squaredOtherSide2 = otherSide2 * otherSide2;
  return squaredReferenceSide === squaredOtherSide1 + squaredOtherSide2;
};

const thalesWithUnknownNumerator = (
  knownFractionNumerator,
  knownFractionDenominator,
  knownDenominator
) => {
  return (
    Math.round(
      ((knownFractionNumerator * knownDenominator) / knownFractionDenominator) *
        1000
    ) / 1000
  );
};

const thalesWithUnknownDenominator = (
  knownFractionNumerator,
  knownFractionDenominator,
  knownNumerator
) => {
  return (
    Math.round(
      ((knownFractionDenominator * knownNumerator) / knownFractionNumerator) *
        1000
    ) / 1000
  );
};

export {
  pythagoreOtherSide,
  inverseOfPythagorasTheorem,
  thalesWithUnknownDenominator,
  thalesWithUnknownNumerator,
};
