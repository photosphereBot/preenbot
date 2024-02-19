import dotenv from 'dotenv';
import { Client, IntentsBitField } from 'discord.js';
import eventHandler from './handlers/eventHandler';

// Initialize dotenv
dotenv.config({ path: `config/env/.env.development` });

// Create a new Discord client instance
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.MessageContent,
  ],
});

// Use the event handler
eventHandler(client);

// Login to Discord with your app's token
client.login(process.env.DISCORD_TOKEN);
