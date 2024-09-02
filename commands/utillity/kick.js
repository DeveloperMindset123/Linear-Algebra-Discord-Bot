const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	EmbedBuilder,
} = require("discord.js");
const kickUser = new SlashCommandBuilder()
	.setName("kick")
	.setDescription("Select a member and kick them.")
	.addUserOption((option) =>
		option
			.setName("target")
			.setDescription("The member to kick")
			.setRequired(true)
	)
	.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers);

module.exports = {
	data: kickUser,
	async execute(interaction) {
		try {
			const customCorrectEmbed = new EmbedBuilder()
				.setColor("#00FF00")
				.setTitle(
					`The user ${interaction.user.username} has been kicked from the server.`
				)
				.setTimestamp()
				.setAuthor({
					name: "Ayan Das",
					iconURL: "https://avatars.githubusercontent.com/u/109440738?v=4",
					url: "https://github.com/DeveloperMindset123",
				});
			return await interaction.reply({
				embeds: [customCorrectEmbed],
				// this is not a response you want others to see
				ephemeral: true,
			});
		} catch (error) {
			const minimalErrorEmbedBuilder = new EmbedBuilder()
				.setColor("#FF0000")
				.setTitle(`Command failed to execute due to ${error}`)
				.setTimestamp();
			await interaction.reply({
				embeds: [minimalErrorEmbedBuilder],
				ephemeral: true,
			});
		}
	},
};
