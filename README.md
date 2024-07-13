# Discord Music Bot

A feature-rich Discord music bot that can play music from various sources, including YouTube and Spotify. Built with Node.js and the discord.js library.

## Features

- Play music Spotify, and other sources
- Queue system to manage song requests
- Skip, pause, and resume functionality
- Supports multiple servers
- Easy to use commands

## Installation

1. **Clone the repository**
    ```bash
    https://github.com/D3ewan/music-bot.git
    cd music-bot
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Create a `.env` file**
    ```bash
    touch .env
    ```

4. **Configure the `.env` file**
    ```env
    TOKEN=your-discord-bot-token
    CLIENT_ID=your-discord-client-id
    ```

5. **Start the bot**
    ```bash
    npm start
    ```

## Commands

- `/play <url|song name>`: Plays a song from a URL or a song name.
- `/skip`: Skips the current song.
- `/pause`: Pauses the current song.
- `/resume`: Resumes the paused song.
- `/stop`: Stops the music and clears the queue.

## Requirements

- Node.js v14 or higher
- Discord account and bot token

