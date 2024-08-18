// we will need to implement some functions of our own
const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");

/**
 * @Reference https://stackoverflow.com/questions/6921826/got-90-of-the-javascript-code-cant-figure-out-the-rest
 * @Explanation This is just a copy paste based implementation from the stack overflow, with the main intention of getting it to work
 * Each entry of a matrix object represents a column
 * @Reference https://stackoverflow.com/questions/74252075/javascript-how-to-convert-a-string-to-a-2d-array --> converting array contianing numbers wrapped in string into an actual array using JSON library
 * TODO : Remove the unneccessary comments later once functionality has been completely implemented
 * TODO : There's a lot of repetitive code, see how you can abstract them
 * TODO : Convert the resulting matrix entries into fractions instead afterwards
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

// ! NOTE --> this function isn't being properly called, logical flaw somewhere
const vectorLength = async (currVector) => {
  // in summary, vector length is the square root of the dot product of the vector by itself
  // ? This could be causing errors due to improper datatype being passed in
  console.log(`current vector : ${currVector}`);
  return math.sqrt(
    math.dot(
      math.matrix(JSON.parse(currVector)),
      math.matrix(JSON.parse(currVector))
    )
  );
};

// NOTE : for the first vector, can just pass in vectorMatrix[0] to access the first vector entry in the matrix
// ** This function is the most important as it connects everything else together in the code
const scalarVectorMultiplication = (scalarValue, vectorValue) => {
  // iterate through each of the individual entries of the vector and multiply the entries by the corresponding scalarValue
  for (let i = 0; i < math.size(vectorValue); i++) {
    vectorValue[i] = parseFloat(scalarValue * vectorValue[i]);
  }
  // should return the modified vector
  return math.matrix(vectorValue);
};

// define a function since we will need to repetitively write the logic to normalize the vector otherwise
// remember that the formula for vector normalization is simply (1 / ||v||) * v
const vectorNormalization = (vector) => {
  // utilize the vector scalar multiplication function to update the values here
  // we can utilize both of the functions defined above to calculate the length of the vector in this case
  // ** Just to be on the safe side and to make the numbers more friendly to wokr with, convert the scalar value into a fraction instead using math.fraction
  return scalarVectorMultiplication(
    1 /
      vectorLength(
        math.matrix(JSON.parse(vector)),
        math.matrix(JSON.parse(vector))
      )
  );
};

// ((u1 * x) * u1) --> here we simply replace with u_n instead, essentially the product of any unitVector multiplied the x-vector and the unitVector outside of that
// here, we simply pass in the unitVector and the vectorX that we are attempting to multiply, simplifying things greatly
const unitVectorMultiplication = (unitVector, vectorX) => {
  // should return the unit vector's product --> returns a vector
  return scalarVectorMultiplication(math.dot(unitVector, vectorX), unitVector);
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
  // otherwise, normalize the first vector, since that's the first step
  const unitVector1 = vectorNormalization(vectorMatrix[0]);
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
        //math.multiply(math.multiply(unitVector1, vectorMatrix[1]), unitVector1)
        unitVectorMultiplication(unitVector1, vectorMatrix[1])
      );
      // normalize the vector --> (1 / ||v|| * v)
      // simply call on the helper function vectorNormalization by passing in the orthogonalVector as the parameter value in this case and the logic within the function defined will handle the rest
      let unitVector2 = vectorNormalization(orthogonalVector);
      // add the newly created unit vector into the array of orthonormal vectors
      orthonormalVectors.push(math.matrix(unitVector2));
      break;
    // in the case that we are working with three vectors in this case
    case 3:
      // this will require some repetitive logic from case 2 as well as some addition of it's own
      // orthogonalVector2 =  x - ((u1 * x) * u1) where x = VectorMatrix[1]
      const orthogonalVector2of3 = math.subtract(
        vectorMatrix[1],
        unitVectorMultiplication(unitVector1, vectorMatrix[1])
      );
      const unitVector2Of3 = vectorNormalization(orthogonalVector2of3);
      // othrogonalVector3 = (x - (u1 * x) * u1)  - ((u2 * x) * u2) where x = vectorMatrix[2]
      // TODO :  refactor this
      // step 1: calculate result = x - ((u1 * x) * u1) where x = vectorMatrix[2]
      const orthogonalVector3Part1 = math.subtract(
        vectorMatrix[2],
        unitVectorMultiplication(unitVector1, vectorMatrix[2])
      );
      // step 2 : calculate result = result - ((u2 * x) * u2)
      const orthogonalVector3 = math.subtract(
        orthogonalVector3Part1,
        unitVectorMultiplication(unitVector2Of3, vectorMatrix[2])
      );
      // normalize the vector and add the unit vectors to the array
      const unitVector3 = vectorNormalization(orthogonalVector3);
      orthonormalVectors.push(unitVector2Of3, unitVector3);
      break;
    case 4:
      // assuming in this case we are working with 4 vectors instead
      // unitVector2 = x - (u1 * x) * u1 where x = vectorMatrix[1]
      const orthogonalVector2of4 = math.subtract(
        vectorMatrix[1],
        unitVectorMultiplication(unitVector1, vectorMatrix[1])
      );
      const unitVector2of4 = vectorNormalization(orthogonalVector2of4);

      // this is the first part --> result = x - ((u1 * x) * u1)
      const orthogonalVector3of4Part1 = math.subtract(
        vectorMatrix[2],
        unitVectorMultiplication(unitVector1, vectorMatrix[2])
      );
      // step 2 --> result=result - ((u2 * x) * u2) where x = vectorMatrix[2]
      const orthogonalVector3of4 = math.subtract(
        orthogonalVector3of4Part1,
        unitVectorMultiplication(unitVector2of4, vectorMatrix[2])
      );

      // normalize the resulting vector
      const unitVector3of4 = vectorNormalization(orthogonalVector3of4);
      // orthogonalVector4 = x - ((u1 * x) * u1) - ((u2 * x) * u2) - ((u3 * x) * u3) where x = vectorMatrix[3] --> aka the last value in the 2d array

      // this will calculate the first part result = (x - ((u1 * x) * u1))
      const orthogonalVector4Part1 = math.subtract(
        vectorMatrix[3],
        // NOTE that unitVector1 is globally accessible, as that is the first step of the algorithm
        unitVectorMultiplication(unitVector1, vectorMatrix[3])
      );

      // next, we take the orthogonalVector4Part1 and use it to calcualte the next part --> result = result - ((u2 * x) * u2)
      const orthogonalVector4Part2 = math.subtract(
        orthogonalVector4Part1,
        unitVectorMultiplication(unitVector2of4, vectorMatrix[3])
      );

      // lastly, we use the value stored in orthogonalVector4Part2 to calcualte the last part of the vector, whcih we can name orhtogonalVector4 as no additional parts would be neeccessary in this case --> result = result - ((u3 * x) * u3)
      const orthogonalVector4 = math.subtract(
        orthogonalVector4Part2,
        unitVectorMultiplication(unitVector3of4, vectorMatrix[3])
      );
      const unitVector4 = vectorNormalization(orthogonalVector4);
      // now we have the vector, all we do is normalize it and add all the orthonormal vectors into the array
      orthonormalVectors.push(unitVector2of4, unitVector3of4, unitVector4);
      break;

    case 5:
      // working with 5 vectors
      // orthognal-x = x - ((u1 * x) * u1) where x = vectorMatrix[1] --> aka the second vector
      const orthogonalVector2of5 = math.subtract(
        vectorMatrix[1],
        unitVectorMultiplication(unitVector1, vectorMatrix[1])
      );
      const unitVector2of5 = vectorNormalization(orthogonalVector2of5);

      // x - ((u1 * x) * u1) - ((u2 * x) * u2) where x = vectorMatrix[2]
      // the first part implements result = x - ((u1 * x) * u1)
      const orthogonalVector3of5Part1 = math.subtract(
        vectorMatrix[2],
        unitVectorMultiplication(unitVector1, vectorMatrix[2])
      );
      // this implements the second part --> result = result - ((u2 * x) * u2)
      const orthogonalVector3of5 = math.subtract(
        orthogonalVector3of5Part1,
        unitVectorMultiplication(unitVector2of5, vectorMatrix[2])
      );
      const unitVector3of5 = vectorNormalization(orthogonalVector3of5);

      // x - ((u1 * x) * u1) - ((u2 * x) * u2) - ((u3 * x) * u3) where x = vectorMatrix[3]
      // step 1 : result = x - ((u1 * x) * u1)
      const orthgonalVector4of5Part1 = math.subtract(
        vectorMatrix[3],
        unitVectorMultiplication(unitVector1, vectorMatrix[3])
      );
      // here we are doing the following --> result = result - ((u2 * x) * u2) where x = vectorMatrix[3]
      const orthogonalVector4of5Part2 = math.subtract(
        orthgonalVector4of5Part1,
        unitVectorMultiplication(unitVector2of5, vectorMatrix[3])
      );
      // here we are doing the last part --> result = result - ((u3 * x) * u3) where x = vectorMatrix[3]
      const orthogonalVector4of5 = math.subtract(
        orthogonalVector4of5Part2,
        unitVectorMultiplication(unitVector3of5, vectorMatrix[3])
      );
      const unitVector4of5 = vectorNormalization(orthogonalVector4of5);

      // now we calculate the last vector that we are wokring with
      // the formula being implemented is the following --> x - ((u1 * x) * x) - ((u2 * x) * u2) - ((u3 * x) * u3) - ((u4 * x) * u4) where x = vectorMatrix[4]
      // part 1 calcualtes the following --> result = x - ((u1 * x) * x)
      const orthogonalVector5Part1 = math.subtract(
        vectorMatrix[4],
        unitVectorMultiplication(unitVector1, vectorMatrix[4])
      );
      // step2 --> calculates the following --> result = result - ((u2 * x) * u2)
      const orthogonalVector5Part2 = math.subtract(
        orthogonalVector5Part1,
        unitVectorMultiplication(unitVector2of5, vectorMatrix[4])
      );
      // step 3 --> calculates the following --> result = result - ((u3 * x) * u3)
      const orthogonalVector5Part3 = math.subtract(
        orthogonalVector5Part2,
        unitVectorMultiplication(unitVector3of5, vectorMatrix[4])
      );
      // step 4 (last part) --> calcualtes the following --> result = result - ((u4 * x) * u4) --> result = orthogonalVector5part3
      const orthogonalVector5 = math.subtract(
        orthogonalVector5Part3,
        unitVectorMultiplication(unitVector4of5, vectorMatrix[4])
      );

      // normalize the vector
      const unitVector5 = vectorNormalization(orthogonalVector5);

      // lastly, add all the orthonormal vectors onto the array
      orthonormalVectors.push(
        // convert them into matrix just in case using math.matrix when pushing the values
        math.matrix(unitVector2of5),
        unitVector3of5,
        unitVector4of5,
        unitVector5
      );
      break;
    default:
      // do nothing, end of function execution
      return;
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

      // some tests first to ensure that the functions defined above are working as intended or not and see what needs fixing in this
      // hypothetically case 3 should execute
      // ! NOTE : test works now
      // TODO : Remove later
      /*
      result = await gramSchmidt(
        [
          [0, 0, 1, 0],
          [1, 1, 2, 1],
          [1, 0, 1, 1],
          [-2, 9, 0, 5],
        ],
        4
      ); */
      //console.info(`resulting value : ${math.matrix(result)}`);
      //console.info(`${math.dot([0, -1, -1, 0], [-3, 9, -1, 4])}`);

      // retrieve the user's input and apply the gram schmidt equation
      const inputMatrix = math.matrix(
        JSON.parse(await interaction.options.get("vector-matrix").value)
      );
      const inputDimension = parseInt(
        JSON.parse(await interaction.options.get("matrix-dimension").value)
      );

      // the following are the inputs collected
      console.log(`The retrieved inputMatrix is ${inputMatrix}`);
      console.log(`the dimension of the vector is ${inputDimension}`);
      const result2 = await gramSchmidt(inputMatrix, inputDimension);
      parseInt(
        JSON.parse(await interaction.options.get("matrix-dimension").value)
      );

      // print out the result
      console.info(`The resulting matrix from the user input is ${result2}`);

      // retrieve and convert the matrix
      /* --> we will worry about this section later once we make sure the functionality works with static values 
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
      ); */

      // reply on the discord chat the relevant response
      await interaction.editReply({
        content: `Command successfully executed!`,
      });
    } catch (error) {
      console.error(error);
      await interaction.editReply({
        content: "There was an error executing this command!",
      });
    }
  },
};
