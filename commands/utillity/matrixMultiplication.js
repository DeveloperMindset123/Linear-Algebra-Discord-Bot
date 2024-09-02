const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");

// TOOD : remove the unneccessary console.log statements and add proper embedding to the interaction based responses later as part of cleanup

module.exports = {
	//cooldown : 30,
	data: new SlashCommandBuilder()
		.setName("matrix-multiplication")
		.setDescription("Multiplies two matrix together")
		// NOTE : the way this has been implemented may cause some kind of syntax errors, remove the curly braces if needed --> yup ths throws an error
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
		try {
			await interaction.deferReply({
				ephemeral: true,
			});

			const matrix1 = await interaction.options.get("matrix1");
			const matrix2 = await interaction.options.get("matrix2");

			const matrix1Converted = math.matrix(JSON.parse(matrix1.value));
			const matrix2Converted = math.matrix(JSON.parse(matrix2.value));

			const multipliedMatrix = math.multiply(
				matrix1Converted,
				matrix2Converted
			);

			console.log(
				`The values entered were ${matrix1.value} and ${matrix2.value} and their resulting product was ${multipliedMatrix}`
			);
			await interaction.editReply({
				content: `End of successful execution! Resulting matrix value being ${multipliedMatrix}`,
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
			return await interaction.editReply({
				embeds: [customErrorEmbed],
			});
		}
	},
};
