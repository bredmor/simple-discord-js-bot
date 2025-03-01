# Simple Discord JS Bot
A starter bot and "framework" to build Discord bots from.

Includes a lot of extra comments, assuming the user is new to programming.

## Version 3
This version contains mostly quality of life improvements to make things easier and stay up to date.

If you're migrating from an old version, be aware that you need to place your `config.json` values into an `.env` file, or load them into the shell environment, following the keys in `.env.example`

Code for versions 1 and 2 can be found via their respective [tags](https://github.com/bredmor/simple-discord-js-bot/tags).

### Upgrading from previous versions
_General:_
- Configuration values are no longer loaded from `config.json`, instead being automatically read from the shell environment (sourced from the `.env` file if you use `npm run serve`).
- The `client` variable previously used to inject the discordJS library and bot config has been restructured and renamed to `Container`.
- - The discord client is now located at `Container.discord`
- - The config is now located at `Container.botConfig`.
- - Handlers are also now loaded into `Container.handlers[handlerDirectoryName]` (i.e `Container.handlers.keywords`) instead of being on the client.
- The `Container` object is now additionally passed as the first argument to the `execute` function on command and keyword handlers.

## Prerequisites
 * Node JS >= 20.6.0
 * NPM >= 10.2.0

## Setup
1. Clone this repository: `git clone https://github.com/bredmor/simple-discord-js-bot.git` or download and unzip it, then navigate to the new 
   folder named `simple-discord-js-bot`
2. Install dependencies with `npm i`
3. Copy `.env.example` to `.env`, replacing the placeholder values with your desired command prefix and your bot token (If you 
   don't have one yet, see the note below on how to generate one.)
4. Start the bot with `npm run serve`
5. Add the bot to the server of your choice by filling out the requisite permissions in the "OAuth2 URL Generator" form (start by checking "bot") on the OAuth2 section of the developer portal and navigating to the generated link.

That's it! You can now try out the default commands like `!bot help`, or create your own and restart the bot to use them.

>**Note:**
If you don't already have a Discord bot application setup you can create one by going to the 
> [Discord Developer Portal](https://discord.com/developers/applications/me), then create a new application, give it a 
> name, go to the "Bot" tab, then click on "Add Bot", and you're good to go!


## Usage
After adding the bot to a server, call its command via `!bot commandname` where "!bot" is the prefix you defined in 
config.js and "commandname" is the name of a command defined and exported in the `commands` folder.

You can safely delete or modify the example command `talk.js` but it is recommended to keep `help.js`.

## Running the bot permanently
It's recommended that you use a process monitor like [PM2](https://pm2.keymetrics.io/) to run the bot instead of 
just `node`, that way it can be restarted on crashes and monitored.

If you don't want to keep your computer on 24/7 to host the bot, I recommend a $5/month droplet from 
[DigitalOcean](https://m.do.co/c/b96f8bd70573).

(!) When you're done developing your bot, you should set the `DEBUG` value in `.env` to `false`, to avoid filling up your console with unnecessary logs.

## Defining Commands
Simply create a new js file in the `handlers/commands` subdirectory that exports at least a `name`, `description` 
and `usage` string, as well as an `execute()` method. 

You can additionally provide `aliases`, `cooldown` 
and `args`. There are examples for all of these keys and their usage in the 3 example commands.

## Other Handlers
In addition to simple `!command` style handlers, you can easily program the bot to listen and respond to any kind 
of event.

1. Create a subdirectory for the type of handler you want to add, such as the example `keywords` subdirectory.
2. Define at least one handler in that subdirectory, such as the example `handlers/keywords/lahee.js` handler. 
   This handler should export at least an `execute` function and `name` variable.
3. Instantiate a Loader for that subdirectory in `index.js`, for example: `BotLib.loadHandlers(client, 'keywords');` 
   replacing `keywords` with the name of your subdirectory. This will create a collection on the `client` object for 
   that handler type, named after your subdirectory.
3. Create a "dispatcher" in the `dispatchers` subdirectory that exports a `handle` function. This function should accept
   at least the `client` object, and probably the object representing the event you want to handle, such as a `message` 
   or `userReaction` event. The function should find the appropriate handler from the collection created in step 2, and 
   call the `execute()` function on the handler. The function should then return true, if an event was handled.
4. Register the handler in the appropriate event loop in `index.js`. For example, if the handler works on message 
   events,you would add it to the `client.on('message', => {` listener. It can be helpful here to check if the handler 
   executed and force a `return` to avoid unintentionally continuing to process other handlers on the same event.

### Notes
Why is there a ridiculous level of comments? I wrote this package to help someone with little programming experience 
learn how to write a bot. My hope is that people with little experience programming, or just little experience using
node.js will be able to easily create even advanced bots using this "framework".
