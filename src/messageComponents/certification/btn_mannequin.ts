import { Client, Interaction, ChannelType, EmbedBuilder } from 'discord.js';

export const btnMannequin = {
  name: 'btn_mannequin',
  /**
   * Callback function for the interaction
   * @param client - The Discord client instance
   * @param interaction - The interaction that triggered the command
   */
  callback: async (client: Client, interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    await interaction.deferReply();
    await interaction.deleteReply();
    const threadName = "Mannequin #1 : " + interaction.user.username;

    // Assuming interaction.channel is not null and is a TextChannel
    // You might need to handle cases where interaction.channel could be null or not a TextChannel
    const thread = await interaction.channel.threads.create({
      name: threadName,
      autoArchiveDuration: 60,
      type: ChannelType.PrivateThread,
    });

    await thread.members.add(interaction.user.id);
    await thread.send(`Bonjour <@${interaction.user.id}>, vous avez demandé l'obtention de la certification pour mannequin ! 💃 \nUn membre de la <@&1023551565967142994> va venir vous répondre sous peu.`);

    const embed = new EmbedBuilder()
      .setTitle('Pour rappel, merci de nous fournir les informations suivantes :')
      .setDescription('- Site internet de votre agence, là où les informations de votre représentation sont disponibles. (nom, prénom)\n- Coordonnées de l\'agence.\nEn étant certifié, vous acceptez que votre nom ou que votre nom d\'entreprise soit visible sur le serveur.');

    await thread.send({ embeds: [embed] });
  }
};
