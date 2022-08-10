/**
 * This class responds to anyone that types !bot talk and chooses one of the phrases below to respond with at random.
 *
 */
user = message.mentions.users.first();
module.exports = {
    
    name: 'talk', // The name of the command
    description: 'Random phrases', // The description of the command (for help text)
    args: false, // Specified that this command doesn't need any data other than the command
    usage: '', // Help text to explain how to use the command (if it had any arguments)
    cooldown:100
    execute(message, args) {

        // List of phrases to respond with
        var phrases = [
            'Hello, World.',
            'The Quick Brown Fox Jumps Over The Lazy Dog',
            'I am the very model of a modern major general.'
        ];

        return message.reply('Hello'+ user);\
    },
};
