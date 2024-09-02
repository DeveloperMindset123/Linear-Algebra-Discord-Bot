const { SlashCommandBuilder } = require("discord.js");
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
		try {
			await interaction.deferReply({
				ephemeral: true,
			});

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

			await interaction.editReply({
				// TODO : Replace the current string message with the embedding made
				content: `End of successful execution. The eigenvalues are [${eigenvalues}] and the corresponding eigenvectors are [${eigenvectorsList}]`,
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
			return await interaction.editReply({
				embeds: [customErrorEmbed],
			});
		}
	},
};
