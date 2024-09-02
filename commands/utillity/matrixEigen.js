const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("get-eigens")
		.setDescription(
			"calculates the eigenvalues and eigenvectors given the matrix"
		)
		.addStringOption((option) =>
			option
				.setName("matrix")
				.setDescription(
					"provide the matrix of which you want to calcualte the eigenvalues and eigenvectors of"
				)
				.setRequired(true)
		),

	execute: async function (interaction) {
		await interaction.deferReply({
			ephemeral: false,
		});
		try {
			const result = math.eigs(
				math.matrix(JSON.parse(await interaction.options.get("matrix").value))
			);

			const eigenvectors = result.eigenvectors;

			let eigenvalues = [];
			let eigenvectorsList = [];
			eigenvectors.forEach(async (element) => {
				eigenvalues.push(element.value);
				eigenvectorsList.push(element.vector);
			});

			const customCorrectEmbed = new EmbedBuilder()
				.setColor("#00FF00")
				.setTitle("Successful execution of command")
				.setDescription(
					`The eigenvalues are [${eigenvalues}] and the corresponding eigenvectors are [${eigenvectorsList}]`
				)
				.addFields(
					{
						name: "Reference 1",
						value:
							"https://math.libretexts.org/Bookshelves/Linear_Algebra/A_First_Course_in_Linear_Algebra_(Kuttler)/07%3A_Spectral_Theory/7.01%3A_Eigenvalues_and_Eigenvectors_of_a_Matrix",
					},
					{
						name: "Reference 2",
						value: "https://www.youtube.com/watch?v=TQvxWaQnrqI",
					},
					{
						name: "Explanation",
						value:
							"The simplest way to calculate eigenvalues is using the formula, normally in Linear Algebra textbooks, chapter 7 introduces the theoretical concept of eigenvalues and how it relates to Linear Transformation from a geometrical perspective and how eigenvalues must first be calculated using the det(A - (lambda)(identity-matrix) and then the corresponding eigenvectors can be calculated using ker(A-(lamda-value-n)(Identity-matrix), it is important to understand both the geometrical and algebraic aspect of eigenvectors and eigenvalues. The concept initially may seem difficult but is significantly simplified thanks to the formulas and understanding how to apply them in various practice problems.",
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
				.setURL(
					"https://math.libretexts.org/Bookshelves/Linear_Algebra/A_First_Course_in_Linear_Algebra_(Kuttler)/07%3A_Spectral_Theory/7.01%3A_Eigenvalues_and_Eigenvectors_of_a_Matrix"
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
