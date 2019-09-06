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
	var me = bot.users.get('242118931769196544');
	let yeet = new Discord.RichEmbed()

			
			.setTitle("Update Live!")
			.setColor("#1f3c5b")
			.setTimestamp()
			.setFooter("Version 0.7.0", bot.user.avatarURL);
	me.send(yeet);
	
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
		var sql5 = "ALTER TABLE horse ADD item VARCHAR(30)";
		
		con.query(sql5, function (err, result) {
    	if (err) throw err;
    	message.author.send("Added column in **horse** for **equippable item**");
  	});
	
		
// 		con.query(sql2, function (err, result) {
//     	if (err) throw err;
//     	message.author.send("Created Database for **server**");
//   	});
	
	
// 	con.query(sql3, function (err, result) {
//     	if (err) throw err;
//     	message.author.send("Created Database for **horses**");
//   	});
// 	}
       
//        con.query(sql4, function (err, result) {
//     	if (err) throw err;
//     	message.author.send("Created Database for **random encounters**");
//   	});
	
}
	}	
		
	
	
	if(message.author.bot) return;
	
	
function inventory(){
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		let stuff = rows[0].inventory;
		if(rows.length < 1) {
			
			if(message.channel.type === "dm"){
			message.author.send("Create an account with `&user`!");
		} else {
			message.channel.send("Create an account with `&user`!");
		}
			
			
		}	else {

 			if(message.channel.type === "dm"){
			message.author.send("Inventory: **" + stuff + "**");
		} else {
			message.channel.send("Inventory: **" + stuff + "**");
		}
			
			
			
		}
			});
		return;
	}	
	
if(command === `${prefix}items`){
		inventory();
}		
		
	if(message.channel.type === "dm") return;	
//functions
	
	
	function help(){

	let help = new Discord.RichEmbed()

			
			.setTitle("Steel Ball Barn commands")
			.setDescription(`**${prefix}help**: \n Pulls up this list. \n **${prefix}user**: \n Creates a user. \n **${prefix}view**: \n Views your user data. \n **${prefix}view [mention]**: \n Views another user's data. \n **${prefix}delete**: \n Deletes your user, horses, and all items attached to said user. \n **${prefix}shop**: \n Pulls up the shop list. \n **${prefix}daily**: \n Collects a daily amount of carrots. \n **${prefix}bio**: \n Creates a bio for your account. \n **${prefix}color**: \n Changes the color of your user account.`)
			.setColor("#942906"); 

		message.author.sendEmbed(help);
		message.reply(" sent you a dm of the help list!");
}
	
function addUser(){
		
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		if(rows.length < 1) {
			
			sql = `INSERT INTO user (id, money, level, exp, bio, inventory, streak, stables, horses, hue) VALUES ('${message.author.id}', ${0}, ${1}, ${0}, '&bio to set your bio', '', ${0}, ${4}, '', '#942906')`;
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
		const mycanvas = createCanvas(400, 2)	
	var artwork = PixelArt.art(meter)
  .palette({
    '.': '#03a619',
    '-': '#00ff22'
  })
  .pos({ x: 0, y: 0 })
  .scale(2)
  .draw(mycanvas.getContext('2d'));		
	
var art = mycanvas.toBuffer() // defaults to PNG
var fileName = message.author.username + "-32-art.png";
const artPiece = new Discord.Attachment(art, fileName);

		

		let stats = new Discord.RichEmbed()

			
			.setAuthor(message.author.username)
			.attachFile(artPiece)
			.setDescription("Level: " + level + "\n EXP: " + exp + "/" + cap + "\n Carrots: " + money + ":carrot:'s \n Horses: " + horses + "\n Stables: " + stables + "\n" + bio)
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
		const mycanvas = createCanvas(400, 2)	
	var artwork = PixelArt.art(meter)
  .palette({
    '.': '#03a619',
    '-': '#00ff22'
  })
  .pos({ x: 0, y: 0 })
  .scale(2)
  .draw(mycanvas.getContext('2d'));		
	
var art = mycanvas.toBuffer() // defaults to PNG
var fileName = message.author.username + "-32-art.png";
const artPiece = new Discord.Attachment(art, fileName);

		

		let stats = new Discord.RichEmbed()

			
			.setAuthor(message.author.username)
			.attachFile(artPiece)
			.setDescription("Level: " + level + "\n EXP: " + exp + "/" + cap + "\n Carrots: " + money + ":carrot:'s  \n Horses: " + horses + "\n Stables: " + stables + "\n" + bio)
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
	
	function daily(){
		
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;
		var money = rows[0].money;	
		var check;

		if(rows.length < 1) {
			message.reply(`You have no user! \n Type ${prefix}user to create one!`);
			
			return;
		}	

		if (dailyCD.has(message.author.id)) {
            message.reply("You have already collected your daily check!");
            return;
    } else {
    	
    		check = 1000;


    	sql = `UPDATE user SET money = ${money + check} WHERE id = '${message.author.id}'`;
          
        con.query(sql); 
	   			 
           message.reply(" got " + check + " :carrot:'s!");
        // Adds the user to the set so that they can't talk for a minute
       dailyCD.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          dailyCD.delete(message.author.id);
        }, (1000*60*60*24));

    }
	});
	}


	function shop(){
		let help = new Discord.RichEmbed()

			
			.setTitle("S.B.B SHOP &buy [item] to purchase!")
			.setDescription("**hay** - 10 :carrot:'s \n Used to recover 1 stamina point. \n **bait** - 50 :carrot:'s \n Used to lure a common wild horse! \n **goodBait** - 500 :carrot:'s \n Used to lure more uncommon wild horses! \n **proBait** - 5000 :carrot:'s \n Used to lure slighty rarer wild horses! \n **apple** - 200 :carrot:'s \n Used to help capture wild horses. Decreases flee rate by 10%. \n **bigApple** - 500 :carrot:'s \n Used to help capture wild horses. Decreases flee rate by 25%. \n **stable** - 5000 :carrot:'s \n An empty slot for a new horse. \n **saddle** - 10,000 :carrot:'s \n An equippable device that allows you to ride or race a horse. \n **plow** - 50,000 :carrot:'s \n An equippable device that allows your horse to manage crops. \n **playPen** - 100,000 :carrot:'s \n Equippable device used to increase training on horses. \n **horseManual** - 1,000,000 :carrot:'s \n Displays stats and odds of capture when using bait to encounter horses.")
			.setColor("#942906"); 

		message.author.send(help);
		message.reply(" Sent you the shop list to your dms!")
	}	

