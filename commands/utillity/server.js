/**
 * @Purpose This command is used to extract information about the current server the bot is in
 */

const { SlashCommandBuilder } = require("discord.js");
const { execute } = require("./ping");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Provides information about the server."),
  async execute(interaction) {
    // interactionguid is the object representing the Guild in whcih the command was run on
    await interaction.reply(
      `This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members`
    );
  },
};
