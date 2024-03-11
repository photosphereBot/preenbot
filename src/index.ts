import { Client, IntentsBitField } from 'discord.js';
import { loadEventHandlers } from './handlers/eventHandler';
import { DISCORD_CLIENT_SECRET } from './utils/environment';

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
loadEventHandlers(client);

// Login to Discord with your app's token
client.login(DISCORD_CLIENT_SECRET);
