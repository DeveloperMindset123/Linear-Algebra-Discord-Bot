/**
 * @Reference https://discordjs.guide/creating-your-bot/slash-commands.html#individual-command-files
 * The code implemented here follows the template provided in the discord js guide
 */

const { SlashCommandBuilder } = require("discord.js");
//const { execute } = require("./unban");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong"),
  // below are experiemntations to learn what other methods are offered by SlashCommandBuilder
  //.setNSFW(false)
  //.setDefaultMemberPermissions(true) --> this was causing issues, since it expected a string and was passed a boolean value instead
  async execute(interaction) {
    await interaction.reply(
      "This is a mock reply to understand how slash commands work."
    );
  },
};
