/**
 * @fs module is Node's native file system module. fs is used to read the commands directory and identify our command files
 * @path module is Node's native path utillity modile. path helps construct paths to access files and directories. One of the advantages of the path module is that it automatically detects the operating system that uses the appropriate joiners.
 * @Collection class extends javascript's native Map class, and includes more extensive, useful funcitonality. Collection is used to store and efficiently retrieve commands for execution.
 * @Reference https://discord.js.org/docs/packages/discord.js/14.15.3/Client:Class#applicationCommandPermissionsUpdate --> link for all the discord's event related features and what each of them means
 * @Reference https://github.com/itsdrvgo/discord.js-v14-events-cheatsheet --> link containing how to execute each of the available events on discord.
 * @Reference https://www.youtube.com/watch?time_continue=83&v=ihix6D2cJ7I&embeds_referring_euri=https%3A%2F%2Fwww.google.com%2Fsearch%3Fclient%3Dsafari%26rls%3Den%26q%3DHow%2Bto%2Btriegger%2Bthe%2BEvent.InviteCreate%2Bin%2Bdiscord.js%253F%26ie%3DUTF-8%26oe%3DUTF-8&source_ve_path=MTM5MTE3LDI4NjY2 --> shows how to create a command to genereate invite link
 *
 */

const fs = require("node:fs");
const path = require("node:path");
const {
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  InviteGuild,
  GatewayDispatchEvents,
} = require("discord.js");
const { token } = require("./config.json");

// create a new client instance
// The GatewayIntentBits.Guilds intents option is neccessary for the discord.js client to work as you expect it to, as it ensures that the cahces for guilds, channels and roles are populated and ready for internal use --> guild refers to discord servers

// TODO : Don't delete, wrap this in JSDOC format later --> (link points to the guide for the discord guide) --> https://discordjs.guide/popular-topics/intents.html#privileged-intents
const client = new Client({
  intents: [
    // LINK : https://discord.com/developers/docs/topics/gateway#list-of-intents --> for the list of intents available, enabled all of them here for safety for now
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.GuildMessagePolls,
  ],
});

// when the client is ready, run this code (only once)
// The distinction between `client : Client<boolean> and `readyClient : Client<true>` is important for development in typescript
// It makes some properties non-nullable

// triggers when the server is launched
// TODO : It is up to you if you want to keep or remove the ready and InteractionCreate command, for having the console.log statement ready to be printed out is a good way to know if the login for the bot was successful for the corresponding guild.

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

// get the path for the events directory
const eventsPath = path.join(__dirname, "events");
// parse through the files present within the events directory --> mapping through them essentially --> filter out and only select .js files, thus the added logic to check using the filter method
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  // check if the event should only be executed once or not, if so , exeucte it once based on whatever arguments provided --> the spread operator allows for dynamically specifying the arguments rather than limiting it to a finite number, more adaptabillity
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    // think of (...args) x number of parameters the void function has, allowing for us to decide during execution how many number of arguments we want to provide during a particular event.
    // Additionally, understand the architecture of client, the first argument that a takes in is the event, and the second is the logic for what should be done when this event gets triggered --> or in accordnace to discord's guide, it takes in 2 arguments, the event name and a callback function

    /**
     * @Topic Explanation of what a callback function in javascript is
     * @Detail A javascript callback is a function which is to be executed after another function has finished execution.
     */
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// TODO : Reserve the space below for the execution of the basic events
/**
 * @Question What is interaction in Discord?
 * @Response An interaction is the message that your application recieves when a user uses an applicaiton comand or a message component. For slash commands, it includes the values that the user submmited.
 * @Detail An interaction is the message that your application recieves when a user uses an application command or a message component.
 * @Detail This is different from the messageCreate event listener, which will trigger for eveything else
 * @Reference https://stackoverflow.com/questions/69790469/discord-js-interactioncreate-and-messagecreate
 */

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

client.on(Event.InviteCreate, async (interaction) => {
  console.log(
    `An invite has been created by ${interaction.inviter.tag}. The code is ${invite.code}`
  );
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
// cotinue --> https://discordjs.guide/creating-your-bot/event-handling.html#individual-event-files

// This line should be executed at the end of the file.
client.login(token);
