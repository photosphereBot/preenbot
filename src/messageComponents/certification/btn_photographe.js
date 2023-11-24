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


    const sentmessage = await interaction.channel.send(`${interaction.user.username} a demandé une certif de photographe!`)
    const thread = await sentmessage.startThread({
      name: threadName,
    });
    await thread.members.add(interaction.user.id);
  }
}