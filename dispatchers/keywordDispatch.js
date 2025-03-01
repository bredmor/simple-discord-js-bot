/**
 * This class searches for any keyword handlers with the message content as their name, or an alias and executes the
 * handler if found.
 */
module.exports = {
    handle(container, message) {

        if(message.author.bot) return;

        const messageContent = message.content.trim();
        const keyword = container.handlers.keywords.get(messageContent)
            || container.handlers.keywords.find(kwd => kwd.aliases && kwd.aliases.includes(messageContent));
        if(keyword) {
            try {
                // Run the command
                keyword.execute(container, message).catch((err) => {
                    console.error(`Failed running keyword handler ${keyword.name}."`, err)
                });
                return true;
            } catch(error) {
                console.error(error);
            }

            return false;
        }
    }
}
