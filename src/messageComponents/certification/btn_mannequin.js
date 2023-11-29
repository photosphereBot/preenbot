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
    await thread.members.add("298522322531385344");

  }
}