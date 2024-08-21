// TODO : command for calculating the angle between vectors
const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");

// ! Implement the logic below
// ? Reference formula :  θ = cos-1 [ (a. b) / (|a| |b|) ]
// ? Reference https://mathjs.org/docs/reference/functions/acos.html --> mathjs formula for arccos
module.exports = {
  data: new SlashCommandBuilder()
    .setName("angle-between-vectors")
    .setDescription("calculates the angle between two vectors")
    // option 1 --> vector 1
    .addStringOption((option) =>
      option
        .setName("vector1")
        .setDescription("please provide the first vector in array format")
        .setRequired(true)
    )
    // options 2 --> vector 2
    .addStringOption((option) =>
      option
        .setName("vector2")
        .setDescription("please provide the second vector in array format")
        .setRequired(true)
    ),
  execute: async function (interaction) {
    try {
      await interaction.deferReply({
        ephemeral: true,
      });
      const vector1 = math.matrix(
        JSON.parse(await interaction.options.get("vector1").value)
      );
      const vector2 = math.matrix(
        JSON.parse(await interaction.options.get("vector2").value)
      );
      const resultInRadians = math.acos(
        math.divide(
          math.dot(vector1, vector2),
          math.multiply(
            math.sqrt(math.dot(vector1, vector1)),
            math.sqrt(math.dot(vector2, vector2))
          )
        )
      );

      // convert to degrees (radians * 180 / (pie)
      const resultInDegrees = math.multiply(
        resultInRadians,
        math.divide(180, math.pi)
      );

      await interaction.editReply({
        content: `Successful exeuction of command!\n Angle (in radians) : ${resultInRadians} \n\n Angle (in degrees) : ${resultInDegrees}`,
      });
    } catch (error) {
      console.error(error);
      await interaction.editReply({
        content: "There was an error in the execution of the command.",
      });
    }
  },
};
