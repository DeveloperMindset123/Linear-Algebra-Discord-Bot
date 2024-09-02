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
		try {
			await interaction.deferReply({
				ephemeral: false,
			});

			// all we simply check is the determinant of the given matrix and if it's not 0, then the vectors will be independent
			const det = math.det(
				math.matrix(JSON.parse(await interaction.options.get("matrix").value))
			);
			const determineIndependence = async () => {
				if (det === 0) {
					return false;
				}
				return true;
			};

			// TODO : Add logic for successful embedding logic, minimal should be sufficient, with some text based details as well as link for looking up the additional resources
			// reference can be the same as the link below, with a simple explanation for the logic that's taking place in regards to the computation.

			await interaction.editReply({
				content: `Linear Independence : ${await determineIndependence()}`,
			});

			// retrieve and pass in the matrix that is recieved
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
