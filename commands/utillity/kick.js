/**
 * @Reference https://discordjs.guide/slash-commands/permissions.html#member-permissions
 * @Detail This command removes a user from a server, different than banning a member, which means the user will be removed and cannot rejoin until the administrator unbans/removes the current ban
 * @Detail Kick simply removes the user from the current guild, but allows them to join back via a valid link
 * @HINT Before adding the imports, add require('discord.js') to allow for auto recognition of imports, allows for faster coding
 */

const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
//const { execute } = require("./ping");

// SlashCommandBuilder() has various setter functions that can be chained together
const kickUser = new SlashCommandBuilder()
  // sets the name of the command
  .setName("kick")
  .setDescription("Select a member and kick them.")
  // .addUserOption is used to specify the option, the argument it takes in is a callback function where various setters can be used to describe the option --> think of it as a nested command for they are very similar, all options require a name and descroption
  .addUserOption((option) =>
    option
      .setName("target")
      .setDescription("The member to kick")
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers);

module.exports = {
  data: kickUser,
  // define the execution function
  async execute(interaction) {
    // implement the execution funciton in a try and catch block to check if it was successful or not
    try {
      await interaction.reply(
        `The user ${interaction.user.username} has been kicked from the server.`
      );
    } catch (error) {
      console.log(`Command execution failed due to ${error}`);
    }
  },
};
