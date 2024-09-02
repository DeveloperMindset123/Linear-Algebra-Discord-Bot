// TODO : Logic for matrix addition needs to be implemented here

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
	// NOTE : the cooldown part is optional, it is to reduce the commands from being spammed, which in turn can crash the server
	cooldown: 5,
	// implement the configurations that will be needed for matrix additon
	data: new SlashCommandBuilder()
		// NOTE : no upper case values allowed when naming command, or will cause errors
		.setName("matrix-addition")
		.setDescription("Adds two matrix of equal dimensionality together")
		// Add the option to allow for matrix additions --> first option is for matrix 1
		// NOTE : number option won't work here, add a string option, and convert the string into a array of numbers thorugh removing the double quotes using regex logic
		.addStringOption((option) =>
			option
				.setName("matrix1")
				.setDescription(
					"Please provide the values of the matrix in an array format"
				)
				.setRequired(true)
		)
		// add the option for the second matrix
		.addStringOption((option) =>
			option
				.setName("matrix2")
				.setDescription(
					"Please provide the values of the matrix in an array format"
				)
				.setRequired(true)
		),
	execute: async function (interaction) {
		await interaction.deferReply({ ephemeral: false });
		try {
			const matrix1 = interaction.options.get("matrix1");
			const matrix2 = interaction.options.get("matrix2");
			const matrix1Converted = math.matrix(JSON.parse(matrix1.value));
			const matrix2Converted = math.matrix(JSON.parse(matrix2.value));
			const addedMatrix = math.add(matrix1Converted, matrix2Converted);

			const customCorrectEmbed = new EmbedBuilder()
				.setColor("#00FF00")
				.setTitle(`Resulting matrix value being ${addedMatrix}`)
				.addFields(
					{
						name: "Reference 1",
						value: "https://www.youtube.com/watch?v=QXUbFzEd3Ww",
					},
					{
						name: "Reference 2",
						value:
							"https://www.varsitytutors.com/hotmath/hotmath_help/topics/adding-and-subtracting-matrices",
					},
					{
						name: "Explanation",
						value:
							"There is not much to be said about matrix additions, simply take each of the entries and add it to the corresponding entries of the other matrix, the same rule applies for subtractions.",
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
					"https://www.varsitytutors.com/hotmath/hotmath_help/topics/adding-and-subtracting-matrices"
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
