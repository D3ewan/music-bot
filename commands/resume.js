import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { useQueue,useTimeline } from 'discord-player';

const data = new SlashCommandBuilder().setName('resume')
    .setDescription('resume the current song');

async function execute(interaction, player) {
    await interaction.deferReply();
    const timeline = useTimeline(interaction.guildId);

    if (!timeline?.track) {
        const embed = new EmbedBuilder().setTitle('Not playing')
            .setDescription('I am not playing anything right now');

        return interaction.followUp({ embeds: [embed] });
    }

    if (!timeline.paused) {
        const embed = new EmbedBuilder().setTitle('Error')
            .setDescription('The track is already running')

        return interaction.followUp({ embeds: [embed] });
    }

    timeline.resume();

    const embed = new EmbedBuilder().setTitle('Resumed')
        .setDescription('I have successfully resumed the track.')

    return interaction.followUp({ embeds: [embed] });
}

export default { data, execute };