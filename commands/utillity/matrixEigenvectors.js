const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");
const { execute } = require("./matrixDeterminant");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get-eigenvectors")
    .setDescription("calculates the eigenvectors given the matrix")
    .addStringOption((option) =>
      option
        .setName("matrix")
        .setDescription(
          "provide the matrix of which you want to calcualte the eigenvectors of"
        )
        .setRequired(true)
    ),

  execute: async function (interaction) {
    try {
      await interaction.deferReply({
        ephemeral: true,
      });
      const result = math.eigs(
        math.matrix(JSON.parse(await interaction.options.get("matrix").value))
      );
      const eigenvectors = result.eigenvectors;

      // TODO : we will need to retrieve the eigenvectors based on the eigenvalues in this case
    } catch (error) {
      // TODO : implement the remaining aspect here
      throw new Error("Not yet implemented");
    }
  },
};
