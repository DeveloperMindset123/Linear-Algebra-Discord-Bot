import { EmbedBuilder } from "discord.js";

const numberOfParamError = (expectedNumber) => {
  const embed = new EmbedBuilder();
  embed.setTitle("Error : Number of parameters");
  embed.setAuthor("Ayan Das");
  embed.setDescription(
    `:x: This command requires ` + expectedNumber + `parameters.`
  );
  embed.setColor(`FF0000`);
  return embed;
};

const typeOfParamError = (expectedType) => {
  const embed = new EmbedBuilder();
  embed.setTitle("Error : Type of parameters");
  embed.setColor("FF0000");
  embed.setDescription(`:x: Please only use ` + expectedType);
  return embed;
};

const useTooBigNumbersError = () => {
  const embed = new EmbedBuilder();
  embed.setTitle("Error : using numbers that are too large");
  embed.setAuthor("Ayan Das");
  embed.setColor("FF0000");
  embed.setDescription(
    `:x: You are using too large a number, the limit is` +
      Number.MAX_SAFE_INTEGER
  );
  return embed;
};

const divisionByZeroError = () => {
  const embed = new EmbedBuilder();
  embed.setTitle("Error : Division by 0");
  embed.setColor("FF0000");
  //TODO : Continue implementation here
  embed.setDescription(`:x: `);
};
