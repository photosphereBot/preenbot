const pgpool = require("../../utils/createPgPool");

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


    const thread = await channel.threads.create({
      name: threadName,
      autoArchiveDuration: 60,
      type: ChannelType.PrivateThread,

    });
    await thread.members.add(interaction.user.id);

  }
}