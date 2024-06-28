const { EmbedBuilder } = require("discord.js");

const help = new EmbedBuilder();
help.setTitle(`Aide`);
// Hexamedimal for Aqua Color
help.setColor("00FFF");
help.setDescription(`List of commands:
\`calc\`
\`perimeter\`
\'area\`
\`volume\`
\theorem\`
`);

// add embedding for the basic arithmetic functions
const calcHelp = new EmbedBuilder();
calcHelp.setColor("00FFF");

calcHelp.setTitle(`Command Help \`calc\``);
calcHelp.setAuthor("Ayan Das");
// Remember will be rendered in bolded, and mandatory will be rendered in italic
calcHelp.setDescription(
  `**REMEMBER**: [arguments] are _mandatory_ while <arguments> are not.`
);

calcHelp.addFields(
  "What is it for?",
  "This Command is used to perform the most basic calculations such as additions, subtractions, multiplications, divisions and modulos."
);

calcHelp.addFields(
  "How do we use it?",
  `This command is used like this: \`$calc [number] [operator] [number]\``
);

calcHelp.addFields(
  "Examples:",
  `
\`$calc 7 + 7\` → addition → 14
\`$calc 7 - 5\` → subtraction → 2
\`$calc 7 * 5\` → multiplication → 35
\`$calc 10 / 5\` → division → 2
`
);

calcHelp.addFields("Alias:", "compute, c");

// add embedding for the perimter calculation found within perimeterFunction.cjs
const perimeterHelp = new EmbedBuilder();
perimeterHelp.setTitle(`Help for the command \`perimeter\``);
perimeterHelp.setColor("00FFF");
perimeterHelp.setAuthor("Ayan Das");
perimeterHelp.setDescription(
  `**REMEMBER**: [arguments] are _mandatory_ while <arguments> are not.`
);
perimeterHelp.addFields(
  "What is it for?",
  "This command is used to calculate the perimeter of many figures (`$pl`)"
);
perimeterHelp.addFields(
  "How do we use it? (let n be the number of measurements)",
  `
    This command is used as follows : \`$perimeter [figure] n[measure]\``
);
perimeterHelp.addFields(
  "Examples:",
  `
\`$perimeter square 5\` → perimeter of a square → 20
\`$perimeter rectangle 8 6\` → perimeter of a rectangle → 28
`
);
perimeterHelp.addFields("Alias:", "p");

//add embedding for the area function found within areaFunctions.js
const areahelp = new EmbedBuilder();
areahelp.setColor("00FFF");
areahelp.setAuthor("Ayan Das");
areahelp.setDescription(
  `**REMEMBER**: [arguments] are _mandatory_ while <arguments> are not.`
);
areahelp.addFields(
  "What is it for?",
  "This command is used to calculate the area of many figures (`$al`)"
);

areahelp.addFields(
  "How do we use it? (let n be the number of measurements",
  `This command is used as follows : \`$area [figure] n[measure]\``
);

areahelp.addFields(
  "Examples:",
  `
\`$area square 5\` → aire d'un carré → 25
\`$area of ​​rectangle 8 6\` → area of ​​a rectangle → 48
`
);
areahelp.addFields("Alias:", "a");
