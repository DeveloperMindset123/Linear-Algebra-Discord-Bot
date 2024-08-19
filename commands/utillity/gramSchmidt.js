// we will need to implement some functions of our own
const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");
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
    // TODO : Remove this, this option is no longer needed
    .addStringOption((option) =>
      option
        .setName("matrix-dimension")
        .setDescription(
          "please provide the number of vectors that we are working with"
        )
        // make the requirement for this optional, as it will not be used
        .setRequired(false)
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

      // retrieve and convert the inputs into math.matrix based objects
      // to retrieve the array, we will need to target the _data object
      // ? The following are the returned keys if Object.keys(inputMatrixArray) is used --> _data,_size,_datatype --> we are interested in data and _size only
      const input = math.matrix(
        JSON.parse(await interaction.options.get("vector-matrix").value)
      );

      // we will need to implement a map function to create the new array
      let inputMatrixArray = [];
      //const inputMatrixArray = new Array(input._data); // stores the vectors in 2D array as part of the corresponding value to the key _data
      const numberOfVectors = parseInt(input._size[0]); // stores the dimension of the matrix, a 2x4 matrix would be stored as [2,4] for example
      for (let i = 0; i < numberOfVectors; i++) {
        console.log("Current vector is :", input._data[i]);
        // ! May require adding Array.from statement here
        inputMatrixArray.push(input._data[i]);
        console.warn(inputMatrixArray);
      }

      console.log(`Retrieved input matrix : ${inputMatrixArray}`);
      console.log(`Retrieved number of vectors : ${numberOfVectors}`);

      /*
      // retrieve the user's input and apply the gram schmidt equation
      const inputMatrix = await interaction.options.get("vector-matrix");
      const newArray = Array.from(Object.values(inputMatrix));
      console.log(newArray[2]);
      const convertedMatrix = Array.from(JSON.parse(newArray[2]));
      console.log(typeof convertedMatrix);
      console.log(`Converted matrix : ${convertedMatrix}`);
      console.log(`First vector : ${convertedMatrix[0]}`);
      console.log(`Second vector : ${convertedMatrix[1]}`);

      let newMatrix = [];
      convertedMatrix.map((currVector, index) => {
        console.log(
          `The curr vector value is for the main map function --> ${currVector}`
        );
        newMatrix.push(currVector);
        console.log(newMatrix[index]);
        console.log(typeof newMatrix);
      });
      console.log(typeof convertedMatrix);
      const inputDimension = parseInt(
        JSON.parse(await interaction.options.get("matrix-dimension").value)
      );
      // ! NOTE : Only convert into a matrix after the vector input has been recieved, remove some of the other logic and directly implement the functionality as needed --> the issue is not fully understanding the returning object type from math.matrix and arbitarily using it in an attempt to solve the problem
      console.warn(`newly created array vector 1 ${math.matrix(newMatrix[0])}`);
      console.warn(`newly created array vector 2 ${math.matrix(newMatrix[1])}`);
      const experimentalArray = math.matrix(newMatrix);
      console.info(
        `Testing the object view --> ${Object.entries(experimentalArray)}`
      );
      // ** IT WORKS!!!!!
      console.log(
        `Object based view --> ${JSON.stringify(experimentalArray._data[0])}`
      );

      console.log(
        `Check what the keys are : ${Object.keys(experimentalArray)}`
      );

      // the following are the inputs collected
      // ! Note : This is being properly recieved as the input
      // ? The error is most likely occuring within the gram-schmidt function body itself, there's something wrong with the logic there
      console.log(`The retrieved inputMatrix is ${inputMatrix}`);
      console.log(`the dimension of the vector is ${inputDimension}`); */

      // ! DON'T Remove --> math.matrix doesn't return a 2D array, it returns an object, keep that in mind
      const result2 = math.matrix(
        await gramSchmidt(inputMatrixArray, numberOfVectors)
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
        content: `Successful execution of command, resulting value is ${result2}`,
      });
    } catch (error) {
      console.error(error);
      await interaction.editReply({
        content: "There was an error executing this command!",
      });
    }
  },
};
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
  // this is being printed out successfully
  console.log(`current vector : ${currVector}`);
  return math.sqrt(math.dot(currVector, currVector));
};
// add the above function to the export object --> creates a key named vectorLength and a value set to the function vectorLength
exports.vectorLength = vectorLength;
// NOTE : for the first vector, can just pass in vectorMatrix[0] to access the first vector entry in the matrix
// ** This function is the most important as it connects everything else together in the code
const scalarVectorMultiplication = async (scalarValue, vectorValue) => {
  // iterate through each of the individual entries of the vector and multiply the entries by the corresponding scalarValue
  // check if the values provided are undefined or not
  if (!scalarValue || !vectorValue) {
    console.error("Either scalarValue or vectorValue is undefined.");
    // ? print out to specifically define where the error is occuring here --> as in explicitly determining whether scalarValue or vectorValue is the one that's undefined
    console.warn(`scalar value : ${scalarValue}`);
    console.warn(`vector value : ${vectorValue}`);
    return;
  }
  // else, implement the following
  for (let i = 0; i < math.size(vectorValue); i++) {
    console.log(`Vector value : ${vectorValue}`);
    vectorValue[i] = parseFloat(scalarValue * vectorValue[i]);
  }
  // should return the modified vector
  return vectorValue;
};
// add the function scalarVectorMultuplication to the list of functions to be exported
exports.scalarVectorMultiplication = scalarVectorMultiplication;

