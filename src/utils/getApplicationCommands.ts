import { Client, GuildCommandManager } from 'discord.js';

const fetchApplicationCommands = async (client: Client, guildId?: string): Promise<GuildCommandManager> => {
  let applicationCommands;

  if (guildId) {
    const guild = await client.guilds.fetch(guildId);
    applicationCommands = guild.commands;
  } else {
    applicationCommands = client.application?.commands;
  }

  if (!applicationCommands) {
    throw new Error('Application commands not found');
  }

  await applicationCommands.fetch();
  return applicationCommands;
};

export default fetchApplicationCommands;
