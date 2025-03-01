const { env } = require('node:process');
const fs = require('node:fs');
const path = require('node:path')
const Discord = require('discord.js');
const DebugLib = require('./debug.js');
module.exports = {
    /**
     * Autoload handlers from the given subdirectory.
     * @param container
     * @param subdir
     */
    loadHandlers(container, subdir) {
        let handlerDir = path.join(container.botConfig.rootDir, 'handlers', subdir);

        DebugLib.debugLog(container, 'Loading Handlers...', {
            handler_type: subdir,
            handler_directory: handlerDir
        })

        // Gather a list of all of our individual handler functions
        const files = fs.readdirSync(handlerDir).filter(file => file.endsWith('.js'));

        DebugLib.debugLog(container, `Found ${files.length} handlers.`)

        // Creates an empty list in the client object to store all functions
        container.handlers[subdir] = new Discord.Collection();

        // Loops over each file in the folder and sets the functions to respond to themselves
        for (const file of files) {
            let filePath = path.join(handlerDir, file);
            const func = require(filePath);
            container.handlers[subdir].set(func.name, func);
            DebugLib.debugLog(container, `Loaded Handler: ${subdir}.${func.name}`)
        }
    },
    /**
     * Load the bot's configuration from the environment (or .env file)
     * @param rootDir Root directory where index.js is running
     * @returns {{debug: boolean, prefix: null|string, token: null|string, rootDir: null|string}}
     */
    loadConfig(rootDir) {
        console.log(`Debug mode is: ${env.DEBUG}`);

        let botConfig = { "prefix": null, "token": null, "debug": true, rootDir: null };

        if(!env.hasOwnProperty('COMMAND_PREFIX')) {
            console.error('No command prefix specified. Check your .env file!')
            process.exit(1);
        }
        botConfig.prefix = env.COMMAND_PREFIX;

        if(!env.hasOwnProperty('BOT_TOKEN')) {
            console.error('No bot token provided. Check your .env file!')
            process.exit(1);
        }
        botConfig.token = env.BOT_TOKEN;

        // If the user didn't specify that we aren't in debug mode, we will just assume that we are, since they probably need help.
        if(env.hasOwnProperty('DEBUG')) {
            botConfig.debug = env.DEBUG;
        }

        // Setting the root directory on the config allows us to access files by the folder structure wherever we have the container object
        botConfig.rootDir = rootDir;

        if(botConfig.debug) {
            console.log('Config Loaded: ', botConfig);
        }

        return botConfig;
    }
}
