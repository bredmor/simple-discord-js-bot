
module.exports = {
    debugPrintMessages(container, message, formatCallback = null) {
        if(!container.botConfig.debug) {
            return;
        }

        if(message.author.bot) {
            return;
        }

        if(formatCallback) {
            console.log('msg} ' + formatCallback(message))
            return;
        }

        console.log('msg} ', message);
    },
    /**
     * @param container {}
     * @param message string
     * @param context any
     */
    debugLog(container, message, context = {}) {
        if(container.botConfig.debug) {
            console.debug(message, context)
        }
    }
}
