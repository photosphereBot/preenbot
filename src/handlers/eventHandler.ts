import path from 'path';
import getAllFiles from '../utils/getAllFiles';
import { Client } from 'discord.js';

type EventFunction = (client: Client, ...args: any[]) => Promise<void>;

export const loadEventHandlers = (client: Client): void => {
  const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true);

  for (const eventFolder of eventFolders) {
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a > b ? 1 : -1);

    const eventName = eventFolder.replace(/\\/g, '/').split('/').pop() as string;

    client.on(eventName, async (...args: any[]) => {
      for (const eventFile of eventFiles) {
        console.log(`Loading event: ${eventFile}`);
        const eventFunction: EventFunction = require(eventFile);
        await eventFunction(client, ...args);
      }
    });
  }
};
