const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get-eigens")
    .setDescription(
      "calculates the eigenvalues and eigenvectors given the matrix"
    )
    .addStringOption((option) =>
      option
        .setName("matrix")
        .setDescription(
          "provide the matrix of which you want to calcualte the eigenvalues and eigenvectors of"
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

      let eigenvalues = [];
      let eigenvectorsList = [];
      eigenvectors.forEach(async (element) => {
        eigenvalues.push(element.value);
        eigenvectorsList.push(element.vector);
      });

      await interaction.editReply({
        // TODO : Replace the current string message with the embedding made
        content: `End of successful execution. The eigenvalues are [${eigenvalues}] and the corresponding eigenvectors are [${eigenvectorsList}]`,
      });
    } catch (error) {
      console.log(`Error : ${error}`);
      await interaction.editReply({
        // IMPORTANT NOTE : it's not called "contents", rather it's called content, will cause an error of empty message being sent through otherwise
        content: `There was an error in executing this command.`,
      });
    }
  },
};
