const { Client, Events, GateawayIntentBits } = require("discord.js");
const { token } = require("../config.json");

// create a new client instance
const client = new Client({ intents: [GateawayIntentBits.Guilds] });

// when the client is ready, run this code (only once)
// The distinction between `client : Client<boolean> and `readyClient : Client<true>` is important for development in typescript
// It makes some properties non-nullable
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// log into discord using your client's token
client.login(token);

/* Note that the following are old code, not part of the guide, so I am keeping it commented out for now
// Take notes that this is how destructured imports work on discord.js
const {
  Client,
  GatewayIntentBits,
  SlashCommandBuilder,
  // If this isnt imported, it will also throw an error
  Routes,
} = require("discord.js");
const dotenv = require("dotenv");
const math = require("mathjs");
// This was causing errors
const eventHandler = require("../src/handlers/eventHandler");

dotenv.config();

// Think of this as metadata
const commands = [
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

const rest = new discord.REST({ version: "10" }).setToken(
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
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

eventHandler(client);
client.login(`${process.env.CLIENT_TOKEN}`); */
