/**
 * @Purpose This command should return simply a boolean value after checking if the vectors provided are linearly independent or not
 */

//TODO : Remove later
// One potential appraoch --> allow for various options, we can check if there exists a solution given the vectors, meaning, we will need to form
const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("linear-independence")
    .setDescription(
      "determines if the vectors given are linearly independent to one another or not"
    )
    .addStringOption((option) => {
      // TODO : Implement the logic here
      throw new Error("Not yet implemented");
    }),
};
