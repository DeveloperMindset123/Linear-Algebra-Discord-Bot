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
		try {
			await interaction.deferReply({
				ephemeral: false,
			});

			const userInput = math.matrix(
				JSON.parse(await interaction.options.get("matrix-a").value)
			);
			// returns an object, with the keys being the R and the Q matrix
			const qrFactorization = math.qr(userInput);
			const { Q, R } = qrFactorization;
			console.log(`QR Factorization : ${qrFactorization}`);
			console.warn(
				`Testing to see if Q and R prints as intended --> Q : ${Q}, R : ${R}`
			);
			await interaction.editReply({
				// TODO : Replace the current string message with the embedding made
				content: `Successful execution of command!\n\n Matrix Q : ${Q} \n\n Matrix R : ${R}`,
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