function encounter(){
	con.query(`SELECT * FROM encounter WHERE id = '${message.guild.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;	
		var personalities = ["simple", "stubborn", "sporadic", "cautious", "hasty", "gentle", "patient"];
		var personality = personalities[Math.floor(Math.random() * 6)];
		var mane = '#'+Math.floor(Math.random()*16777215).toString(16);
		var body = '#'+Math.floor(Math.random()*16777215).toString(16);
		
			
	
	
		if(rows.length < 1) {
		
		var poses = ["normal", "lookBack", "eating", "leaping"];
		var sprite = poses[Math.floor(math.random * 1)];	
			
			sql = `INSERT INTO encounter (id, body, mane, breed, personality, fleeRate) VALUES ('${message.guild.id}', '${body}', '${mane}', '${sprite}', '${personality}', ${0})`;
			con.query(sql, console.log);
			
	var pose = [
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxbxbxxxxxxxxxxxxxxxxxx',
	'xxxmmbxxxxxxxxxxxxxxxxxx',
	'xxbbbbmxxxxxxxxxxxxxxxxx',
	'bbbhbbmxxxxxxxxxxxxxxxxx',
	'bbbbbbmmxxxxxxxxxxxxxxxx',
	'xxxbbbmmxxxxxxxxxxxxxxxx',
	'xxxbbbmmmmxxxxxxxxxxxxxx',
	'xxxbbbbbbbbbbmmxxxxxxxxx',
	'xxxbbbbbbbbbbbmmxxxxxxxx',
	'xxxbbbbbbbbbbbmmxxxxxxxx',
	'xxxbbbbbbbbbbbmmxmxxxxxx',
	'xxxbbbbbbbbbbbmmmmxxxxxx',
	'xxxbxbxxxxxbxbxmmxxxxxxx',
	'xxxbxbxxxxxbxbxxxxxxxxxx',
	'xxxbxbxxxxxbxbxxxxxxxxxx',
	'xxxbxbxxxxxbxbxxxxxxxxxx',
	'xxxhxhxxxxxhxhxxxxxxxxxx'];
	var pose2 = [
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxbxbxxxxxxxxxxxxxxxxxx',
	'xxxmmbxxxxxxxxxxxxxxxxxx',
	'mxmbbbbxxxxxxxxxxxxxxxxx',
	'mmmbbhbbbxxxxxxxxxxxxxxx',
	'mmmbbhbbbxxxxxxxxxxxxxxx',
	'xmmbbbxxxxxxxxxxxxxxxxxx',
	'xmmbbbmmmmxxxxxxxxxxxxxx',
	'mmmbbbbmbbbbbxmmxxmxxxxx',
	'xmmbbbbbbbbbbbxmmxxmxxxx',
	'xxxbbbbbbbbbbbxmmxmmxxxxx',
	'xxxbbbbbbbbbbbxmmmmmxxxx',
	'xxxbbbbbbbbbbbxxmmmxxxxx',
	'xxxbxbxxxxxbxbxxxxxxxxxx',
	'xxxbxbxxxxxbxxbxxxxxxxxx',
	'xxxbxbxxxxxbxxbxxxxxxxxx',
	'xxxbxbxxxxxbxxbxxxxxxxxx',
	'xxxhxhxxxxxhxxhxxxxxxxxx'
	];
	var pose3 = [
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxbxbxxxxxxxxxxxxxxxxxx',
	'xxxmmbxxxxxxxxxxxxxxxxxx',
	'mxmbbbbxxxxxxxxxxxxxxxxx',
	'mmmbbhbbbxxxxxxxxxxxxxxx',
	'mmmbbhbbbxxxxxxxxxxxxxxx',
	'xmmbbbxxxxxxxxxxxxxxxxxx',
	'xmmbbbmmmmxxxxxxxxxxxxxx',
	'mmmbbbbmbbbbbxmmxxmxxxxx',
	'xmmbbbbbbbbbbbxmmxxmxxxx',
	'xxxbbbbbbbbbbbxmmxmmxxxxx',
	'xxxbbbbbbbbbbbxmmmmmxxxx',
	'xbxbbbbbbbbbbbxxmmmxxxxx',
	'xbmmxxbbxxxbxbxxxxxxxxxx',
	'xbbbbbxbxxxbxxbxxxxxxxxx',
	'xbhbbxxbxxxbxxbxxxxxxxxx',
	'bbbbxxxbxxxbxxbxxxxxxxxx',
	'bbbxxxxhxxxhxxhxxxxxxxxx'
	];
	var pose4 = [];		
	
	var jojoRef;
	if(sprite == "normal"){
		jojoRef = pose;	
	} else if(sprite == "lookBack"){
		jojoRef = pose2;	
	} else if(sprite == "eating"){
		jojoRef = pose3;	
	} else if(sprite == "leaping"){
		jojoRef = pose4;	
	}			
			
			var PixelArt = require('pixel-art');	
const { createCanvas } = require('canvas')	
		const mycanvas = createCanvas(600, 600)	
	var artwork = PixelArt.art(
		jojoRef[0],
		jojoRef[1],
		jojoRef[2],
		jojoRef[3],
		jojoRef[4],
		jojoRef[5],
		jojoRef[6],
		jojoRef[7],
		jojoRef[8],
		jojoRef[9],
		jojoRef[10],
		jojoRef[11],
		jojoRef[12],
		jojoRef[13],
		jojoRef[14],
		jojoRef[15],
		jojoRef[16],
		jojoRef[17],
		jojoRef[18],
		jojoRef[19],
		jojoRef[20],
		jojoRef[21],
		jojoRef[22],
		jojoRef[23]
	)
  .palette({
    'm': mane,
    'b': body,
    'h': '#000000'	  
  })
  .pos({ x: 0, y: 0 })
  .scale(24)
  .draw(mycanvas.getContext('2d'));		
	
var art = mycanvas.toBuffer() // defaults to PNG
var fileName = message.author.username + "-32-art.png";
const artPiece = new Discord.Attachment(art, fileName);
			
			let item = new Discord.RichEmbed()

			.setTitle(`A wild horse has appeared, type ${prefix}approach try and catch it!`)
			.attachFile(artPiece)
			.setImage(url.href)
			.setColor("#a57400");

		room.sendEmbed(item);
			
			
		}	
		
		else {
		message.channel.send("The wild horse fled!");	
		var poses = ["normal", "lookBack", "eating", "leaping"];
		var sprite = poses[Math.floor(math.random * 1)];	
		sql = `UPDATE encounter SET body = '${body}', mane = '${mane}', breed = '${sprite}', personality = '${personality}', fleeRate = ${0} WHERE id = '${message.guild.id}'`
			con.query(sql);	
			var pose = [
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxbxbxxxxxxxxxxxxxxxxxx',
	'xxxmmbxxxxxxxxxxxxxxxxxx',
	'xxbbbbmxxxxxxxxxxxxxxxxx',
	'bbbhbbmxxxxxxxxxxxxxxxxx',
	'bbbbbbmmxxxxxxxxxxxxxxxx',
	'xxxbbbmmxxxxxxxxxxxxxxxx',
	'xxxbbbmmmmxxxxxxxxxxxxxx',
	'xxxbbbbbbbbbbmmxxxxxxxxx',
	'xxxbbbbbbbbbbbmmxxxxxxxx',
	'xxxbbbbbbbbbbbmmxxxxxxxx',
	'xxxbbbbbbbbbbbmmxmxxxxxx',
	'xxxbbbbbbbbbbbmmmmxxxxxx',
	'xxxbxbxxxxxbxbxmmxxxxxxx',
	'xxxbxbxxxxxbxbxxxxxxxxxx',
	'xxxbxbxxxxxbxbxxxxxxxxxx',
	'xxxbxbxxxxxbxbxxxxxxxxxx',
	'xxxhxhxxxxxhxhxxxxxxxxxx'];
	var pose2 = [
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxbxbxxxxxxxxxxxxxxxxxx',
	'xxxmmbxxxxxxxxxxxxxxxxxx',
	'mxmbbbbxxxxxxxxxxxxxxxxx',
	'mmmbbhbbbxxxxxxxxxxxxxxx',
	'mmmbbhbbbxxxxxxxxxxxxxxx',
	'xmmbbbxxxxxxxxxxxxxxxxxx',
	'xmmbbbmmmmxxxxxxxxxxxxxx',
	'mmmbbbbmbbbbbxmmxxmxxxxx',
	'xmmbbbbbbbbbbbxmmxxmxxxx',
	'xxxbbbbbbbbbbbxmmxmmxxxxx',
	'xxxbbbbbbbbbbbxmmmmmxxxx',
	'xxxbbbbbbbbbbbxxmmmxxxxx',
	'xxxbxbxxxxxbxbxxxxxxxxxx',
	'xxxbxbxxxxxbxxbxxxxxxxxx',
	'xxxbxbxxxxxbxxbxxxxxxxxx',
	'xxxbxbxxxxxbxxbxxxxxxxxx',
	'xxxhxhxxxxxhxxhxxxxxxxxx'
	];
	var pose3 = [
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxbxbxxxxxxxxxxxxxxxxxx',
	'xxxmmbxxxxxxxxxxxxxxxxxx',
	'mxmbbbbxxxxxxxxxxxxxxxxx',
	'mmmbbhbbbxxxxxxxxxxxxxxx',
	'mmmbbhbbbxxxxxxxxxxxxxxx',
	'xmmbbbxxxxxxxxxxxxxxxxxx',
	'xmmbbbmmmmxxxxxxxxxxxxxx',
	'mmmbbbbmbbbbbxmmxxmxxxxx',
	'xmmbbbbbbbbbbbxmmxxmxxxx',
	'xxxbbbbbbbbbbbxmmxmmxxxxx',
	'xxxbbbbbbbbbbbxmmmmmxxxx',
	'xbxbbbbbbbbbbbxxmmmxxxxx',
	'xbmmxxbbxxxbxbxxxxxxxxxx',
	'xbbbbbxbxxxbxxbxxxxxxxxx',
	'xbhbbxxbxxxbxxbxxxxxxxxx',
	'bbbbxxxbxxxbxxbxxxxxxxxx',
	'bbbxxxxhxxxhxxhxxxxxxxxx'
	];
	var pose4 = [];		
	
	var jojoRef;
	if(sprite == "normal"){
		jojoRef = pose;	
	} else if(sprite == "lookBack"){
		jojoRef = pose2;	
	} else if(sprite == "eating"){
		jojoRef = pose3;	
	} else if(sprite == "leaping"){
		jojoRef = pose4;	
	}			
			
			var PixelArt = require('pixel-art');	
const { createCanvas } = require('canvas')	
		const mycanvas = createCanvas(600, 600)	
	var artwork = PixelArt.art(
		jojoRef[0],
		jojoRef[1],
		jojoRef[2],
		jojoRef[3],
		jojoRef[4],
		jojoRef[5],
		jojoRef[6],
		jojoRef[7],
		jojoRef[8],
		jojoRef[9],
		jojoRef[10],
		jojoRef[11],
		jojoRef[12],
		jojoRef[13],
		jojoRef[14],
		jojoRef[15],
		jojoRef[16],
		jojoRef[17],
		jojoRef[18],
		jojoRef[19],
		jojoRef[20],
		jojoRef[21],
		jojoRef[22],
		jojoRef[23]
		
	)
  .palette({
    'm': mane,
    'b': body,
    'h': '#000000'	  
  })
  .pos({ x: 0, y: 0 })
  .scale(24)
  .draw(mycanvas.getContext('2d'));		
	
var art = mycanvas.toBuffer() // defaults to PNG
var fileName = message.author.username + "-32-art.png";
const artPiece = new Discord.Attachment(art, fileName);
			
			let item = new Discord.RichEmbed()

			.setTitle(`A wild horse has appeared, type ${prefix}approach try and catch it!`)
			.attachFile(artPiece)
			.setImage(url.href)
			.setColor("#a57400");

		room.sendEmbed(item);
		}
		
		});
	
}
		
function spawn(){
		var appear = Math.floor(Math.random() * 100) + 1;
		
		if(appear == 100){
			
			
			encounter();	
		} else {
			
			
			return;	
		}
	}	

function timeSpawn(){
		var appear = Math.floor(Math.random() * 200) + 1;
		
		if(appear == 200){
			
			
			encounter();	
		} else {
			
			
			return;	
		}
	}		


		
spawn();
setInterval(timeSpawn(), 2000);

function viewHorse(){
	con.query(`SELECT * FROM horse WHERE owner = '${message.username.id}' AND name = '${messageArray[1]}'`, (err, rows) => {	
				if(err) throw err;
		let sql;
		let name = rows[0].name;
		let stamina = rows[0].energy;
		let body = rows[0].body;
		let mane = rows[0].mane;
		let breed = rows[0].breed;
		let level = rows[0].level;
		let exp = rows[0].exp;
		let personality = rows[0].personality;
		let currowner = rows[0].currowner;
		let iq = rows[0].iq;
		let strength = rows[0].strength;
		let speed = rows[0].speed;
		var cap = level * 100;
		
		if(rows.length < 1) {
			message.reply("Such horse doesn't exist!");
			return;
		} else {
			
			
			var pose = [
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxbxbxxxxxxxxxxxxxxxxxx',
	'xxxmmbxxxxxxxxxxxxxxxxxx',
	'xxbbbbmxxxxxxxxxxxxxxxxx',
	'bbbhbbmxxxxxxxxxxxxxxxxx',
	'bbbbbbmmxxxxxxxxxxxxxxxx',
	'xxxbbbmmxxxxxxxxxxxxxxxx',
	'xxxbbbmmmmxxxxxxxxxxxxxx',
	'xxxbbbbbbbbbbmmxxxxxxxxx',
	'xxxbbbbbbbbbbbmmxxxxxxxx',
	'xxxbbbbbbbbbbbmmxxxxxxxx',
	'xxxbbbbbbbbbbbmmxmxxxxxx',
	'xxxbbbbbbbbbbbmmmmxxxxxx',
	'xxxbxbxxxxxbxbxmmxxxxxxx',
	'xxxbxbxxxxxbxbxxxxxxxxxx',
	'xxxbxbxxxxxbxbxxxxxxxxxx',
	'xxxbxbxxxxxbxbxxxxxxxxxx',
	'xxxhxhxxxxxhxhxxxxxxxxxx'];
	var pose2 = [
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxbxbxxxxxxxxxxxxxxxxxx',
	'xxxmmbxxxxxxxxxxxxxxxxxx',
	'mxmbbbbxxxxxxxxxxxxxxxxx',
	'mmmbbhbbbxxxxxxxxxxxxxxx',
	'mmmbbhbbbxxxxxxxxxxxxxxx',
	'xmmbbbxxxxxxxxxxxxxxxxxx',
	'xmmbbbmmmmxxxxxxxxxxxxxx',
	'mmmbbbbmbbbbbxmmxxmxxxxx',
	'xmmbbbbbbbbbbbxmmxxmxxxx',
	'xxxbbbbbbbbbbbxmmxmmxxxxx',
	'xxxbbbbbbbbbbbxmmmmmxxxx',
	'xxxbbbbbbbbbbbxxmmmxxxxx',
	'xxxbxbxxxxxbxbxxxxxxxxxx',
	'xxxbxbxxxxxbxxbxxxxxxxxx',
	'xxxbxbxxxxxbxxbxxxxxxxxx',
	'xxxbxbxxxxxbxxbxxxxxxxxx',
	'xxxhxhxxxxxhxxhxxxxxxxxx'
	];
	var pose3 = [
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxxxxxxxxxxxxxxxxxxxxxx',
	'xxxbxbxxxxxxxxxxxxxxxxxx',
	'xxxmmbxxxxxxxxxxxxxxxxxx',
	'mxmbbbbxxxxxxxxxxxxxxxxx',
	'mmmbbhbbbxxxxxxxxxxxxxxx',
	'mmmbbhbbbxxxxxxxxxxxxxxx',
	'xmmbbbxxxxxxxxxxxxxxxxxx',
	'xmmbbbmmmmxxxxxxxxxxxxxx',
	'mmmbbbbmbbbbbxmmxxmxxxxx',
	'xmmbbbbbbbbbbbxmmxxmxxxx',
	'xxxbbbbbbbbbbbxmmxmmxxxxx',
	'xxxbbbbbbbbbbbxmmmmmxxxx',
	'xbxbbbbbbbbbbbxxmmmxxxxx',
	'xbmmxxbbxxxbxbxxxxxxxxxx',
	'xbbbbbxbxxxbxxbxxxxxxxxx',
	'xbhbbxxbxxxbxxbxxxxxxxxx',
	'bbbbxxxbxxxbxxbxxxxxxxxx',
	'bbbxxxxhxxxhxxhxxxxxxxxx'
	];
	var pose4 = [];		
	
	var jojoRef;
	if(sprite == "normal"){
		jojoRef = pose;	
	} else if(sprite == "lookBack"){
		jojoRef = pose2;	
	} else if(sprite == "eating"){
		jojoRef = pose3;	
	} else if(sprite == "leaping"){
		jojoRef = pose4;	
	}			
			
			var PixelArt = require('pixel-art');	
const { createCanvas } = require('canvas')	
		const mycanvas = createCanvas(600, 600)	
	var artwork = PixelArt.art(
		jojoRef[0],
		jojoRef[1],
		jojoRef[2],
		jojoRef[3],
		jojoRef[4],
		jojoRef[5],
		jojoRef[6],
		jojoRef[7],
		jojoRef[8],
		jojoRef[9],
		jojoRef[10],
		jojoRef[11],
		jojoRef[12],
		jojoRef[13],
		jojoRef[14],
		jojoRef[15],
		jojoRef[16],
		jojoRef[17],
		jojoRef[18],
		jojoRef[19],
		jojoRef[20],
		jojoRef[21],
		jojoRef[22],
		jojoRef[23]
		
	)
  .palette({
    'm': mane,
    'b': body,
    'h': '#000000'	  
  })
  .pos({ x: 0, y: 0 })
  .scale(24)
  .draw(mycanvas.getContext('2d'));		
	
var art = mycanvas.toBuffer() // defaults to PNG
var fileName = message.author.username + "-32-art.png";
const artPiece = new Discord.Attachment(art, fileName);
			
			let item = new Discord.RichEmbed()

			.setTitle(currowner + `'s horse: ` + name)
			.attachFile(artPiece)
			.setImage(url.href)
			.setDescription("Lvl: " + level + "\n Exp: " + exp + "/" + cap + "/n" + personality +  "/n Stamina: " + stamina + "\n IQ: " + iq + "\n Strength: " + strength + "\n Speed: " + speed )
			.setColor(body);

		room.sendEmbed(item);
		}	
	});	
}	
	
