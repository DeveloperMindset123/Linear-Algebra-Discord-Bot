const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
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
			await interaction.reply(
				`The user ${interaction.user.username} has been kicked from the server.`
			);
		} catch (error) {
			console.log(`Command execution failed due to ${error}`);
		}
	},
};
