import { Client, ChatInputCommandInteraction, APIInteractionGuildMember, PermissionsBitField } from 'discord.js';
import { devs, testServer } from '../../../config.json';
const { loadCommands} = require('../../utils/getLocalCommands');
import { LocalCommand } from '../../types/commandsTypes';


export default async (client: Client, interaction: ChatInputCommandInteraction): Promise<void> => {
  if (!interaction.isChatInputCommand()) return;

  const localCommands: LocalCommand[] = loadCommands();

  try {
    const commandObject: LocalCommand | undefined = localCommands.find(
      (cmd: LocalCommand) => cmd.name === interaction.commandName
    );

    if (!commandObject) return;

    if (commandObject.devOnly) {
      if (!devs.includes((interaction.member as APIInteractionGuildMember).user.id)) {
        interaction.reply({
          content: 'Only developers are allowed to run this command.',
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.testOnly) {
      if (!(interaction.guild?.id === testServer)) {
        interaction.reply({
          content: 'This command cannot be ran here.',
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!(interaction.member?.permissions as PermissionsBitField).has(permission)) {
          interaction.reply({
            content: 'Not enough permissions.',
            ephemeral: true,
          });
          return;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild?.members.me;

        if (!bot?.permissions.has(permission)) {
          interaction.reply({
            content: "I don't have enough permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    await commandObject.callback(client, interaction);
  } catch (error) {
    console.error(`There was an error running this command: ${error}`);
  }
};

