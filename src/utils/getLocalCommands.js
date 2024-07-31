// import directory path and getAllFiles function (as they need to be used together)
const path = require("path");
const getAllFiles = require("./getAllFiles");
const chalk = require("chalk");

/**
 *
 * @Reference https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands
 * @Usage This Guide is more upto date compared to the youtube video guide for advanced commands
 */

module.exports = (exceptions = []) => {
  let localCommands = [];

  const commandCategories = getAllFiles(
    path.join(__dirname, "..", "commands"),
    true
  );

  for (const commandCategory of commandCategories) {
    const commandFiles = getAllFiles(commandCategory);
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
      const commandObject = require(commandFile);

      localCommands.push(commandObject);
      if (exceptions.includes(commandObject.name)) {
        continue;
      }
    }
  }

  return localCommands;
};
