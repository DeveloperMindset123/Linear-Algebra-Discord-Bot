const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("linear-independence")
		.setDescription(
			"determines if the vectors forming a matrix are linearly independent to one another or not"
		)
		// ! Note : No need for
		.addStringOption((option) =>
			// ? Note : The description cannot be too long or discord will throw in an error
			option
				.setName("matrix")
				.setDescription(
					"provide the square matrix of which you wish to check for indpendence"
				)
				.setRequired(true)
		),

	execute: async function (interaction) {
		await interaction.deferReply({
			ephemeral: false,
		});
		try {
			const det = math.det(
				math.matrix(JSON.parse(await interaction.options.get("matrix").value))
			);
			const determineIndependence = async () => {
				if (det === 0) {
					return false;
				}
				return true;
			};
			const customCorrectEmbed = new EmbedBuilder()
				.setColor("#00FF00")
				.setTitle(`Linear Independence : ${await determineIndependence()}`)
				.addFields(
					// TODO : Modify here as needed
					{
						name: "Reference 1",
						value:
							"https://www.youtube.com/watch?time_continue=20&v=L1ErFhSxIew&embeds_referring_euri=https%3A%2F%2Fwww.google.com%2Fsearch%3Fclient%3Dsafari%26rls%3Den%26q%3Ddetermining%2Blinear%2Bindependence%2Bof%2Bvectors%2Bin%2Blinear%2Balgebra%26ie%3DUTF-8%26oe%3DUT&source_ve_path=Mjg2NjY&themeRefresh=1",
					},
					{
						name: "Reference 2",
						value:
							"https://math.libretexts.org/Bookshelves/Linear_Algebra/Map%3A_Linear_Algebra_(Waldron_Cherney_and_Denton)/10%3A_Linear_Independence/10.02%3A_Showing_Linear_Independence",
					},
					{
						name: "Explanation",
						value:
							"The most striaghtforward approach towards determining if the vectors provided are linearly independent is to take the vectors and form a coefficient matrix and performing gaussian elimination on it. If all the vectors contain a pivot element, then the vectors are independent, otherwise, if even one vector happens to not have a pivot element, then the vectors are not independent to one another. A shorcut is to take the vectors and form a matrix and calculate the determinant, in the case that the determinant is 0, then the vectors are not independent to one another, and also it means a inverse of the matrix doesn't exist, otherwise, the vectors are linearly independent of one another, but in order for this shortcut to work, you must have enough vectors to form a square matrix.",
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
				.setTitle("Error (Click here to see the original reference material)")
				.setURL(
					"https://www.youtube.com/watch?time_continue=20&v=L1ErFhSxIew&embeds_referring_euri=https%3A%2F%2Fwww.google.com%2Fsearch%3Fclient%3Dsafari%26rls%3Den%26q%3Ddetermining%2Blinear%2Bindependence%2Bof%2Bvectors%2Bin%2Blinear%2Balgebra%26ie%3DUTF-8%26oe%3DUT&source_ve_path=Mjg2NjY&themeRefresh=1"
				)
				.setAuthor({
					name: "Ayan Das",
					iconURL: "https://avatars.githubusercontent.com/u/109440738?v=4",
					url: "https://github.com/DeveloperMindset123",
				})
				.setDescription(
					"Either there was an internal server error or the proper input has not been inserted, please double check your inputs and try again. If the problem persists, please contact the developer @dasa60196@gmail.com. IMPORTANT ! The command only works for square matrices only, meaning the rows and columns formed by the vectors must be equal to one another, apologies in advance."
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
