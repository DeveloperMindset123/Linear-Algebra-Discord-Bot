const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const math = require("mathjs");

const gramSchmidt = async (vectorMatrix) => {
	let orthogonalVectors = [];
	orthogonalVectors.push(math.matrix(vectorMatrix._data[0]));

	let orthonormalVectors = [];
	const dimension = vectorMatrix._size[0];

	const unitVector1 = math.matrix(
		math.multiply(
			1 / math.sqrt(math.dot(vectorMatrix._data[0], vectorMatrix._data[0])),
			vectorMatrix._data[0]
		)
	);

	orthonormalVectors.push(unitVector1);

	switch (dimension) {
		case 2:
			const orthogonalVector1 = math.subtract(
				vectorMatrix._data[1],
				math.multiply(
					math.multiply(unitVector1._data, vectorMatrix._data[1]),
					unitVector1._data
				)
			);
			orthogonalVectors.push(math.matrix(orthogonalVector1));

			const unitVector2 = math.multiply(
				1 / math.sqrt(math.dot(orthogonalVector1, orthogonalVector1)),
				orthogonalVector1
			);
			orthonormalVectors.push(math.matrix(unitVector2));
			break;

		case 3:
			console.warn("Dimension 3 is executing...");
			const orthogonalVector1of2 = math.subtract(
				vectorMatrix._data[1],
				math.multiply(
					math.multiply(unitVector1, vectorMatrix._data[1]),
					unitVector1._data
				)
			);

			orthogonalVectors.push(math.matrix(orthogonalVector1of2));
			const unitVector2of3 = math.multiply(
				1 / math.sqrt(math.dot(orthogonalVector1of2, orthogonalVector1of2)),
				orthogonalVector1of2
			);

			orthonormalVectors.push(unitVector2of3);
			const orthogonalVector3Part1 = math.add(
				math.multiply(
					math.multiply(unitVector1, vectorMatrix._data[2]),
					unitVector1
				),
				math.multiply(
					math.multiply(unitVector2of3, vectorMatrix._data[2]),
					unitVector2of3
				)
			);

			const orthogonalVector3 = math.subtract(
				vectorMatrix._data[2],
				orthogonalVector3Part1
			);
			orthonormalVectors.push(math.matrix(orthogonalVector3));
			const unitVector3 = math.multiply(
				1 / math.sqrt(math.dot(orthogonalVector3, orthogonalVector3)),
				orthogonalVector3
			);
			orthonormalVectors.push(unitVector3);
			console.log(`The current unit vectors are ${orthonormalVectors}`);
			break;
		case 4:
			console.warn("Switch statement for dimension 4 is executing...");
			const orthogonalVector2of4 = math.subtract(
				vectorMatrix._data[1],
				math.multiply(
					math.multiply(unitVector1, vectorMatrix._data[1]),
					unitVector1
				)
			);

			orthogonalVectors.push(math.matrix(orthogonalVector2of4));
			const unitVector2of4 = math.multiply(
				1 / math.sqrt(math.dot(orthogonalVector2of4, orthogonalVector2of4)),
				orthogonalVector2of4
			);

			orthonormalVectors.push(math.matrix(unitVector2of4));
			const orthogonalVector3of4Part1 = math.add(
				math.multiply(
					math.multiply(unitVector1, vectorMatrix._data[2]),
					unitVector1
				),
				math.multiply(
					math.multiply(unitVector2of4, vectorMatrix._data[2]),
					unitVector2of4
				)
			);

			const orthogonalVector3of4 = math.subtract(
				vectorMatrix._data[2],
				orthogonalVector3of4Part1
			);
			orthogonalVectors.push(math.matrix(orthogonalVector3of4));
			const unitVector3of4 = math.multiply(
				1 / math.sqrt(math.dot(orthogonalVector3of4, orthogonalVector3of4)),
				orthogonalVector3of4
			);
			orthonormalVectors.push(math.matrix(unitVector3of4));
			const orthogonalVector4 = math.subtract(
				vectorMatrix._data[3],
				math.add(
					math.add(
						math.multiply(
							math.multiply(unitVector1, vectorMatrix._data[3]),
							unitVector1
						),
						math.multiply(
							math.multiply(unitVector2of4, vectorMatrix._data[3]),
							unitVector2of4
						)
					),
					math.multiply(
						math.multiply(unitVector3of4, vectorMatrix._data[3]),
						unitVector3of4
					)
				)
			);
			orthogonalVectors.push(math.matrix(orthogonalVector4));
			const unitVector4 = math.multiply(
				math.sqrt(math.dot(orthogonalVector4, orthogonalVector4)),
				orthogonalVector4
			);
			orthonormalVectors.push(math.matrix(unitVector4));
			break;

		case 5:
			console.warn("Switch statement for dimension 5 is executing...");
			const orthogonalVector2of5 = math.subtract(
				vectorMatrix._data[1],
				math.multiply(
					math.multiply(unitVector1, vectorMatrix._data[1]),
					unitVector1
				)
			);

			orthogonalVectors.push(math.matrix(orthogonalVector2of5));
			const unitVector2of5 = math.multiply(
				math.sqrt(math.dot(orthogonalVector2of5, orthogonalVector2of5)),
				orthogonalVector2of5
			);
			orthonormalVectors.push(math.matrix(unitVector2of5));
			const orhtogonalVector3of5 = math.subtract(
				vectorMatrix._data[2],
				math.add(
					math.multiply(
						math.multiply(unitVector1, vectorMatrix._data[2]),
						unitVector1
					),
					math.multiply(
						math.multiply(unitVector2of5, vectorMatrix._data[2]),
						unitVector2of5
					)
				)
			);
			orthogonalVectors.push(math.matrix(orhtogonalVector3of5));

			const unitVector3of5 = math.multiply(
				math.sqrt(math.dot(orhtogonalVector3of5, orhtogonalVector3of5)),
				orhtogonalVector3of5
			);
			orthonormalVectors.push(math.matrix(unitVector3of5));
			const orthogonalVector4of5 = math.subtract(
				vectorMatrix._data[3],
				math.add(
					math.add(
						math.multiply(
							math.multiply(unitVector1, vectorMatrix._data[3]),
							unitVector1
						),
						math.multiply(
							math.multiply(unitVector2of5, vectorMatrix._data[3]),
							unitVector2of5
						)
					),
					math.multiply(
						math.multiply(unitVector3of5, vectorMatrix._data[3]),
						unitVector3of5
					)
				)
			);

			orthogonalVectors.push(math.matrix(orthogonalVector4of5));

			const unitVector4of5 = math.multiply(
				1 / math.sqrt(math.dot(orthogonalVector4of5, orthogonalVector4of5)),
				orthogonalVector4of5
			);
			orthonormalVectors.push(math.matrix(unitVector4of5));
			const orthogonalVector5 = math.subtract(
				vectorMatrix._data[4],
				math.add(
					math.add(
						math.multiply(
							math.multiply(unitVector1, vectorMatrix._data[1]),
							unitVector1
						),
						math.multiply(
							math.multiply(unitVector2of5, vectorMatrix._data[4]),
							unitVector2of5
						)
					),
					math.add(
						math.multiply(
							math.multiply(unitVector3of5, vectorMatrix._data[4]),
							unitVector3of5
						),
						math.multiply(
							math.multiply(unitVector4of5, vectorMatrix._data[4]),
							unitVector4of5
						)
					)
				)
			);

			orthogonalVectors.push(math.matrix(orthogonalVector5));
			const unitVector5 = math.multiply(
				math.sqrt(math.dot(orthogonalVector5, orthogonalVector5)),
				orthogonalVector5
			);

			orthonormalVectors.push(math.matrix(unitVector5));

			break;
		default:
			break;
	}
	return [orthogonalVectors, orthonormalVectors];
};
exports.gramSchmidt = gramSchmidt;

