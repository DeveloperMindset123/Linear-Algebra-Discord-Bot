const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get-singular-values")
    .setDescription(
      "Retrieve the singular values using singular value decomposition"
    )
    .addStringOption((option) =>
      option
        .setName("matrix")
        .setDescription(
          "please provide the set of vectors you wish to calculate the singular values from"
        )
        .setRequired(true)
    ),

  execute: async function (interaction) {
    await interaction.deferReply({
      ephemeral: true,
    });

    try {
      // ! Reference --> https://sumantmath.wordpress.com/2021/08/20/singular-value-decomposition-rectangular-matrix/
      let userMatrix = math.matrix(
        JSON.parse(await interaction.options.get("matrix").value)
      );

      let singularValues = [];

      userMatrix = math.matrix(
        math.multiply(userMatrix, math.transpose(userMatrix))
      );

      let eigenValues = math.eigs(userMatrix, { eigenvectors: false });
      eigenValues = eigenValues.values._data;

      eigenValues.forEach((currElement) => {
        singularValues.push(math.sqrt(currElement));
      });

      await interaction.editReply({
        content: `Successful execution of command!\n The diagonalized matrix is ${math.matrix(
          singularValues
        )}`,
      });
    } catch (error) {
      console.error(error);
      await interaction.editReply({
        content: `There was an error in executing this command.`,
      });
    }
  },
};
