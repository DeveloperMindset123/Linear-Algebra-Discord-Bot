const { Events } = require("discord.js");
module.exports = {
  // specifies the name of the event
  name: Events.ClientReady,
  // meaning this event will be triggered only once
  once: true,
  // logic for what to be executed
  execute(client) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
