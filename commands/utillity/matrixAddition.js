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
			// TODO : Remove the console.log statements later, or comment them out and remove them prior to production, as these are just here to better understand the logic that needs to be implemented.
			console.log(
				`The options that are available for retrieval are ${interaction.options}`
			);
			await interaction.deferReply({ ephemeral: true });
			// TODO : It's functional, but requires some cleanup, also the resulting reply should be an embedding instead
			// TODO : Provide steps for how matrix addition is done, as well as reference links for people to look into for an in-depth explanation, simplest thing would be to provide an explanation and link reference links to show how the calculations are done in an official website

			// extract the provided matrix and convert them into numbers
			const matrix1 = interaction.options.get("matrix1");
			const matrix2 = interaction.options.get("matrix2");

			// convert the retrieved array of numbers into matrix and add them together
			// NOTE : I expect this to crash to be fair
			const matrix1Converted = math.matrix(JSON.parse(matrix1.value));
			const matrix2Converted = math.matrix(JSON.parse(matrix2.value));
			// add the newly converted matrix
			const addedMatrix = math.add(matrix1Converted, matrix2Converted);

			// NOTE : it appears that the values are being treated as an objecthere
			console.log(
				`The values are ${matrix1.value} and ${matrix2.value} and the resulting addition is ${addedMatrix}`
			);
			console.log(
				`The types for the math converted matrix is ${typeof matrix1.value} and ${typeof matrix2.value}`
			);

			/*
      console.log(
        `The values of matrix 1 is: ${JSON.stringify(
          Matrix1Values
        )} and the corresponding datatype is ${typeof Matrix1Values}`
      );
      console.log(
        `The values of matrix 2 is ${JSON.stringify(
          Matrix2Values
        )} and the corresponding datatype is ${typeof Matrix2Values}`
      );
      console.log(
        `Testing to see if matrix 1's value gets rendered or not ${Matrix1Values.value}`
      ); */
			// NOTE : the properties of the object are the following --> "name", "type", "value"
			await interaction.editReply({
				content: `End of successful execution! Resulting matrix value being ${addedMatrix}`,
			});
			// end the code ex
			return;
		} catch (error) {
			// TODO : Continue implementing the error embedding here and for the remaining commands
			const customErrorEmbed = new EmbedBuilder()
				.setColor(0xff000)
				.setTitle("Error (Click here for the original reference material)")
				.setURL(
					"https://www.varsitytutors.com/hotmath/hotmath_help/topics/adding-and-subtracting-matrices"
				)
				.setAuthor({
					name: "Ayan Das",
					iconURL: "",
				});
			console.log(`Error executing the command ${error}`);
			// editReply should take in an object
			await interaction.editReply({
				content: "There was an error in executing the command",
			});
			return;
		}
	},
};
