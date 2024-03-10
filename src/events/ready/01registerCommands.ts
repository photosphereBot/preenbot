import { Client, Guild, ApplicationCommandData, ApplicationCommand } from 'discord.js';
import areCommandsDifferent from '../../utils/areCommandsDifferent';
import getApplicationCommands from '../../utils/getApplicationCommands';
import getLocalCommands from '../../utils/getLocalCommands';
import { LocalCommand } from '../../types/commandsTypes'; // Assumption: You have a type definition for LocalCommand

module.exports = async (client: Client): Promise<void> => {
  try {
    const Guilds: string[] = client.guilds.cache.map((guild: Guild) => guild.id);
    for (const GuildId of Guilds) {
      const localCommands: LocalCommand[] = getLocalCommands();
      const applicationCommands = await getApplicationCommands(client, GuildId);

      for (const localCommand of localCommands) {
        const { name, description, options } = localCommand;

        const existingCommand: ApplicationCommand | undefined = applicationCommands.cache.find(
          (cmd: ApplicationCommand) => cmd.name === name
        );

        if (existingCommand) {
          if (localCommand.deleted) {
            await applicationCommands.delete(existingCommand.id);
            console.log(`🗑 Deleted command "${name}".`);
            continue;
          }

          if (areCommandsDifferent(existingCommand, localCommand)) {
            await applicationCommands.edit(existingCommand.id, {
              name,
              description,
              options,
            } as ApplicationCommandData);

            console.log(`🔁 Edited command "${name}".`);
          }
        } else {
          if (localCommand.deleted) {
            console.log(`⏩ Skipping registering command "${name}" as it's set to delete.`);
            continue;
          }

          await applicationCommands.create({
            name,
            description,
            options,
          } as ApplicationCommandData);

          console.log(`👍 Registered command "${name}."`);
        }
      }
      console.log('Commands up to date for server ID: ' + GuildId);
    }
  } catch (error) {
    console.error(`There was an error: ${error}`);
  }
};
