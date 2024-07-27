// again, define the default function
// import the content from config.json file
const chalk = require("chalk");
const { testServer, devs } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = (client) => {
  const localCommands = getLocalCommands();
  // print out to see the files that are being registered, should be the directory within the commands directory
  console.log(
    chalk.blueBright("Commands Directory content (Folders only)", localCommands)
  );
};
