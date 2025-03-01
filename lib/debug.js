
module.exports = {
    debugPrintMessages(client, message, formatCallback = null) {
        if(!client.botConfig.debug) {
            return;
        }

        if(message.author.bot) {
            return;
        }

        if(formatCallback) {
            console.log('msg} ' + formatCallback(message))
        }

        console.log('msg} ', message);
    }
}
