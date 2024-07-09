import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { useQueue } from 'discord-player';

const data = new SlashCommandBuilder().setName('skip')
    .setDescription('skip the current song');

async function execute(interaction, player) {
    await interaction.deferReply();
    const queue = useQueue(interaction.guild);
    if (!queue || !queue.isPlaying()) return void interaction.followUp({ content: "❌ | No music is being played!" });
    const success = queue.node.skip();
    return void interaction.followUp({
        content: success ? `✅ | Skipped **${currentTrack}**!` : "❌ | Something went wrong!"
    });
}

export default { data, execute };