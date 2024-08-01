import { Client, GatewayIntentBits } from 'discord.js';
import { Player } from 'discord-player';
import dotenv from 'dotenv';
import { YoutubeiExtractor } from "discord-player-youtubei"

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

player.extractors.register(YoutubeiExtractor, {
    authentication:[process.env.ACCESS_TOKEN],
    streamOptions:{
        useClient:'YTMUSIC'
    }
})

export { client, player };
