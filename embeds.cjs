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
areahelp.setTitle(`Help for the command \`area\``);
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

//add embedding for the volume function
const volumeHelp = new EmbedBuilder();
volumeHelp.setTitle(`Help for the command \`volume\``);
volumeHelp.setColor("00FFF");
volumeHelp.setAuthor("Ayan Das");
volumeHelp.setDescription(
  `**REMEMBER**: [arguments] are _mandatory_ while <arguments> are not.`
);
volumeHelp.addFields(
  "What is it for?",
  "This command is used to calculate the volume of many figures (`$vl`)"
);
volumeHelp.addFields(
  "How do we use it? (let n be the number of measurements)",
  `This command is used as follows: \`$volume [figure] n[measure]\``
);
volumeHelp.addFields(
  "Examples:",
  `
\`$cubic volume 5\` → volume of a square → 125
\`$rectangle volume Cuboid 8 6 5\` → volume of a rectangle → 240
`
);
volumeHelp.addFields("Alias:", "v");

const theoremHelp = new EmbedBuilder();
theoremHelp.setTitle(`Help for the command \`theorem\``);
theoremHelp.setColor("00FFF");
theoremHelp.setAuthor("Ayan Das");
theoremHelp.setDescription(
  `**REMEMBER**: [arguments] are _mandatory_ while <arguments> are not.`
);
theoremHelp.addFields(
  "What is it for?",
  "This command is used to perform some theorems (`$theoremsList`)"
);
theoremHelp.addFields(
  "How do we use it? (let n be the number of measures)",
  `This command is used as follows: \`$theorem [theorem] n[measure]\``
);
theoremHelp.addFields(
  "Examples:",
  `
\`$Pythagorean theorem Hypotenuse 5 5\` → hypotenuse calculation → 7 (approximately)
\`$pythagorean theorem OtherSide 8 6\` → calculus on the other side → 5 (approximately)
`
);
theoremHelp.addFields("Alias:", "t");

// add embedding support for perimeter lists
const pl = new EmbedBuilder();
pl.setTitle("List of figures whose perimeter can be calculated");
pl.setColor("D2691E");
pl.setAuthor("Ayan Das");
pl.setDescription(
  `The figures whose perimeter can be calculated are:
square (\`square\`)
rectangle (\`rectangle\`)
circle (\`circle\`)
triangle (\`triangle\`)
parallelogram (\`parallelogram\` | \`para\`)
trapezoid (\`trapeze\`)
rhombus (\`diamond\`)
`
);
