import path from 'path';
import fs from 'fs';
import { Client } from 'discord.js';
import getAllFiles from '../utils/getAllFiles';

type EventFunction = (client: Client, ...args: any[]) => Promise<void>;

export const loadEventHandlers = (client: Client): void => {
  const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a > b ? 1 : -1);

    const eventName = eventFolder.replace(/\\/g, '/').split('/').pop() as string;

    client.on(eventName, async (...args: any[]) => {
      for (const eventFile of eventFiles) {
        const importedModule = require(eventFile);
        if (typeof importedModule.default === 'function') {
          const eventFunction: EventFunction = importedModule.default;
          await eventFunction(client, ...args);
        } else {
          console.error(`Le fichier ${eventFile} n'exporte pas une fonction par défaut.`);
        }
      }
    });
  }
};
