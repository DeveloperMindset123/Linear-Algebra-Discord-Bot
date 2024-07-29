const { SlashCommandBuilder } = require("@discordjs/builders");

/**
 * @NOTE MessageEmbed has been replaced with EmbedBuilder Instead
 * @Reference https://discordjs.guide/popular-topics/embeds.html#embed-preview
 * @Purpose Guide to show how embedBuilder works
 * @Details This format of defining commands is more upto date with the guide that has been provided for writting custom commands, and allows for further customization.
 */
const {
  PermissionsBitField,
  EmbedBuilder,
  Message,
  REST,
  Routes,
} = require("discord.js");
//const { options } = require("./ban");
const fs = require("node:fs");
const path = require("node:path");

const command = new SlashCommandBuilder()
  // sets the name of the command to be used
  .setName("unban")
  // defines a brief explanation for the purpose of this command
  .setDescription("Unbans a specified discord id")
  .addStringOption((option) =>
    option
      .setName("user")
      .setDescription("The user that needs needs to be unbanned")
      // by toggling this option to be required, this option must be passed
      .setRequired(true)
  );

module.exports = {
  data: command,
  execute: async (client, interaction) => {
    const user = interaction.options.getString("user");
    // MessageEmbed is used to display a message in a certain layout, adhering to discord's convention
    const embed_unex_error = new EmbedBuilder()
      .setTitle("There has been an error")
      .setDescription(
        "Warning : There has been an unexpected error while executing this command."
      )
      .setColor("#b03350")
      // sets the timestamp for this embed, as in when this message was sent out
      .setTimestamp();
    if (!interaction.guild)
      return interaction.reply({ embeds: [embed_unex_error] });
    const member = await interaction.guild.memebers.fetch(interaction.user.id);
    // Was originally Permissions, now there is PermissionsBitField and PermissionsFlagsBit
    if (!member.permissions.has([PermissionsBitField.Flags.BanMembers]))
      return interaction.reply({ embeds: [embed_permission_error] });

    const user_fetched = await client.fetchUser();
    const embed_success = new EmbedBuilder()
      .setTitle("Success!")
      .setDescription(`${user_fetched.username} has successfully been unbanned`)
      .setColor("#82db5c")
      .setTimestamp();

    await interaction.guild.members
      .unban(user)
      .then(interaction.reply({ embeds: [embed_success] }))
      .catch(() => interaction.reply({ embeds: [embed_unex_error] }));
  },
};

/*
module.exports = {
  command,
}; */

/**
 * @Purpose Below is another format of defining custom commands
 * @Detail Similar to the ping.js command
 * @Usage is another command, with the object representing the name, description to explain briefly what it does
 * @Usage callback is an annoynomous function explain what the resulting response should be as well.
 

const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");
const { description, callback } = require("../misc/ping");

module.exports = {
  name: "ban",
  description: "Bans a memeber from the server.",
  //devOnly : Boolean,
  //testOnly : Boolean,

  options: [
    // define an array of objects contianing the list of arguments the /ban command should be taking in
    {
      name: "target-user",
      description: "The user to ban",
      required: true,
      // TODO : not sure if this object's method is deprecated or not --> was replaced with ApplicationCommandOptionType (originally known as ApplicationCommandType)
      type: ApplicationCommandOptionType.Mentionable,
    },
    {
      name: "reason",
      description: "please provide a reason for banning this user",
      // the argument that will be passed in is a String
      required: false,
      type: ApplicationCommandOptionType.String,
    },
  ],
  // The user that's banning will also require permission to carry this out
  permissionRequired: [
    PermissionFlagsBits.Administrator,
    // TODO : Add/Remove the permissions later as needed.
    PermissionFlagsBits.BanMembers,
    //PermissionFlagsBits.AttachFiles,
    //PermissionFlagsBits.ModerateMembers,
  ],
  // define the callback function, aka define the logic behind what will happen when the user is mentioned and the reason for being banned has been provided
  callback: (client, interaction) => {
    interaction.reply("User has been banned!");
  },
};

 */
