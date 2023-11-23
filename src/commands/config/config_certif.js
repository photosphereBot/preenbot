const {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require('discord.js');
const ticketSchema = require('../../schema/ticketSchema');
const pgpool = require("../utils/createPgPool");

module.exports = {
  /**
 * @param {Client} client
 * @param {Interaction} interaction
 */

  name: 'certif_setup',
  description: 'configurer le systeme de certif',
  type: 1,
  options: [
    {
      name: 'channel',
      description: 'Le channel dans lequel tu souhaite envoyer les informations de certif',
      type: ApplicationCommandOptionType.Channel,
      required: true,

    }
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],

  callback: async (client, interaction) => {

    const pool = pgpool();
    const channel = interaction.options.getChannel('channel')

    try {
      const queryText = `INSERT INTO guild (guild_id, channel_id) VALUES ($1, $2) ON CONFLICT (guild_id) DO NOTHING;`;
      await pool.query(queryText, [interaction.guildid, channel]);
    } catch (error) {
      console.error('addChannel.js ' + error);
    }


   const embed = {
    "content": null,
    "embeds": [
     {
      "color": "#2f3136",
      "image": {
       "url": "https://image.noelshack.com/fichiers/2023/41/6/1697295217-certification.png"
      },
      "fields": null
     },
     {
      "title": "La certification, qu'est-ce que c'est ? ",
      "fields": [],
      "color": "#2f3136",
      "description": [
       "- La certification de la Photosphère vous permet d'être reconnu comme exerçant une activité **professionnelle**.",
       "- Elle permet de montrer votre légitimité à soumettre vos offres de **prestations** rémunérées. ",
       "- Obtenez le rôle de **mannequin **ou de **photographe certifié** ! Cela vous permettra d'exercer un rôle de **mentor **auprès des modèles ou des photographes débutants du serveur.  ",
       "- Débloquez une nouvelle icône à côté de votre pseudo ! C'est bling bling ~"
      ],
      "image": {
       "url": "https://i.imgur.com/8A7CGCy.png"
      }
     },
     
     {
      "title": "Quelles infos dois-je fournir pour être certifié ? ",
      "color": "#2f3136",
      "fields": [
       {
        "name": "📸  Je suis **__Photographe__** :",
        "value": [
         "- Je donne l'accès à mon numéro de **SIRET** ou de **SIREN**.",
         "- Je donne l'accès à un site internet en ligne où les informations de mon entreprise sont disponibles (nom, prénom, siret/siren)",
         "- J'accepte que mon prénom, nom ou que mon nom d'entreprise soit visible sur le serveur."
        ],
        "inline": false
       },
       {
        "name": "🌟  Je suis **__Mannequin__** :",
        "value": [
         "- Je donne l'accès au site internet de mon **agence**, là où les informations de ma représentation sont disponibles. (nom, prénom)",
         "- Je donne accès aux coordonnées de mon agence. "
        ],
        "inline": false
       }
      ],
      "image": {
       "url": "https://i.imgur.com/8A7CGCy.png"
      }
     },
     {
      "color": "#2f3136",
      "description": "Nous assurons que les informations que vous nous fournissez sont traitées avec la plus grande confidentialité et dans le strict but de vérifier votre statut pour la certification. Elles ne seront en aucun cas utilisées à d'autres fins ou partagées avec des tiers. ",
      "title": "👉 Sécurité",
      "image": {
       "url": "https://i.ibb.co/9cr0sKP/Group-63.png"
      },
      "fields": null
     }
    ],
    "components": [
     {
      "type": 1,
      "components": [
       {
        "type": 2,
        "style": 3,
        "label": "Certification Photographe",
        "custom_id": "Rôles",
        "emoji": {
         "name": "🧡"
        }
       },
       {
        "type": 2,
        "style": 3,
        "label": "Certification Mannequin",
        "custom_id": null,
        "emoji": {
         "name": "💛"
        }
       }
      ]
     }
    ]
   }


    await channel.send({ embed: [embed]});
    await interaction.reply({ content: `Votre systeme de certification à été configuré dans ${channel}`, ephemeral: true });
  }
};