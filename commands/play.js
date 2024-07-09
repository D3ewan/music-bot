import { Player, QueryType } from 'discord-player';
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays a song from a URL or a search query')
    .addStringOption(option =>
        option.setName('query')
            .setDescription('The URL or search query')
            .setRequired(true)
    );

async function execute(interaction, player) {
    await interaction.deferReply();

    player.events.on('playerError', (queue, error, track) => {
        const embed = new EmbedBuilder().setTitle(`Something Went Wrong!!`)
            .setDescription(`Something went wrong while playing \`${track.title}\``)
            .setThumbnail(track.thumbnail)
            .setTimestamp(new Date());

        return interaction.editReply({ embeds: [embed] });

    })
    try {
        const query = interaction.options.getString("query");
        const channel = interaction.member.voice.channel;
        const result = await player.search(query, {
            requestedBy: interaction.user,
        });

        const { track, searchResult, queue } = await player.play(channel, result, {
            nodeOptions: {
                // nodeOptions are the options for guild node (aka your queue in simple word)
                metadata: interaction // we can access this metadata object using queue.metadata later on
            }
        });

        //if the player is not playing some song, due to some error, then that event will be
        //captured by playError so to avoid , the overriding of the Embed we will return
        if (!queue.isPlaying()) return;

        const embed = new EmbedBuilder().setTitle(`${searchResult.hasPlaylist() ? 'Playlist' : 'Track'} queued!`)
            .setThumbnail(track.thumbnail)
            .setDescription(track.description)
            .setTimestamp(new Date());

        return interaction.editReply({ embeds: [embed] });
    } catch (e) {
        const embed = new EmbedBuilder().setTitle(`Something Went Wrong!!`)
            .setDescription(`Something went wrong while playing \`${query}\``)
            .setTimestamp(new Date());

        return interaction.editReply({ embeds: [embed] });
    }
}

export default { data, execute };