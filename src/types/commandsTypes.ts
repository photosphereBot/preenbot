import { Client, CommandInteraction, PermissionResolvable } from "discord.js";

export type CommandCallback = (client: Client, interaction: CommandInteraction) => void;

export type LocalCommand = {
  default: any;
  name: string; // The name of the command
  description: string; // The description of the command
  deleted?: boolean; // Whether the command is deleted
  options?: any[]; // The options for the command
  devOnly?: boolean; // Whether the command is restricted to developers
  testOnly?: boolean; // Whether the command is only for use in a test server
  permissionsRequired?: PermissionResolvable[]; // Permissions a user needs to execute this command
  botPermissions?: PermissionResolvable[]; // Permissions the bot needs to execute this command
  callback: CommandCallback; // The function to call when this command is executed
};