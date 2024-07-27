import { client, player } from './src/clientSetup.js';
import { registerCommands } from './src/registerCommands.js';
import { handleReady, handlePlayerError, handleInteractionCreate } from './src/eventHandlers.js';

// Register commands
registerCommands(client);

// Handle events
handleReady(client);
handlePlayerError(player);
handleInteractionCreate(client, player);

// Prevent crashes on unhandled promise rejections and uncaught exceptions
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled promise rejection:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error.message);
});

// Login client
client.login(process.env.TOKEN);
