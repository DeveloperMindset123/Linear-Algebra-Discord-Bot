// we will need to implement some functions of our own
const { contents } = require("cheerio/lib/api/traversing");
const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");

/**
 * @Reference https://stackoverflow.com/questions/6921826/got-90-of-the-javascript-code-cant-figure-out-the-rest
 * @Explanation This is just a copy paste based implementation from the stack overflow, with the main intention of getting it to work
 * Each entry of a matrix object represents a column
 * @Reference https://stackoverflow.com/questions/74252075/javascript-how-to-convert-a-string-to-a-2d-array --> converting array contianing numbers wrapped in string into an actual array using JSON library
 * TODO : Remove the unneccessary comments later once functionality has been completely implemented
 */

// n here represents the number of entries in each vector --> aka it's dimension
// n here should be passed in based on the length of the matrix that we convert using math.matrix --> hopefully it doesn't break anything in the process, refer to the previous commands to see how the matrix can potentially be converted into an array possibly

/*
const gramScmidt = (matrixA, n) => {
  // TODO : Change up the variable names to make them easily recognizable
  // TODO : See if you can convert this into a mathjs matrix and calculate the number of vectors using the built in function instead if possible
  // within a function, it's more appropraite to use let over var, var is global scoped whereas let is locally scoped
  // we will need to know the total number of vectors to loop through the matrix, a nested for loop will be sufficient
  // this might throw an error during execution --> keep in mind
  const totalVectors = matrixA.length;

  // print out the value to ensure that the vector is being read correctly
  console.log(totalVectors);

  for (var i = 0; i < totalVectors; i++) {
    // the first loop allows us to access the inner arrays
    let tempVector = matrixA[i];
    // NOTE : initially made an error and didn't define the second loop statement
    for (var j = 0; j < i; j++) {
      // the second loop allows us to access the values within the arrays itself, aka the matrice entries itself
      const dotProd = dot(matrixA[i], matrixA[j], n);
      const toSubtract = multiply(dotProd, matrixA[j], n);
      tempVector = subtract(tempVector, toSubtract, n);
    }
    // recall that the norm is calcualted after we make the vectors orthogonal to one another
    var nrm = norm(tempVector, n);
    // update the corresponding matrix via it's column
    matrixA[i] = multiply(1 / nrm, tempVector, n);
  }
};

// helper functions --> needed for the relevant vector arithemtics to execute the formula
// returns a value
const subtract = (vectorX, vectorY, n) => {
  const result = new Array(n);
  for (var i = 0; i < n; i++) {
    // nothing fancy here, when it comes to vector addition and subtraction, all we do is loop throuhg and add the corresponding entries
    result[i] = vectorX[i] - vectorY[i];
  }
  return result;
};

// function written in javascript to execute a vector-scalar based multiplication
const multiply = (scalarC, vectorX, n) => {
  let result = new Array(n);
  for (var i = 0; i < n; i++) {
    // wwhen it comes to vector and scalar multiplication, all we do is multiply the scalar value by every single entries in the vector
    result[i] = scalarC * vectorX[i];
  }
  return result;
};

// dot products can only be calculated for two vectors at a time, at a linear order
const dot = (vectorX, vectorY, n) => {
  // this will be our accumulator to keep track of the sum of all the entries as they are multiplied
  var sum = 0;
  for (var i = 0; i < n; i++) {
    // definition of the dot product vector
    sum += vectorX[i] * vectorY[i];
  }
  return sum;
};

// logic for normalizing the vector --> utilizes the dotProduct in here
const norm = (vectorX, n) => {
  // normalization requires the distance formula
  // https://www.freetext.org/Introduction_to_Linear_Algebra/Basic_Vector_Operations/Normalization/ --> reference link for how normalization works
  return math.sqrt(dot(vectorX, vectorX, n));
}; */

const vectorLength = (currVector) => {
  // calculating the vector's length is nothing but calculating the dot product of a vector by itself and square rooting the result
  /**
   * @Reference https://mathjs.org/docs/reference/functions/dot.html --> reference function to calculate the dot product of two vectors
   */
  return math.sqrt(math.dot(currVector, currVector));
};

