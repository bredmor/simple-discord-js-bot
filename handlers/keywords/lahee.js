/**
 * This class responds to anyone that types "LAHEE" or any of the aliases listed below with the gif defined below.
 */
module.exports = {
    name: 'LAHEE', // The name of the keyword to react to,
    aliases: ['lahee', 'la hee', 'LA HEE'], // Other keywords to react to
    gifLink: 'https://tenor.com/view/soken-fan-fest-lahee-otamatone-hum-gif-21581907', // The gif we're responding with
    // We could respond with text, or any other type of file instead.
    execute(message) {
        return message.channel.send(this.gifLink);
    },
};