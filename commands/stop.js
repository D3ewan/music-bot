import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

const data = new SlashCommandBuilder().setName('stop')
    .setDescription('stop the current song');

async function execute(interaction, player) {
    await interaction.deferReply();
    const queue = useQueue(interaction.guild);
    if (!queue || !queue.isPlaying()) return void interaction.followUp({ content: "❌ | No music is being played!" });
    queue.node.stop();
    return void interaction.followUp({ content: "🛑 | Stopped the player!" });
}

export default { data, execute };