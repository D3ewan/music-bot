import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

const data = new SlashCommandBuilder().setName('resume')
    .setDescription('resume the current song');

async function execute(interaction, player) {
    await interaction.deferReply();
    const queue = useQueue(interaction.guild);
    if (!queue || !queue.isPlaying()) return void interaction.followUp({ content: "Music is Playing" });
    queue.node.resume();
    return void interaction.followUp({ content: "resumed the music" });
}

export default { data, execute };