module.exports = {
	data: new SlashCommandBuilder()
		.setName("gram-schmidt")
		.setDescription(
			"command used to apply the gram schmidt process on all the vectors provided"
		)
		.addStringOption((option) =>
			option
				.setName("vector-matrix")
				.setDescription("please provide ")
				.setRequired(true)
		),
	execute: async function (interaction) {
		try {
			await interaction.deferReply({
				ephemeral: false,
			});

			const input = math.matrix(
				JSON.parse(await interaction.options.get("vector-matrix").value)
			);

			const result = math.matrix(await gramSchmidt(input));

			const orthogonalVectorArray = math.matrix(result._data[0]);
			const orthonormalVecorsArray = math.matrix(result._data[1]);

			await interaction.editReply({
				content: `Successful execution of command!\n Orthogonal Vectors : ${orthogonalVectorArray} \n\n Orthonormal Vectors : ${orthonormalVecorsArray}`,
			});
		} catch (error) {
			const customErrorEmbed = new EmbedBuilder()
				.setColor("#FF0000")
				.setTitle("Error (Click here for the original reference material)")
				.setURL("https://www.youtube.com/watch?v=MIRHxroPwBM")
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
					// ? to not excessively populate the space and confuse the user, the error message will be provided in the footer where its not explicitly visible, this is more so inteded for myself to look back on
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
