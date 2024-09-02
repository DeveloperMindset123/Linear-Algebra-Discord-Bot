/**
 * @SlashCommandBuilder Discord's built in function used to develop custom slash commands as the name suggests
 * @math math library used to simplify the computation involved
 */
const { SlashCommandBuilder } = require("discord.js");
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
		try {
			// TODO : Remove the excess comments, as well as provide step by step description in latex for how matrix inversion works
			await interaction.deferReply({
				ephemeral: true,
			});

			const originalMatrix = interaction.options.get("matrix");
			const matrixConverted = math.matrix(JSON.parse(originalMatrix.value));
			const invertedMatrix = math.inv(matrixConverted);

			console.log(
				`The original matrix entered was ${originalMatrix.value} and the resulting inverted matrix was ${invertedMatrix}`
			);
			await interaction.editReply({
				content: `End of successful exeuction! Resulting matrix value being ${invertedMatrix}`,
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
