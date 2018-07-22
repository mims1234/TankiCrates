const Discord = require("discord.js");
const Prefix = require("../prefix.json");
const fs = require("fs");
const db = require("quick.db");

module.exports.run = async (bot,message,args) => {

    if(message.author.id != '292675388180791297')
    {
        console.log(message.author.id+ ' is inside this')
        let gRole = message.guild.roles.find(`name`,'Members');
        if(!gRole) return message.reply(`Couldn't find *"Testers"* role`);
        if(!message.member.roles.has(gRole.id)) return
    }

    let textfile = JSON.parse(fs.readFileSync("AGameBase/TextFile.json","utf8"));

    let messageArray = message.content.split(' ');
    let player = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(player)
    {
            PaintMenu = messageArray[2]
            userID = player.id
    }
    else{
            PaintMenu = messageArray[1]
            userID = message.author.id
    }

    let prefix = Prefix.prefix;

    let Suser = message.author
    let spaminterval =3
        if (Suser.ProfileSpam) {
            if (new Date().getTime() - Suser.ProfileSpam < spaminterval*1000) {
                var CDkey = Object.keys(textfile.Cooldown)
                CODE = Math.floor(Math.random() * CDkey.length)
                cooldown = textfile['Cooldown']
                time = Math.floor(Math.round((spaminterval - (new Date().getTime() - Suser.ProfileSpam) / 1000) * 100) / 100)
                message.channel.send(`**${cooldown[CDkey[CODE]]}** \n*You may use the command in another ${time} seconds*`)
                .then(msg => msg.delete(5000));
                return;
            }
            else { Suser.ProfileSpam = new Date().getTime()}
        }
        else { Suser.ProfileSpam = new Date().getTime()}

    let profile = await db.fetch(`${userID}`,{target : '.username'}) 
    if(player)
    {
            if(!profile) return message.channel.send(`**:file_folder: | ${player.displayName} does not have a Profile yet**`)
    }
    else{
            if(!profile) return message.channel.send(`**Use \`${prefix}start\` to make a New Profile**`)
    }

    if(PaintMenu != 'paints')
    {
        UserName = await db.fetch(`${userID}`,{target: `.username`})
        Crystals = await db.fetch(`${userID}`,{target: `.crystals`})
        Rating = await db.fetch(`${userID}`,{target: `.rating`})
        Scores = await db.fetch(`${userID}`,{target: `.score`})
        Level = await db.fetch(`${userID}`,{target: `.level`})
        TotalPaints = await db.fetch(`${userID}`,{target: `.totalPaints`})
        if(!TotalPaints) TotalPaints = 0

        TPC = await db.fetch(`${userID}`,{target: `.paints.C.total`})
        TPR = await db.fetch(`${userID}`,{target: `.paints.R.total`})
        TPE = await db.fetch(`${userID}`,{target: `.paints.E.total`})
        TPL = await db.fetch(`${userID}`,{target: `.paints.L.total`})
        TPA = await db.fetch(`${userID}`,{target: `.paints.A.total`})

        if(!TPC) TPC = 0
        if(!TPR) TPR = 0
        if(!TPE) TPE = 0
        if(!TPL) TPL = 0
        if(!TPA) TPA = 0

        TCB = await db.fetch(`${userID}`,{target: `.containers.BRONZE`})
        TCS = await db.fetch(`${userID}`,{target: `.containers.SILVER`})
        TCG = await db.fetch(`${userID}`,{target: `.containers.GOLD`})
        TCD = await db.fetch(`${userID}`,{target: `.containers.DIAMOND`})
        TotalContainers = TCB +TCS + TCG + TCD;

        if(player)
        {
                UserIcon = player.user.avatarURL;
        }
        else{
                UserIcon = message.member.user.avatarURL
        }

        let Embed = new Discord.RichEmbed()
        .setAuthor(UserName+' Profile',UserIcon)
        .setThumbnail(UserIcon)
        .setColor("#00bca3")
        .addField('Inventory',`
        **Crystals** : *${Crystals}*
        **Total Crates** : *${TotalContainers}*
        **Total Paints** : *${TotalPaints}*
        -------------------------`)
                .addField('Paints',`
        **Common** : *${TPC}*
        **Rare** : *${TPR}*
        **Epic** : *${TPE}*
        **Legenday** : *${TPL}*
        **Artefact** : *${TPA}*
        -------------------------`)
                .addField('Containers',`
        **Bronze** : *${TCB}*
        **Silver** : *${TCS}*
        **Gold** : *${TCG}*
        **Diamond** : *${TCD}*
        -------------------------`)
        //            .setFooter('Hints: $profile paints <type> & $profile preview <type> <paint-name>');

        message.channel.send(Embed);
    }
//     else
//     {
//         bot.inventoryMenu = async(message,limit = 60000) => {
//                 const filter = m => m.author.id = message.author.id
//                 IMArray = [1,2,3,4,5,6];
//                 await message.channel.send('**Paint Menu**\n```dsconfig\nPlease select a paint type :\n\n[1] Common\n[2] Rare\n[3] Epic\n[4] Legendary\n[5] Artifact\n[6] Exit```');
//         try {
//                 const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
//                 for(var i in IMArray)
//                 {
//                         if(collected === i) { return collected.first().content; }
//                         else { return errors}
//                 }

//         } catch (e) {
//                 return false;
//         }
//         };

//         const resp = bot.inventoryMenu(message)
//         if(resp != false)
//         {
//                 switch(resp)
//                 {
//                         case "1": 
//                         break;
//                         case "2": 
//                         break;
//                         case "3": 
//                         break;
//                         case "4": 
//                         break;
//                         case "5": 
//                         break;
//                         case "6": message.channel.send('**Exit Menu**') 
//                         break;
//                 }
//         }
//     }

}
module.exports.help = {
    name : "inv"
}
