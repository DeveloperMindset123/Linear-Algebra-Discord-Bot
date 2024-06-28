import { Client, GatewayIntentBits, REST, Routes } from "discord.js";
import dotenv from "dotenv";

/**
 * @Reference https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/other-guides/env-files.md
 * @Usage Importing this allows you to access the environment variables of the running node process
 * @Reference https://stackoverflow.com/questions/63863129/invalid-token-on-discord-js
 * @Reference
 */

/**
* @Topic understanding the difference between REST API and
* @Referencehttps://www.directual.com/blog/rest-api-vs-api#:~:text=APIs%20can%20refer%20to%20any,use%20a%20variety%20of%20protocols.

* @Detail While APIs and REST APIs are often used interchangeably, there are some important ifferences between the two. APIs can refer to any type of interface that enables communication between different systems. 
* @Detail REST APIs are a specific type of API that adheres to the constraints of the REST architecture
*/

/**
 * @Topic Understanding the difference between client secret and client ID
 * @Reference https://stackoverflow.com/questions/73213003/what-is-the-difference-between-the-token-and-client-secret-in-the-google-forms-a
 *
 * @Detail  Essentially, the client secret identifies the application requesting the data and the token is proof that the user has given that sole application permission to access certain data only.
 * @Detail In Context of the application in development, the CLIENT_ID and the CLIENT_SECRET are different values, and the CLIENT_TOKEN represents the bot token, whereas CLIENT_ID and CLIENT_SECRET represents the configuration information relevant to the bot account
 */

dotenv.config();

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
];

const rest = new REST({ version: "10" }).setToken(
  // ensure that the CLIENT_TOKE --> or bot token is being passed in
  `${process.env.CLIENT_TOKEN}`
);

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(
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

// TODO : Remove later, this statement was just a test to check if environmental variables are being correctly printed out or not
//console.log(process.env);

const client = new Client({
  intents: [
    // NOTE : intent must be activated within the bot section of the application before they can be used.
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
});

//provide intents for the clinet
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//Here you can login the bot. It automatically attempts to login the bot using the environmental vairable set for the bot token
client.login(`${process.env.CLIENT_TOKEN}`);
