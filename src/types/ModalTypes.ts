import { Client, ModalSubmitInteraction } from "discord.js";

export type CommandCallback = (client: Client, interaction: ModalSubmitInteraction) => void;

export type Modal = {
  name: string; // The name of the command
  callback: CommandCallback; // The function to call when this command is executed
};
