/**
 * @Reference https://discordjs.guide/creating-your-bot/slash-commands.html#individual-command-files
 * The code implemented here follows the template provided in the discord js guide
 */

const { SlashCommandBuilder } = require("discord.js");
const { execute } = require("./unban");

// This is the implementation of a simple ping command
/**
 * @Detail module.exports is how you export data in Node.js so that you can require() it in other files.
 *
 * @Detail If you need to access you client instance from inside a command file, you can access it via interaction.client. If you need to access external files, packages, etc., you should require() them at the top of the file.
 */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong")
    // below are experiemntations to learn what other methods are offered by SlashCommandBuilder
    .setNSFW(false)
    .setDefaultMemberPermissions(true),
  async execute(interaction) {
    await interaction.reply(
      "This is a mock reply to understand how slash commands work."
    );
  },
};
