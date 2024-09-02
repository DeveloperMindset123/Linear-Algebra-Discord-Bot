// TODO : Implement test scripts using jest
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const math = require("mathjs");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("angle-between-vectors")
		.setDescription("calculates the angle between two vectors")
		// option 1 --> vector 1
		.addStringOption((option) =>
			option
				.setName("vector1")
				.setDescription("please provide the first vector in array format")
				.setRequired(true)
		)
		// options 2 --> vector 2
		.addStringOption((option) =>
			option
				.setName("vector2")
				.setDescription("please provide the second vector in array format")
				.setRequired(true)
		),
	execute: async function (interaction) {
		await interaction.deferReply({
			ephemeral: false,
		});
		try {
			const vector1 = math.matrix(
				JSON.parse(await interaction.options.get("vector1").value)
			);
			const vector2 = math.matrix(
				JSON.parse(await interaction.options.get("vector2").value)
			);
			const resultInRadians = math.acos(
				math.divide(
					math.dot(vector1, vector2),
					math.multiply(
						math.sqrt(math.dot(vector1, vector1)),
						math.sqrt(math.dot(vector2, vector2))
					)
				)
			);

			// convert to degrees (radians * 180 / (pie)
			const resultInDegrees = math.multiply(
				resultInRadians,
				math.divide(180, math.pi)
			);
			const customCorrectEmbed = new EmbedBuilder()
				.setColor("#00FF00")
				.setTitle(
					`Angle (in radians) ${resultInRadians} \n\n Angle (in Degrees) : ${resultInDegrees}`
				)
				.addFields(
					{
						name: "Reference 1",
						value: "https://www.youtube.com/watch?v=jnx5RTthmsk",
					},
					{
						name: "Reference 2",
						value: "https://www.youtube.com/watch?v=TTom8n3FFCw&t=15s",
					},
					{
						name: "Explanation",
						value:
							"The angle between two vectors can be calculated using the arccos formula alongside the combination of the dot product between two vectors. The above videos helps show how the formula can be applied, it is recommended that you review the unit circle for arccos and dot product formula, as well as the distance formula of vectors to help understand how this calculation has been done, alongside doing some practice questions from the textbook will suffice.",
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
				.setTitle("Error (Click Here for Original Reference Material)")
				.setURL("https://www.youtube.com/watch?v=TTom8n3FFCw&t=15s")
				.setAuthor({
					name: "Ayan Das",
					iconURL: "https://avatars.githubusercontent.com/u/109440738?v=4",
					url: "https://github.com/DeveloperMindset123",
				})
				.setDescription(
					"Either there was internal server error or the proper input has not been inserted, please double check your inputs and try again. If the problem persists, please contact the developer @dasa60196@gmail.com"
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
					{
						name: "Check Your Input",
						value: "Singular Array with numerical entries",
						inline: true,
					},
					{
						name: "Check for commas",
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
					iconURL:
						"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmWru8q17zpOzzzT1s475ZS_8fOL1GS0teSw&s",
				});
			await interaction.editReply({
				embeds: [customErrorEmbed],
			});
		}
	},
};
