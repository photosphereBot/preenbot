import { Client, MessageComponentInteraction } from "discord.js";

export type CommandCallback = (client: Client, interaction: MessageComponentInteraction) => void;

export type MessageComponent = {
  name: string; // The name of the command
  callback: CommandCallback; // The function to call when this command is executed
};
