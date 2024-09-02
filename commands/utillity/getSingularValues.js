const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("get-singular-values")
		.setDescription(
			"Retrieve the singular values using singular value decomposition"
		)
		.addStringOption((option) =>
			option
				.setName("matrix")
				.setDescription(
					"please provide the set of vectors you wish to calculate the singular values from"
				)
				.setRequired(true)
		),

	execute: async function (interaction) {
		await interaction.deferReply({
			ephemeral: false,
		});

		try {
			let userMatrix = math.matrix(
				JSON.parse(await interaction.options.get("matrix").value)
			);

			let singularValues = [];

			userMatrix = math.matrix(
				math.multiply(userMatrix, math.transpose(userMatrix))
			);

			let eigenValues = math.eigs(userMatrix, { eigenvectors: false });
			eigenValues = eigenValues.values._data;

			eigenValues.forEach((currElement) => {
				singularValues.push(math.sqrt(currElement));
			});
			const customCorrectEmbed = new EmbedBuilder()
				.setColor("#00FF00")
				.setTitle(`The diagonalized matrix is ${math.matrix(singularValues)}`)
				.addFields(
					// TODO : Modify here as needed
					{
						name: "Reference 1",
						value: "https://www.youtube.com/watch?v=4zpkXxAUHcE",
					},
					{
						name: "Reference 2",
						value:
							"https://math.libretexts.org/Bookshelves/Linear_Algebra/Understanding_Linear_Algebra_(Austin)/07%3A_The_Spectral_Theorem_and_singular_value_decompositions/7.04%3A_Singular_Value_Decompositions",
					},
					{
						name: "Explanation",
						value:
							"In Simple terms, singular values are the square rooted values of the eigenvalues, by knowing how to derive eigenvalues, you can easily determine singular values with the additional step of calculating the square root of the eigenvalues. The diagonal matrix using singular values MUST be contructed in ascedning order. Please refer to the links above for additional information.",
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
				.setTitle("Error (Click here for Reference Material)")
				.setURL("https://www.youtube.com/watch?v=4zpkXxAUHcE")
				.setAuthor({
					name: "Ayan Das",
					iconURL: "https://avatars.githubusercontent.com/u/109440738?v=4",
					url: "https://github.com/DeveloperMindset123",
				})
				.setDescription(
					"Either there was an internal server error or the proper input has not been inserted, please double check your inputs and try again. If the problem persists, please contant the developer @dasa60196@gmail.com"
				)
				.setThumbnail(
					"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWru8q17zpOzzzT1s475ZS_8fOL1GS0teSw&s"
				)
				.addFields(
					{
						name: "Error Message",
						value: "There wasn an error executing this command",
					},
					{
						name: "\u200B",
						value: "\u200B",
					},
					// !providing 2 hints is more than enough for quesiions such as this
					{
						name: "check your input",
						value:
							"A 2D array, with the entries being the 1d array containing the corresponding columns",
						inline: true,
					},
					{
						name: "check for commas",
						value: "Entries should be seperated by commas",
						inline: true,
					}
				)
				.setImage(
					"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWru8q17zpOzzzT1s475ZS_8fOL1GS0teSw&s"
				)
				.setTimestamp()
				.setFooter({
					text: `Command failed to execute due to ${error}`,
					// ! This was where the error message was coming from, accidentally left it empty earlier
					iconURL:
						"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWru8q17zpOzzzT1s475ZS_8fOL1GS0teSw&s",
				});
			return await interaction.editReply({
				embeds: [customErrorEmbed],
			});
		}
	},
};
