/**
 * @fs module is Node's native file system module. fs is used to read the commands directory and identify our command files
 * @path module is Node's native path utillity modile. path helps construct paths to access files and directories. One of the advantages of the path module is that it automatically detects the operating system that uses the appropriate joiners.
 * @Collection class extends javascript's native Map class, and includes more extensive, useful funcitonality. Collection is used to store and efficiently retrieve commands for execution.
 */

const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("../config.json");

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
    // set a new item in the collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// cotinue --> https://discordjs.guide/creating-your-bot/command-handling.html#loading-command-files
