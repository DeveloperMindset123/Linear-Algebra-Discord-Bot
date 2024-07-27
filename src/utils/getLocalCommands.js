// import directory path and getAllFiles function (as they need to be used together)
const path = require("path");
const getAllFiles = require("./getAllFiles");
const chalk = require("chalk");

module.exports = () => {
  let localCommands = [];

  const commandCategories = getAllFiles(
    // here we are retrieving the path to the parent directory, going up one level and targeting the commands folder.
    // the goal is to list out all the folders within the commands directory
    path.join(__dirname, "..", "commands"),
    true
  );
  // console.log(commandCategories);

  // loop through each of the directory within the commands directory and print out the files that are within each of the nested directories, each of the files corresponds to the naming convention of the comamnds that we will be working with.

  // OBSERVATION : we are once again working with nested loop statements here
  for (const commandCategory of commandCategories) {
    const commandFiles = getAllFiles(commandCategory);

    // TODO : remove these console.log statements later
    console.log(
      chalk.bgMagentaBright(
        "Content for commandCategories: ",
        commandCategory,
        "\n"
      )
    );

    console.log(
      chalk.bgGray(
        "individual content from the for loop, should print out the file names within the command directory, not just the folder names",
        commandFiles,
        "\n"
      )
    );

    for (const commandFile of commandFiles) {
      // we want to retrieve the command within the corresponidng command file
      const commandObject = require(commandFile);
    }
  }

  return localCommands;
};
