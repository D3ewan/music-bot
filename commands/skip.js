import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

const data = new SlashCommandBuilder().setName('skip')
    .setDescription('skip the current song');

async function execute(interaction, player) {
    await interaction.deferReply();

    const queue = useQueue(interaction.guild);

    if (!queue?.isPlaying()) {
        const embed = new EmbedBuilder().setTitle('Not Playing')
            .setDescription('I am not playing anything now')
        return interaction.editReply({ embeds: [embed] });
    }

    queue.node.skip();

    const embed = new EmbedBuilder().setTitle('Track skipped!')
        .setDescription('I have successfully skipped to the next track.');

    return interaction.editReply({ embeds: [embed] });
}

export default { data, execute };