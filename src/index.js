/**
 * @Link https://rollupjs.org/repl/?version=2.60.2&shareable=JTdCJTIyZXhhbXBsZSUyMiUzQW51bGwlMkMlMjJtb2R1bGVzJTIyJTNBJTVCJTdCJTIybmFtZSUyMiUzQSUyMm1haW4uanMlMjIlMkMlMjJjb2RlJTIyJTNBJTIyaW1wb3J0JTIwJTdCJTVDbiUyMCUyMENsaWVudCUyQyU1Q24lMjAlMjBHYXRld2F5SW50ZW50Qml0cyUyQyU1Q24lMjAlMjBNZXNzYWdlJTJDJTVDbiUyMCUyMFJFU1QlMkMlNUNuJTIwJTIwUm91dGVzJTJDJTVDbiUyMCUyMFNsYXNoQ29tbWFuZEJ1aWxkZXIlMkMlNUNuJTdEJTIwZnJvbSUyMCU1QyUyMmRpc2NvcmQuanMlNUMlMjIlM0IlNUNuaW1wb3J0JTIwY2hhbGslMjBmcm9tJTIwJTVDJTIyY2hhbGslNUMlMjIlM0IlNUNuaW1wb3J0JTIwZG90ZW52JTIwZnJvbSUyMCU1QyUyMmRvdGVudiU1QyUyMiUzQiUyMiUyQyUyMmlzRW50cnklMjIlM0F0cnVlJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMm1vZHVsZV8xLmpzJTIyJTJDJTIyY29kZSUyMiUzQSUyMmltcG9ydCUyMGZzJTIwZnJvbSUyMCU1QyUyMmZzJTVDJTIyJTVDbmNvbnNvbGUubG9nKGZzKSUyMiUyQyUyMmlzRW50cnklMjIlM0F0cnVlJTdEJTJDJTdCJTIybmFtZSUyMiUzQSUyMm1vZHVsZV8yLmpzJTIyJTJDJTIyY29kZSUyMiUzQSUyMmltcG9ydCUyMColMjBhcyUyMGZzJTIwZnJvbSUyMCU1QyUyMmZzJTVDJTIyJTVDbmNvbnNvbGUubG9nKGZzKSUyMiUyQyUyMmlzRW50cnklMjIlM0F0cnVlJTdEJTVEJTJDJTIyb3B0aW9ucyUyMiUzQSU3QiUyMm91dHB1dCUyMiUzQSU3QiUyMmZvcm1hdCUyMiUzQSUyMmNqcyUyMiU3RCU3RCU3RA==
 *
 * @Purpose The above link is used to convert module based code into commonJs, since a lot of the support is in commonjs format
 */

"use strict";

const discord = require("discord.js");

// Take notes that this is how destructured imports work on discord.js
const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  // If this isnt imported, it will also throw an error
  Routes,
} = require("discord.js");
const chalk = "chalk";
const dotenv = require("dotenv");
const math = require("mathjs");
// This was causing errors
const eventHandler = require("../src/handlers/eventHandler");

dotenv.config();

// Think of this as metadata
const commands = [
  // you can define a series of commands to pass in

  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "hola",
    description: "Replies with Hello!",
  },
  {
    name: "add",
    description: "adds a number of values together",
  },
];

// define a custom command as part of testing
/*
* comment this out for now since it's throwing error during compile time
data: new SlashCommandBuilder()
  .setName("CustomPing")
  .setDescription("Replies with a custom message"),
  async function execute(interaction) {
    await interaction.reply("A custom Pong message!");
  }; */
const rest = new discord.REST({ version: "10" }).setToken(
  // ensure that the CLIENT_TOKE --> or bot token is being passed in
  `${process.env.CLIENT_TOKEN}`
);

try {
  console.log("Started refreshing application (/) commands.");

  rest.put(
    Routes.applicationCommands(
      // The client ID being passed in should be the OAuth2 section
      `${process.env.CLIENT_ID}`
    ),
    {
      body: commands,
    }
  );

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}

const client = new Client({
  intents: [
    // NOTE : intent must be activated within the bot section of the application before they can be used.
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

// we will instead pass in the client we create
eventHandler(client);
/**
 * @Reference https://discord.js.org/docs/packages/discord.js/main/Client:Class#ready
 * @Usage Emitted when the client becomes ready to start working.
 */

// TODO : These event listenders needs to be transferred over to eventHandler.js function.

/** 
client.on("ready", () => {
  // helps color code the message that will be displayed on the console, these should not be public information that's otherwise accessible
  console.log(chalk.green(`I'm ready !`));
  /*client.user.setActivity(
    `prefixe: ${constants.lPrefix} | ${constants.lPrefix} help`
  ); 

  // displays the tag that's relevant to the bot
  console.log(`Logged in as ${client.user.tag}!`);
});

// define the event listener for what the bot should do if it were to recieve messages
client.on("messageCreate", discord.Message);
client.on("interactionCreate", async (interaction) => {
  // consider this to be the terminating case
  if (!interaction.isChatInputCommand()) return;
  // use this as the template
  if (interaction.commandName === "ping") {
    // This is the message that will be displayed
    await interaction.reply("Pong!");
  } else if (interaction.commandName === "hola") {
    await interaction.reply("Hello!");
  } else if (interaction.commandName === "add") {
    await interaction.reply(math.evaluate());
  }
}); */

//Here you can login the bot. It automatically attempts to login the bot using the environmental vairable set for the bot token
client.login(`${process.env.CLIENT_TOKEN}`);
