/**
 *  @Purpose This is the file (aka the third step), where we will need to register the commands that we add
 * @Reference https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands
 * @Detail The above link contains more up-to-date description of how to go about defining commands, as well as registering those sepcific commands.
 *  */
const chalk = require("chalk");
const { testServer, devs } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");

module.exports = async (client) => {
  // The below function call has been transferred to a try and catch block, since it's not always guranteed that the command will be registered
  //const localCommands = getLocalCommands();
  // print out to see the files that are being registered, should be the directory within the commands directory
  // TODO : Remove the console.log statement later, it may not even be nneccessary to begin with
  console.log(
    chalk.blueBright("Commands Directory content (Folders only)", localCommands)
  );
  // HINT : typing trycatch together and pressing enter will automatically create and format a skeletal try and catch block ready for use
  try {
    const localCommands = getLocalCommands();
    // NOTE : the testServer in this case is the guildID
    const applicationCommands = getApplicationCommands(client, testServer);

    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === name
      );

      if (existingCommand) {
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`Deleted Command "${name}"`);
        }

        // check if the commands we are working with are different or not
        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });

          console.log(`🀏 Edited command "${name}".`);
        }
      }
    }
  } catch (error) {
    // provide the error that occured in the form of a console.log statement
    console.log(`There was an error: ${error}`);
  }
};
