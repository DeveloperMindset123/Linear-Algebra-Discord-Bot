const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("matrix-determinant")
    .setDescription("Calculates the determinant of a given matrix")
    .addStringOption((option) =>
      option
        .setName("matrix")
        .setDescription(
          "provides the matrix that you want to calculate the determinant of"
        )
        .setRequired(true)
    ),

  execute: async function (interaction) {
    try {
      await interaction.deferReply({
        ephemeral: true,
      });
      const matrix = math.matrix(
        JSON.parse(interaction.options.get("matrix").value)
      );
      const matrixDeterminant = math.det(matrix);
      console.log(
        `The resulting value determinant of the matrix ${matrix} is ${matrixDeterminant}`
      );
      interaction.editReply({
        content: `End of successful execution! Resulting determinant being ${matrixDeterminant}`,
      });
    } catch (error) {
      console.log(`Error executing the command ${error}`);
      await interaction.editReply({
        content: `There was an error executing the command`,
      });
    }
  },
};
