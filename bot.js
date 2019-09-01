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

	
	


	
	if(command === `${prefix}table`){
	if(message.author.id == '242118931769196544'){
		var sql = "CREATE TABLE user (id VARCHAR(30), money BIGINT, level TINYINT, exp INT, bio VARCHAR(100), inventory TEXT, streak SMALLINT, stables TINYINT, horses TEXT, hue VARCHAR(7))";
		var sql2 = "CREATE TABLE server (id VARCHAR(30), channel VARCHAR(30), cooldown SMALLINT, bush INT , wildHorse BOOLEAN)";
		var sql3 = "CREATE TABLE horse (owner VARCHAR(30), name VARCHAR(32), energy TINYINT, body VARCHAR(7), mane VARCHAR(7), breed VARCHAR(20), level TINYINT, exp INT, personality VARCHAR(30), currowner VARCHAR(30), iq TINYINT, strength TINYINT, speed TINYINT)";
		var sql4 = "CREATE TABLE encounter (id VARCHAR(30), body VARCHAR(7), mane VARCHAR(7), breed VARCHAR(20), personality VARCHAR(30), fleeRate TINYINT)";
		
		con.query(sql, function (err, result) {
    	if (err) throw err;
    	message.author.send("Created Database for **users**");
  	});
	
		
		con.query(sql2, function (err, result) {
    	if (err) throw err;
    	message.author.send("Created Database for **server**");
  	});
	
	
	con.query(sql3, function (err, result) {
    	if (err) throw err;
    	message.author.send("Created Database for **horses**");
  	});
	}
       
       con.query(sql4, function (err, result) {
    	if (err) throw err;
    	message.author.send("Created Database for **random encounters**");
  	});
	

	}	
		
	
	
	if(message.author.bot) return;
		
	if(message.channel.type === "dm") return;	
//functions
	
	
	function help(){

	let help = new Discord.RichEmbed()

			
			.setTitle("Steel Ball Barn commands")
			.setDescription(`**${prefix}help**: \n Pulls up this list.`)
			.setColor("#942906"); 

		message.author.sendEmbed(help);
		message.reply(" sent you a dm of the help list!");
}
	
function addUser(){
		
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		if(rows.length < 1) {
			
			sql = `INSERT INTO user (id, money, level, exp, bio, inventory, streak, stables, horses, hue) VALUES ('${message.author.id}', ${0}, ${1}, ${0}, '&bio to set your bio', '', ${4}, ${0}, '', '#942906')`;
			con.query(sql, console.log);
			message.channel.send(`User account created! ${prefix}view to view your account!`)
			return;
		}	else {

			message.reply(` You have a user! Do ${prefix}view to see your user`);
			

			
			return;
		}


		});
		
	}
	
	function viewUser(){
		
con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;

		if(rows.length < 1) {
			message.reply(`You have no user! \n Type ${prefix}user to create one!`);
			
			return;
		}

		let money = rows[0].money;
		let bio = rows[0].bio;
		let level = rows[0].level;
		let color = rows[0].hue;
		let exp = rows[0].exp;
		let streak = rows[0].streak;
		let stables = rows[0].stables;
		let horses = rows[0].horses;
		var cap = level * 100;
		var meter = ""
		var percent = exp / cap;
		
for(var i = 0; i < 100; i++){
	if(i < percent){
		meter += "-";
	} else {
		meter += ".";
	}	
}
		
var PixelArt = require('pixel-art');	
const { createCanvas } = require('canvas')	
		const mycanvas = createCanvas(100, 1)	
	var artwork = PixelArt.art(meter)
  .palette({
    '.': '#03a619',
    '-': '#00ff22'
  })
  .pos({ x: 0, y: 0 })
  .scale(16)
  .draw(mycanvas.getContext('2d'));		
	
var art = mycanvas.toBuffer() // defaults to PNG
var fileName = message.author.username + "-32-art.png";
const artPiece = new Discord.Attachment(art, fileName);

		

		let stats = new Discord.RichEmbed()

			
			.setAuthor(message.author.username)
			.attachFile(artPiece)
			.setDescription("Level: " + level + "\n EXP: " + exp + "/" + cap + "\n Carrots: :carrot:" + money + "\n Horses: " + horses + "\n Stables: " + stables + "\n" + bio)
			.setFooter("ID:" + message.author.id, message.author.avatarURL)
			.setColor(color); 

		message.channel.sendEmbed(stats);


		
		

	});

}
	
