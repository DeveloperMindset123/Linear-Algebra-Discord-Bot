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
		try {
			await interaction.deferReply({
				// TODO : make the following modification and then remove the comment
				// toggle this to false later so others can also see the resulting output
				ephemeral: false,
			});
			console.log(JSON.stringify(await interaction.options));
			console.log(
				JSON.stringify(await interaction.options.get("coefficient-matrix"))
			);
			console.log(
				JSON.stringify(await interaction.options.get("column-matrix"))
			);
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
			await interaction.editReply({
				content: `End of succcessful execution. The solution is ${solutions}`,
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
			return await interaction.editReply({
				embeds: [customErrorEmbed],
			});
		}
	},
};
