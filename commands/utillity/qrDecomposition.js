const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const math = require("mathjs");

// @Reference video https://www.youtube.com/watch?v=qmRC8mTPGI8
// @Reference video https://www.youtube.com/watch?v=6DybLNNkWyE --> more in-depth explanation of the qr factorization

module.exports = {
  data: new SlashCommandBuilder()
    .setName("qr-decomposition")
    .setDescription("Given matrix A, calculates matrix Q and R")
    .addStringOption((option) =>
      option
        // note --> anmes cannot contain any upper case letters
        .setName("matrix-a")
        .setDescription("provide the entries that matrix A is composed of")
        .setRequired(true)
    ),

  execute: async function (interaction) {
    try {
      await interaction.deferReply({
        ephemeral: false,
      });

      const userInput = math.matrix(
        JSON.parse(await interaction.options.get("matrix-a").value)
      );
      // returns an object, with the keys being the R and the Q matrix
      const qrFactorization = math.qr(userInput);
      const { Q, R } = qrFactorization;
      console.log(`QR Factorization : ${qrFactorization}`);
      console.warn(
        `Testing to see if Q and R prints as intended --> Q : ${Q}, R : ${R}`
      );
      await interaction.editReply({
        // TODO : Replace the current string message with the embedding made
        content: `Successful execution of command!\n\n Matrix Q : ${Q} \n\n Matrix R : ${R}`,
      });
    } catch (error) {
      // a test to check if embeds work as intended using a simplied format
      const customErrorEmbed = new EmbedBuilder()
        .setColor(0xff000)
        .setTitle("Error (Click Here For Original Reference Material)")
        .setURL(
          "https://www.math.ucla.edu/~yanovsky/Teaching/Math151B/handouts/GramSchmidt.pdf"
        )
        .setAuthor({
          name: "Ayan Das",
          iconURL: "https://avatars.githubusercontent.com/u/109440738?v=4",
          url: "https://github.com/DeveloperMindset123",
        })
        // defines the subtitle for the embedded message
        .setDescription(
          "Either there is an internal server error or the proper input has not been inserted, please double check your input and try again. If the problem persists, please contact the developer @dasa60196@gmail.com"
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
          {
            name: "Check Your Input",
            value:
              "Please verify that you have passed in your input in the form of 2D array",
            inline: true,
          },
          {
            name: "Non-Numerical Entries",
            value:
              "Please ensure that all the entries in the array are numbers",
            inline: true,
          }
        )
        .addFields({
          name: "Check for commas",
          value:
            "Please ensure that the inner arrays and entries are sperated by commas properly",
          inline: true,
        })
        .setImage(
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWru8q17zpOzzzT1s475ZS_8fOL1GS0teSw&s"
        )
        .setTimestamp()
        .setFooter({
          text: `Command failed to execute due to ${error}`,
          iconURL:
            "https://cdn3.vectorstock.com/i/1000x1000/91/27/error-icon-vector-19829127.jpg",
        });
      console.warn(error);
      await interaction.editReply({
        embeds: [customErrorEmbed],
      });
    }
  },
};
