/**
 * @Reference https://discordjs.guide/slash-commands/permissions.html#dm-permission
 * @Detail Code to ban an user via a bot
 */

const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ApplicationCommandOptionType,
  Client,
  // This is the type that interaction uses
  CommandInteraction,
} = require("discord.js");
//const { execute } = require("./ping");
const banUser = new SlashCommandBuilder()
  .setName("ban")
  .setDescription(
    "Select a member and ban them, this is also a built in command available to administrators."
  )
  // decide what option the user should have when executing this command
  .addUserOption(
    (option) =>
      option
        // describe the name of the option, in this case, the user to ban
        .setName("target")
        // provide an explanation corresponding to this option
        .setDescription("The member to ban")
        // this option is required, otherwise, we cannot execute the command, without having a specific target to ban
        .setRequired(true)
    //@DiscordUsername is how we will be specifying the user
    //.type(ApplicationCommandOptionType.Mentionable)
  )
  // add a second option to provide reason for why you think this user deserves to be banned --> set this to optional (note that addUserOption sets the type to ApplicationCommandOptionType.Mentionable whereas addStringOption sets the option to ApplicationCommandOptionType.String instead --> an important distinction to remember)
  .addStringOption(
    (option) =>
      option
        .setName("reason")
        .setDescription("Why do you want to ban this user?")
        .setRequired(true)
    //.type(ApplicationCommandOptionType.String)
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
      if (!interaction.isChatInputCommand()) return;

      // otherwise, retrieve the target user's id (given that we have made the command mentionable)
      const targetUserId = interaction.options.get("target").value;
      const reason =
        interaction.options.get("reason") || "No Reason Has Been Provided.";
      console.log(`Reason for ban: ${reason}`);

      await interaction.deferReply();
      const targetUser = await interaction.guild.members.fetch(targetUserId);
      console.log(`The target user is ${targetUser}`);

      // check and make sure if the user exists or not
      if (!targetUser) {
        await interaction.editReply("The user does not exist in this server");
        //end of function execution, no further execution neccessary
        return;
      }
      // this conditional will check to see if the target user is being banned or not, because that should not be allowed
      if (targetUser.id === interaction.guild.ownerId) {
        await interaction.editReply(
          "You cannot ban the user who owns the server"
        );
        return;
      }

      // retrieve the role for the bot, and target user, since the target user needs to be lower ranked than the bot itself
      // This will ensure that the person running the command is a role higher than the person who is being banned (will prevent the users from abusing ungiven privelege to execute bot commands maliciously)
      const targetUserRolePosition = targetUser.roles.highest.position;
      // highest role of the user running the command
      const requestUserRolePosition = interaction.member.roles.highest.position;
      // this will provide the highest position of the bot's role (remember that bot's role and the user who executes the command aren't always the same, they are two seperate entities)
      //const botRolePosition =
      //interaction.guild.member.me.roles.highest.position;

      // now if we attempt to ban the user whose privelege higher than ours, the following should execute
      /*
      if (targetUserRolePosition >= requestUserRolePosition) {
        await interaction.editReply(
          `You cannot ban the user since your role is ${requestUserRolePosition} and the user's role is ${targetUserRolePosition}, which is higher than yours.`
        ); 
        return;
      }  //we will need to do the same for the bot as well --> NOTE : for the purpose of testing, comment this out to ensure the bot can successfully ban users via username first
      /*
      if (targetUserRolePosition >= botRolePosition) {
        await interaction.editReply(
          "I cannot ban that user because they have the same/higher role than me."
        );
      }
*/
      // ban the target user
      try {
        await targetUser.ban({ reason: reason });
        await interaction.editReply(
          `User ${targetUser} has been banned.\n Reason for banning : ${reason}`
        );
      } catch (error) {
        console.log(`There was an error when banning : ${error}`);
      }

      await interaction.reply(`The user has been banned.`);
    } catch (error) {
      console.log(`Command Execution failed due to ${error}`);
    }
  },
};
