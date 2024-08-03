/**
 * @Reference https://discordjs.guide/slash-commands/permissions.html#dm-permission
 * @Detail Code to ban an user via a bot
 */

const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
//const { execute } = require("./ping");
const banUser = new SlashCommandBuilder()
  .setName("ban")
  .setDescription(
    "Select a member and ban them, this is also a built in command available to administrators."
  )
  // decide what option the user should have when executing this command
  .addUserOption((option) =>
    option
      // describe the name of the option, in this case, the user to ban
      .setName("target")
      // provide an explanation corresponding to this option
      .setDescription("The member to ban")
      // this option is required, otherwise, we cannot execute the command, without having a specific target to ban
      .setRequired(true)
  )
  // sets the permission for the bot to be able to ban members as needed
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
  // decides wehther the command should be available in direct message or not --> not fully sure what this means.
  .setDMPermission(false);

module.exports = {
  // for a command to be registered, it needs data and execute property to be set --> this is a copy/paste of the unban templte
  data: banUser,
  // define the corresponding execution function (required)
  async execute(interaction) {
    // implement it in a try and catch block to catch any errors that may occur
    try {
      await interaction.reply(
        `The user ${interaction.user.username} has been banned.`
      );
    } catch (error) {
      console.log(`Command Execution failed due to ${error}`);
    }
  },
};
