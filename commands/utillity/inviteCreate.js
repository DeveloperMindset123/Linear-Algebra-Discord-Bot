/**
 * @Reference https://www.google.com/search?client=safari&rls=en&q=creating+an+inviteCreate+command+in+discord.js+using+SlashCommandBuilder&ie=UTF-8&oe=UTF-8#fpstate=ive&vld=cid:acc46cdd,vid:ihix6D2cJ7I,st:0
 *
 */

const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");
//const { execute } = require("./ping");

module.exports = {
  // initialize the command, specify the options the command should hold, as well as provide a description for what it should do
  data: new SlashCommandBuilder()
    .setName("create-invite")
    .setDescription("create an invite link for your guild")
    // specify optional options that can be included as part of executing the command here --> all the options specified here are optional --> we have 4 invites in total here
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel to create the invite in")
        .setRequired(false)
    )
    .addIntegerOption((option) =>
      option
        .setName("max-age")
        .setDescription("The max age for your invite (in seconds")
        .setRequired(false)
    )
    .addIntegerOption((option) =>
      option
        .setName("max-uses")
        .setDescription("The max number of people who can use this invite")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for creating this invite")
        .setRequired(false)
    ),
  // Function implemented to specify the execution logic
  async execute(interaction) {
    // before creating the invite link, we will first need to check and verify if the server allows for it's memebers to invite other people (some servers only allows that for admins and moderators)
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.CreateInstantInvite
      )
    )
      return await interaction.reply({
        content: `This server does not allow memebers to create invites!`,
        ephemeral: true,
      });

    const { options } = interaction;
    const channel = options.getChannel("channel") || interaction.channel;
    // retrieve the max-age option for how long the invite link should be valid, 0 here means no max, meaning there will be no-cap available on the uses available for this invite
    // extract the maxAge, if it exists --> 0 means no max/cap on the uses
    let maxAge = options.getInteger("max-age") || 0;
    // extract the maxuses, if it exists
    let maxUses = options.getInteger("max-uses") || 0;
    let reason = options.getString("reason") || "No Reason Provided";

    // now we can go about execute the createInvite command that we have created, specifying what to do as part of the logic
    const invite = await channel.createInvite({
      maxAge: maxAge,
      maxuses: maxUses,
      reason: reason,
    });

    // this conditional is needed for the embed, we want to specify that the link doesn't expire --> these two conditional statements are optional
    if (maxAge === 0) maxAge === "infinite";
    if (maxUses === 0) maxUses === "infinite";

    // create the embed --> this is what the user of the command will see as response on the client side
    const embed = new EmbedBuilder()
      .setColor("Blurple")
      .setTitle("I have created your invite link!")
      // extract the genereated invite code
      .addFields({
        name: `🔗 Invite Link`,
        value: `https://discord.gg/${invite.code} OR \`${invite.code}\``,
      })
      .addFields({ name: `📜 Invite Channel`, value: `${channel}*` })
      .addFields({ name: `🤷‍♂️ Max Uses`, value: `\`${maxUses}\`` })
      .addFields({ name: `👫 Max Age`, value: `\`${maxAge}\`` })
      // italicize the reason
      .setDescription(`You creted this invite for: *${reason}*!`)
      .setTimestamp()
      .setFooter({ text: `Invite Generator` });

    // ephemeral : true, allows us to specify that only the developer can see the message
    // NOTE : the culprit was me using embed instead of embeds as a property, leading to an error due to unrecognized property
    // TODO : set ephemeral to false 
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
