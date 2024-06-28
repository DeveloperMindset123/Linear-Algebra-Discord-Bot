const { Client, GatewayIntentBits } =  require("discord.js");

/**
 * @Reference https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/other-guides/env-files.md
 * @Usage Importing this allows you to access the environment variables of the running node process
 */

require("dotenv").config();
console.log(process.env);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        //GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent

    ]
});
const prefix = process.env.PREFIX;

//provide intents for the clinet
client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

//Here you can login the bot. It automatically attempts to login the bot using the environmental vairable set for the bot token
client.login('MTI1NjI3MTQ5Njk1NTgyMjExMg.GYIwSI.awNp8STi794liV6e2GjRK5VFEVL-CdwOFD6acs');