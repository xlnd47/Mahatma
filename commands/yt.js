module.exports = {
    name: 'yt',
    aliases : ["play", "joutube"],
	description: "Play music from youtube!",
	execute(message, args) {
        const ytdl = require("ytdl-core");

        var servers = {};
        var command = args[0];

        if (command == "play"){
            const voiceChannel = message.member.voiceChannel;
            if (!voiceChannel) return message.channel.send("Connect to a voicechannel brü");
            const permissions = voiceChannel.permissionsFor(message.client.user);
            if (!permissions.has("CONNECT")){
                return message.channel.send("I cannot connect brü fix this!");
            }

            if (!permissions.has("SPEAK")){
                return message.channel.send("Gimme my permissions man.. cant sing shit right now?!");
            }

            try{
                var connection = await voiceChannel.join();
            }catch(error){
                console.error(error);
                return message.channel.send( error + "\n rip");
            }

            const dispatcher = connection.playStream(ytdl(args[1]))
                .on("end", () => {
                    console.log("song ended");
                    voiceChannel.leave();
                })
                .on("error", error =>{
                    console.error(error);
                });
            dispatcher.setVolume(0.5);




        }

	},
};