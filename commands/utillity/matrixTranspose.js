const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");
const { execute } = require("./inviteCreate");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("matrix-transpose")
    .setDescription("Calculate the transpose of the matrix")
    .addStringOption((option) =>
      option
        .setName("matrix")
        .setDescription(
          "Provide the matrix that you want to calculate the transpose of in an array format"
        )
        .setRequired(true)
    ),

  execute: async function (interaction) {
    try {
      await interaction.deferReply({
        ephemeral: true,
      });

      const originalMatrix = interaction.options.get("matrix");
      const matrixToTranspose = math.matrix(JSON.parse(originalMatrix.value));
      const transposeMatrix = math.transpose(matrixToTranspose);

      console.log(
        `The original matrix was ${originalMatrix.value} and the resulting transpose matrix was ${transposeMatrix}`
      );
      await interaction.editReply({
        content: `End of successful execution! Resulting matrix value being ${transposeMatrix}`,
      });
    } catch (error) {
      console.log(`Error executing the command ${error}`);
      await interaction.editReply({
        content: "There was an error exeucting this comamnd",
      });
    }
  },
};
