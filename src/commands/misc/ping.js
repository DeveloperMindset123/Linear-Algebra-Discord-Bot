// define the default ping command, we are organizing the commands based on the folders, with the commands directory/folder containing the list of all the commands that the bot should contain

module.exports = {
  // we are defining a simple object to specify the name of the command and what it does, in this case, the ping command.
  name: "ping",
  description: "replies with Pong!",
  // if the devOnly option is set to true, this will be a command that only developers can use, if the devOnly option is set to false, this will be a command that any user can use --> pretty straightforward
  //devOnly : Boolean
  // testOnly : Boolean.

  // define the response that should be outputted when the user initiates the ping command
  callback: (client, interaction) => {
    interaction.reply(`Pong! ${client.ws.ping}ms`);
  },
};
