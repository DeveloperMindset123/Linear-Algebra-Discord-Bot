// define the default ping command, we are organizing the commands based on the folders, with the commands directory/folder containing the list of all the commands that the bot should contain

/* --> old code for creating commands in individual command files
module.exports = {
  // we are defining a simple object to specify the name of the command and what it does, in this case, the ping command.
  name: "ping",
  description: "replies with Pong!",
  //devOnly : Boolean,
  // testOnly : Boolean,
  // option : Object[],
  // Having this deleted option set to true means the bot will delete the command after executing it.
  //deleted : Boolean,

  // define the response that should be outputted when the user initiates the ping command
  // callback in this case is an annoynomous function
  callback: (client, interaction) => {
    interaction.reply(`Pong! ${client.ws.ping}ms`);
  },
};
*/
