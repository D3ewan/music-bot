import { ApplicationCommandOptionType, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { lyricsExtractor } from "@discord-player/extractor";

const lyricsFinder = lyricsExtractor();

const data = new SlashCommandBuilder()
    .setName('lyrics')
    .setDescription('Get lyrics for a song')
    .addStringOption(option =>
        option.setName('query')
            .setDescription('The title of the song to get lyrics for.')
            .setRequired(true)
    );

async function execute(interaction, queue) {
    await interaction.deferReply({ ephemeral: true });

    let query = interaction.options.getString("query", false);

    if (!query && !queue?.currentTrack) {
        return interaction.editReply({
            embeds: [ErrorEmbed("Provide a song title to search lyrics.")],
        });
    }

    if (!query)
        query = `${queue?.currentTrack?.author} - ${queue?.currentTrack?.cleanTitle}`;

    const result = await lyricsFinder.search(query).catch(() => null);

    if (!result || !result.lyrics) {
        return interaction.followUp('No lyrics were found for the song');
    }

    const lyrics =
        result.lyrics.length > 4096
            ? `${result.lyrics.slice(0, 4093)}...`
            : result.lyrics;

    const embed = new EmbedBuilder()
        .setTitle(result.title)
        .setURL(result.url)
        .setThumbnail(result.thumbnail)
        .setAuthor({
            name: result.artist.name,
            iconURL: result.artist.image,
            url: result.artist.url,
        })
        .setDescription(lyrics);

    return interaction.editReply({ embeds: [embed] });
}

export default {data,execute};