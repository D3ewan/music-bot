import { EmbedBuilder } from 'discord.js';

function handleReady(client) {
    client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });
}

function handlePlayerError(player) {
    player.events.on('playerError', (queue, error, track) => {
        const embed = new EmbedBuilder()
            .setDescription(track.description)
            .setTitle('Something went wrong')
            .setThumbnail(track.thumbnail)
            .setFooter({ text: `Duration: ${track.duration}` });
        queue.metadata.channel.send({ embeds: [embed] });
    });
}

function handleInteractionCreate(client, player) {
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isCommand() || !interaction.guildId) return;

        if (!interaction.member.voice.channel) {
            return void interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        }

        try {
            const command = client.commands.get(interaction.commandName);
            await command(interaction, player);
        } catch (error) {
            const embed = new EmbedBuilder()
                .setTitle('Something Went Wrong!!')
                .setDescription('Something went wrong while executing the command')
                .setTimestamp(new Date());

            return interaction.followUp({ embeds: [embed] });
        }
    });
}

export { handleReady, handlePlayerError, handleInteractionCreate };
