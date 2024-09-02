const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const banUser = new SlashCommandBuilder()
	.setName("ban")
	.setDescription(
		"Select a member and ban them, this is also a built in command available to administrators."
	)
	.addUserOption((option) =>
		option
			.setName("target")
			.setDescription("The member to ban")
			.setRequired(true)
	)
	.addStringOption((option) =>
		option
			.setName("reason")
			.setDescription("Why do you want to ban this user?")
			.setRequired(true)
	)
	.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
	.setDMPermission(false);

module.exports = {
	data: banUser,
	async execute(interaction) {
		await interaction.deferReply({
			ephemeral: true,
		});

		try {
			if (!interaction.isChatInputCommand()) return;
			const targetUserId = interaction.options.get("target").value;
			const reason =
				interaction.options.get("reason") || "No Reason Has Been Provided.";
			const targetUser = await interaction.guild.members.fetch(targetUserId);
			if (!targetUser) {
				return await interaction.editReply(
					"The user does not exist in this server"
				);
			}
			if (targetUser.id === interaction.guild.ownerId) {
				return await interaction.editReply({
					content: "You cannot ban the user who owns the server",
				});
			}

			//const targetUserRolePosition = targetUser.roles.highest.position;
			//const requestUserRolePosition = interaction.member.roles.highest.position;
			try {
				await targetUser.ban({ reason: reason });
				return await interaction.editReply({
					content: `User ${targetUser} has been banned.\n Reason for banning : ${reason}`,
				});
			} catch (error) {
				return await interaction.editReply({
					content: `There was an error when banning : ${error}`,
				});
			}
		} catch (error) {
			return console.log(`Command Execution failed due to ${error}`);
		}
	},
};
