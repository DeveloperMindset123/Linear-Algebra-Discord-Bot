const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");
// ! calculate whether a square matrix is linearly independent. If the determinant of a matrix is not equal to 0, that means it is linearly independent

module.exports = {
  data: new SlashCommandBuilder()
    .setName("linear-independence")
    .setDescription(
      "determines if the vectors forming a matrix are linearly independent to one another or not"
    )
    // ! Note : No need for
    .addStringOption((option) =>
      // ? Note : The description cannot be too long or discord will throw in an error
      option
        .setName("matrix")
        .setDescription(
          "provide the square matrix of which you wish to check for indpendence"
        )
        .setRequired(true)
    ),

  execute: async function (interaction) {
    try {
      await interaction.deferReply({
        ephemeral: true,
      });

      // all we simply check is the determinant of the given matrix and if it's not 0, then the vectors will be independent
      const det = math.det(
        math.matrix(JSON.parse(await interaction.options.get("matrix").value))
      );
      const determineIndependence = async () => {
        if (det === 0) {
          return false;
        }
        return true;
      };

      await interaction.editReply({
        content: `Linear Independence : ${await determineIndependence()}`,
      });

      // retrieve and pass in the matrix that is recieved
    } catch (error) {
      console.log(`Error : ${error}`);
      await interaction.editReply({
        content: `There was an error executing this command.`,
      });
    }
  },
};
