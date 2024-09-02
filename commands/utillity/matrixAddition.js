// TODO : Logic for matrix addition needs to be implemented here

const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
	// NOTE : the cooldown part is optional, it is to reduce the commands from being spammed, which in turn can crash the server
	cooldown: 5,
	// implement the configurations that will be needed for matrix additon
	data: new SlashCommandBuilder()
		// NOTE : no upper case values allowed when naming command, or will cause errors
		.setName("matrix-addition")
		.setDescription("Adds two matrix of equal dimensionality together")
		// Add the option to allow for matrix additions --> first option is for matrix 1
		// NOTE : number option won't work here, add a string option, and convert the string into a array of numbers thorugh removing the double quotes using regex logic
		.addStringOption((option) =>
			option
				.setName("matrix1")
				.setDescription(
					"Please provide the values of the matrix in an array format"
				)
				.setRequired(true)
		)
		// add the option for the second matrix
		.addStringOption((option) =>
			option
				.setName("matrix2")
				.setDescription(
					"Please provide the values of the matrix in an array format"
				)
				.setRequired(true)
		),
	execute: async function (interaction) {
		try {
			await interaction.deferReply({ ephemeral: true });
			// TODO : It's functional, but requires some cleanup, also the resulting reply should be an embedding instead
			// TODO : Provide steps for how matrix addition is done, as well as reference links for people to look into for an in-depth explanation, simplest thing would be to provide an explanation and link reference links to show how the calculations are done in an official website

			const matrix1 = interaction.options.get("matrix1");
			const matrix2 = interaction.options.get("matrix2");
			const matrix1Converted = math.matrix(JSON.parse(matrix1.value));
			const matrix2Converted = math.matrix(JSON.parse(matrix2.value));
			const addedMatrix = math.add(matrix1Converted, matrix2Converted);

			console.log(
				`The values are ${matrix1.value} and ${matrix2.value} and the resulting addition is ${addedMatrix}`
			);
			console.log(
				`The types for the math converted matrix is ${typeof matrix1.value} and ${typeof matrix2.value}`
			);
			// NOTE : the properties of the object are the following --> "_name", "_type", "_value"
			await interaction.editReply({
				content: `End of successful execution! Resulting matrix value being ${addedMatrix}`,
			});
			// end the code ex
			return;
		} catch (error) {
			const customErrorEmbed = new EmbedBuilder()
				.setColor("#FF0000")
				.setTitle("Error (Click here for the original reference material)")
				.setURL(
					"https://www.varsitytutors.com/hotmath/hotmath_help/topics/adding-and-subtracting-matrices"
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
						// this object creates an empty whitespace
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
