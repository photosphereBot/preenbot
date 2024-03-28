import { Client, CommandInteraction } from 'discord.js';

interface Command {
  name: string;
  description: string;
  callback: (client: Client, interaction: CommandInteraction) => Promise<void>;
}

const pingCommand: Command = {
  name: 'ping',
  description: 'Replies with the bot ping!',

  callback: async (client: Client, interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();

    const reply = await interaction.fetchReply();

    // You need to cast `reply` as `Message` because `fetchReply` returns `Message | APIMessage`
    // Assuming `reply` can be safely treated as `Message` for `createdTimestamp`
    const ping = reply.createdTimestamp - interaction.createdTimestamp;

    interaction.editReply(
      `Pong! Client ${ping}ms | Websocket: ${client.ws.ping}ms`
    );
  },
};

export default pingCommand;
