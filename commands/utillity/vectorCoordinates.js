const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
	// we will need 2 options --> the matrix composed of the basis vectors and the vector x itself
	data: new SlashCommandBuilder()
		.setName("vector-coordinates")
		.setDescription(
			"will calculate the coordinates given the vector x and the basis vector composed matrix S"
		)
		// option 1 -> matrix S
		.addStringOption((option) =>
			option
				.setName("basis-vector-matrix")
				.setDescription(
					"provide the matrix S that is made up of the basis vectors in 2 dimensional array format"
				)
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("x-vector")
				.setDescription(
					"please provide the entries of the vector x in array format"
				)
				.setRequired(true)
		),
	execute: async function (interaction) {
		try {
			await interaction.deferReply({
				ephemeral: true,
			});
			await interaction.editReply({
				content: `The coordinates that corresponds to the vector ${math.matrix(
					JSON.parse(await interaction.options.get("x-vector").value)
				)} is ${math.multiply(
					math.matrix(
						JSON.parse(
							await interaction.options.get("basis-vector-matrix").value
						)
					),
					math.matrix(
						math.matrix(
							JSON.parse(await interaction.options.get("x-vector").value)
						)
					)
				)}`,
			});
		} catch (error) {
			const customErrorEmbed = new EmbedBuilder()
				.setColor("#FF0000")
				.setTitle("Error (Click here for the original reference material)")
				.setURL(
					"https://math.libretexts.org/Bookshelves/Linear_Algebra/Interactive_Linear_Algebra_(Margalit_and_Rabinoff)/02%3A_Systems_of_Linear_Equations-_Geometry/2.8%3A_Bases_as_Coordinate_Systems"
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
