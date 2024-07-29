import { EmbedBuilder } from "discord.js";
const result = (calculation, explanation, result, unit = "") => {
  const embed = new EmbedBuilder();
  embed.setTitle("Result:");
  embed.setColor("10DA5A");
  embed.setAuthor("Ayan Das");
  // the number must fall within the bound of the value that is allowed
  if (result < Number.MAX_SAFE_INTEGER) {
    embed.setDescription(
      calculation + " = " + explanation + " = " + result + unit
    );
  } else if (result >= Number.MAX_SAFE_INTEGER) {
    const embed = new EmbedBuilder();
    embed.setTitle("Error : Result too large");
    embed.setColor("FF0000");
    embed.setDescription(
      `:x: The result of your calculation is too large to be displayed correctly.`
    );
    return embed;
  }
};

export { result };
