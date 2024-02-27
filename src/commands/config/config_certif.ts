import {
  Client,
  CommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
  CommandInteractionOptionResolver,
  TextChannel,
  NewsChannel,
  DMChannel
} from 'discord.js';
import { Pool } from 'pg'; // Assuming pg is used for PostgreSQL connection
import createPgPool from '../../utils/createPgPool.js'; // Make sure this function is properly typed in its own file

interface Command {
  name: string;
  description: string;
  type: number;
  options: Array<{
    name: string;
    description: string;
    type: typeof ApplicationCommandOptionType.Channel;
    required: boolean;
  }>;
  callback: (client: Client, interaction: CommandInteraction) => Promise<void>;
}

const certifSetup: Command = {
  name: 'certif_setup',
  description: 'configurer le systeme de certif',
  type: 1, // Assuming this is the correct type for a slash command
  options: [
    {
      name: 'channel',
      description: 'Le channel dans lequel tu souhaite envoyer les informations de certif',
      type: ApplicationCommandOptionType.Channel,
      required: true,
    }
  ],
  callback: async (client: Client, interaction: CommandInteraction): Promise<void> => {
    const pool: Pool = createPgPool();
    if (!interaction.isCommand()) return;
    const channel = (interaction.options as CommandInteractionOptionResolver).getChannel('channel', true);

    const embeds = [
      {
        "color": 0x2f3136,
        "image": {
         "url": "https://image.noelshack.com/fichiers/2023/41/6/1697295217-certification.png"
        },
        "fields": []
       },
       {
        "title": "La certification, qu'est-ce que c'est ? ",
        "fields": [],
        "color": 0x2f3136,
        "description":
         "- La certification de la Photosphère vous permet d'être reconnu comme exerçant une activité **professionnelle**.\n- Elle permet de montrer votre légitimité à soumettre vos offres de **prestations** rémunérées.\n- Obtenez le rôle de **mannequin **ou de **photographe certifié** ! Cela vous permettra d'exercer un rôle de **mentor **auprès des modèles ou des photographes débutants du serveur.\n- Débloquez une nouvelle icône à côté de votre pseudo ! C'est bling bling ~",
        "image": {
         "url": "https://i.imgur.com/8A7CGCy.png"
        }
       },
       {
        "title": "Quelles infos dois-je fournir pour être certifié ? ",
        "color": 0x2f3136,
        "fields": [
         {
          "name": "📸  Je suis **__Photographe__** :",
          "value":
           "- Je donne l'accès à mon numéro de **SIRET** ou de **SIREN**.\n- Je donne l'accès à un site internet en ligne où les informations de mon entreprise sont disponibles (nom, prénom, siret/siren)\n- J'accepte que mon prénom, nom ou que mon nom d'entreprise soit visible sur le serveur.",
          "inline": false
         },
         {
          "name": "🌟  Je suis **__Mannequin__** :",
          "value": "- Je donne l'accès au site internet de mon **agence**, là où les informations de ma représentation sont disponibles. (nom, prénom)\n- Je donne accès aux coordonnées de mon agence. ",
          "inline": false
         }
        ],
        "image": {
         "url": "https://i.imgur.com/8A7CGCy.png"
        }
       },
       {
        "color": 0x2f3136,
        "description": "Nous assurons que les informations que vous nous fournissez sont traitées avec la plus grande confidentialité et dans le strict but de vérifier votre statut pour la certification. Elles ne seront en aucun cas utilisées à d'autres fins ou partagées avec des tiers. ",
        "title": "👉 Sécurité",
        "image": {
         "url": "https://i.ibb.co/9cr0sKP/Group-63.png"
        },
        "fields": []
       }
    ];

    const btn = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("btn_mannequin")
          .setStyle(3) // Assuming 3 is the correct style for a primary button
          .setLabel("Certification Mannequin")
          .setEmoji("💛"),
        new ButtonBuilder()
          .setCustomId("btn_photographe")
          .setStyle(3)
          .setLabel("Certification Photographe")
          .setEmoji("🧡")
      );

      try {
        let sentMessage; // Déclaration de sentMessage dans une portée accessible
    
        if (channel instanceof TextChannel || channel instanceof NewsChannel || channel instanceof DMChannel) {
            sentMessage = await channel.send({ embeds, components: [btn] });
        } else {
            console.log('Le canal sélectionné ne supporte pas l\'envoi de messages.');
            return; // Retourne pour éviter d'exécuter le code suivant si le canal n'est pas pris en charge
        }
    
        if (sentMessage) {
            console.log(sentMessage.id);
    
            const queryText = `INSERT INTO guild (guild_id, channel_id, message_id) VALUES ($1, $2, $3) ON CONFLICT (guild_id) DO NOTHING;`;
            await pool.query(queryText, [interaction.guildId, channel.id, sentMessage.id]);
        }
    } catch (error) {
        console.error('addChannel.js ' + error);
    }

    await interaction.reply({ content: `Votre systeme de certification à été configuré dans ${channel}`, ephemeral: true });
  }
};

export default certifSetup;
