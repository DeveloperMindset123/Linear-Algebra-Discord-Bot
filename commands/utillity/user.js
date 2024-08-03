/**
 * @Purpose This command is used to retrieve information about the current user who is using the bot
 */

const { SlashCommandBuilder } = require("discord.js");
const { execute } = require("./ping");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user."),
  async execute(interaction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    await interaction.reply(
      `This command was run by ${interaction.user.username}, whi joined on ${interaction.member.joinedAt}`
    );
  },
};
