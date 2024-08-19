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
    ),
  execute: async function (interaction) {
    try {
      await interaction.deferReply({
        ephemeral: true,
      });

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

      // ? The following are the returned keys if Object.keys(inputMatrixArray) is used --> _data,_size,_datatype --> we are interested in data and _size only
      const input = math.matrix(
        JSON.parse(await interaction.options.get("vector-matrix").value)
      );

      const numberOfVectors = parseInt(input._size[0]);

      //console.log(`Retrieved input matrix : ${inputMatrixArray}`);
      console.log(`Retrieved number of vectors : ${numberOfVectors}`);

      // ! DON'T Remove --> math.matrix doesn't return a 2D array, it returns an object, keep that in mind

      const result2 =
        // directly pass in the matrix object, it contains all the infroamtion that is needed to begin with
        math.matrix(await gramSchmidt(input));
      console.info(`The resulting matrix from the user input is ${result2}`);

      console.log(math.multiply(2, math.matrix([1, 1, 1, 1])));
      await interaction.editReply({
        content: `Successful execution of command`,
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

// ! NOTE --> this function isn't being properly called, logical flaw somewhere --> assume that all the parameters are of the math.matrix datatype, an object --> with keys _data, _datatypes, _size
const vectorLength = async (currVector) => {
  console.log(`current vector : ${currVector._data}`);
  // we don't need to write data in this case, mathjs will be automatically be able to interpret the matrix from the provided datatype
  return math.sqrt(math.dot(currVector, currVector._data));
};
// add the above function to the export object --> creates a key named vectorLength and a value set to the function vectorLength
exports.vectorLength = vectorLength;
// NOTE : for the first vector, can just pass in vectorMatrix[0] to access the first vector entry in the matrix
// ** This function is the most important as it connects everything else together in the code --> vector
// ? This function is not needed, since math.multiply(scalar, vector) works just fine
const scalarVectorMultiplication = async (scalarValue, vector) => {
  // iterate through each of the individual entries of the vector and multiply the entries by the corresponding scalarValue
  // check if the values provided are undefined or not
  if (!scalarValue || !vector) {
    console.error("Either scalarValue or vectorValue is undefined.");
    // ? print out to specifically define where the error is occuring here --> as in explicitly determining whether scalarValue or vectorValue is the one that's undefined
    //console.warn(`scalar value : ${scalarValue}`);
    //console.warn(`vector value : ${vector}`);
    return;
  }

  for (let i = 0; i < math.size(vector._size[0]); i++) {
    console.log(`Vector value : ${vector._data}`);
    vectorValue._data[i] = parseFloat(scalarValue * parseInt(vector._data[i]));
  }
  // should return the modified vector, reconvert it back to a matrix again
  return math.matrix(vector);
};
// add the function scalarVectorMultuplication to the list of functions to be exported
exports.scalarVectorMultiplication = scalarVectorMultiplication;

// define a function since we will need to repetitively write the logic to normalize the vector otherwise
// remember that the formula for vector normalization is simply (1 / ||v||) * v
// ! Don't use this function either, simply use math.multiply instead as that would be more accurate to implement --> later on you may migrate to a function instead
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
  return await scalarVectorMultiplication(
    // argument 1 being passed onto scalarVectorMultiplication
    1 / math.sqrt(math.dot(math.matrix(vector), math.matrix(vector))),
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
    math.dot(math.matrix(unitVector), math.matrix(vectorX)),
    math.matrix(unitVector)
  );
};
// export out the unitVectorMultiplication function
exports.unitVectorMultiplication = unitVectorMultiplication;
const gramSchmidt = async (vectorMatrix) => {
  // we are working with 2 dimensioanl arrays in this case, so we will need to loop through the first array
  // we only need to know the number of rows
  // check if the number of vectors that we are working with is 1, we cannot apply gram-scmdit if we only have one vector
  // declare an empty array to store the newly created orthonormal vectors

  // ! Use this array to store the orthogonal vectors
  let orthogonalVectors = [];
  // store the first vector here
  orthogonalVectors.push(math.matrix(vectorMatrix._data[0]));

  // ? use this array to store the orthonormal vectors
  let orthonormalVectors = [];
  const dimension = vectorMatrix._size[0];
  //let ArrayVector = [];
  const matrixDimension = vectorMatrix._size;
  console.log(`Matrix Dimension : ${matrixDimension}`);
  // TODO : uncomment the conditional statement once the remaining functionality is wokring as inteded
  /* --> this is less important at the moment
  if (dimension_n === 1 || dimension_n === 0) {
    // end of function execution
    console.error(
      "Dimension must be at least 1 for this algorithm to execute as intended."
    );
    return 0;
  } */

  //console.log(`the first vector in the matrix is : ${ArrayVector[0]}`);
  // ensure that your passing in the appropriate value --> vectorNormalization should also return a math.matrix based value in this case
  console.warn(vectorMatrix._data[0]);
  const unitVector1 = math.matrix(
    math.multiply(
      1 / math.sqrt(math.dot(vectorMatrix._data[0], vectorMatrix._data[0])),
      vectorMatrix._data[0]
    )
  );

  console.warn(`The resulting unit vector is ${unitVector1._data}`);
  //await vectorNormalization(vectorMatrix._data[0]);
  // add the first unit vector to the array
  orthonormalVectors.push(unitVector1);
  console.log(`current orthonormal vector array : ${orthonormalVectors}`);
  console.log(`current orthogonal vector is : ${orthogonalVectors}`);

  switch (dimension) {
    // in the case that we are working with 2 vectors
    case 2:
      console.warn("Dimension 2 executing...");
      // x - (u1 * x) * u1 --> simplest format of the formula, in this case x = vectorMatrix[1]
      const orthogonalVector1 = math.subtract(
        vectorMatrix._size[1],
        math.multiply(
          math.multiply(unitVector1._data, vectorMatrix._data[1]),
          unitVector1._data
        )
      );
      console.log(`product 1 : ${orthogonalVector1}`);
      /*const orthogonalVector2 = math.subtract(
          math.matrix(
            vectorMatrix._data[1],
            math.multiply(
              // ! note : don't mess up vectorMatrix._data and vectorMatrix._size in the future
              math.multiply(unitVector1._data, vectorMatrix._data[1]),
              unitVector1._data
            )
          )
        ); */
      //console.log(`The resulting orthogonal vector is ${}`);
      //orthogonalVectors.push(orthogonalVector2);
      //console.log(`The current orthogonal vector is ${orthogonalVectors}`);
      /* --> we will just do plain old
        // ! this statement is being printed out, meaning the error is occuring within here
        console.warn("Switch statement for dimension 2 is executing...");
        // this means we are just working with 2 vectors and we simply apply the gram-schmidt process and be done with it there
  
        console.warn(`vectorMatrix[1]'s value : ${vectorMatrix._data[1]}`);
        console.warn(`unit vector 1 : ${unitVector1}`);
        const argument2 = await unitVectorMultiplication(
          math.matrix(unitVector1),
          math.matrix(vectorMatrix._data[1])
        );
        // error occuring in this line
        const orthogonalVector = math.subtract(
          math.matrix(vectorMatrix._data[1]),
          math.matrix(argument2)
        );
        // normalize the vector --> (1 / ||v|| * v)
        // simply call on the helper function vectorNormalization by passing in the orthogonalVector as the parameter value in this case and the logic within the function defined will handle the rest
        let unitVector2 = await vectorNormalization(
          math.matrix(orthogonalVector)
        );
        // add the newly created unit vector into the array of orthonormal vectors
        orthonormalVectors.push(math.matrix(unitVector2));
        break;
      // in the case that we are working with three vectors in this case */
      break;

    case 3:
      console.warn("Switch statement for dimension 3 is executing...");
      // this will require some repetitive logic from case 2 as well as some addition of it's own
      // orthogonalVector2 =  x - ((u1 * x) * u1) where x = VectorMatrix[1]
      const orthogonalVector2of3 = math.subtract(
        math.matrix(vectorMatrix._data[1]),
        await unitVectorMultiplication(
          math.matrix(unitVector1),
          math.matrix(vectorMatrix._data[1])
        )
      );
      const unitVector2Of3 = await vectorNormalization(
        math.matrix(orthogonalVector2of3)
      );
      // othrogonalVector3 = (x - (u1 * x) * u1)  - ((u2 * x) * u2) where x = vectorMatrix[2]
      // TODO :  refactor this
      // step 1: calculate result = x - ((u1 * x) * u1) where x = vectorMatrix[2]
      const orthogonalVector3Part1 = math.subtract(
        math.matrix(vectorMatrix._data[2]),
        await unitVectorMultiplication(
          math.matrix(unitVector1),
          math.matrix(vectorMatrix._data[2])
        )
      );
      // step 2 : calculate result = result - ((u2 * x) * u2)
      const orthogonalVector3 = math.subtract(
        math.matrix(orthogonalVector3Part1),
        await unitVectorMultiplication(
          math.matrix(unitVector2Of3),
          math.matrix(vectorMatrix._data[2])
        )
      );
      // normalize the vector and add the unit vectors to the array
      const unitVector3 = await vectorNormalization(
        math.matrix(orthogonalVector3)
      );
      orthonormalVectors.push(
        math.matrix(unitVector2Of3),
        math.matrix(unitVector3)
      );
      break;
    case 4:
      console.warn("Switch statement for dimension 4 is executing...");
      // assuming in this case we are working with 4 vectors instead
      // unitVector2 = x - (u1 * x) * u1 where x = vectorMatrix[1]
      const orthogonalVector2of4 = math.subtract(
        math.matrix(vectorMatrix._data[1]),
        await unitVectorMultiplication(
          math.matrix(unitVector1),
          math.matrix(vectorMatrix._data[1])
        )
      );
      const unitVector2of4 = await vectorNormalization(
        math.matrix(orthogonalVector2of4)
      );

      // this is the first part --> result = x - ((u1 * x) * u1)
      const orthogonalVector3of4Part1 = math.subtract(
        math.matrix(vectorMatrix._data[2]),
        await unitVectorMultiplication(
          math.matrix(unitVector1),
          math.matrix(vectorMatrix._data[2])
        )
      );
      // step 2 --> result=result - ((u2 * x) * u2) where x = vectorMatrix[2]
      const orthogonalVector3of4 = math.subtract(
        math.matrix(orthogonalVector3of4Part1),
        await unitVectorMultiplication(
          math.matrix(unitVector2of4),
          math.matrix(vectorMatrix._data[2])
        )
      );

      // normalize the resulting vector
      const unitVector3of4 = await vectorNormalization(
        math.matrix(orthogonalVector3of4)
      );
      // orthogonalVector4 = x - ((u1 * x) * u1) - ((u2 * x) * u2) - ((u3 * x) * u3) where x = vectorMatrix[3] --> aka the last value in the 2d array

      // TODO : Remove later
      const experimentalTest = await unitVectorMultiplication(
        math.matrix(unitVector1),
        math.matrix(vectorMatrix[3])
      );

      // ? Seems like the values are being properly recieved
      console.log(
        `Testing values being passed in : ${vectorMatrix[3]}, ${unitVector1._data}`
      );
      // the error is occuring here, meaning unitVectorMultuplication is the culprint
      console.error(`Experimental Test : ${experimentalTest}`);
      // this will calculate the first part result = (x - ((u1 * x) * u1))
      const orthogonalVector4Part1 = math.subtract(
        math.matrix(vectorMatrix._data[3]),
        // NOTE that unitVector1 is globally accessible, as that is the first step of the algorithm
        await unitVectorMultiplication(
          math.matrix(unitVector1),
          math.matrix(vectorMatrix._data[3])
        )
      );

      // next, we take the orthogonalVector4Part1 and use it to calcualte the next part --> result = result - ((u2 * x) * u2)
      const orthogonalVector4Part2 = math.subtract(
        math.matrix(orthogonalVector4Part1),
        await unitVectorMultiplication(
          math.matrix(unitVector2of4),
          math.matrix(vectorMatrix._data[3])
        )
      );

      // lastly, we use the value stored in orthogonalVector4Part2 to calcualte the last part of the vector, whcih we can name orhtogonalVector4 as no additional parts would be neeccessary in this case --> result = result - ((u3 * x) * u3)
      const orthogonalVector4 = math.subtract(
        math.matrix(orthogonalVector4Part2),
        await unitVectorMultiplication(
          math.matrix(unitVector3of4),
          vectorMatrix._data[3]
        )
      );
      const unitVector4 = await vectorNormalization(
        math.matrix(orthogonalVector4)
      );
      // now we have the vector, all we do is normalize it and add all the orthonormal vectors into the array
      orthonormalVectors.push(
        math.matrix(unitVector2of4),
        math.matrix(unitVector3of4),
        math.matrix(unitVector4)
      );
      break;

    case 5:
      console.warn("Switch statement for dimension 5 is executing...");
      // working with 5 vectors
      // orthognal-x = x - ((u1 * x) * u1) where x = vectorMatrix[1] --> aka the second vector
      const orthogonalVector2of5 = math.subtract(
        math.matrix(vectorMatrix._data[1]),
        await unitVectorMultiplication(
          math.matrix(unitVector1),
          math.matrix(vectorMatrix._data[1])
        )
      );
      const unitVector2of5 = await vectorNormalization(
        math.matrix(orthogonalVector2of5)
      );

      // x - ((u1 * x) * u1) - ((u2 * x) * u2) where x = vectorMatrix[2]
      // the first part implements result = x - ((u1 * x) * u1)
      const orthogonalVector3of5Part1 = math.subtract(
        math.matrix(vectorMatrix._data[2]),
        await unitVectorMultiplication(
          math.matrix(unitVector1),
          math.matrix(vectorMatrix._data[2])
        )
      );
      // this implements the second part --> result = result - ((u2 * x) * u2)
      const orthogonalVector3of5 = math.subtract(
        math.matrix(orthogonalVector3of5Part1),
        await unitVectorMultiplication(
          math.matrix(unitVector2of5),
          math.matrix(vectorMatrix._data[2])
        )
      );
      const unitVector3of5 = await vectorNormalization(
        math.matrix(orthogonalVector3of5)
      );

      // x - ((u1 * x) * u1) - ((u2 * x) * u2) - ((u3 * x) * u3) where x = vectorMatrix[3]
      // step 1 : result = x - ((u1 * x) * u1)
      const orthgonalVector4of5Part1 = math.subtract(
        math.matrix(vectorMatrix._data[3]),
        await unitVectorMultiplication(
          math.matrix(unitVector1),
          math.matrix(vectorMatrix._data[3])
        )
      );
      // here we are doing the following --> result = result - ((u2 * x) * u2) where x = vectorMatrix[3]
      const orthogonalVector4of5Part2 = math.subtract(
        math.matrix(orthgonalVector4of5Part1),
        await unitVectorMultiplication(
          math.matrix(unitVector2of5),
          math.matrix(vectorMatrix._data[3])
        )
      );
      // here we are doing the last part --> result = result - ((u3 * x) * u3) where x = vectorMatrix[3]
      const orthogonalVector4of5 = math.subtract(
        math.matrix(orthogonalVector4of5Part2),
        await unitVectorMultiplication(
          math.matrix(unitVector3of5),
          math.matrix(vectorMatrix._data[3])
        )
      );
      const unitVector4of5 = await vectorNormalization(
        math.matrix(orthogonalVector4of5)
      );

      // now we calculate the last vector that we are wokring with
      // the formula being implemented is the following --> x - ((u1 * x) * x) - ((u2 * x) * u2) - ((u3 * x) * u3) - ((u4 * x) * u4) where x = vectorMatrix[4]
      // part 1 calcualtes the following --> result = x - ((u1 * x) * x)
      const orthogonalVector5Part1 = math.subtract(
        math.matrix(vectorMatrix._data[4]),
        await unitVectorMultiplication(
          math.matrix(unitVector1),
          math.matrix(vectorMatrix._data[4])
        )
      );
      // step2 --> calculates the following --> result = result - ((u2 * x) * u2)
      const orthogonalVector5Part2 = math.subtract(
        math.matrix(orthogonalVector5Part1),
        await unitVectorMultiplication(
          math.matrix(unitVector2of5),
          math.matrix(vectorMatrix._data[4])
        )
      );
      // step 3 --> calculates the following --> result = result - ((u3 * x) * u3)
      const orthogonalVector5Part3 = math.subtract(
        math.matrix(orthogonalVector5Part2),
        await unitVectorMultiplication(
          math.matrix(unitVector3of5),
          math.matrix(vectorMatrix._data[4])
        )
      );
      // step 4 (last part) --> calcualtes the following --> result = result - ((u4 * x) * u4) --> result = orthogonalVector5part3
      const orthogonalVector5 = math.subtract(
        math.matrix(orthogonalVector5Part3),
        await unitVectorMultiplication(
          math.matrix(unitVector4of5),
          math.matrix(vectorMatrix._data[4])
        )
      );

      // normalize the vector
      const unitVector5 = await vectorNormalization(
        math.matrix(orthogonalVector5)
      );

      // lastly, add all the orthonormal vectors onto the array
      orthonormalVectors.push(
        // convert them into matrix just in case using math.matrix when pushing the values
        math.matrix(unitVector2of5),
        math.matrix(unitVector3of5),
        math.matrix(unitVector4of5),
        math.matrix(unitVector5)
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
