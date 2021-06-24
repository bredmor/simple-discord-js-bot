const Discord = require('discord.js');

/**
 * This class searches for any command handlers with the message start as their name, or an alias and executes the
 * handler if found.
 */
module.exports = {
    handle(client, message, cooldowns) {
        // Ignore bot messages and messages that dont start with the prefix defined in the config file
        if(!message.content.startsWith(client.botConfig.prefix) || message.author.bot) return;

        // Split commands and arguments from message so they can be passed to functions
        const args = message.content.slice(client.botConfig.prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        // If the command isn't in the  command folder, move on
        const command = client.commands.get(commandName)
            || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if(!command) return;

        // If the command requires arguments, make sure they're there.
        if (command.args && !args.length) {
            let reply = 'That command requires more details!';

            // If we have details on how to use the args, provide them
            if (command.usage) {
                reply += `\nThe proper usage would be: \`${client.botConfig.prefix}${command.name} ${command.usage}\``;
            }

            // Send a reply from the bot about any error encountered
            return message.channel.send(reply);
        }

        /**
         * The following block of code handles "cooldowns" making sure that users can only use a command every so often.
         * This is helpful for commands that require loading time or computation, like image requests.
         */
        if(!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3 ) * 1000;

        if(!timestamps.has(message.author.id)) {
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        } else {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if(now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`Whoa! You're sending commands too fast! Please wait ${timeLeft.toFixed(1)} more second(s) before running \`${command.name}\` again!`);
            }

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
        }
        /**
         * End cooldown code
         */

        try {
            // Run the command
            command.execute(message, args).catch((err) => {
                console.error(`Failed running command handler ${command.name}: "${err.message}"`)
            });
        } catch(error) {
            console.error(error);
            message.reply('Sorry! I ran into an error trying to do that!');
        }
    }
}