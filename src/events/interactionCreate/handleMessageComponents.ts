import { Client, MessageComponentInteraction } from 'discord.js';
import getMessageComponents from '../../utils/getMessageComponents';
import { MessageComponent } from '../../types'; // Assumption: You have a type definition for MessageComponent

module.exports = async (client: Client, interaction: MessageComponentInteraction): Promise<void> => {
  if (!interaction.isMessageComponent()) return;

  const MessageComponents: MessageComponent[] = getMessageComponents();

  try {
    const MessageComponentObject: MessageComponent | undefined = MessageComponents.find(
      (component: MessageComponent) => component.name === interaction.customId
    );

    if (!MessageComponentObject) return;

    await MessageComponentObject.callback(client, interaction);
  } catch (error) {
    console.error(`There was an error running this MessageComponent: ${error}`);
  }
};
