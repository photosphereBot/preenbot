import { Client, ModalSubmitInteraction } from 'discord.js';
import getModals from '../../utils/getModals';
import { Modal } from '../../types/ModalTypes'; // Assumption: You have a type definition for Modal

module.exports = async (client: Client, interaction: ModalSubmitInteraction): Promise<void> => {
  if (!interaction.isModalSubmit()) return;

  const modals: Modal[] = getModals() as Modal[];

  try {
    const modalObject: Modal | undefined = modals.find(
      (modal: Modal) => modal.name === interaction.customId
    );

    if (!modalObject) return;

    modalObject.callback(client, interaction);
  } catch (error) {
    console.error(`There was an error running this modal: ${error}`);
  }
};

