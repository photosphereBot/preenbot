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


    const sentmessage = await interaction.channel.send(`${interaction.user.username} a demandé une certif de mannequin!`)
    const thread = await sentmessage.startThread({
      name: threadName,
    });
    await thread.members.add(interaction.user.id);

  }
}