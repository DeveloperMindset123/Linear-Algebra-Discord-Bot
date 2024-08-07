// TODO : Logic for matrix addition needs to be implemented here

const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");
const { execute } = require("./ping");

module.exports = {
  cooldown: 5,
  // implement the configurations that will be needed for matrix additon
  data: new SlashCommandBuilder()
    // NOTE : no upper case values allowed when naming command, or will cause errors
    .setName("matrix-addition")
    .setDescription("Adds two matrix of equal sizes together")
    // Add the option to allow for matrix additions --> first option is for matrix 1
    // NOTE : number option won't work here, add a string option, and convert the string into a array of numbers thorugh removing the double quotes using regex logic
    .addStringOption((option) =>
      option
        .setName("matrix1")
        .setDescription(
          "Please provide the values of the matrix in an array format"
        )
    )
    // add the option for the second matrix
    .addStringOption((option) =>
      option
        .setName("matrix2")
        .setDescription(
          "Please provide the values of the matrix in an array format"
        )
    ),
  execute: async function (interaction) {
    try {
      console.log(
        `The options that are available for retrieval are ${interaction.options}`
      );
      await interaction.deferReply({ ephemeral: true });
      const Matrix1Values = interaction.options.get("matrix1");
      const Matrix2Values = interaction.options.get("matrix2");

      console.log(
        `The values of matrix 1 is: ${JSON.stringify(
          Matrix1Values
        )} and the corresponding datatype is ${typeof Matrix1Values}`
      );
      console.log(
        `The values of matrix 2 is ${JSON.stringify(
          Matrix2Values
        )} and the corresponding datatype is ${typeof Matrix2Values}`
      );
      console.log(
        `Testing to see if matrix 1's value gets rendered or not ${Matrix1Values.value}`
      );
      // NOTE : the properties of the object are the following --> "name", "type", "value"
      interaction.editReply({
        content:
          `End of successful execution! The options that were provided are ${JSON.stringify(
            Matrix1Values
          )} and ${JSON.stringify(Matrix2Values)}` + `${Matrix1Values.value}`,
      });
      // end the code ex
      return;
    } catch (error) {
      console.log(`Error executing the command ${error}`);
      // editReply should take in an object
      interaction.editReply({
        content: "There was an error in executing the command",
      });
      return;
    }
  },
};
