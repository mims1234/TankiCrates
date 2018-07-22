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
    let container = JSON.parse(fs.readFileSync("ADataBase/Containers.json","utf8"));
    let categories = JSON.parse(fs.readFileSync("ADataBase/Categories.json","utf8"));
    let paints = JSON.parse(fs.readFileSync("ADataBase/PaintsDB.json","utf8"));
    let paintName = JSON.parse(fs.readFileSync("ADataBase/PaintNameDB.json","utf8"));

    let player = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(player)
    {
            userID = player.id
    }
    else{
            userID = message.author.id
    }
    let prefix = Prefix.prefix;
    let Suser = message.author
    let spaminterval =5
        if (Suser.PaintWikiSpam) {
            if (new Date().getTime() - Suser.PaintWikiSpam < spaminterval*1000) {
                var CDkey = Object.keys(textfile.Cooldown)
                CODE = Math.floor(Math.random() * CDkey.length)
                cooldown = textfile['Cooldown']
                time = Math.floor(Math.round((spaminterval - (new Date().getTime() - Suser.PaintWikiSpam) / 1000) * 100) / 100)
                message.channel.send(`**${cooldown[CDkey[CODE]]}** \n*You may use the command in another ${time} seconds*`)
                .then(msg => msg.delete(5000));
                return;
            }
            else { Suser.PaintWikiSpam = new Date().getTime()}
        }
        else { Suser.PaintWikiSpam = new Date().getTime()}

    let profile = await db.fetch(`${userID}`,{target : '.username'}) 
    if(player)
    {
            if(!profile) return message.channel.send(`**:file_folder: | ${player.displayName} does not have a Profile yet**`)
    }
    else{
            if(!profile) return message.channel.send(`**Use \`${prefix}start\` to make a New Profile**`)
    }

    bot.Page = async (message, question, limit = 60000) => {
    const filter = m => m.author.id === message.author.id;
    await message.channel.send(question);
        try {
        const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
        return collected.first().content;
        } catch (e) {
        return false;
        }
    };

    bot.Paint = async (message, page, limit = 60000) => {
    const filter = m => m.author.id === message.author.id;

    var PaintNames = Object.keys(paintName)
    j=1,k=1;
    pg1='\n',pg2='\n',pg3='\n',pg4='\n',pg5='\n',pg6='\n',pg7='\n',pg8='\n',pg9='\n',pg10='\n'
    pg11='\n',pg12='\n',pg13='\n',pg14='\n',pg15='\n',pg16='\n',pg17='\n',pg18='\n',pg19='\n',pg20='\n',
    pg21='\n'
    for(var i in PaintNames)
    {
        //return console.log(i);
        if(j%8===1) k=1;
        if(j<=8){ pg1 = pg1 + `\n[${k}] ${PaintNames[i]}`}
        if(j>8 && j<=16){ pg2 = pg2 + `\n[${k}] ${PaintNames[i]}`}
        if(j>16 && j<=24){ pg3 = pg3 + `\n[${k}] ${PaintNames[i]}`}
        if(j>24 && j<=32){ pg4 = pg4 + `\n[${k}] ${PaintNames[i]}`}
        if(j>32 && j<=40){ pg5 = pg5 + `\n[${k}] ${PaintNames[i]}`}
        if(j>40 && j<=48){ pg6 = pg6 + `\n[${k}] ${PaintNames[i]}`}
        if(j>48 && j<=56){ pg7 = pg7 + `\n[${k}] ${PaintNames[i]}`}
        if(j>56 && j<=64){ pg8 = pg8 + `\n[${k}] ${PaintNames[i]}`}
        if(j>64 && j<=72){ pg9 = pg9 + `\n[${k}] ${PaintNames[i]}`}
        if(j>72 && j<=80){ pg10 = pg10 + `\n[${k}] ${PaintNames[i]}`}
        if(j>80 && j<=88){ pg11 = pg11 + `\n[${k}] ${PaintNames[i]}`}
        if(j>88 && j<=96){ pg12 = pg12 + `\n[${k}] ${PaintNames[i]}`}
        if(j>96 && j<=104){ pg13 = pg13 + `\n[${k}] ${PaintNames[i]}`}
        if(j>104 && j<=112){ pg14 = pg14 + `\n[${k}] ${PaintNames[i]}`}
        if(j>112 && j<=120){ pg15 = pg15 + `\n[${k}] ${PaintNames[i]}`}
        if(j>120 && j<=128){ pg16 = pg16 + `\n[${k}] ${PaintNames[i]}`}
        if(j>128 && j<=136){ pg17 = pg17 + `\n[${k}] ${PaintNames[i]}`}
        if(j>136 && j<=144){ pg18 = pg18 + `\n[${k}] ${PaintNames[i]}`}
        if(j>144 && j<=152){ pg19 = pg19 + `\n[${k}] ${PaintNames[i]}`}
        if(j>152 && j<=160){ pg20 = pg20 + `\n[${k}] ${PaintNames[i]}`}
        if(j>160 && j<=161){ pg21 = pg21 + `\n[${k}] ${PaintNames[i]}`}
        j=j+1
        k=k+1
    }

    if(page === '1'){ question = pg1}
    if(page === '2'){ question = pg2}
    if(page === '3'){ question = pg3}
    if(page === '4'){ question = pg4}
    if(page === '5'){ question = pg5}
    if(page === '6'){ question = pg6}
    if(page === '7'){ question = pg7}
    if(page === '8'){ question = pg8}
    if(page === '9'){ question = pg9}
    if(page === '10'){ question = pg10}
    if(page === '11'){ question = pg11}
    if(page === '12'){ question = pg12}
    if(page === '13'){ question = pg13}
    if(page === '14'){ question = pg14}
    if(page === '15'){ question = pg15}
    if(page === '16'){ question = pg16}
    if(page === '17'){ question = pg17}
    if(page === '18'){ question = pg18}
    if(page === '19'){ question = pg19}
    if(page === '20'){ question = pg20}
    if(page === '21'){ question = pg21}

     await message.channel.send("**Paint Menu**```haskell\n"+question+"\n\nType 'exit' to close the men```");
        try {
        const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
        return collected.first().content;
        } catch (e) {
        return false;
        }
    };

    var PaintNames = Object.keys(paintName)
    userID = message.author.id

    Page = await bot.Page(message,textfile['QPaintWiki'].Qpage)
    if(Page === 'exit') return message.channel.send(textfile['QPaintWiki'].exit)
    if(Page === false) return message.channel.send(textfile['QPaintWiki'].NoEntry)
    if(!(Page>=1 && Page<22)) return message.channel.send(textfile['QPaintWiki'].InvalidEntry)
    Paint = await bot.Paint(message,Page)
    if(Paint === 'exit') return message.channel.send(textfile['QPaintWiki'].exit)
    if(Paint === false) return message.channel.send(textfile['QPaintWiki'].NoEntry)
    if(!(Paint>=1 && Paint<11)) return message.channel.send(textfile['QPaintWiki'].InvalidEntry)

    var PaintPos = (((Page - 1) * 8) + parseInt(Paint)) 

    PaintN = PaintNames[PaintPos-1]
    PaintName = paintName[PaintN].name
    PaintID = paintName[PaintN].id
    PaintURL = paintName[PaintN].URL
    PaintType = categories[PaintID]
    
    UserPaint = await db.fetch(`${userID}`,{target: `.paints.${PaintType}.${PaintID}`})
    if(!UserPaint) UserPaint = 0

    if(PaintType === 'C') PaintType = 'Common'
    if(PaintType === 'R') PaintType = 'Rare'
    if(PaintType === 'E') PaintType = 'Epic'
    if(PaintType === 'L') PaintType = 'Legendary'
    if(PaintType === 'A') PaintType = 'Artifacts'
    if(PaintType === 'S') PaintType = 'Special'

    let Embed = new Discord.RichEmbed()
    .setAuthor('Paint Wiki')
    .addField(`${PaintName} - ${PaintType}`,`**${profile} has ${UserPaint} of these**`)
    .setImage(PaintURL);

    await message.channel.send(Embed)
    //await message.channel.send(`Testing Text:\n PageText = ${Page}\n PaintNumber = ${Paint}\n PaintType = ${categories['186ANI014']}`)


}
module.exports.help = {
    name : "paintwiki"
}
