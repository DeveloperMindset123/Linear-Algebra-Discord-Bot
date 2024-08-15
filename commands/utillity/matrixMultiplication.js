const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");

// TOOD : remove the unneccessary console.log statements and add proper embedding to the interaction based responses later as part of cleanup

module.exports = {
  //cooldown : 30,
  data: new SlashCommandBuilder()
    .setName("matrix-multiplication")
    .setDescription("Multiplies two matrix together")
    // NOTE : the way this has been implemented may cause some kind of syntax errors, remove the curly braces if needed --> yup ths throws an error
    .addStringOption((option) =>
      option
        .setName("matrix1")
        .setDescription(
          "Please provide the values of the matrix in an array format"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("matrix2")
        .setDescription(
          "Please provide the values of the matrix in an array format"
        )
        .setRequired(true)
    ),

  execute: async function (interaction) {
    try {
      await interaction.deferReply({
        ephemeral: true,
      });

      const matrix1 = await interaction.options.get("matrix1");
      const matrix2 = await interaction.options.get("matrix2");

      const matrix1Converted = math.matrix(JSON.parse(matrix1.value));
      const matrix2Converted = math.matrix(JSON.parse(matrix2.value));

      const multipliedMatrix = math.multiply(
        matrix1Converted,
        matrix2Converted
      );

      console.log(
        `The values entered were ${matrix1.value} and ${matrix2.value} and their resulting product was ${multipliedMatrix}`
      );
      await interaction.editReply({
        content: `End of successful execution! Resulting matrix value being ${multipliedMatrix}`,
      });
    } catch (error) {
      console.log(`Error executing the command ${error}`);
      await interaction.editReply({
        content: `There was an error in executing this command`,
      });
    }
  },
};
