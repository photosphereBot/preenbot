import { Client, GuildApplicationCommandManager } from 'discord.js';

const fetchApplicationCommands = async (client: Client, guildId?: string): Promise<GuildApplicationCommandManager> => {
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

  await applicationCommands.fetch({});
  return applicationCommands as GuildApplicationCommandManager;
};

export default fetchApplicationCommands;
