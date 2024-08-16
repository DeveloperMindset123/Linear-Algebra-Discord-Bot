// we will need to implement some functions of our own
const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");

/**
 * @Reference https://stackoverflow.com/questions/6921826/got-90-of-the-javascript-code-cant-figure-out-the-rest
 * @Explanation This is just a copy paste based implementation from the stack overflow, with the main intention of getting it to work
 * Each entry of a matrix object represents a column
 * TODO : Remove the unneccessary comments later once functionality has been completely implemented
 */

// n here represents the number of entries in each vector --> aka it's dimension
// n here should be passed in based on the length of the matrix that we convert using math.matrix --> hopefully it doesn't break anything in the process, refer to the previous commands to see how the matrix can potentially be converted into an array possibly
const gramScmidt = (matrixA, dimension_n) => {
  // TODO : See if you can convert this into a mathjs matrix and calculate the number of vectors using the built in function instead if possible
  // within a function, it's more appropraite to use let over var, var is global scoped whereas let is locally scoped
  // we will need to know the total number of vectors to loop through the matrix, a nested for loop will be sufficient
  // this might throw an error during execution --> keep in mind
  const totalVectors = matrixA.length;

  // print out the value to ensure that the vector is being read correctly
  console.log(totalVectors);

  for (let i = 0; i < totalVectors; i++) {
    // the first loop allows us to access the inner arrays
    let tempVector = matrixA[i];
    // NOTE : initially made an error and didn't define the second loop statement
    for (let j = 0; j < i; j++) {
      // the second loop allows us to access the values within the arrays itself, aka the matrice entries itself
      const dotProduct = calculateDotProduct(
        matrixA[i],
        matrixA[j],
        dimension_n
      );
      const toSubtract = multiplyVectorScalar(
        dotProduct,
        matrixA[j],
        dimension_n
      );
      tempVector = subtract(tempVector, toSubtract, dimension_n);
    }
    // recall that the norm is calcualted after we make the vectors orthogonal to one another
    let normVal = normalize(tempVector, dimension_n);
    // update the corresponding matrix via it's column
    matrixA[i] = multiplyVectorScalar(1 / normVal, tempVector, dimension_n);
  }
};

// helper functions --> needed for the relevant vector arithemtics to execute the formula
// returns a value
const subtract = (vectorX, vectorY, dimension_n) => {
  const result = new Array(dimension_n);
  for (let i = 0; i < dimension_n; i++) {
    // nothing fancy here, when it comes to vector addition and subtraction, all we do is loop throuhg and add the corresponding entries
    result[i] = vectorX[i] - vectorY[i];
  }
  return result;
};

// function written in javascript to execute a vector-scalar based multiplication
const multiplyVectorScalar = (scalarConstant, vectorX, dimension_n) => {
  let result = new Array(dimension_n);
  for (let i = 0; i < dimension_n; i++) {
    // wwhen it comes to vector and scalar multiplication, all we do is multiply the scalar value by every single entries in the vector
    result[i] = scalarConstant * vectorX[i];
  }
  return result;
};

// dot products can only be calculated for two vectors at a time, at a linear order
const calculateDotProduct = (vectorX, vectorY, dimension_n) => {
  // this will be our accumulator to keep track of the sum of all the entries as they are multiplied
  let sum = 0;
  for (let i = 0; i < dimension_n; i++) {
    // definition of the dot product vector
    sum += vectorX[i] * vectorY[i];
  }
  return sum;
};

// logic for normalizing the vector --> utilizes the dotProduct in here
const normalize = (vectorX, dimension_n) => {
  // normalization requires the distance formula
  // https://www.freetext.org/Introduction_to_Linear_Algebra/Basic_Vector_Operations/Normalization/ --> reference link for how normalization works
  return math.sqrt(calculateDotProduct(vectorX, vectorX, dimension_n));
};

module.exports = {
  // commands will always require a data and execute statement, to utilize our functions, we will need only 1 option
  // option 1 : the matrix formed based on the vectors provided in 2 domensional format (reference question : https://www.cds.caltech.edu/~marsden/wiki/uploads/math1c-08/home/Sol1Ma1cPrac08.pdf)

  data: new SlashCommandBuilder()
    .setName("gram-schmidt")
    .setDescription(
      "command used to apply the gram schmidt process on all the vectors provided"
    )
    .addStringOption((option) =>
      option
        .setName("vector-matrix")
        .setDescription(
          "please provide all the original vectors in the form of a matrix"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("matrix-dimension")
        .setDescription(
          "please provide the dimension of the matrix, must match the matrix provided"
        )
        .setRequired(true)
    ),

  execute: async function (interaction) {
    try {
      await interaction.deferReply({
        ephemeral: true,
      });

      // retrieve and convert the matrix
      const vectorMatrix = new Array(
        math.matrix(
          JSON.parse(await interaction.options.get("vector-matrix").value)
        )
      );

      console.log(`The newly created array is ${vectorMatrix}`);

      // call on the function to calculate the gram-schmidt
      const resultingMatrix = gramScmidt(
        vectorMatrix,
        parseInt(
          JSON.parse(await interaction.options.get("matrix-dimension").value)
        )
      );

      // indicate on the terminal the successful execution of the function
      console.log(
        `Successful Execution. Resulting value is ${JSON.stringify(
          resultingMatrix
        )}`
      );

      // reply on the discord chat the relevant response
      await interaction.editReply({
        content: `The resulting value is ${resultingMatrix}`,
      });
    } catch (error) {
      console.error(error);
      await interaction.editReply({
        content: "There was an error executing this command!",
      });
    }
  },
};
