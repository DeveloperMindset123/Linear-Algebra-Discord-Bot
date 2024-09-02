/**
 * @SlashCommandBuilder Discord's built in function used to develop custom slash commands as the name suggests
 * @math math library used to simplify the computation involved
 */
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
	// two components (required) --> data and execute
	// optional : cooldwon
	// when it comes to setting names for commands, no upper case values allowed, the terminal will throw an error during runtime otherwise
	data: new SlashCommandBuilder()
		// unlike before, we will only need one option to execute this command, of course the requirement for the option must also be set to true as well
		.setName("matrix-inversion")
		.setDescription("Calculates the matrix inverse given a matrix")
		.addStringOption((option) =>
			option
				.setName("matrix")
				.setDescription(
					"Provide the matrix that you want to calculate the inverse of in array format"
				)
				.setRequired(true)
		),

	// we can can also write it as async function execute(interaction) { implement execution logic within the body }, I simply prefer this method instead since it makes more sense
	execute: async function (interaction) {
		await interaction.deferReply({
			ephemeral: false,
		});
		try {
			const originalMatrix = interaction.options.get("matrix");
			const matrixConverted = math.matrix(JSON.parse(originalMatrix.value));
			const invertedMatrix = math.inv(matrixConverted);
			const customCorrectEmbed = new EmbedBuilder()
				.setColor("#00FF00")
				.setTitle(`Resulting matrix value being ${invertedMatrix}`)
				.addFields(
					// TODO : Modify here as needed
					{
						name: "Reference 1",
						value:
							"https://math.libretexts.org/Bookshelves/Applied_Mathematics/Applied_Finite_Mathematics_(Sekhon_and_Bloom)/02%3A_Matrices/2.04%3A_Inverse_Matrices",
					},
					{
						name: "Reference 2",
						value: "https://www.youtube.com/watch?v=Fg7_mv3izR0&t=387s",
					},
					{
						name: "Explanation",
						value:
							"The inverse of a matrix is calculated using the inverse algorithm for matrix of dimensionality 2x2 or greater. While a shortcut for calculating the inverse exists for 2x2 matrix, 3x3 matrix and higher relies on the inverse algorithm, the inverse algrithm is to simply place the original matrix and it's corresponding identity matrix side by side, forming an augmented matrix composed of two matrix. With the aim to convert the left matrix to row-reduced echelong form using gaussian elminiation and this will simultaneously also convert the identity matrix on the right into the inverse matrix. This approach can be quite tedious for higher dimension matrix and error prone, therefore, care must be taken during the calculation process.",
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
					"https://math.libretexts.org/Bookshelves/Applied_Mathematics/Applied_Finite_Mathematics_(Sekhon_and_Bloom)/02%3A_Matrices/2.04%3A_Inverse_Matrices"
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
			return await interaction.editReply({
				embeds: [customErrorEmbed],
			});
		}
	},
};
