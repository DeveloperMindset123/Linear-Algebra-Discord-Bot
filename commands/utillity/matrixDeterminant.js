const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("matrix-determinant")
		.setDescription("Calculates the determinant of a given matrix")
		.addStringOption((option) =>
			option
				.setName("matrix")
				.setDescription(
					"provides the matrix that you want to calculate the determinant of"
				)
				.setRequired(true)
		),

	execute: async function (interaction) {
		try {
			// TODO : Need to add custom embedding for correct output
			await interaction.deferReply({
				ephemeral: true,
			});
			const matrix = math.matrix(
				JSON.parse(interaction.options.get("matrix").value)
			);
			const matrixDeterminant = math.det(matrix);
			console.log(
				`The resulting value determinant of the matrix ${matrix} is ${matrixDeterminant}`
			);
			interaction.editReply({
				content: `End of successful execution! Resulting determinant being ${matrixDeterminant}`,
			});
		} catch (error) {
			const customErrorEmbed = new EmbedBuilder()
				.setColor("#FF0000")
				.setTitle("Error (Click here for the original reference material)")
				.setURL("https://www.mathsisfun.com/algebra/matrix-determinant.html")
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
