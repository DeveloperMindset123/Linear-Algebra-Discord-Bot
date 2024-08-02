const { Events } = require("discord.js");
//const { execute } = require('./ready');

module.exports = {
  // an event that is triggered when an interaction gets created
  name: Events.InteractionCreate,
  //specify the logic for what will happen as part of the interaction
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was en error while executing this command!",
          ephemeral: true,
        });
      }
    }
  },
};
