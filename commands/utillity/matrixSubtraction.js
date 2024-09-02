const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");

// TODO : Remove the excess comments later, the excess comments should not make to the main branch
// More or less a copy paste of matrix addition, only difference is that the matrix that are provided are being subtrcated instead of being added in this case
module.exports = {
	// every command requires two components --> a data section and an execute function
	data: new SlashCommandBuilder()
		.setName("matrix-subtraction")
		.setDescription("Subtracts two matrix of equal dimensionality together")
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

	// define the execution function
	execute: async function (interaction) {
		try {
			// we want to modify the response prior to execution, and allow for longer than the 3 seconds default execution timing
			// having the ephemeral option set to true ensures that only we can see the message popup
			await interaction.deferReply({ ephemeral: true });

			// don't get mixed up with option and options
			// @Reference https://discord.js.org/docs/packages/discord.js/14.14.1/CommandInteraction:Class --> this is the interaction parameter's type that is actually being inferred under the hood.
			const matrix1 = interaction.options.get("matrix1");
			const matrix2 = interaction.options.get("matrix2");

			// retrieve the values from the returned object that we get from the user's input so we can pass in the string into the math.matrix() function as a parameter so that we can perform the relevant matrix arithemtic
			const matrix1Converted = math.matrix(JSON.parse(matrix1.value));
			const matrix2Converted = math.matrix(JSON.parse(matrix2.value));

			// subtract the matrix from one another
			const subtractedMatrix = math.subtract(
				matrix1Converted,
				matrix2Converted
			);

			console.log(
				`The values of the matrix are ${matrix1.value} and ${matrix2.value} and the resulting subtracted matrix is ${subtractedMatrix}`
			);
			// print out the resulting matrix and provide a response in the command execution
			await interaction.editReply({
				content: `End of successful execution! Resulting matrix value being ${subtractedMatrix}`,
			});
		} catch (error) {
			const customErrorEmbed = new EmbedBuilder()
				.setColor("#FF0000")
				.setTitle("Error (Click here for the original reference material)")
				.setURL("https://www.cuemath.com/algebra/subtraction-of-matrices/")
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
