const Discord = require('discord.js')
const client = new Discord.Client()
const mongoose = require('mongoose')
const profileModel = require('./models/profileSchema')
const fs = require('fs')
const { mongodb, prefix, token } = require('./config.json')

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', async () => {
    console.log('I am Ready!')

    client.user.setStatus('online');

    client.user.setActivity('Made by Ddongddi Bot Studio', { type: "PLAYING" })
})

client.on('guildMemberAdd', async guildMember => {
    let profile = await profileModel.create({
        userID: guildMember.id,
        serverID: guildMember.guild.id,
        warning: 0,
        work: false
    });
    profile.save();
})

client.on('message', async msg => {
    if (msg.author.bot) return

    let profileData;
    try {
        profileData = await profileModel.findOne({ userID: msg.author.id })
        if (!profileData) {
            let profile = await profileModel.create({
                userID: msg.author.id,
                serverID: msg.guild.id,
                warning: 0,
                work: false
            });
            profile.save();
        }



    } catch (error) {
        console.log(error)
    }
    if (!msg.content.startsWith(prefix) || msg.author.bot) return
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift();
    const command = client.commands.get(commandName);
    try {
        command.execute(msg, args, client, Discord, profileData);
    } catch (error) {
        console.log(error);
    }
})

mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('database connected!')
}).catch((err) => {
    console.log(err)
})

client.login(token)