import { Client, MessageComponentInteraction } from 'discord.js';
import getMessageComponents from '../../utils/getMessageComponents';
import {MessageComponent} from '../../types/MessageComponentTypes';

/**
 * Handles the message components
 * @param client - The Discord client instance
 * @param interaction - The interaction that triggered the command
 */

export default async (client: Client, interaction: MessageComponentInteraction): Promise<void> => {
  if (!interaction.isMessageComponent()) return;

  const MessageComponents: MessageComponent[] = getMessageComponents() as MessageComponent[];

  try {
    const MessageComponentObject: MessageComponent | undefined = MessageComponents.find(
      (component: MessageComponent) => component.name === interaction.customId
    );

    if (!MessageComponentObject) return;

    MessageComponentObject.callback(client, interaction);
  } catch (error) {
    console.error(`There was an error running this MessageComponent: ${error}`);
  }
};
