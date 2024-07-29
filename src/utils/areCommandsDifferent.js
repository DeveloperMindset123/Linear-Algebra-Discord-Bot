const { options } = require("../commands/moderation/ban");

module.exports = (existingCommand, localCommand) => {
  // treat existingChoices and localChoices as arrays in this case (or objects and we are traversing down the levels each time)
  const areChoicesDifferent = (existingChoices, localChoices) => {
    for (const localChoice of localChoices) {
      const existingChoice = existingChoices?.find(
        (choice) => choice.name === localChoice.name
      );

      if (!existingChoice) {
        return true;
      }

      if (localChoice.value !== existingChoice.value) {
        return true;
      }
    }
    return false;
  };

  // an arrow function that returns a boolean value
  const areOptionsDifferent = (existingOptions, localOptions) => {
    for (const localOption of localOptions) {
      // looks for the value option within the array of existing option and returns true if it exists and otherwise false, treat the conditionals within as being edge cases here
      const existingOption = existingOptions?.find(
        (option) => option.name === localOption.name
      );

      // if the existing option doesn't return true, meaning the option cannot be found, as in the name of the option and localOption doesn't match one another, this will return true, and areoptionsDifferent will be set to true
      if (!existingOption) {
        return true;
      }

      if (
        // a very specific set of conditional statement needs to be met
        localOption.description !== existingOption.description ||
        localOption.type !== existingOption.type ||
        (localOption.required || false) !== existingOption.required ||
        (localOption.choices?.length || 0) !==
          (existingOption.choices?.length || 0) ||
        areChoicesDifferent(
          localOption.choices || [],
          existingOption.choices || []
        )
      ) {
        return true;
      }
    }
    return false;
  };

  if (
    existingCommand.description !== localCommand.description ||
    existingCommand.options?.length !== (localCommand.options?.length || 0) ||
    areOptionsDifferent(existingCommand.options, localCommand.options || [])
  ) {
    return true;
  }

  return false;
};
