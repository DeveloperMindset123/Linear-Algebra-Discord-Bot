module.exports = async (client, guildId) => {
  // create an unitialized function
  let applicationCommands;

  if (guildId) {
    const guild = await client.guilds.fetch(guildId);
    applicationCommands = guild.commands;
  } else {
    // these commands needs to be fetched all at once
    applicationCommands = await client.application.commands;
    //given that the default function is asynchronous, we will need to call on it in an await method
    await applicationCommands.fetch();
    return applicationCommands;
  }
};
