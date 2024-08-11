const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get-eigens")
    .setDescription(
      "calculates the eigenvalues and eigenvectors given the matrix"
    )
    .addStringOption((option) =>
      option
        .setName("matrix")
        .setDescription(
          "provide the matrix of which you want to calcualte the eigenvalues and eigenvectors of"
        )
        .setRequired(true)
    ),

  execute: async function (interaction) {
    try {
      await interaction.deferReply({
        ephemeral: true,
      });

      const result = math.eigs(
        math.matrix(JSON.parse(await interaction.options.get("matrix").value))
      );
      //const result = math.eigs(matrix);
      // NOTE : result.eigenvectors returns an array of objects
      // we wull just need to parse through the array of object and return the vectors and values
      const eigenvectors = result.eigenvectors;

      // since eigenvectors is in the form of an array of object, we will need to loop through it
      /**
       * // TODO : Remove this multiline comment later
       * @Reference https://stackoverflow.com/questions/16626735/how-to-loop-through-an-array-containing-objects-and-access-their-properties
       * Below is an example reference of what the array of object looks like
       * [{"value":-3.0000000000000018,"vector":{"mathjs":"DenseMatrix","data":[4.902903378454603,-4.902903378454602],"size":[2]}},{"value":6,"vector":{"mathjs":"DenseMatrix","data":[3.1378581622109447,3.9223227027636804],"size":[2]}}]
       */

      // we will need to store them in an array
      let eigenvalues = [];
      let eigenvectorsList = [];
      eigenvectors.forEach(async (element) => {
        console.log(`Eigenvalue : ${element.value}`);
        // add the eigenvalues to the array
        eigenvalues.push(element.value);
        console.log(`Eigenvector : ${element.vector}`);
        eigenvectorsList.push(element.vector);

        // let's attempt to to convert them into an array instead
        /* --> This removes the arrays as well, not something we want
        console.log(
          `Eigenvector approach 2 : ${Object.values(element.vector)}`
        ); */
      });

      // Let's not worry about the below console.log statement at the moment since it's not important
      //console.log(`The resulting value is ${JSON.stringify(eigenvectors)}`);

      await interaction.editReply({
        //IMPORTANT NOTE : it's not called contents, but rather content
        // Reference : https://stackoverflow.com/questions/68239927/embed-discordapierror-cannot-send-an-empty-message
        // TODO : Once all the mathematical functionalities have been implemented and tested as intended, convert the interaction messages to custom embeds instead
        content: `End of successful execution. The eigenvalues are [${eigenvalues}] and the corresponding eigenvectors are [${eigenvectorsList}]`,
      });

      // TODO : we will need to retrieve the eigenvectors based on the eigenvalues in this case
    } catch (error) {
      console.log(`Error : ${error}`);
      await interaction.editReply({
        // IMPORTANT NOTE : it's not called "contents", rather it's called content, will cause an error of empty message being sent through otherwise
        content: `There was an error in executing this command.`,
      });
    }
  },
};
