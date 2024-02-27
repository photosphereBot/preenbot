import path from 'path';
import getAllFiles from './getAllFiles';

interface Command {
  name: string;
  // Ajoutez d'autres propriétés de la commande ici selon vos besoins
}

const loadCommands = (exceptions: string[] = ["variable.js"]): Command[] => {
  let localCommands: Command[] = [];

  const commandCategories = getAllFiles(
    path.join(__dirname, '..', 'commands'),
    true
  );

  for (const commandCategory of commandCategories) {
    const commandFiles = getAllFiles(commandCategory);

    for (const commandFile of commandFiles) {
      const commandObject: Command = require(commandFile);

      if (exceptions.includes(commandObject.name)) {
        console.log('hello');
        continue;
      }

      localCommands.push(commandObject);
    }
  }

  return localCommands;
};

export default loadCommands;