// define a function since we will need to repetitively write the logic to normalize the vector otherwise
// remember that the formula for vector normalization is simply (1 / ||v||) * v
const vectorNormalization = async (vector) => {
  // utilize the vector scalar multiplication function to update the values here
  // we can utilize both of the functions defined above to calculate the length of the vector in this case
  // ** Just to be on the safe side and to make the numbers more friendly to wokr with, convert the scalar value into a fraction instead using math.fraction

  // print it out to see where the error message is occuring
  // TODO : Remove Later
  if (!vector) {
    console.error("The vector is undefined");
    return;
  }
  //console.log(`The resulting vector from the multiplication is ${scalarVectorMultiplication(1 / vectorLength(math.matrix(JSON.parse(vector))), math.matrix(JSON.parse(vector)))}`);
  return (
    await scalarVectorMultiplication(
      // argument 1 being passed onto scalarVectorMultiplication
      1 / vectorLength(vector)
    ),
    // argument 2 being passed in for the scalarVector multiplication
    vector
  );
};
exports.vectorNormalization = vectorNormalization;
// ((u1 * x) * u1) --> here we simply replace with u_n instead, essentially the product of any unitVector multiplied the x-vector and the unitVector outside of that
// here, we simply pass in the unitVector and the vectorX that we are attempting to multiply, simplifying things greatly
const unitVectorMultiplication = async (unitVector, vectorX) => {
  if (!unitVector || !vectorX) {
    // this error message is also being printed out
    console.error("Either unitVector or vectorX is undefined.");
    // ? determine which one is undefined --> UPDATE : They are both printing out as undefined in this case
    console.warn(`unit vector : ${unitVector}`);
    console.warn(`vector value : ${vectorX}`);
    return;
  }
  // should return the unit vector's product --> returns a vector
  return await scalarVectorMultiplication(
    math.dot(unitVector, vectorX),
    unitVector
  );
};
// export out the unitVectorMultiplication function
exports.unitVectorMultiplication = unitVectorMultiplication;
const gramSchmidt = async (vectorMatrix, dimension_n) => {
  // we are working with 2 dimensioanl arrays in this case, so we will need to loop through the first array
  // we only need to know the number of rows
  // check if the number of vectors that we are working with is 1, we cannot apply gram-scmdit if we only have one vector
  // declare an empty array to store the newly created orthonormal vectors
  let orthonormalVectors = [];
  let ArrayVector = [];
  // TODO : uncomment the conditional statement once the remaining functionality is wokring as inteded
  /* --> this is less important at the moment
  if (dimension_n === 1 || dimension_n === 0) {
    // end of function execution
    console.error(
      "Dimension must be at least 1 for this algorithm to execute as intended."
    );
    return 0;
  } */

  console.log(`the first vector in the matrix is : ${ArrayVector[0]}`);
  const unitVector1 = await vectorNormalization(vectorMatrix[0]);
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
      // ! this statement is being printed out, meaning the error is occuring within here
      console.warn("Switch statement for dimension 2 is executing...");
      // this means we are just working with 2 vectors and we simply apply the gram-schmidt process and be done with it there
      // x - (u1 * x) * u1 --> simplest format of the formula, in this case x = vectorMatrix[i]
      console.warn(`vectorMatrix[1]'s value : ${vectorMatrix[1]}`);
      console.warn(`unit vector 1 : ${unitVector1}`);
      const argument2 = await unitVectorMultiplication(
        unitVector1,
        vectorMatrix[1]
      );
      // error occuring in this line
      const orthogonalVector = math.subtract(vectorMatrix[1], argument2);
      // normalize the vector --> (1 / ||v|| * v)
      // simply call on the helper function vectorNormalization by passing in the orthogonalVector as the parameter value in this case and the logic within the function defined will handle the rest
      let unitVector2 = await vectorNormalization(orthogonalVector);
      // add the newly created unit vector into the array of orthonormal vectors
      orthonormalVectors.push(math.matrix(unitVector2));
      break;
    // in the case that we are working with three vectors in this case
    case 3:
      // this will require some repetitive logic from case 2 as well as some addition of it's own
      // orthogonalVector2 =  x - ((u1 * x) * u1) where x = VectorMatrix[1]
      const orthogonalVector2of3 = math.subtract(
        vectorMatrix[1],
        await unitVectorMultiplication(unitVector1, vectorMatrix[1])
      );
      const unitVector2Of3 = await vectorNormalization(orthogonalVector2of3);
      // othrogonalVector3 = (x - (u1 * x) * u1)  - ((u2 * x) * u2) where x = vectorMatrix[2]
      // TODO :  refactor this
      // step 1: calculate result = x - ((u1 * x) * u1) where x = vectorMatrix[2]
      const orthogonalVector3Part1 = math.subtract(
        vectorMatrix[2],
        await unitVectorMultiplication(unitVector1, vectorMatrix[2])
      );
      // step 2 : calculate result = result - ((u2 * x) * u2)
      const orthogonalVector3 = math.subtract(
        orthogonalVector3Part1,
        await unitVectorMultiplication(unitVector2Of3, vectorMatrix[2])
      );
      // normalize the vector and add the unit vectors to the array
      const unitVector3 = await vectorNormalization(orthogonalVector3);
      orthonormalVectors.push(unitVector2Of3, unitVector3);
      break;
    case 4:
      // assuming in this case we are working with 4 vectors instead
      // unitVector2 = x - (u1 * x) * u1 where x = vectorMatrix[1]
      const orthogonalVector2of4 = math.subtract(
        vectorMatrix[1],
        await unitVectorMultiplication(unitVector1, vectorMatrix[1])
      );
      const unitVector2of4 = await vectorNormalization(orthogonalVector2of4);

      // this is the first part --> result = x - ((u1 * x) * u1)
      const orthogonalVector3of4Part1 = math.subtract(
        vectorMatrix[2],
        await unitVectorMultiplication(unitVector1, vectorMatrix[2])
      );
      // step 2 --> result=result - ((u2 * x) * u2) where x = vectorMatrix[2]
      const orthogonalVector3of4 = math.subtract(
        orthogonalVector3of4Part1,
        await unitVectorMultiplication(unitVector2of4, vectorMatrix[2])
      );

      // normalize the resulting vector
      const unitVector3of4 = await vectorNormalization(orthogonalVector3of4);
      // orthogonalVector4 = x - ((u1 * x) * u1) - ((u2 * x) * u2) - ((u3 * x) * u3) where x = vectorMatrix[3] --> aka the last value in the 2d array

      // this will calculate the first part result = (x - ((u1 * x) * u1))
      const orthogonalVector4Part1 = math.subtract(
        vectorMatrix[3],
        // NOTE that unitVector1 is globally accessible, as that is the first step of the algorithm
        await unitVectorMultiplication(unitVector1, vectorMatrix[3])
      );

      // next, we take the orthogonalVector4Part1 and use it to calcualte the next part --> result = result - ((u2 * x) * u2)
      const orthogonalVector4Part2 = math.subtract(
        orthogonalVector4Part1,
        await unitVectorMultiplication(unitVector2of4, vectorMatrix[3])
      );

      // lastly, we use the value stored in orthogonalVector4Part2 to calcualte the last part of the vector, whcih we can name orhtogonalVector4 as no additional parts would be neeccessary in this case --> result = result - ((u3 * x) * u3)
      const orthogonalVector4 = math.subtract(
        orthogonalVector4Part2,
        await unitVectorMultiplication(unitVector3of4, vectorMatrix[3])
      );
      const unitVector4 = await vectorNormalization(orthogonalVector4);
      // now we have the vector, all we do is normalize it and add all the orthonormal vectors into the array
      orthonormalVectors.push(unitVector2of4, unitVector3of4, unitVector4);
      break;

    case 5:
      // working with 5 vectors
      // orthognal-x = x - ((u1 * x) * u1) where x = vectorMatrix[1] --> aka the second vector
      const orthogonalVector2of5 = math.subtract(
        vectorMatrix[1],
        await unitVectorMultiplication(unitVector1, vectorMatrix[1])
      );
      const unitVector2of5 = await vectorNormalization(orthogonalVector2of5);

      // x - ((u1 * x) * u1) - ((u2 * x) * u2) where x = vectorMatrix[2]
      // the first part implements result = x - ((u1 * x) * u1)
      const orthogonalVector3of5Part1 = math.subtract(
        vectorMatrix[2],
        await unitVectorMultiplication(unitVector1, vectorMatrix[2])
      );
      // this implements the second part --> result = result - ((u2 * x) * u2)
      const orthogonalVector3of5 = math.subtract(
        orthogonalVector3of5Part1,
        await unitVectorMultiplication(unitVector2of5, vectorMatrix[2])
      );
      const unitVector3of5 = await vectorNormalization(orthogonalVector3of5);

      // x - ((u1 * x) * u1) - ((u2 * x) * u2) - ((u3 * x) * u3) where x = vectorMatrix[3]
      // step 1 : result = x - ((u1 * x) * u1)
      const orthgonalVector4of5Part1 = math.subtract(
        vectorMatrix[3],
        await unitVectorMultiplication(unitVector1, vectorMatrix[3])
      );
      // here we are doing the following --> result = result - ((u2 * x) * u2) where x = vectorMatrix[3]
      const orthogonalVector4of5Part2 = math.subtract(
        orthgonalVector4of5Part1,
        await unitVectorMultiplication(unitVector2of5, vectorMatrix[3])
      );
      // here we are doing the last part --> result = result - ((u3 * x) * u3) where x = vectorMatrix[3]
      const orthogonalVector4of5 = math.subtract(
        orthogonalVector4of5Part2,
        await unitVectorMultiplication(unitVector3of5, vectorMatrix[3])
      );
      const unitVector4of5 = await vectorNormalization(orthogonalVector4of5);

      // now we calculate the last vector that we are wokring with
      // the formula being implemented is the following --> x - ((u1 * x) * x) - ((u2 * x) * u2) - ((u3 * x) * u3) - ((u4 * x) * u4) where x = vectorMatrix[4]
      // part 1 calcualtes the following --> result = x - ((u1 * x) * x)
      const orthogonalVector5Part1 = math.subtract(
        vectorMatrix[4],
        await unitVectorMultiplication(unitVector1, vectorMatrix[4])
      );
      // step2 --> calculates the following --> result = result - ((u2 * x) * u2)
      const orthogonalVector5Part2 = math.subtract(
        orthogonalVector5Part1,
        await unitVectorMultiplication(unitVector2of5, vectorMatrix[4])
      );
      // step 3 --> calculates the following --> result = result - ((u3 * x) * u3)
      const orthogonalVector5Part3 = math.subtract(
        orthogonalVector5Part2,
        await unitVectorMultiplication(unitVector3of5, vectorMatrix[4])
      );
      // step 4 (last part) --> calcualtes the following --> result = result - ((u4 * x) * u4) --> result = orthogonalVector5part3
      const orthogonalVector5 = math.subtract(
        orthogonalVector5Part3,
        await unitVectorMultiplication(unitVector4of5, vectorMatrix[4])
      );

      // normalize the vector
      const unitVector5 = await vectorNormalization(orthogonalVector5);

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
      // break out of the loop, so some kind of value can be returned
      break;
  }

  // return the array contianing the two unit vectors
  return orthonormalVectors;
};

// export out the gramSchmidt function
exports.gramSchmidt = gramSchmidt;
