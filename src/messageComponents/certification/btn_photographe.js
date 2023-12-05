const {
  EmbedBuilder,
  ChannelType,
 } = require('discord.js');

module.exports = {
  /**
 * @param {Client} client
 * @param {Interaction} interaction
 */
  name: 'btn_photographe',

  callback: async (client, interaction) => {
    await interaction.deferReply();
    await interaction.deleteReply();
    const threadName = "Certification photographe de " + interaction.user.username;


    const thread = await channel.threads.create({
      name: threadName,
      autoArchiveDuration: 60,
      type: ChannelType.PrivateThread,

    });
    await thread.members.add(interaction.user.id);
    await thread.send(`Bonjour <@${interaction.user.id}>, vous avez demandé l'obtention de la certification pour photographe ! 📸\nUn membre de la <@&1023551565967142994> va venir vous répondre sous peu. `)

    const embed = new EmbedBuilder()
    .setTitle('Pour rappel, merci de nous fournir les informations suivantes :')
    .setDescription('- Numéro de SIRET ou de SIREN.\n- Site internet en ligne où les informations de votre entreprise sont disponibles (nom, prénom, siret/siren)\nEn étant certifié, vous acceptez que votre nom ou que votre nom d\'entreprise soit visible sur le serveur.')

    await thread.send({embeds: [embed]});
  }
}