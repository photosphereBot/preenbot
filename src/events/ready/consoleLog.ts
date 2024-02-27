import { Client } from 'discord.js';

const onClientReady = (client: Client): void => {
  console.log(`${client.user?.tag} is online.`);
};

export default onClientReady;