function approach(){
	con.query(`SELECT * FROM encounter WHERE id = '${message.guild.id}'`, (err, rows) => {
		if(err) throw err;
	
		let sql;
		let sql2;
		let breed = rows[0].breed;
		var level = Math.floor(Math.random() * 10) + 1;
		var personality = rows[0].personality;
		var iq = Math.floor(Math.random() * 100) + 10;
		var strength = Math.floor(Math.random() * 10) + 1;
		var stamina = Math.floor(Math.random() * 10) + 1;
		var speed = Math.floor(Math.random() * 10) + 1;
		var fleeRate = strength + stamina + speed + (iq / 5);
		var mane = rows[0].mane;
		var body = rows[0].body;
		
		if(personality == "gentle") {
		 strength -= 1;
		 speed -= 1;	
		 iq += 10
		}	else if(personality == "stubborn") {
		 strength += 1;
		 stamina += 2;	
		 iq -= 10;	
		} else if(personality == "sporadic") {	
		var chance = Math.floor(Math.random() * 1);	
		 strength += Math.floor(Math.random() * 3);
		 stamina += Math.floor(Math.random() * 3);
		 speed += Math.floor(Math.random() * 3);
		if(chance == 0 && iq > 25){		
		 iq -= Math.floor(Math.random() * 25);	
		} else {
		 iq += Math.floor(Math.random() * 25);		
		}	
		} else if(personality == "cautious") {
		 strength += 1;
		 stamina -= 1;	
		 speed += 2;	
		 iq += 5;	
		} else if(personality == "hasty") {
		 strength += 2;
		 stamina -= 1;
		 speed += 2	
		 iq -= 10;	
		} else if(personality == "patient") {
		 stamina += 2;	
		 speed -= 1;		
		 iq += 10;	
		} else {
			
		}
		
		sql = `UPDATE encounter fleeRate = ${fleeRate} WHERE id = '${message.guild.id}'`
		con.query(sql);
		console.log("flee rate online for: " + fleeRate)
		con.query(`SELECT * FROM user WHERE id = '${message.username.id}'`, (err, rows) => {
		if(err) throw err;
		
		let sql3;
		let items = rows[0].inventory;	
		let horses = rows[0].horses;	
			
		function battle(){
		
		let item = new Discord.RichEmbed()

			.setTitle(`What will ` +  message.author.username + ` do?`)
			.setDescription("```&tame \n &items \n &use [item] \n &flee```")
			.setColor("#a57400");
		
		message.send(item);
		const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 100000000 });
        		collector.once('collect', message => {
            		if (message.content == `&flee`) {
               		 message.channel.send(message.author.username +" got away safely!");	
                		return;
            		} else if (message.content == `&tame`) {
               		 message.channel.send(message.author.username +" approaches the horse...");
			 message.channel.send(".");
			 message.channel.send(".");
			 message.channel.send(".");
			var success = Math.floor(Math.random() * 100) + 1;
			if(success <= fleeRate){
				sql2 = `DELETE FROM encounter WHERE id = '${message.guild.id}'`;
				con.query(sql2);	 
				setTimeout(message.channel.send("The wild horse fled!"), 300);
				  
			}	else{
				con.query(`SELECT * FROM horse WHERE owner = '${message.username.id}' AND name = 'newHorse'`, (err, rows) => {	
				if(err) throw err;
				let sql4;	
				var horseName;	
				if(rows.length < 1) {
					message.reply(" what would you like to name your horse?")
					const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 100000000 });
        		collector.once('collect', message => {
            		if (items.indexOf(message.context) != -1) {
               	 		horseName = message.context + "" + (Math.random() * 1000);
                		
            		} else {
				horseName = message.context;
			  }
			});
					sql4 = `INSERT INTO horse (owner, name, energy, body, mane, breed, level, exp, personality, currowner, iq, strength, speed) VALUES ('${message.author.id}', '${horseName}', ${stamina}, '${body}', '${mane}', '${breed}', ${1}, ${0}, '${personality}', '${message.author.username}', ${iq}, ${strength}, ${speed})`;
					con.query(sql4, console.log);
					message.reply(" got a new horse " + horseName + "! \n View your horse data with **&check [horse name]**.");
					
				}	else {
					message.channel.send("You already have a new horse!");
					return;
				}	
					
					
					
				});	
				setTimeout(message.channel.send("The wild horse has been tamed!"), 300);
					   }		   
                		return;
            		} else if (message.content == `${prefix}use apple`) {
				if(items.indexOf("apple") != -1){
 					
 					sql2 = `UPDATE encounter SET fleeRate = ${fleeRate * .1} WHERE id = '${message.guild.id}'`;
 					con.query(sql2, console.log);
 					var used = items.replace('apple\n','');
 					used = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
 					con.query(used, console.log);
 					message.channel.send("The horse enjoyed the apple!");
 					battle();
 					 
 				} else {
 					message.channel.send("You don't have this item!");
					battle();
 				}
			} else if (message.content == `${prefix}use bigApple`) {
				if(items.indexOf("bigApple") != -1){
 					
 					sql2 = `UPDATE encounter SET fleeRate = ${fleeRate * .25} WHERE id = '${message.guild.id}'`;
 					con.query(sql2, console.log);
 					var used = items.replace('bigApple\n','');
 					used = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
 					con.query(used, console.log);
 					message.channel.send("The horse really enjoyed the big apple!");
 					battle();
 					 
 				} else {
 					message.channel.send("You don't have this item!");
					battle();
 				}
			} else if (message.content == `${prefix}use goldenApple`) {
				if(items.indexOf("goldenApple") != -1){
 					
 					sql2 = `UPDATE encounter SET fleeRate = ${fleeRate * .5} WHERE id = '${message.guild.id}'`;
 					con.query(sql2, console.log);
 					var used = items.replace('goldenApple\n','');
 					used = `UPDATE user SET inventory = '${used}' WHERE id = '${message.author.id}'`;
 					con.query(used, console.log);
 					message.channel.send("The horse extremely enjoyed the golden apple!");
 					battle();
 					 
 				} else {
 					message.channel.send("You don't have this item!");
					battle();
 				}
			} else if (message.content == `${prefix}items`) {
				setTimeout(battle(), 200);
			}
				else {
				message.channel.send("Invalid input!");
				battle();	
			}	
			});
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
	
if(command === `${prefix}daily`){
		daily();
}	

if(command === `${prefix}shop`){
		shop();
}	

		if(command === `${prefix}buy` && messageArray[1] === `apple`){
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;	
		let stuff = rows[0].inventory;
		if(rows.length < 1) {
			message.reply("You have no user! Create one with &user");
			console.log(rows);
			return;
		}

		let money = rows[0].money;
		var items = stuff + "\n" + messageArray[1];
		if(money < 200) {
			message.channel.send("Insufficient Funds.");
			return;
		}
		
		sql = `UPDATE user SET money = ${money - 200}, inventory = '${items}'  WHERE id = '${message.author.id}'`;
		con.query(sql);		
		message.channel.send("You bought an apple!");

		});
	} if(command === `${prefix}buy` && messageArray[1] === `bigApple`){
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;	
		let stuff = rows[0].inventory;
		if(rows.length < 1) {
			message.reply("You have no user! Create one with &user");
			console.log(rows);
			return;
		}

		let money = rows[0].money;
		var items = stuff + "\n" + messageArray[1];
		if(money < 500) {
			message.channel.send("Insufficient Funds.");
			return;
		}
		
		sql = `UPDATE user SET money = ${money - 500}, inventory = '${items}'  WHERE id = '${message.author.id}'`;
		con.query(sql);		
		message.channel.send("You bought an bigApple!");

		});
	} if(command === `${prefix}buy` && messageArray[1] === `hay`){
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;	
		let stuff = rows[0].inventory;
		if(rows.length < 1) {
			message.reply("You have no user! Create one with &user");
			console.log(rows);
			return;
		}

		let money = rows[0].money;
		var items = stuff + "\n" + messageArray[1];
		if(money < 10) {
			message.channel.send("Insufficient Funds.");
			return;
		}
		
		sql = `UPDATE user SET money = ${money - 10}, inventory = '${items}'  WHERE id = '${message.author.id}'`;
		con.query(sql);		
		message.channel.send("You bought some hay!");

		});
	} if(command === `${prefix}buy` && messageArray[1] === `bait`){
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;	
		let stuff = rows[0].inventory;
		if(rows.length < 1) {
			message.reply("You have no user! Create one with &user");
			console.log(rows);
			return;
		}

		let money = rows[0].money;
		var items = stuff + "\n" + messageArray[1];
		if(money < 50) {
			message.channel.send("Insufficient Funds.");
			return;
		}
		
		sql = `UPDATE user SET money = ${money - 50}, inventory = '${items}'  WHERE id = '${message.author.id}'`;
		con.query(sql);		
		message.channel.send("You bought some bait!");

		});
	} if(command === `${prefix}buy` && messageArray[1] === `goodBait`){
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;	
		let stuff = rows[0].inventory;
		if(rows.length < 1) {
			message.reply("You have no user! Create one with &user");
			console.log(rows);
			return;
		}

		let money = rows[0].money;
		var items = stuff + "\n" + messageArray[1];
		if(money < 500) {
			message.channel.send("Insufficient Funds.");
			return;
		}
		
		sql = `UPDATE user SET money = ${money - 500}, inventory = '${items}'  WHERE id = '${message.author.id}'`;
		con.query(sql);		
		message.channel.send("You bought some goodBait!");

		});
	} if(command === `${prefix}buy` && messageArray[1] === `proBait`){
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;	
		let stuff = rows[0].inventory;
		if(rows.length < 1) {
			message.reply("You have no user! Create one with &user");
			console.log(rows);
			return;
		}

		let money = rows[0].money;
		var items = stuff + "\n" + messageArray[1];
		if(money < 5000) {
			message.channel.send("Insufficient Funds.");
			return;
		}
		
		sql = `UPDATE user SET money = ${money - 5000}, inventory = '${items}'  WHERE id = '${message.author.id}'`;
		con.query(sql);		
		message.channel.send("You bought proBait!");

		});
	} if(command === `${prefix}buy` && messageArray[1] === `stable`){
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;	
		let stuff = rows[0].inventory;
		if(rows.length < 1) {
			message.reply("You have no user! Create one with &user");
			console.log(rows);
			return;
		}

		let money = rows[0].money;
		var items = stuff + "\n" + messageArray[1];
		if(money < 5000) {
			message.channel.send("Insufficient Funds.");
			return;
		}
		
		sql = `UPDATE user SET money = ${money - 5000}, inventory = '${items}'  WHERE id = '${message.author.id}'`;
		con.query(sql);		
		message.channel.send("You bought a stable!");

		});
	} if(command === `${prefix}buy` && messageArray[1] === `saddle`){
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;	
		let stuff = rows[0].inventory;
		if(rows.length < 1) {
			message.reply("You have no user! Create one with &user");
			console.log(rows);
			return;
		}

		let money = rows[0].money;
		var items = stuff + "\n" + messageArray[1];
		if(money < 10000) {
			message.channel.send("Insufficient Funds.");
			return;
		}
		
		sql = `UPDATE user SET money = ${money - 10000}, inventory = '${items}'  WHERE id = '${message.author.id}'`;
		con.query(sql);		
		message.channel.send("You bought a saddle!");

		});
	} if(command === `${prefix}buy` && messageArray[1] === `plow`){
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;	
		let stuff = rows[0].inventory;
		if(rows.length < 1) {
			message.reply("You have no user! Create one with &user");
			console.log(rows);
			return;
		}

		let money = rows[0].money;
		var items = stuff + "\n" + messageArray[1];
		if(money < 50000) {
			message.channel.send("Insufficient Funds.");
			return;
		}
		
		sql = `UPDATE user SET money = ${money - 50000}, inventory = '${items}'  WHERE id = '${message.author.id}'`;
		con.query(sql);		
		message.channel.send("You bought a plow!");

		});
	} if(command === `${prefix}buy` && messageArray[1] === `playPen`){
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;	
		let stuff = rows[0].inventory;
		if(rows.length < 1) {
			message.reply("You have no user! Create one with &user");
			console.log(rows);
			return;
		}

		let money = rows[0].money;
		var items = stuff + "\n" + messageArray[1];
		if(money < 100000) {
			message.channel.send("Insufficient Funds.");
			return;
		}
		
		sql = `UPDATE user SET money = ${money - 100000}, inventory = '${items}'  WHERE id = '${message.author.id}'`;
		con.query(sql);		
		message.channel.send("You bought a playPen!");

		});
	} if(command === `${prefix}buy` && messageArray[1] === `horseManual`){
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;
		let sql;	
		let stuff = rows[0].inventory;
		if(rows.length < 1) {
			message.reply("You have no user! Create one with &user");
			console.log(rows);
			return;
		}

		let money = rows[0].money;
		var items = stuff + "\n" + messageArray[1];
		if(money < 1000000) {
			message.channel.send("Insufficient Funds.");
			return;
		}
		
		sql = `UPDATE user SET money = ${money - 1000000}, inventory = '${items}'  WHERE id = '${message.author.id}'`;
		con.query(sql);		
		message.channel.send("You bought a horseManual!");

		});
	}
	
	
if(command === `${prefix}approach`){
	
		con.query(`SELECT * FROM encounter WHERE id = '${message.guild.id}'`, (err, rows) => {
		if(err) throw err;
		
		if(rows.length < 1) {
			message.reply("No horse to approach!");
			return;
		} 	else {
			
		con.query(`SELECT * FROM user WHERE id = '${message.author.id}'`, (err, rows) => {
		if(err) throw err;	
		let stables = rows[0].stables;
			
		if(rows.length < 1) {
			message.reply("You have no user! Create one with &user");
			console.log(rows);
			return;
		} else {
			
		approach();
		}
		});
		}	
	});		
			
}	
	
if(command === `${prefix}check` && messageArray[1] != undefined ){	
	viewHorse();
}	
  
			  
			  
  });


bot.login(process.env.BOT_TOKEN);
