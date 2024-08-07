//const { SlashCommandBuilder } = require("@discordjs/builders");

/**
 * @NOTE MessageEmbed has been replaced with EmbedBuilder Instead
 * @Reference https://discordjs.guide/popular-topics/embeds.html#embed-preview
 * @Reference https://gist.github.com/FissionFeline/0fefa13f40e3403d7665fd5efd3e9d08 --> link for soruce code
 * @Purpose Guide to show how embedBuilder works
 * @Details This format of defining commands is more upto date with the guide that has been provided for writting custom commands, and allows for further customization.
 */

const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  // NOTE : EmbedBuilder was originally MessageEmbed
  EmbedBuilder,
} = require("discord.js");
//const { contents } = require("cheerio/lib/api/traversing");
const wait = require("node:timers/promises");
//const { PermissionFlagsBits, MessageEmbed } = require("discord.js");
//const { execute } = require("./kick");
const command = new SlashCommandBuilder()
  .setName("unban")
  .setDescription("Unbans a specified discord id")
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
  .setDMPermission(false) // --> This will ensure that people doesn't use this command on direct messages instead
  .addStringOption((option) =>
    option
      .setName("user")
      // .setColor("red")
      .setDescription("The user to be unbanned")
      // NOTE : this may cause potential errors in the future if the target user id changes to higher length to accomodate for more users
      .setMinLength(17)
      .setMaxLength(19)
      .setRequired(true)
  )
  // add a second string based option specifying why you think this user deserves to be unbanned
  .addStringOption((option) =>
    option
      .setName("reason")
      //.setColor("cyan")
      .setDescription("Reason For Unban")
      // sets the minimum and maximum characters allowed as input for reason
      .setMinLength(1)
      .setMaxLength(255)
      .setRequired(false)
  );

module.exports = {
  data: command,
  async execute(interaction) {
    console.log(interaction);
    if (interaction) {
      // we can access the options using interaction.options.get('name-of-option')
      const user = interaction.options.get("user");
      console.log(
        `The options that are avalable for retrieval are ${interaction.options}`
      );
      // @Reference https://discordjs.guide/slash-commands/response-methods.html#ephemeral-responses --> explains different kinds of command response methods available in type CommandInteraction
      // interaction.deferRepply() gives a 15 minute window for a response to be returned and having the ephemeral property set to true ensures that only the user executing the command can see the response
      await interaction.deferReply({ ephemeral: true });

      // we can also take apart the interaction --> destructing method, an alterantive to interaction.options
      const { options, guild } = interaction;

      // extract the user's Id
      const userId = await options.getString("user");
      // extract the reason (if it exists, otherwise, specify some default value or let the user know no reason in particular has been provided)
      const reason = (await options.getString("reason")) ?? "N/A";
      console.log(
        `The retrieved values recieved from destructuring is: ${options} and \n ${guild}`
      );
      // if the bot doesn't have the permission to ban and unban members --> speciy the user executing the command that the bot doesn't have the permission to unban users --> lack of privelege
      if (guild.members.me.permissions.has(PermissionFlagsBits.BanMembers))
        return await interaction.reply({
          content:
            "The bot doesn't have the administrative privelege to ban and unban members",
        });

      // the reason why we are eidting the reply is because we deferred the reply initially
      // NOTE : deferred replies must be followed up by editReplies to provide information on what the response should be
      if (!isValidUserId(userId))
        return await interaction.editReply({
          // we can respond in the form of an object instead as well
          content:
            "Invalid userid provided, please make sure that the userid is set to an actual id",
        });

      // declaring the variable unintiialized using let block to allow for access outside the try scope
      let userLocalized;
      try {
        // retrieve the banned user by their userId
        const ban = await guild.bans.fetch(userId);
        // userLocalized is a variable defined right outside of this try block and it's value is being saved via the execution of the tryBlock
        userLocalized = await ban.user.fetch();

        // once we retrieved the user, all we have to do is unban the user based on the id and the reason --> here we are taking advantage of the server's built-in logic for unbanning users (GUI wise, this can be accessed via the setting within the server instead, simplifying the process down to the execution of a simple command through a bot) --> this is the "main logic" for unbanning the user after we have accessed the banned user via the id, passing the checks to ensure if the user exists and if the user has previously been banned or not
        await guild.members.unban(userId, reason);
      } catch (error) {
        // this means we are attempting to unban an user that hasn't been banned
        if (error.name === "DiscordAPIError[10026]") {
          return interaction.editReply({
            content: "Unknown Ban, I can't find the ban for the user",
          });
        }
        // otherwise, simply print out the general error message if the try attempt fails to execute as intended --> return statement is neccessary to ensure the end of the code execution since we don't want anything following up the printout of the error message
        return console.error(
          `General error, try block failed to execute: ${error}`
        );
      }

      // create the embed for the unban command
      const embed = new EmbedBuilder()
        .setColor("green")
        .setAuthor({
          // aka the user executing the command
          name: user.username,
          iconURL: user.displayAvatarURL(),
        })
        .setTitle("Unban")
        // the description to provide who executed the unban command
        .setDescription(`Issued by ${interaction.user.username}`)
        .addFields(
          {
            // Display Guild
            name: "Guild",
            // we can access the guild.name from the destructured values of interaction
            value: "" + guild.name + "",
            inline: true,
          },
          {
            // Display the reason for unban
            name: "Reason:",
            // reason has already been extracted as a variable so it can be accessed fairly easily
            value: "" + reason + "",
            inline: true,
          }
        );

      // the following is how we display custom embeds as a reply, we create the embed and simply speciy the corresponding embed to render
      interaction.editReply({
        embeds: [embed],
      });

      // Remove the code below as that will no longer be needed
      /*
      const embed_unex_error = new EmbedBuilder()
        .setTitle("There has been an error")
        .setDescription(
          `Warning there has been an unexcpeted error while executing the command`
        )
        .setColor("#b03350")
        .setTimestamp();
      const embed_permission_error = new EmbedBuilder()
        .setTitle("You dont have perimissions to execute that command")
        .setDescription(`Please check your role permissions`)
        .setColor("#b03350")
        .setTimestamp();
      if (!interaction.guild)
        return interaction.reply({ embeds: [embed_unex_error] });
      const member = await interaction.guild.members.fetch(interaction.user.id);
      if (!member.permissions.has([PermissionFlagsBits.BanMembers]))
        return interaction.reply({ embeds: [embed_permission_error] });
      const user_fetched = await client.fetchUser();
      const embed_success = new MessageEmbed()
        .setTitle("Success!")
        .setDescription(
          `${user_fetched.username} has successfully been unbanned`
        )
        .setColor("#82db5c")
        .setTimestamp();
      await interaction.guild.members
        .unban(user)
        .then(interaction.reply({ embeds: [embed_success] }))
        .catch(() => interaction.reply({ embeds: [embed_unex_error] })); */
    } else {
      console.log(
        "Interaction is undefined, the value of interaction is: ",
        interaction
      );
    }
  },
};

// define a function to check if the user ID is valud
function isValidUserId(userId) {
  // this is how we specify regex values
  // this means the digits needs to be values between 0 and 9, and the length of the user id being within 17 to 19 characters
  const userIdRegex = /^[0-9]{17,19}$/;
  // check if the parameter contains the regex pattern specified in the above part of the code
  return userIdRegex.test(userId);
}
