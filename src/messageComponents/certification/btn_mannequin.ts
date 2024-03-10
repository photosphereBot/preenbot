import { Client, Interaction, EmbedBuilder, TextChannel, NewsChannel } from 'discord.js';

export const btnMannequin = {
  name: 'btn_mannequin',
  callback: async (client: Client, interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    await interaction.deferReply();
    await interaction.deleteReply();
    const threadName = "Mannequin #1 : " + interaction.user.username;

    if (interaction.channel instanceof TextChannel || interaction.channel instanceof NewsChannel) {
      // Assuming default thread creation without specifying type
      const thread = await interaction.channel.threads.create({
        name: threadName,
        autoArchiveDuration: 60,
        // type is not specified here, allowing Discord.js to use the default for the channel context
      });

      await thread.members.add(interaction.user.id);
      await thread.send(`Bonjour <@${interaction.user.id}>, vous avez demandé l'obtention de la certification pour mannequin ! 💃 \nUn membre de la <@&1023551565967142994> va venir vous répondre sous peu.`);

      const embed = new EmbedBuilder()
        .setTitle('Pour rappel, merci de nous fournir les informations suivantes :')
        .setDescription('- Site internet de votre agence, là où les informations de votre représentation sont disponibles. (nom, prénom)\n- Coordonnées de l\'agence.\nEn étant certifié, vous acceptez que votre nom ou que votre nom d\'entreprise soit visible sur le serveur.');

      await thread.send({ embeds: [embed] });
    } else {
      console.log("The channel does not support threads.");
    }
  }
};
