import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

const data = new SlashCommandBuilder().setName('pause')
    .setDescription('pause the current song');

async function execute(interaction, player) {
    await interaction.deferReply();
    const queue = useQueue(interaction.guild);
    if (!queue || !queue.isPlaying()) return void interaction.followUp({ content: "❌ | No music is being played!" });
    queue.node.pause();
    return void interaction.followUp({ content: "paused the music" });
}

export default { data, execute };