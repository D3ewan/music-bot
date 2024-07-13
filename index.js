import { Client, GatewayIntentBits, Collection, Routes, Options,EmbedBuilder } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Player, useMainPlayer, useQueue } from 'discord-player';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Play from './commands/play.js';
import Skip from './commands/skip.js';
import Pause from './commands/pause.js';
import Resume from './commands/resume.js';
import Stop from './commands/stop.js';
import Lyrics from './commands/lyrics.js'

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

client.commands = new Collection();
const player = new Player(client);


player.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor');

const commands = [];

client.commands.set(Play.data.name, Play.execute);
client.commands.set(Skip.data.name, Skip.execute);
client.commands.set(Pause.data.name, Pause.execute);
client.commands.set(Resume.data.name, Resume.execute);
client.commands.set(Stop.data.name, Stop.execute);
client.commands.set(Lyrics.data.name,Lyrics.execute);
commands.push(Play.data.toJSON());
commands.push(Skip.data.toJSON());
commands.push(Pause.data.toJSON());
commands.push(Resume.data.toJSON());
commands.push(Stop.data.toJSON());
commands.push(Lyrics.data.toJSON());

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// console.log(player);
player.events.on('playerError', (queue, error, track) => {
    const embed=new EmbedBuilder();
    embed.setDescription(track.description).setTitle('something went wrong').setThumbnail(track.thumbnail).setFooter({ text: `Duration: ${track.duration}`})
    queue.metadata.channel.send({ embeds: [embed] });
    // console.log(queue);
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand() || !interaction.guildId) return;

    // const player=useMainPlayer();
    if (!interaction.member.voice.channel) {
        return void interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
    }

    // console.log(interaction.channelId);

    try {
        const func = client.commands.get(interaction.commandName);
        await func(interaction, player);
    } catch (error) {
        const embed = new EmbedBuilder().setTitle(`Something Went Wrong!!`)
            .setDescription(`Something went wrong while playing `)
            .setTimestamp(new Date());

        return interaction.followUp({ embeds: [embed] });
    }
});

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();

client.login(process.env.TOKEN);

// prevent crash on unhandled promise rejection
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled promise rejection:', reason);
});

// prevent crash on uncaught exception
process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error.message);
});