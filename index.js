//TankiCrates BOT
const BotPrefix = require("./prefix.json");
const Discord = require("discord.js");
const db = require("quick.db");

var firebase = require(`firebase`);

firebase.initializeApp({
    serviceAccount:"./mims-firebase-service-test.json",
    databaseURL: "https://mims-project.firebaseio.com/"
})

const fs = require("fs");
const ms = require("ms");

//let profile = JSON.parse(fs.readFileSync("GameBase/garage.json","utf8"));

const bot =  new Discord.Client();
bot.commands = new Discord.Collection();
bot.testing = new Discord.Collection();
bot.admin = new Discord.Collection();

//Commands Folder
propsCountC = 0;
fs.readdir("./1commands/", (err,files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.lenglth <= 0)
    {
        console.log("Couldn't find commands");
        return;
    }
    jsfile.forEach((f,i) => {
            let props = require(`./1commands/${f}`);
            propsCountC = propsCountC + 1
            bot.commands.set(props.help.name, props);
    })
    console.log(propsCountC+' files loaded in [ 1commands ] folder')
});

//Commands Folder
propsCountT = 0;
fs.readdir("./2testing/", (err,files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.lenglth <= 0)
    {
        console.log("Couldn't find commands");
        return;
    }
    jsfile.forEach((f,i) => {
            let props = require(`./2testing/${f}`);
            propsCountT = propsCountT + 1
            bot.commands.set(props.help.name, props);
    })
    console.log(propsCountT+' files loaded in [ 2testing ] folder')
});

//Commands Folder
propsCountA = 0;
fs.readdir("./3admin/", (err,files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.lenglth <= 0)
    {
        console.log("Couldn't find commands");
        return;
    }
    jsfile.forEach((f,i) => {
            let props = require(`./3admin/${f}`);
            propsCountA = propsCountA + 1
            bot.commands.set(props.help.name, props);
    })
    console.log(propsCountA+' files loaded in [ 3admin ] folder')
});

//Bot Start
bot.on("ready" , async () => {
    console.log(`${bot.user.username} is online !`);
    if(!bot.on) return console.log("nodemon index.js")
    bot.user.setActivity("with crates", {type :"PLAYING"});
});

//Bot Message input initiation
bot.on("message", async message => {
    //if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    //db.add(`globalMessages_${message.author.id}`,1)
    //db.add(`guildMessages_${message.guild.id}_${message.author.id}`,1)

    let prefix = BotPrefix.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

//Prefix Checker for Folder commands
    if(message.content.startsWith(prefix))
    {
        let commandfile = bot.commands.get(cmd.slice(prefix.length));
        if(commandfile) commandfile.run(bot,message,args);
    }
    if(message.content.startsWith(prefix))
    {
        let commandfile = bot.testing.get(cmd.slice(prefix.length));
        if(commandfile) commandfile.run(bot,message,args);
    }
    if(message.content.startsWith(prefix))
    {
        let commandfile = bot.admin.get(cmd.slice(prefix.length));
        if(commandfile) commandfile.run(bot,message,args);
    }

    if(cmd === 'becuz')
    {
        message.channel.send('Becuz Am Batman :bat:');
    }

});
//Key To Run BOT
bot.login(process.env.token);
