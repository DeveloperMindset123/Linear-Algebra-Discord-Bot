const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
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
      // add the error embed here
      const customErrorEmbed = new EmbedBuilder()
        .setColor(0xff000)
        .setTitle("Err (Click here for Reference Material)")
        .setURL("https://www.youtube.com/watch?v=4zpkXxAUHcE")
        .setAuthor({
          name: "Ayan Das",
          iconURL: "https://avatars.githubusercontent.com/u/109440738?v=4",
          url: "https://github.com/DeveloperMindset123",
        })
        .setDescription(
          "Either there was an internal server error or the proper input has not been inserted, please double check your inputs and try again. If the problem persists, please contant the developer @dasa60196@gmail.com"
        )
        .setThumbnail(
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWru8q17zpOzzzT1s475ZS_8fOL1GS0teSw&s"
        )
        .addFields(
          {
            name: "Error Message",
            value: "There wasn an error executing this command",
          },
          {
            name: "\u200B",
            value: "\u200B",
          },
          // !providing 2 hints is more than enough for quesiions such as this
          {
            name: "check your input",
            value:
              "A 2D array, with the entries being the 1d array containing the corresponding columns",
            inline: true,
          },
          {
            name: "check for commas",
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
          iconURL: "",
        });
      console.error(error);
      await interaction.editReply({
        content: `There was an error in executing this command.`,
        iconURL:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWru8q17zpOzzzT1s475ZS_8fOL1GS0teSw&s",
      });

      console.error(error);
      await interaction.editReply({
        embeds: [customEmbed],
      });
    }
  },
};
