const { ChannelType } = require('discord.js');

module.exports = {
  /**
 * @param {Client} client
 * @param {Interaction} interaction
 */
  name: 'btn_mannequin',

  callback: async (client, interaction) => {
    await interaction.deferReply();
    await interaction.deleteReply();
    const threadName = "Certification mannequin de " + interaction.user.username;


    const thread = await interaction.channel.threads.create({
      name: threadName,
      autoArchiveDuration: 60,
      type: ChannelType.PrivateThread,

    });
    await thread.members.add(interaction.user.id);
    await thread.send(`Bonjour <@${interaction.user.id}>, vous avez demandé l'obtention de la certification pour mannequin ! 💃 
    Un membre de la <@&1023551565967142994> va venir vous répondre sous peu.  `)

    const embed = new EmbedBuilder()
    .setTitle('Pour rappel, merci de nous fournir les informations suivantes :')
    .setDescription('- Site internet de votre agence, là où les informations de votre représentation sont disponibles. (nom, prénom)\n- Coordonnées de l\'agence.\nEn étant certifié, vous acceptez que votre nom ou que votre nom d\'entreprise soit visible sur le serveur.')

    await thread.send({embed: [embed]});

  }
}