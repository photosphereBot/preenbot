require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");
const eventHandler = require("./handlers/eventHandler");
/*
const pgpool = require("./utils/createPgPool");
const pool = pgpool()
*/
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildVoiceStates,
    IntentsBitField.Flags.MessageContent,
  ],
});

eventHandler(client);

client.login(process.env.DISCORD_TOKEN);

/*
(async () => {

  try {

    const { rows } = await pool.query("SELECT * FROM current_user");
    const currentUser = rows[0]['current_user'];
    console.log('Database connected with user: ' + currentUser);

  } catch (error) {
    console.error(error);
  }
})();
*/