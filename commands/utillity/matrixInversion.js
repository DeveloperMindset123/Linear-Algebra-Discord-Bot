/**
 * @SlashCommandBuilder Discord's built in function used to develop custom slash commands as the name suggests
 * @math math library used to simplify the computation involved
 */
const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
  // two components (required) --> data and execute
  // optional : cooldwon
  // when it comes to setting names for commands, no upper case values allowed, the terminal will throw an error during runtime otherwise
  data: new SlashCommandBuilder()
    // unlike before, we will only need one option to execute this command, of course the requirement for the option must also be set to true as well
    .setName("matrix-inversion")
    .setDescription("Calculates the matrix inverse given a matrix")
    .addStringOption((option) =>
      option
        .setName("matrix")
        .setDescription(
          "Provide the matrix that you want to calculate the inverse of in array format"
        )
        .setRequired(true)
    ),

  // we can can also write it as async function execute(interaction) { implement execution logic within the body }, I simply prefer this method instead since it makes more sense
  execute: async function (interaction) {
    try {
      // TODO : Remove the excess comments, as well as provide step by step description in latex for how matrix inversion works
      await interaction.deferReply({
        ephemeral: true,
      });

      const originalMatrix = interaction.options.get("matrix");
      const matrixConverted = math.matrix(JSON.parse(originalMatrix.value));
      const invertedMatrix = math.inv(matrixConverted);

      console.log(
        `The original matrix entered was ${originalMatrix.value} and the resulting inverted matrix was ${invertedMatrix}`
      );
      await interaction.editReply({
        content: `End of successful exeuction! Resulting matrix value being ${invertedMatrix}`,
      });
    } catch (error) {
      console.log(`Error executing the command ${error}`);
      await interaction.editReply({
        content: "There was an error executing the command.",
      });
    }
  },
};
