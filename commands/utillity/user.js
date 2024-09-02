/**
 * @Purpose This command is used to retrieve information about the current user who is using the bot
 */

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("user")
		.setDescription("Provides information about the user."),
	async execute(interaction) {
		try {
			const minimalCorrectEmbedBuilder = new EmbedBuilder()
				.setColor("#00FF00")
				.setTitle(
					`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}`
				)
				.setTimestamp();
			return await interaction.reply({
				embeds: [minimalCorrectEmbedBuilder],
			});
		} catch (error) {
			const minimalErrorEmbedBuilder = new EmbedBuilder()
				.setColor("#FF0000")
				.setTitle("Error in command execution, please try again")
				.setTimestamp();
			return await interaction.reply({
				embeds: [minimalErrorEmbedBuilder],
			});
		}
	},
};
