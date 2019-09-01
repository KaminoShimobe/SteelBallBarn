const Discord = require("discord.js");
const mysql = require("mysql");
const http = require('http');
const pixel = require('pixel-art');
const dailyCD = new Set();
const raceCD = new Set();
const commandCD = new Set();
const prefix = "&";
const bot = new Discord.Client({disableEveryone: true})


var con_fig = {
	host: "us-cdbr-iron-east-02.cleardb.net",
	user: "ba70974f187526",
	password: process.env.MY_SQL,
	database: "heroku_2433a99852a1991",
	port: 3306
};

var con;

function handleDisconnect() {
con = mysql.createConnection(con_fig);
con.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  }); 	

process.on('uncaughtException', function (err) {
    console.log(err);
	
}); 
	


con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
       throw err;                                 // server variable configures this)
    }
});
       }



handleDisconnect();

bot.on("ready", async () => {

	console.log(`Bot is ready bois! ${bot.user.username}`);
  bot.user.setPresence({ status: 'online', game: { name: '&help'} });
  
  try {

		let link = await bot.generateInvite(["ADMINISTRATOR"]);

		console.log(link);

	}	catch(e) {

		console.log(e.stack);

	}



});

bot.on("message", async message => {
	
	let messageArray = message.content.split(" ");

	let command = messageArray[0];

	let args = messageArray.slice(1);

	
	


	


		
	
	
	if(message.author.bot) return;
	
	function help(){

	let help = new Discord.RichEmbed()

			
			.setTitle("Steel Ball Barn commands")
			.setDescription(`**${prefix}help**: \n Pulls up this list.`)
			.setColor("#942906"); 

		message.author.sendEmbed(help);
		message.reply(" sent you a dm of the help list!");
}

	if(command === `${prefix}help`){
		help();
}
	
  
  });


bot.login(process.env.BOT_TOKEN);
