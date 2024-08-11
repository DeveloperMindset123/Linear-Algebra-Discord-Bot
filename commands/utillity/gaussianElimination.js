/**
 * @Purpose This is the implemenetation of the gaussian eliniation, there's two methods of implementing this, either from scratch or using the mathjs library
 * @Reference https://mathjs.org/docs/reference/functions/lusolve.html --> shows how the gaussian elimination can be implemented using mathjs's built in function
 * @Reference https://gist.github.com/codecontemplator/6b3db07a29e435940ffc --> github gist to show how the gaussian elimination can be implemented from scratch
 */

const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gaussian-elimination")
    .setDescription("Performs the gaussian elimination on a given matrix")
    // add the first option --> we will need to coefficient matrix
    .addStringOption((option) =>
      option
        .setName("coefficient-matrix")
        .setDescription("provide the coefficient matrix")
        .setRequired(true)
    )
    // add the second option --> we will need to first check the size of the matrix provided and construct a zero matrix based of that size
    .addStringOption((option) =>
      option
        .setName("column-matrix")
        .setDescription(
          "provide the values corresponding to vector b, defaults to 0s entry vector"
        )
        .setRequired(false)
    ),

  // defaults to an asynchronous function known as execute, this is the most ideal method
  // IMPORTANT : don't forget to include the interaction as a parameter value as well
  execute: async function (interaction) {
    try {
      await interaction.deferReply({
        // TODO : make the following modification and then remove the comment
        // toggle this to false later so others can also see the resulting output
        ephemeral: true,
      });

      // TODO : remove the console.log statements later, it is just to understand the layout of the values that we are working with, it will also provide clarity on the syntax that we are working with as well
      //retrieve the user inputs
      // note that interaction.options.get('name-of-option-in-string') returns an object
      // use the console.log statements to check what the resulting object looks like
      // print out the entire list of available options --> it should be within the form of a nested object
      console.log(JSON.stringify(await interaction.options));

      // print out the individual objects corresponding to the options that we are working with --> option 1
      console.log(
        JSON.stringify(await interaction.options.get("coefficient-matrix"))
      );

      // print out the individual object corresponding to the toption that we are workign with --> option 2
      console.log(
        JSON.stringify(await interaction.options.get("column-matrix"))
      );

      // IMPORTANT NOTE : we will need to parse the matrix upon retrieval to get rid of the unknown type error which this will otherwise result in
      const coefficientMatrix = JSON.parse(
        await interaction.options.get("coefficient-matrix").value
      );

      // we need to declare it as let so we can modify it later
      // Only difference between let and var is that var is globally scoped and let is locally scoped
      var columnMatrix = await interaction.options.get("column-matrix").value;

      // since providing the column matrix is optional, we will need to check if the column matrix value is empty or not, if it's empty, we will need to set it with the default entries of zero, depending on the size of the matrix

      // we can either write if (!columnMatrix or columnMatrix === undefined)
      if (!columnMatrix) {
        /**
         * @Detail extract the size of the coefficient matrix
         * @Reference https://mathjs.org/docs/reference/functions/size.html --> explains how the size function works
         * @Reference https://mathjs.org/docs/datatypes/matrices.html --> explains how to create arrays based on size, similar to numpy.zeros in python
         *  */
        const matrixSize = math.size(math.matrix(coefficientMatrix));
        // create the new default column matrix
        // creates an array consisting of zeros as specified by the size of the matrix
        columnMatrix = math.zeros(matrixSize);
      }

      // else, do nothing, meaning user has provided a column matrix to work with
      //actual implementation of gaussian eliminnation below
      const solutions = math.lusolve(
        math.matrix(coefficientMatrix),
        /**
         * //TODO : Remove this comment, but retian the JSDOC for future reference
         * @NOTE Must include JSON.parse(string based matrix) prior to using math.matrix, otherwise, there will be a type related error during runtime
         * @Explanation the JSON.parse() static method parses a JSON string, constructing the javascript value or object described by the string.
         * @Explanation math.matrix accepts objects and arrays as acceptable values, in this case, the provided string is either converted into an object or 2D array, both of which are acceptable datatypes for the math.matrix function to be passed in as an argument
         */

        math.matrix(JSON.parse(columnMatrix))
      );
      await interaction.editReply({
        content: `End of succcessful execution. The solution is ${solutions}`,
      });
    } catch (error) {
      // else, there was some form of an error in the execution of the command, this part of the code will execute
      console.error(
        `There was an error in exeucting this command.\n. ${error}`
      );
      await interaction.editReply({
        content: `Failed to successfully execute the command.`,
      });
    }
  },
};
