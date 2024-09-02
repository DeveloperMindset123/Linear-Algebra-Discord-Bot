/**
 * @Purpose This command is used to extract information about the current server the bot is in
 */

const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("server")
		.setDescription("Provides information about the server."),
	async execute(interaction) {
		try {
			const minimalCorrectEmbedBuilder = new EmbedBuilder()
				.setColor("#00FF00")
				.setTitle(
					`The server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members`
				)
				.setTimestamp();

			return await interaction.reply({
				embeds: [minimalCorrectEmbedBuilder],
			});
		} catch (error) {
			const minimalErrorEmbedBuilder = new EmbedBuilder()
				.setColor("#FF0000")
				.setTitle("Error in command exeuction, please try again")
				.setTimestamp();
			// interactionguid is the object representing the Guild in whcih the command was run on
			return await interaction.reply({
				embeds: [minimalErrorEmbedBuilder],
			});
		}
	},
};
