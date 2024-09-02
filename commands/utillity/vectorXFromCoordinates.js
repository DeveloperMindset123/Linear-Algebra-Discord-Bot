const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("get-original-vector-x")
		.setDescription(
			"will calculate the values of the original vector x given matrix S and coordinates of vector x"
		)
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
				.setName("x-coordinate-vector")
				.setDescription("please provide the coordinate vector x in 1D array")
				.setRequired(true)
		),
	execute: async function (interaction) {
		await interaction.deferReply({
			ephemeral: false,
		});
		try {
			const customCorrectEmbed = new EmbedBuilder()
				.setColor("#00FF00")
				.setTitle(
					`The coordinate vector is ${math.matrix(
						JSON.parse(
							await interaction.options.get("x-coordinate-vector").value
						)
					)} and the entries of the original vector is ${math.multiply(
						math.inv(
							math.matrix(
								JSON.parse(
									await interaction.options.get("basis-vector-matrix").value
								)
							)
						),
						math.matrix(
							JSON.parse(
								await interaction.options.get("x-coordinate-vector").value
							)
						)
					)}`
				)
				.addFields(
					{
						name: "Reference 1",
						value: "https://www.youtube.com/watch?v=AL5uBQKZ_6A",
					},
					{
						name: "Explanation",
						value:
							"One trick to calculate the coordinates of a vector is using the formula. vector-x=matrix-S * coordinate-vector-x, and this can be rewritten in terms of the coordiante vector x, as coordinate-vector-x=matrix-S-inverse * vector-x. Here matrix S is composed of the basis vectors and x is the resulting vector of the linear combination of the basis vectors. The original equation can also be used to calculate vector-x given the coordinate vector and the basis vector for a subsequent command.",
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
				.setURL("https://www.youtube.com/watch?v=AL5uBQKZ_6A")
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
