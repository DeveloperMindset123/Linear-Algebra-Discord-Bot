const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const math = require("mathjs");

// @Reference video https://www.youtube.com/watch?v=qmRC8mTPGI8
// @Reference video https://www.youtube.com/watch?v=6DybLNNkWyE --> more in-depth explanation of the qr factorization

module.exports = {
	data: new SlashCommandBuilder()
		.setName("qr-decomposition")
		.setDescription("Given matrix A, calculates matrix Q and R")
		.addStringOption((option) =>
			option
				// note --> anmes cannot contain any upper case letters
				.setName("matrix-a")
				.setDescription("provide the entries that matrix A is composed of")
				.setRequired(true)
		),

	execute: async function (interaction) {
		await interaction.deferReply({
			ephemeral: false,
		});
		try {
			const userInput = math.matrix(
				JSON.parse(await interaction.options.get("matrix-a").value)
			);
			const qrFactorization = math.qr(userInput);
			const { Q, R } = qrFactorization;
			const customCorrectEmbed = new EmbedBuilder()
				.setColor("#00FF00")
				.setTitle(`Matrix Q : ${Q} \n\n Matrix R : ${R}`)
				.addFields(
					// TODO : Modify here as needed
					{
						name: "Reference 1",
						value: "https://www.statlect.com/matrix-algebra/QR-decomposition",
					},
					{
						name: "Reference 2",
						value: "https://ubcmath.github.io/MATH307/orthogonality/qr.html",
					},
					{
						name: "Explanation",
						value:
							"In order to understand how QR decomposition works, you must first understand how gram-schmidt process works. Q represnets the orthogonal vectors determined using gram-schmidt and R follows specific entry based insertion by multiplying certain entries together from the original and orthogonal vectors. Refer to the above links for added information.",
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
				.setURL("https://www.statlect.com/matrix-algebra/QR-decomposition")
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
