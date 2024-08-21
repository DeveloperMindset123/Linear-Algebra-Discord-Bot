const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");
const { execute } = require("../../events/interactionCreate");

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
        ephemeral: true,
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
      console.warn(error);
      await interaction.editReply({
        content: `There was an error executing the command!`,
      });
    }
  },
};
