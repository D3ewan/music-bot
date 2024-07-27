import { Client, GatewayIntentBits } from 'discord.js';
import { Player } from 'discord-player';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const player = new Player(client);
player.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor');

export { client, player };
