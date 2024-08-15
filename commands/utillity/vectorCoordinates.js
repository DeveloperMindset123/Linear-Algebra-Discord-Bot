const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
  // we will need 2 options --> the matrix composed of the basis vectors and the vector x itself
  data: new SlashCommandBuilder()
    .setName("vector-coordinates")
    .setDescription(
      "will calculate the coordinates given the vector x and the basis vector composed matrix S"
    )
    // option 1 -> matrix S
    .addStringOption((option) =>
      option
        .setName("basis-vector-matrix")
        .setDescription(
          "provide the matrix S that is made up of the basis vectors in 2 dimensional array format"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("x-vector")
        .setDescription(
          "please provide the entries of the vector x in array format"
        )
        .setRequired(true)
    ),
  execute: async function (interaction) {
    try {
      await interaction.deferReply({
        ephemeral: true,
      });
      await interaction.editReply({
        content: `The coordinates that corresponds to the vector ${math.matrix(
          JSON.parse(await interaction.options.get("x-vector").value)
        )} is ${math.multiply(
          math.matrix(
            JSON.parse(
              await interaction.options.get("basis-vector-matrix").value
            )
          ),
          math.matrix(
            math.matrix(
              JSON.parse(await interaction.options.get("x-vector").value)
            )
          )
        )}`,
      });
    } catch (error) {
      console.error(`Error : ${error}`);
      await interaction.editReply({
        content: `There was an error executing this command`,
      });
    }
  },
};
