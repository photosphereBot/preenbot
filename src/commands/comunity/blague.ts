import { Client, CommandInteraction } from 'discord.js';
import { readFileSync } from 'fs';
import { join } from 'path';

// Chemin vers le fichier JSON contenant les blagues
const jokesFilePath = join(__dirname, '../../assets/jokes.json');

// Chargement des blagues depuis le fichier JSON
const jokes = JSON.parse(readFileSync(jokesFilePath, 'utf-8'));

interface Command {
  name: string;
  description: string;
  callback: (client: Client, interaction: CommandInteraction) => Promise<void>;
}

const jokeCommand: Command = {
  name: 'blague',
  description: 'Raconte une blague aléatoire sur le thème de la photo',

  callback: async (client: Client, interaction: CommandInteraction): Promise<void> => {
    await interaction.deferReply();

    // Sélection aléatoire d'une blague
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

    const embed = [
      {
        "title": randomJoke,
        "description": "",
        "color": 0xd4cb40
      }
    ]    

    // Envoie la blague sélectionnée
    await interaction.editReply({embeds: embed});
  },
};

export default jokeCommand;
