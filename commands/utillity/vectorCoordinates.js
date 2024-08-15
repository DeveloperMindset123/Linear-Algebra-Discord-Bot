const { SlashCommandBuilder } = require("discord.js");
const math = require("mathjs");

module.exports = {
  data: new SlashCommandBuilder().setName("vector-coordinates"),
};
