const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("eigen")
    .setDescription(
      "calculates the eigenvalues and the corresponding eigenctors given a matrix"
    )
    .addStringOption((option) =>
      option
        .setName("matrix")
        .setDescription(
          "provide the matrix of which you want to calculate the eigenvalues and eigenctors of"
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
      const result = math.eigs(matrix);
      const eigenvalues = result.values;
      const eigenvectors = result.eigenvectors;

      //console.log(`The resulting onject is ${JSON.stringify(result)}`);
      console.log(
        `The eigenvalues are ${JSON.stringify(
          eigenvalues
        )}, and the corresponding eigenvectors are ${JSON.stringify(
          eigenvectors[1].vector
        )}`
      );
      await interaction.editReply({
        content: `End of successful execution!`,
      });
    } catch (error) {
      console.log(`The execution failed due to ${error}`);
      await interaction.editReply({
        content: `Execution failed due to ${error}`,
      });
    }
  },
};
