const {
	SlashCommandBuilder,
	EmbedBuilder,
	PermissionsBitField,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("create-invite")
		.setDescription("create an invite link for your guild")
		.addChannelOption((option) =>
			option
				.setName("channel")
				.setDescription("The channel to create the invite in")
				.setRequired(false)
		)
		.addIntegerOption((option) =>
			option
				.setName("max-age")
				.setDescription("The max age for your invite (in seconds")
				.setRequired(false)
		)
		.addIntegerOption((option) =>
			option
				.setName("max-uses")
				.setDescription("The max number of people who can use this invite")
				.setRequired(false)
		)
		.addStringOption((option) =>
			option
				.setName("reason")
				.setDescription("Reason for creating this invite")
				.setRequired(false)
		),
	// Function implemented to specify the execution logic
	async execute(interaction) {
		if (
			!interaction.member.permissions.has(
				PermissionsBitField.Flags.CreateInstantInvite
			)
		)
			return await interaction.reply({
				content: `This server does not allow memebers to create invites!`,
				ephemeral: true,
			});

		const { options } = interaction;
		const channel = options.getChannel("channel") || interaction.channel;
		let maxAge = options.getInteger("max-age") || 0;
		let maxUses = options.getInteger("max-uses") || 0;
		let reason = options.getString("reason") || "No Reason Provided";

		const invite = await channel.createInvite({
			maxAge: maxAge,
			maxuses: maxUses,
			reason: reason,
		});
		if (maxAge === 0) maxAge === "infinite";
		if (maxUses === 0) maxUses === "infinite";

		const embed = new EmbedBuilder()
			.setColor("Blurple")
			.setTitle("I have created your invite link!")
			.addFields({
				name: `🔗 Invite Link`,
				value: `https://discord.gg/${invite.code} OR \`${invite.code}\``,
			})
			.addFields({ name: `📜 Invite Channel`, value: `${channel}*` })
			.addFields({ name: `🤷‍♂️ Max Uses`, value: `\`${maxUses}\`` })
			.addFields({ name: `👫 Max Age`, value: `\`${maxAge}\`` })
			.setDescription(`You creted this invite for: *${reason}*!`)
			.setTimestamp()
			.setFooter({ text: `Invite Generator` });
		await interaction.reply({ embeds: [embed], ephemeral: false });
	},
};
