const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");
const { execute } = require("./inviteCreate");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("matrix-transpose")
		.setDescription("Calculate the transpose of the matrix")
		.addStringOption((option) =>
			option
				.setName("matrix")
				.setDescription(
					"Provide the matrix that you want to calculate the transpose of in an array format"
				)
				.setRequired(true)
		),

	execute: async function (interaction) {
		try {
			await interaction.deferReply({
				ephemeral: true,
			});

			const originalMatrix = interaction.options.get("matrix");
			const matrixToTranspose = math.matrix(JSON.parse(originalMatrix.value));
			const transposeMatrix = math.transpose(matrixToTranspose);

			console.log(
				`The original matrix was ${originalMatrix.value} and the resulting transpose matrix was ${transposeMatrix}`
			);
			await interaction.editReply({
				content: `End of successful execution! Resulting matrix value being ${transposeMatrix}`,
			});
		} catch (error) {
			const customErrorEmbed = new EmbedBuilder()
				.setColor("#FF0000")
				.setTitle("Error (Click here for the original reference material)")
				.setURL("https://byjus.com/maths/transpose-of-a-matrix/")
				.setAuthor({
					name: "Ayan Das",
					iconURL: "https://avatars.githubusercontent.com/u/109440738?v=4",
					url: "https://github.com/DeveloperMindset123",
				})
				.setDescription(
					"Either there was an internal server error or the proper input has not been inserted, please double check your inputs and try again. If the problem persists, please contact the developer @dasa60196@gmail.com"
				)
				.setThumbnail(
					"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWru8q17zpOzzzT1s475ZS_8fOL1GS0teSw&s"
				)
				.addFields(
					{
						name: "Error Message",
						value: "There was an error executing this command",
					},
					{
						name: "\u200B",
						value: "\u200B",
					},
					{
						name: "Check your input",
						value: "2D array, with each vectors represented as 1D arrays",
						inline: true,
					},
					{
						name: "Check for commas",
						value:
							"Ensure that entries within the 1D arrays are properly seperated by comma seperated values",
						inline: true,
					}
				)
				.setImage(
					"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWru8q17zpOzzzT1s475ZS_8fOL1GS0teSw&s"
				)
				.setTimestamp()
				.setFooter({
					text: `Command failed to execute due to ${error}`,
					iconURL:
						"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWru8q17zpOzzzT1s475ZS_8fOL1GS0teSw&s",
				});
			return await interaction.editReply({
				embeds: [customErrorEmbed],
			});
		}
	},
};
