//const { SlashCommandBuilder } = require("@discordjs/builders");

/**
 * @NOTE MessageEmbed has been replaced with EmbedBuilder Instead
 * @Reference https://discordjs.guide/popular-topics/embeds.html#embed-preview
 * @Reference https://gist.github.com/FissionFeline/0fefa13f40e3403d7665fd5efd3e9d08 --> link for soruce code
 * @Purpose Guide to show how embedBuilder works
 * @Details This format of defining commands is more upto date with the guide that has been provided for writting custom commands, and allows for further customization.
 */

const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits, MessageEmbed } = require("discord.js");
const command = new SlashCommandBuilder()
  .setName("unban")
  .setDescription("Unbans a specified discord id")
  .addStringOption((option) =>
    option
      .setName("user")
      .setDescription("The user to be unbanned")
      .setRequired(true)
  );

module.exports = {
  data: command,
  execute: async (client, interaction) => {
    console.log(interaction);
    if (interaction) {
      const user = interaction.get("user");
      const embed_unex_error = new MessageEmbed()
        .setTitle("There has been an error")
        .setDescription(
          `Warning there has been an unexcpeted error while executing the command`
        )
        .setColor("#b03350")
        .setTimestamp();
      const embed_permission_error = new MessageEmbed()
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
        .catch(() => interaction.reply({ embeds: [embed_unex_error] }));
    } else {
      console.log(
        "Interaction is undefined, the value of interaction is: ",
        interaction
      );
    }
  },
};
