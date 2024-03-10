import path from 'path';
import getAllFiles from './getAllFiles';
import { LocalCommand } from 'src/types/commandsTypes';

interface Command {
  name: string;
  // Ajoutez d'autres propriétés de la commande ici selon vos besoins
}

const loadCommands = (exceptions: string[] = ["variable.js"]): LocalCommand[] => {
  let localCommands: LocalCommand[] = [];

  const commandCategories = getAllFiles(
    path.join(__dirname, '..', 'commands'),
    true
  );

  for (const commandCategory of commandCategories) {
    const commandFiles = getAllFiles(commandCategory);

    for (const commandFile of commandFiles) {
      const commandObject: LocalCommand = require(commandFile);

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
