const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("matrix-multiplication")
		.setDescription("Multiplies two matrix together")
		.addStringOption((option) =>
			option
				.setName("matrix1")
				.setDescription(
					"Please provide the values of the matrix in an array format"
				)
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("matrix2")
				.setDescription(
					"Please provide the values of the matrix in an array format"
				)
				.setRequired(true)
		),

	execute: async function (interaction) {
		await interaction.deferReply({
			ephemeral: false,
		});
		try {
			const matrix1 = await interaction.options.get("matrix1");
			const matrix2 = await interaction.options.get("matrix2");

			const matrix1Converted = math.matrix(JSON.parse(matrix1.value));
			const matrix2Converted = math.matrix(JSON.parse(matrix2.value));

			const multipliedMatrix = math.multiply(
				matrix1Converted,
				matrix2Converted
			);
			const customCorrectEmbed = new EmbedBuilder()
				.setColor("#00FF00")
				.setTitle(`Resulting matrix value being ${multipliedMatrix}`)
				.addFields(
					// TODO : Modify here as needed
					{
						name: "Reference 1",
						value: "https://www.mathsisfun.com/algebra/matrix-multiplying.html",
					},
					{
						name: "Reference 2",
						value: "https://www.youtube.com/watch?v=vzt9c7iWPxs&t=1s",
					},
					{
						name: "Explanation",
						value:
							"Matrix multiplication is a buildup of vector multiplication, and vector multiplication is the definition of dot product. Another way to view matrix multiplication is that it is a series of vector multiplication or multiple dot products. The pre-requisite for matrix multiplication is that the column of the first matrix must match the rows of the second matrix and the resulting matrix will be of the dimension where the row will be the same as the first matrix and the column will be the same as the second matrix.",
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
				.setURL("https://www.mathsisfun.com/algebra/matrix-multiplying.html")
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
			console.error(error);
			return await interaction.editReply({
				embeds: [customErrorEmbed],
			});
		}
	},
};
