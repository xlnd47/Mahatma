module.exports = {
    name: 'yt',
    aliases : ["play", "joutube"],
	description: "Play music from youtube!",
	execute(message, args) {
		const fs = require("fs");
        const Discord = require("discord.js");
        const client = new Discord.Client();
        const config = require("../config.json");
        const ytdl = require("ytdl-core");

        function play(connection, message) {
        var server = servers[message.guild.id];
        
        server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly", quality: "lowest", highWaterMark: "2000"}));
            
        server.queue.shift();
        
        server.dispatcher.on("end", function(){
            if (server.queue[0]) play(connection, message);
            else connection.disconnect();
            
        });
        }

        var servers = {};


        exports.run = (client, message, args) => {
        
        let link = args[0];
        
        if(!link) return message.reply("Please provide a youtube link.");
        

        
        if(!message.member.voiceChannel) return message.reply("Please go in a voicechannel.");
        
        if(!servers[message.guild.id]) servers[message.guild.id] = {
            queue : []
            
            
        };
        
        var server = servers[message.guild.id];
        
        server.queue.push(args[0]);
        
        if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
            play(connection, message);
            
        });
        
        
            //message.channel.send("pong!").catch(console.error);
        }
	},
};