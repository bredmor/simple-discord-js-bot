const Discord = require('discord.js');      // Loads the discord API library
const BotLib = require('./lib/bot.js');
const DebugLib = require('./lib/debug.js');

// Loads our dispatcher classes that figure out what handlers to use in response to events
const KeywordDispatcher = require('./dispatchers/keywordDispatch');
const CommandDispatcher = require('./dispatchers/commandDispatch');

const Container = {
    botConfig: BotLib.loadConfig(__dirname), // Loads the bot config settings
    discord: new Discord.Client(),    // Loads the discordJS client
    cooldowns: new Discord.Collection(), // Creates an empty list for storing timeouts so people can't spam with commands
    handlers: {} // Where all the command and keyword handlers are stored
}

// Loads our handler functions that do all the work
BotLib.loadHandlers(Container, 'commands');
BotLib.loadHandlers(Container, 'keywords');
// Additional handler types should be loaded here

// Starts the bot and makes it begin listening to events.
Container.discord.on('ready', () => {
    console.log('Bot Online');
});

// Handle user messages
Container.discord.on('message', message => {
    // Check for keywords that don't use a real command structure
    if(KeywordDispatcher.handle(Container, message)) {
        return; // If we handled a keyword, don't continue to handle events for the same message
    }

    // Check for structured commands
    if(CommandDispatcher.handle(Container, message)) {
        return; // If we handled a command, don't continue to handle events for the same message
    }
    // Additional custom dispatchers should be executed here

    // Register debug message printer
    DebugLib.debugPrintMessages(Container, message, (msg) => { return  msg.author.username + ': ' + msg.content });
});

// Log the bot in using the token provided in the config file
Container.discord.login(Container.botConfig.token).catch((err) => {
    console.log(`Failed to authenticate with Discord network.`, err);
});
