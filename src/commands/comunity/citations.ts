import { Client, CommandInteraction } from 'discord.js';
import { readFileSync } from 'fs';
import { join } from 'path';

// Chemin vers le fichier JSON contenant les blagues
const citationsFilePath = join(__dirname, '../../assets/citations.json');

// Chargement des blagues depuis le fichier JSON
const citations = JSON.parse(readFileSync(citationsFilePath, 'utf-8'));

interface Command {
  name: string;
  description: string;
  callback: (client: Client, interaction: CommandInteraction) => Promise<void>;
}

const citationCommand: Command = {
  name: 'citation',
  description: 'Donne une citation aléatoire sur le thème de la photo',

  callback: async (client: Client, interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();

    // Sélection aléatoire d'une blague
    const randomcitation = citations[Math.floor(Math.random() * citations.length)];

    const embed = [
      {
        "title": randomcitation.title,
        "description": randomcitation.description,
        "color": 0xffffff,
      }
    ]    

    // Envoie la blague sélectionnée
    await interaction.editReply({embeds: embed});
  },
};

export default citationCommand;
