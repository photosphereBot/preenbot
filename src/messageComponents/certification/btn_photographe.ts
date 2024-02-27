import { Client, EmbedBuilder, ChannelType, Interaction } from 'discord.js';

export const btnPhotographe = {
  name: 'btn_photographe',

  /**
   * @param client {Client}
   * @param interaction {Interaction}
   */
  callback: async (client: Client, interaction: Interaction) => {
    await interaction.deferReply();
    await interaction.deleteReply();
    const threadName = "Photographe #1 : " + interaction.user.username;

    // Assurez-vous que interaction.channel est bien un type de canal qui supporte la création de fils de discussion
    if (!interaction.channel || !("threads" in interaction.channel)) throw new Error("Cannot create a thread in this type of channel");

    const thread = await interaction.channel.threads.create({
      name: threadName,
      autoArchiveDuration: 60,
      type: ChannelType.PrivateThread,
    });

    await thread.members.add(interaction.user.id);
    await thread.send(`Bonjour <@${interaction.user.id}>, vous avez demandé l'obtention de la certification pour photographe ! 📸\nUn membre de la <@&1023551565967142994> va venir vous répondre sous peu. `);

    const embed = new EmbedBuilder()
      .setTitle('Pour rappel, merci de nous fournir les informations suivantes :')
      .setDescription('- Numéro de SIRET ou de SIREN.\n- Site internet en ligne où les informations de votre entreprise sont disponibles (nom, prénom, siret/siren)\nEn étant certifié, vous acceptez que votre nom ou que votre nom d\'entreprise soit visible sur le serveur.');

    await thread.send({ embeds: [embed] });
  }
};