// NOTE : for the first vector, can just pass in vectorMatrix[0] to access the first vector entry in the matrix
const scalarVectorMultiplication = (scalarValue, vectorValue) => {
  // the vector provided must be a scalar value in itself
  for (let i = 0; i < math.size(vectorValue); i++) {
    // we want to store the values in floating values format for simplicity
    vectorValue[i] = parseFloat(scalarValue * vectorValue[i]);
  }
  // should return the modified vector
  return vectorValue;
};

const gramSchmidt = async (vectorMatrix, dimension_n) => {
  // we are working with 2 dimensioanl arrays in this case, so we will need to loop through the first array
  // we only need to know the number of rows
  // check if the number of vectors that we are working with is 1, we cannot apply gram-scmdit if we only have one vector
  // declare an empty array to store the newly created orthonormal vectors
  let orthonormalVectors = [];
  if (dimension_n === 1 || dimension_n === 0) {
    // end of function execution
    return 0;
  }
  // otherwise, orthonormalize the first vector
  // nothing but the normalization of the first vector
  const unitVector1 = scalarVectorMultiplication(
    1 / vectorLength(vectorMatrix[0]),
    vectorMatrix[0]
  );

  // add the first unit vector to the array
  orthonormalVectors.push(unitVector1);
  // print out the vector to see what it is
  console.log(`The unit vector is ${unitVector1}`);

  // use a switch statement to calculate for upto 10 vectors, rather than a more complex recursive approach, since for the context of the problem, we are not gonna be working with anything more than 3-4 vectors for such a question as students
  //  a switch statement would be more suitable for me in this case
  // NOTE : removed for loop, overcomplicates things --> we will know the matrix of the index we are working with here and storing the values in the array instead
  switch (dimension_n) {
    // in the case that we are working with 2 vectors
    case 2:
      // this means we are just working with 2 vectors and we simply apply the gram-schmidt process and be done with it there
      // x - (u1 * x) * u1 --> simplest format of the formula, in this case x = vectorMatrix[i]
      const orthogonalVector = math.subtract(
        vectorMatrix[1],
        math.multiply(math.multiply(unitVector1, vectorMatrix[1]), unitVector1)
      );
      // normalize the vector --> (1 / ||v|| * v)
      let unitVector2 = scalarVectorMultiplication(
        1 / vectorLength(orthogonalVector),
        orthogonalVector
      );
      orthonormalVectors.push(unitVector2);
      break;
    // in the case that we are working with three vectors in this case
    case 3:
      // this will require some repetitive logic from case 2 as well as some addition of it's own
      // orthogonalVector2 =  x - (u1 * x) * u1 where x = VectorMatrix[1]
      const orthogonalVector2 = math.subtract();
      const unitVector2Of3 = 0;

      // othrogonalVector3 = (x - (u1 * x) * u1)  - ((u2 * x) * u2) where x = vectorMatrix[2]
      const orthogonalVector3 = math.subtract(
        math.subtract(
          vectorMatrix[2],
          math.multiply(
            math.multiply(unitVector1, vectorMatrix[2]),
            unitVector1
          )
        ),
        math.multiply(
          math.multiply(unitVector2Of3, vectorMatrix[2]),
          unitVector2Of3
        )
      );
  }

  // return the array contianing the two unit vectors
  return orthonormalVectors;
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
        .setDescription("please provide ")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("matrix-dimension")
        .setDescription(
          "please provide the number of vectors that we are working with"
        )
        .setRequired(true)
    ),

  execute: async function (interaction) {
    try {
      await interaction.deferReply({
        ephemeral: true,
      });

      // retrieve and convert the matrix
      const vectorMatrix = math.matrix(
        await interaction.options.get("vector-matrix").value
      );

      console.log(`The newly created array is ${vectorMatrix}`);

      // call on the function to calculate the gram-schmidt
      const result = await gramSchmidt(
        vectorMatrix,
        parseInt(
          JSON.parse(await interaction.options.get("matrix-dimension").value)
        )
      );

      if (result === 0) {
        await interaction.editReply({
          content:
            "Cannot Perform Gram-Schmidit on one or fewer, must require minimum of two vectors to work with",
        });
      } else {
        // display the result
        await interaction.editReply({
          content: `The resulting matrix is ${math.matrix(result)}`,
        });
      }

      // indicate on the terminal the successful execution of the function
      console.log(
        `Successful Execution. Resulting value is ${JSON.stringify(result)}`
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
