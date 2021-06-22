# Simple Discord JS Bot

A very simple Discord bot written with discord.js

## Prerequisites
 * Node JS >= 12.0.0
 * NPM >= 6.9.0
 * Git

## Setup
1. Clone this repository: `git clone https://github.com/bredmor/simple-discord-js-bot.git` then navigate to the new folder named `simple-discord-js-bot`
2. Install dependencies with `npm i`
3. Edit `config.json`, replacing the placeholder values with your desired command prefix and your bot token (If you don't have one yet, see the note below on how to generate one.)
4. Start the bot with `node index.js`
5. Add the bot to the server of your choice by filling out the details in this handy application https://discordapi.com/permissions.html#7168 and clicking the generated link.

That's it! You can now try out the default commands like `!bot help`, or create your own and restart the bot to use them.

>**Note:**
If you don't already have a Discord bot application setup you can create one by going to the [Discord Developer Portal](https://discord.com/developers/applications/me), then create a new application, give it a name, go to the "Bot" tab, then click on "Add Bot", and you're good to go!

## Running the bot permanently
It's recommended that you use a process monitor like [PM2](https://pm2.keymetrics.io/) to run the bot instead of just `node`,
that way it can be restarted on crashes and monitored.

If you don't want to keep your computer on 24/7 to host the bot, I recommend a $5/month droplet from [DigitalOcean](https://m.do.co/c/b96f8bd70573).

## Defining Commands
Simply create a new js file in the `commands` subdirectory that exports at least a `name`, `description` 
and `usage` string, as well as an `execute()` method. 

You can additionally provide `aliases`, `cooldown` 
and `args`. There are examples for all of these keys and their usage in the 3 example commands.

## Usage
After adding the bot to a server, call its command via `!bot commandname` where "!bot" is the prefix you defined in config.js
and "commandname" is the name of a command defined and exported in the `commands` folder.

You can safely delete or modify the example commands `talk.js` and `weather.js` but it is recommended to keep `help.js`.

### Notes
Why is there a ridiculous level of comments? I wrote this package to help someone with little programming experience learn how to write a bot.

I have not updated any of this since I wrote it, but I have bots still using it that haven't crashed in well over a year.
