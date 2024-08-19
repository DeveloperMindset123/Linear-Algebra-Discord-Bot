// Doing the reverse of the vectorCoordinates.js, retrieving vector x given matrix S consisting of the basis vectors and the coordinates of a given vector
// NOTE : since x = S[x], [x] = S^-1x --> this is the formula we are trying to implement in this case
const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get-original-vector-x")
    .setDescription(
      "will calculate the values of the original vector x given matrix S and coordinates of vector x"
    )
    // the first option's configuration is the same as vectorCoordinates.js
    .addStringOption((option) =>
      option
        .setName("basis-vector-matrix")
        .setDescription(
          "provide the matrix S that is made up of the basis vectors in 2 dimensional array format"
        )
        .setRequired(true)
    )
    // option 2 is the only thing that varies in the data portion
    .addStringOption((option) =>
      option
        .setName("x-coordinate-vector")
        .setDescription("please provide the coordinate vector x in 1D array")
        .setRequired(true)
    ),
  execute: async function (interaction) {
    try {
      // TODO : Round the resulting values to whole numbers, otherwise, everything else works as intended
      await interaction.deferReply({
        ephemeral: true,
      });
      console.info(`Successful execution of command`);
      await interaction.editReply({
        content: `The coordinate vector is ${math.matrix(
          JSON.parse(await interaction.options.get("x-coordinate-vector").value)
        )} and the entries of the original vector is ${math.multiply(
          math.inv(
            math.matrix(
              JSON.parse(
                await interaction.options.get("basis-vector-matrix").value
              )
            )
          ),
          math.matrix(
            JSON.parse(
              await interaction.options.get("x-coordinate-vector").value
            )
          )
        )}`,
      });
    } catch (error) {
      // only difference between console.log and console.error is that console.error prints out information in red on the terminal
      console.error(`Error : ${error}`);
      await interaction.editReply({
        content: "There was an error executing the command",
      });
    }
  },
};
