const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("gaussian-elimination")
		.setDescription("Performs the gaussian elimination on a given matrix")
		.addStringOption((option) =>
			option
				.setName("coefficient-matrix")
				.setDescription("provide the coefficient matrix")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("column-matrix")
				.setDescription(
					"provide the values corresponding to vector b, defaults to 0s entry vector"
				)
				.setRequired(false)
		),
	execute: async function (interaction) {
		await interaction.deferReply({
			ephemeral: false,
		});
		try {
			const coefficientMatrix = JSON.parse(
				await interaction.options.get("coefficient-matrix").value
			);
			var columnMatrix = await interaction.options.get("column-matrix").value;
			if (!columnMatrix) {
				const matrixSize = math.size(math.matrix(coefficientMatrix));
				columnMatrix = math.zeros(matrixSize);
			}
			const solutions = math.lusolve(
				math.matrix(coefficientMatrix),
				math.matrix(JSON.parse(columnMatrix))
			);

			const customCorrectEmbed = new EmbedBuilder()
				.setColor("#00FF00")
				.setTitle(`The solution is ${solutions}`)
				.addFields(
					// TODO : Modify here as needed
					{
						name: "Reference 1",
						value:
							"https://www.cliffsnotes.com/study-guides/algebra/linear-algebra/linear-systems/gaussian-elimination",
					},
					{
						name: "Reference 2",
						value:
							"https://math.libretexts.org/Bookshelves/Algebra/Algebra_and_Trigonometry_1e_(OpenStax)/11%3A_Systems_of_Equations_and_Inequalities/11.06%3A_Solving_Systems_with_Gaussian_Elimination",
					},
					{
						name: "Explanation",
						value:
							"Gaussian Elimination is the result of using the pivot elements, either in the rows or the column to reduce the matrix down to values of 1s and 0s. There's two kind of reduced form of matrix, the reduced echelon form matrix (REF), and row-reduced echelong form matrix (RREF). In REF, the matrix entries before the first instance of 1 (assuming that the row of the matrix has a 1, must all be 0, and the entries after may have 0 or a non-zero value. For RREF, matrix entries follows the same principle as REF but it only allows for 0s and 1s, with the 1s being placed diagonally and all other entries being 0s.",
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
			// define the custom error embedding
			const customErrorEmbed = new EmbedBuilder()
				.setColor("#FF0000")
				.setTitle("Error (Click Here for the Original Reference Material)")
				.setURL(
					"https://www.cliffsnotes.com/study-guides/algebra/linear-algebra/linear-systems/gaussian-elimination"
				)
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
						value: "There was an error executing the command",
					},
					{
						name: "\u200B",
						value: "\u200B",
					},
					// ! 2 Hints is sufficient
					{
						name: "Check Your Input",
						value:
							"Coefficient Matrix should be inserted as a 2D array, column matrix should be inserted as a 1d array since it's a single column vector",
						inline: true,
					},
					{
						name: "Check for commas",
						value: "All entries should be numerical and seperated by commas",
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
