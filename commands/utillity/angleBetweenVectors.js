// TODO : command for calculating the angle between vectors
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const math = require("mathjs");
const embeds = require("../../embeds");

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
        ephemeral: false,
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
      // define the custom error embedded message
      const customErrorEmbed = new EmbedBuilder()
        .setColor(0xff000)
        .setTitle("Error (Click Here for Original Reference Material)")
        .setURL("https://www.youtube.com/watch?v=TTom8n3FFCw&t=15s")
        .setAuthor({
          name: "Ayan Das",
          iconURL: "https://avatars.githubusercontent.com/u/109440738?v=4",
          url: "https://github.com/DeveloperMindset123",
        })
        .setDescription(
          "Either there was internal server error or the proper input has not been inserted, please double check your inputs and try again. If the problem persists, please contact the developer @dasa60196@gmail.com"
        )
        .setThumbnail(
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWru8q17zpOzzzT1s475ZS_8fOL1GS0teSw&s"
        )
        .addFields(
          {
            name: "Error Message",
            value: "There was an error executing the command",
          },
          {
            name: "\u200B",
            value: "\u200B",
          },
          // ! 2 Hints is sufficient
          {
            name: "Check Your Input",
            value: "Singular Array with numerical entries",
            inline: true,
          },
          {
            name: "Check for commas",
            value: "Entries should be seperated by commas",
            inline: true,
          }
        )
        .setImage(
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWru8q17zpOzzzT1s475ZS_8fOL1GS0teSw&s"
        )
        .setTimestamp()
        .setFooter({
          text: `Command failed to execute due to ${error}`,
          iconURL:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWru8q17zpOzzzT1s475ZS_8fOL1GS0teSw&s",
        });
      console.error(error);
      await interaction.editReply({
        embeds: [customErrorEmbed],
      });
    }
  },
};
