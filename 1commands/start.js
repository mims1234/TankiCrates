const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");

module.exports.run = async (bot,message,args) => {

    if(message.author.id != '292675388180791297')
    {
        console.log(message.author.id+ ' is inside this')
        let gRole = message.guild.roles.find(`name`,'Testers');
        if(!gRole) return message.reply(`Couldn't find *"Testers"* role`);
        if(!message.member.roles.has(gRole.id)) return
    }

    userName = message.author.username
    userID = message.author.id

    user = await db.fetch(`${userID}`)

    if(user) return message.channel.send(`User exist`)

        let NewProfile = {
        username: `${userName}`,
        id: `${userID}`,
        crystals: 100,
        rating: 100,
        score: 0,
        level: 1,
        containers:
        {
            BRONZE:100,
            SILVER:0,
            GOLD:0,
            DIAMOND:0,
        },
        roles:
        {
            admin:0,
            helper:0,
            engineer:0
        }
    }

    db.set(`${userID}`,NewProfile)
    message.channel.send(`**${userName} , Your Profile has been created**`)
  
}
module.exports.help = {
    name : "start"
}