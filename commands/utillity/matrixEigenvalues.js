const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get-eigenvalues")
    .setDescription("calculates the eigenvalues of a matrix")
    .addStringOption((option) =>
      option
        .setName("matrix")
        .setDescription(
          "provide the matrix of which you want to calculate the eigenvalues of"
        )
        .setRequired(true)
    ),
  execute: async function (interaction) {
    try {
      await interaction.deferReply({
        ephemeral: true,
      });

      const matrix = math.matrix(
        JSON.parse(interaction.options.get("matrix").value)
      );
      const result = math.eigs(matrix);
      const eigenvalues = Object.values(result.values);
      // we can use this as a while loop to loop thoguh to determine the objects
      console.log(`The resulting object is ${JSON.stringify(result)}`);
      await interaction.editReply({
        content: `The eigenvalues are ${result.values}`,
      });

      /*
      const numberOfEigenvalues = Object.values(result.values)[1][0];
      // TODO : this is a test, it should be printing out the vectors corresponding to the second eigenvalue in this case
      const eigenvectors = result.eigenvectors;
      

      // define a function that will be used to print out the eigenvectors and save them in an array, which will then be called when this command is executed

      const getEigenvectors = async () => {
        let iterator = 0;
        // we will be storing the eigenvectors here
        let eigenvectors = [];
        while (iterator < numberOfEigenvalues) {
          const correspondingEigenvectors = await Object.values(
            Object.values(
              math.eigs(
                math.matrix(JSON.parse(interaction.options.get("matrix").value))
              ).eigenvectors[iterator]
            )[iterator]
          )[0];
          console.log(`Current Eigenvectors ${correspondingEigenvectors}`);
          eigenvectors.push(correspondingEigenvectors);
          iterator++;
        }

        return eigenvectors;
      };

      // call on the function to get the eigenvectors
      const eigenvectorsList = await getEigenvectors();
      console.log(eigenvectorsList);
      //console.log(`The resulting onject is ${JSON.stringify(result.eigenvectors)}`);
      console.log(
        `The number of eigenvalues are ${JSON.stringify(
          numberOfEigenvalues
        )} and they are ${eigenvalues}, and the corresponding eigenvectors are ${JSON.stringify(
          Object.values(
            Object.values(
              math.eigs(
                math.matrix(JSON.parse(interaction.options.get("matrix").value))
              ).eigenvectors[1]
            )[1]
            // we will need to ensure we are always acessing the values in the 0th index since this is where the eigenvalues will be located
          )[0]
        )}`
      );
      await interaction.editReply({
        content: `End of successful execution!`,
      }); */
    } catch (error) {
      console.log(`The execution failed due to ${error}`);
      await interaction.editReply({
        content: `Execution failed due to ${error}`,
      });
    }
  },
};
