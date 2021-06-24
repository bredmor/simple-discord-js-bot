const fs = require('fs');
const Discord = require('discord.js');

/**
 * This class autoloads handler functions from the given subdirectory
 */
module.exports = {
    loadHandlers(client, subdir) {
        // Gather a list of all of our individual handler functions
        const files = fs.readdirSync(`${client.botConfig.rootDir}/handlers/${subdir}`).filter(file => file.endsWith('.js'));

        // Creates an empty list in the client object to store all functions
        client[subdir] = new Discord.Collection();

        // Loops over each file in the folder and sets the functions to respond to themselves
        for (const file of files) {
            const func = require(`${client.botConfig.rootDir}/handlers/${subdir}/${file}`);
            client[subdir].set(func.name, func);
        }
    }
}