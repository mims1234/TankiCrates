const Discord = require("discord.js");
const Prefix = require("../prefix.json");
const fs = require("fs");
const db = require("quick.db");

module.exports.run = async (bot,message,args) => {

    //Admin Access
    if(message.author.id != '292675388180791297')
    {
        let gRole = message.guild.roles.find(`name`,'Members');
        if(!gRole) return message.reply(`Couldn't find *"Testers"* role`);
        if(!message.member.roles.has(gRole.id)) return
    }

    //JSON Reasources
    let textfile = JSON.parse(fs.readFileSync("AGameBase/TextFile.json","utf8"));
    let container = JSON.parse(fs.readFileSync("ADataBase/Containers.json","utf8"));
    let categories = JSON.parse(fs.readFileSync("ADataBase/Categories.json","utf8"));
    let paints = JSON.parse(fs.readFileSync("ADataBase/PaintsDB.json","utf8"));
    let prefix = Prefix.prefix;

    let messageArray = message.content.split(' ')
    let userID = message.author.id

    let Suser = message.author
    let spaminterval =5
        if (Suser.ContainerSpam) {
            if (new Date().getTime() - Suser.ContainerSpam < spaminterval*1000) {
                var CDkey = Object.keys(textfile.Cooldown)
                CODE = Math.floor(Math.random() * CDkey.length)
                cooldown = textfile['Cooldown']
                time = Math.floor(Math.round((spaminterval - (new Date().getTime() - Suser.ContainerSpam) / 1000) * 100) / 100)
                message.channel.send(`**${cooldown[CDkey[CODE]]}** \n*You may use the command in another ${time} seconds*`)
                .then(msg => msg.delete(5000));
                return;
            }
            else { Suser.ContainerSpam = new Date().getTime()}
        }
        else { Suser.ContainerSpam = new Date().getTime()}

    let profile = await db.fetch(`${userID}`,{target : '.username'}) 
    if(!profile) return message.channel.send(`**Use \`${prefix}start\` to make a New Profile**`)

    //var pin = Crates(100,'C',66,'L',33,'A',0);
    //Picker(pin,userID,'BASIC'); 
    //return Test(pin,'BASIC');

    var containerName = messageArray[1];
    if(!containerName) return message.channel.send(`**Please Mention a Container Name**\n\`Basic | Bronze | Silver | Gold | Diamond\`\n**Usage :** \`${prefix}open <container-name>\`\n**Example :** \`${prefix}open Basic\``);
    LcontainerName = containerName.toLowerCase();
    NcontainerName = LcontainerName[0].toUpperCase() + LcontainerName.slice(1)
    switch(NcontainerName)
    {
        case "Basic": try{
                            var pin = Crates(100,'C',66,'L',33,'A',0);
                            Picker(pin,userID,'BASIC');  
                        }
                      catch (e){
                         return message.channel.send(`**:coffee: break , Be back soon ... **`);
                      }
        break;
        case "Bronze": try{
                            var pin = Crates(100,'C',0);
                            Picker(pin,userID,'BRONZE');  
                        }
                      catch (e){
                         return message.channel.send(`**:coffee: break , Be back soon ... **`);
                      }
        break;
        case "Silver": try{
                            var pin = Crates(100,'C',0);
                            Picker(pin,userID,'SILVER');  
                        }
                      catch (e){ 
                         return message.channel.send(`**:coffee: break , Be back soon ... **`);
                      }
        break;
        case "Gold": try{
                            var pin = Crates(100,'C',0);
                            Picker(pin,userID,'GOLD');  
                        }
                      catch (e){
                         return message.channel.send(`**:coffee: break , Be back soon ... **`);
                      }
        break;
        case "Diamond": try{
                            var pin = Crates(100,'C',0);
                            Picker(pin,userID,'DIAMOND');  
                        }
                      catch (e){
                         return message.channel.send(`**:coffee: break , Be back soon ... **`);
                      }
        break;
    }

    //Functions Initialized
    function Test(pin,Container_Name)
    {
        Crate = container[Container_Name]
        var PaintCount = Object.keys(Crate[pin])
        code = Math.floor(Math.random() * PaintCount.length)
        PaintID = PaintCount[code];
        PaintName = paints[PaintID].name
        message.channel.send(`**PaintID :** \`${PaintID}\`\n**Category :** \`${pin}\`\n**Name :** \`${PaintName}\``);
    }

    function Crates(R1,C1,R2,C2,R3,C3,R4,C4,R5,C5,R6,C6,MIN)
    {
        CODE = Math.floor(Math.random() * 100)+1
        if(CODE<=R1 && CODE>R2) return C1
        if(CODE<=R2 && CODE>R3) return C2
        if(CODE<=R3 && CODE>R4) return C3
        if(CODE<=R4 && CODE>R5) return C4
        if(CODE<=R5 && CODE>R6) return C5
        if(CODE<=R6 && CODE>MIN) return C6
    }   

    function HexColor(pin)
    {
        if(pin === 'C') return '#adabab'  //Grey
        if(pin === 'U') return '#4040f9'  //Blue
        if(pin === 'R') return '#7fff00'  //Green
        if(pin === 'E') return '#ffdf33'  //Gold
        if(pin === 'L') return '#ff2400'  //Red
        if(pin === 'A') return '#ff34b3'  //Pink
        if(pin === 'S') return '#b701b7'  //Violet  
    }

    function Picker(pin,userID,Container_Name)
    {
        Crate = container[Container_Name]

        var PaintCount = Object.keys(Crate[pin])
        code = Math.floor(Math.random() * PaintCount.length)

        PaintID = PaintCount[code];
        PaintName = paints[PaintID].name
        PaintURL = paints[PaintID].URL
        PaintType = pin
        HexID = HexColor(pin);

        if(PaintType === 'C') PaintType = 'Common'
        if(PaintType === 'R') PaintType = 'Rare'
        if(PaintType === 'E') PaintType = 'Epic'
        if(PaintType === 'L') PaintType = 'Legendary'
        if(PaintType === 'A') PaintType = 'Artifacts'

        bot.UserData = async (userID, Container_Name, PaintID, PaintName, PaintType, HexID) => {
            UserContainers = await db.fetch(`${userID}`,{target: `.containers.${Container_Name}`})
            UserName = await db.fetch(`${userID}`,{target: `.username`})
            UserPaint = await db.fetch(`${userID}`,{target: `.paints.${PaintID}`})
      
            if(Container_Name === 'BASIC') UserContainers = 1;
            if(UserContainers>0)
            {
                db.subtract(`${userID}`,1,{target: `.containers.${Container_Name}`})
                db.add(`${userID}`,1,{target: `.paints.${pin}.${PaintID}`})
                db.add(`${userID}`,1,{target: `.paints.${pin}.total`})
                db.add(`${userID}`,1,{target: `.totalPaints`})
                db.add(`BOT_paints_${pin}_total`,1)
                db.add(`BOT_paints_${pin}_${PaintID}`,1)
                db.add(`BOT_totalPaints`,1)

                let newEmbed = new Discord.RichEmbed()
                .setAuthor(`${Container_Name} Container`)
                .setColor(HexID)
                .addField(`Congratulations ${UserName}, You got ${PaintName} Paint`,`**${PaintType} Paint** `)
                .setImage(PaintURL);

                message.channel.send(newEmbed);
            }
            else 
            {
                return message.channel.send(`**You do not have ${Container_Name} Containers**`)
            }
        };

        bot.UserData(userID, Container_Name, PaintID, PaintName, PaintType ,HexID) 

    }


}
module.exports.help = {
    name : "open"
}
