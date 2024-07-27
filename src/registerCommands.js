import { REST } from '@discordjs/rest';
import { Collection, Routes } from 'discord.js';
import Play from '../commands/play.js';
import Skip from '../commands/skip.js';
import Pause from '../commands/pause.js';
import Resume from '../commands/resume.js';
import Stop from '../commands/stop.js';
import Lyrics from '../commands/lyrics.js';

const commands = [Play, Skip, Pause, Resume, Stop, Lyrics];

async function registerCommands(client) {
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    const commandData = commands.map(command => command.data.toJSON());

    client.commands = new Collection();
    commands.forEach(command => {
        client.commands.set(command.data.name, command.execute);
    });

    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commandData });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error reloading application (/) commands:', error);
    }
}

export { registerCommands };
