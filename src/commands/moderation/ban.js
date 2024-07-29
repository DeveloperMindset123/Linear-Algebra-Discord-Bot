/**
 * @Purpose Similar to the ping.js command
 * @Usage is another command, with the object representing the name, description to explain briefly what it does
 * @Usage callback is an annoynomous function explain what the resulting response should be as well.
 */

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
