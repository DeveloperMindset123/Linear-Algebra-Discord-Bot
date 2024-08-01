/**
 * @fs module is Node's native file system module. fs is used to read the commands directory and identify our command files
 * @path module is Node's native path utillity modile. path helps construct paths to access files and directories. One of the advantages of the path module is that it automatically detects the operating system that uses the appropriate joiners.
 * @Collection class extends javascript's native Map class, and includes more extensive, useful funcitonality. Collection is used to store and efficiently retrieve commands for execution.
 */

const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

// create a new client instance
// The GatewayIntentBits.Guilds intents option is neccessary for the discord.js client to work as you expect it to, as it ensures that the cahces for guilds, channels and roles are populated and ready for internal use --> guild refers to discord servers

// TODO : Don't delete, wrap this in JSDOC format later --> (link points to the guide for the discord guide) --> https://discordjs.guide/popular-topics/intents.html#privileged-intents
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// when the client is ready, run this code (only once)
// The distinction between `client : Client<boolean> and `readyClient : Client<true>` is important for development in typescript
// It makes some properties non-nullable
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
// log into discord using your client's token
client.login(token);

// The command files that has been created within commands/utillity
client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// TODO : remove later for organization
// HINT : matching commands can be found through the execution of the following --> client.commands. Collection based on the interaction.commandName.
// your client instance is always available via interaction.client. If not matching command is found, log an error to the console and ignore the event

// with the right command identified, all that's left to do is to call the command's execute() method and pass in the interaction variable as it's argument --> in the case of an error, you can wlays console.log the error message

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

// cotinue --> https://discordjs.guide/creating-your-bot/command-handling.html#loading-command-files