function viewOtherUser(){
		let other = message.mentions.users.first();
con.query(`SELECT * FROM user WHERE id = '${other.id}'`, (err, rows) => {
		if(err) throw err;

		if(rows.length < 1) {
			message.reply(`You have no user! \n Type ${prefix}user to create one!`);
			
			return;
		}

		let money = rows[0].money;
		let bio = rows[0].bio;
		let level = rows[0].level;
		let color = rows[0].hue;
		let exp = rows[0].exp;
		let streak = rows[0].streak;
		let stables = rows[0].stables;
		let horses = rows[0].horses;
		var cap = level * 100;
		var meter = ""
		var percent = exp / cap;
		
for(var i = 0; i < 100; i++){
	if(i < percent){
		meter += "-";
	} else {
		meter += ".";
	}	
}
		
var PixelArt = require('pixel-art');	
const { createCanvas } = require('canvas')	
		const mycanvas = createCanvas(100, 1)	
	var artwork = PixelArt.art(meter)
  .palette({
    '.': '#03a619',
    '-': '#00ff22'
  })
  .pos({ x: 0, y: 0 })
  .scale(16)
  .draw(mycanvas.getContext('2d'));		
	
var art = mycanvas.toBuffer() // defaults to PNG
var fileName = message.author.username + "-32-art.png";
const artPiece = new Discord.Attachment(art, fileName);

		

		let stats = new Discord.RichEmbed()

			
			.setAuthor(message.author.username)
			.attachFile(artPiece)
			..setDescription("Level: " + level + "\n EXP: " + exp + "/" + cap + "\n Carrots: :carrot:" + money + "\n Horses: " + horses + "\n Stables: " + stables + "\n" + bio)
			.setFooter("ID:" + other.id, other.avatarURL)
			.setColor(color); 

		message.channel.sendEmbed(stats);


		
		

	});

}	
	
function deleteUser(){

con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;

		let sql;
		if(rows.length < 1) {
			message.reply(`You have no user! \n Type ${prefix}user to create one!`);
			
			return;
		} else {
			sql = `DELETE FROM user WHERE id = '${message.author.id}'`;
			con.query(sql, console.log);
			message.reply(`User Deleted! ${prefix}user to create a new one!`);
		}

	});
	return;
}	
	
function bio(){

	

con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;

		if(rows.length < 1) {
			message.reply("You have no user! Type &help for a list of commands!");
			
			return;
		}

		
		let bio = rows[0].bio;
		
				
		if(message.channel.type === "dm"){
			message.author.send("Update your bio! You have 100 characters. \n &cancel to cancel.");
		} else {
			message.channel.send("Update your bio! You have 100 characters. \n &cancel to cancel.");
		}
		const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 100000000 });
        		collector.once('collect', message => {
            		if (message.content == `&cancel`) {
               		 message.channel.send("Message cancelled.");
                		return;
            		} else {
				
				sql = `UPDATE user SET bio = "${message.content}" WHERE id = '${message.author.id}'`;
				con.query(sql);
				if(message.channel.type === "dm"){
			message.author.send("Bio Updated!");
		} else {
			message.channel.send("Bio Updated!");
		}
			}
			});

		
		

	});
				
}		

function hexcolor(){


con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;

		if(rows.length < 1) {
			message.reply("You have no user! Type &help for a list of commands!");
			
			return;
		}

		
		let color = rows[0].hue;
		
		if(message.channel.type === "dm"){
			message.author.send("Update your profile color! Send the hexidecimal for your profile. \n &cancel to cancel.");
		} else {
			message.channel.send("Update your profile color! Send the hexidecimal for your profile. \n &cancel to cancel.");
		}		

		
		const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 100000000 });
        		collector.once('collect', message => {
            		if (message.content == `&cancel`) {
               		 message.channel.send("Message cancelled.");
                		return;
            		} else {
				
				sql = `UPDATE user SET hue = '${message.content}' WHERE id = '${message.author.id}'`;
				con.query(sql);
				message.channel.send("Color Updated!");
			}
			});

		
		

	});

}		
	
//commands	

	if(command === `${prefix}help`){
		help();
}
	
if(command === `${prefix}user`){
		addUser();
}	
	
	if(command === `${prefix}bio`){
		
		

		bio();
	

		 return; 	

} 

if(command === `${prefix}color`){
		

		hexcolor();
	

		 return; 	

}
	
if(command === `${prefix}view` && messageArray[1] === undefined){
	viewUser();
}
	
if(command === `${prefix}view` && messageArray[1] != undefined ){	
	viewOtherUser();
}	
	
if(command === `${prefix}delete`){
	deleteUser();
}	

  
  });


bot.login(process.env.BOT_TOKEN);