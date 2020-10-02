# Simple Discord JS Bot

A very simple Discord bot written with discord.js

## Prerequisites
 * Node JS >= 12.0.0
 * NPM >= 6.9.0
 * Git

## Setup
Do `git clone https://github.com/bredmor/simple-discord-js-bot.git` then navigate to the folder named `simple-discord-js-bot`.

Use `npm install` to install all the dependencies.

Enter the command prefix you want to use, and your discord bot API token in `config.json`

Use `node index.js` to start the bot

That's it! It's recommended that you use a process monitor like [PM2](https://pm2.keymetrics.io/) to run the bot instead of just `node`,
that way it can be restarted on crashes and monitored.

>**Note:**
If you don't already have a Discord bot application setup you can create one by going to the [Discord Developer Portal](https://discord.com/developers/applications/me), then create a new application, give it a name, go to the "Bot" tab, then click on "Add Bot", and you're good to go!

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
