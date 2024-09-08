const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
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
		await interaction.deferReply({
			ephemeral: false,
		});
		try {
			const matrix = math.matrix(
				JSON.parse(interaction.options.get("matrix").value)
			);
			const matrixDeterminant = math.det(matrix);
			const customCorrectEmbed = new EmbedBuilder()
				.setColor("#00FF00")
				.setTitle(`Resulting determinant being ${matrixDeterminant}`)
				.addFields(
					{
						name: "Reference 1",
						value: "https://www.mathsisfun.com/algebra/matrix-determinant.html",
					},
					{
						name: "Reference 2",
						value: "https://www.youtube.com/watch?v=3ROzG6n4yMc",
					},
					{
						name: "Explanation",
						value:
							"There's various methods involved when it comes to calculating the determinant of a matrix. It also depends on the dimension, while there exists a shortcut for calculating the determinant for a 2x2 matrix, for 3x3 matrix, you have the choice between sarrus's rule or laplace's expansion. For any other matrix greater than than, you must use laplace's expansion to break down the matrix in either 3x3 and apply sarrus's rule (less reommended) or break it down into 2x2 matrix and apply the shortcut (recommended), methods such as the cross product tends to be computationally expensive and error prone.",
					}
				)
				.setTimestamp()
				.setAuthor({
					name: "Ayan Das",
					iconURL: "https://avatars.githubusercontent.com/u/109440738?v=4",
					url: "https://github.com/DeveloperMindset123",
				});
			return await interaction.editReply({
				embeds: [customCorrectEmbed],
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
