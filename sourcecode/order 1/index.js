const Discord = require('discord.js')
const client = new Discord.Client()
const YTNotifier = require('auto-yt-notifier'), Notif = new YTNotifier({ channel: 'https://www.youtube.com/channel/**********************', check_time: 30 });

client.once('ready', async () => {
    console.log('I am ready')

    client.user.setStatus('online');

      client.user.setActivity('Made by Ddongddi Bot Studio', {type: "PLAYING"})
})

Notif.on('video', (video) => {
    console.log(video);
    client.channels.cache.get('채널 ID').send(`@everyone\n${video.channelName}님이 새 영상을 업로드하셨습니다!\n${video.url}`)
})

client.on('guildMemberAdd', async guildMember => {
    if (guildMember.guild.id === '서버 ID') {
    client.channels.cache.get('채널 ID').send(`<@${guildMember.id}>님, ** 유튜브 채널에 오신것을 환영합니다!\n<#803660308504903681>를 잘 읽고 활동해주세요!`)
}
})

client.on('guildMemberRemove', async guildMember => {
    if (guildMember.guild.id === '서버 ID') {
    client.channels.cache.get('채널 ID').send(`${guildMember.user.tag}님이 서버에서 나가셨습니다.`)
    }
})

client.on('message', async msg => {
    if (msg.guild.id === `서버 ID`) {
    if (msg.author.bot) return
    const args = msg.content.trim().split(/ +/);
    if (msg.content.includes('안녕') || msg.content.includes('hi') || msg.content.includes('hello')) return msg.reply('안녕하세요!')
    if (msg.content === `!유튜브` || msg.content === `!채널`) {
        const embed = new Discord.MessageEmbed()
            .setColor('#D4F638')
            .setTitle('** 유튜브')
            .setURL('https://www.youtube.com/channel/**********************')
            .setThumbnail('https://yt3.ggpht.com/ytc/***************************************************************')
            .setDescription('[** 유튜브입니다!](https://www.youtube.com/channel/**********************)')
        msg.reply(embed)
    }

    if (msg.content.startsWith('!킥')) {
        const member = msg.mentions.users.first()
        const reason = args.slice(1).join(' ')
        try {
            member.send(`${reason}로 인해 ** 유튜브 서버에서 추방되었습니다. https://discord.gg/**********`)
            member.kick(reason)
            msg.reply(`${reason}으로 인해 ** 유튜브 서버에서 성공적으로 추방되었습니다!`)
        } catch (error) {
            msg.reply('**비상**\n에러 발생')
        }
    }
    if (msg.content.startsWith('!밴')) {
        const member = msg.mentions.users.first()
        const reason = args.slice(1).join(' ')
        try {
            member.send(`${reason}로 인해 ** 유튜브 서버에서 밴되었습니다.`)
            member.ban(reason)
            msg.reply(`${reason}으로 인해 ** 유튜브 서버에서 성공적으로 밴되었습니다!`)
        } catch (error) {
            msg.reply('**비상**\n에러 발생')
        }
    }
}
})

client.login('토큰 입력')