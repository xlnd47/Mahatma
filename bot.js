const fs = require("fs");
const Discord = require("discord.js"); // We Call The Packages.
// const PREFIX = "<"; // You can change this Prefix to whatever you want.
const PREFIX = process.env.PREFIX;

var bot = new Discord.Client();

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

// Events.
bot.on("ready", function() {
    bot.user.setGame(`Ghandi`);
    console.log(`${bot.user.username} is Ready!`);
});

bot.on("message", function(message) {

    if (!message.content.startsWith(prefix) || message.author.bot) return;
    
    var args = message.content.substring(PREFIX.length).split(" ");
    var command = args[0].toLowerCase();

    if (!bot.commands.has(command)) return;

    try {
        bot.commands.get(command).execute(message, args);
    } catch (error){
        console.error(error);
        message.reply("There was an error trying to execute that command!");
    }
    
    

});

// Bot Login.
// bot.login('YourAwesomeBotToken');
bot.login(process.env.BOT_TOKEN);
