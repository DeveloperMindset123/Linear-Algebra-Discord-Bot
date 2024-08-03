/**
 * @Purpose This file will be used to handle all our events within the events folder.
 */

/*
const { eventNames } = require("process");
const getAllFiles = require("../utils/getAllFiles");
const path = require("path");
const chalk = require("chalk");

// TODO : clear out all the content for eventHandler.js

// This should take in client as a parameter, we are defining an annoynomous function in this case --> similar to a lambda function
module.exports = (client) => {
  // eventFolders will hold the list of all the folders inside of the events folder
  /**
   * @Explanation path.join
   * @Usage The path.join() method is used to join a number of path segments using the platform-specific delimter to form a single path. The final path is normalized after the joining takes place.
   * @Parameters directory : takes in the directory that has been specified and combines it with any appended files/folders as needed.
   */
/*
  const eventFolders = getAllFiles(
    // FIX : needed to add one more layer to the file path so it reads everything as intended
    path.join(__dirname, "..", "events"),
    true
  );
  console.log(
    chalk.cyanBright("Name of the directory (in an array format):", __dirname)
  );

  // NOTE : it's only printing out one file for me
  //console.log(eventFolders);

  // OBSERVE : this is a nested for loop statement taking place
  for (const eventFolder of eventFolders) {
    // this will save the files as well
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a > b);
    // TODO : Remove later --> uncomment the comment below to see the resulting output as needed.
    //console.log(eventFiles);

    // use regex to replace the backslashes with forward slashes instead
    // First parameter specifies the regex we are searching for, whcih in this case is backslashes
    // The second parameter specifies what the regex values should be replaced with, whcih is forward slashes --> TLDR : replacing backslashes with forward slashes for organizaation using regex
    // pop is essentially the last element of an array, whcih is the name of the folder.
    // This will ensure that both operating systems remains consistent with the file pathing
    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

    //define the event Listener
    client.on(eventName, async (arg) => {
      // here we want to loop through all of the files
      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile);
        // this function comes from handleCommands.js file
        await eventFunction(client, arg);
      }
    });
    //console.log(eventName);
  }
};

// link https://www.youtube.com/watch?v=JEEcbVjLyr0&t=124s

*/
