import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

const data = new SlashCommandBuilder().setName('stop')
    .setDescription('stop the current song');

async function execute(interaction, player) {
    await interaction.deferReply();
    const queue = useQueue(interaction.guildId);

    if (!queue?.isPlaying) {
        const embed = new EmbedBuilder().setTitle('Not playing')
            .setDescription('I am not playing anything right now');

        return interaction.editReply({ embeds: [embed] });
    }

    queue.node.stop();

    const embed = new EmbedBuilder().setTitle('Track Stopped')
        .setDescription('I have successfully stopped the track.')

    return interaction.editReply({ embeds: [embed] });
}
export default { data, execute };