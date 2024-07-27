/**
 * @Usage This will also export an annoynomous function, think of this as the default function being exported.
 */

const fs = require("fs");
const path = require("path");

// The name of this function would be getAllFiles, since that's the name of the file, this function is nothing but a getter used to retrieve the file path of all the files contianed within the events directory
module.exports = (
  directory,
  // define a default value for the booleanParameter, false by default
  foldersOnly = false
) => {
  let fileNames = [];
  const files = fs.readdirSync(directory, {
    // this option will help us distinguish between files and folders
    withFileTypes: true,
  });

  //loop through the files to check if it's a file or a folder
  for (const file of files) {
    // join the file with the directory path
    const filePath = path.join(directory, file.name);

    // Note that this conditional statement should only execute if the foldersOnly option gets toggled to true
    if (foldersOnly) {
      if (file.isDirectory()) {
        fileNames.push(filePath);
      }
    } else {
      // Otherwise, we will be checking to see if the file is a file or not
      if (file.isFile()) {
        fileNames.push(filePath);
      }
    }
  }

  return fileNames;
};
