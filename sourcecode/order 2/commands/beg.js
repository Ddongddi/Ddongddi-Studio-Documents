const profileModel = require('../models/profileSchema')
module.exports = {
    name: '경고',
    description: '맴버에게 경고를 부여합니다.',
    async execute(message, args, client, Discord, profileData) {
        if (!message.member.hasPermissions('KICK_MEMBERS')) return msg.reply('권한이 없어요!')
        const member = message.mentions.users.first()
        const reason = args.slice(1).join(' ')
        if (!member) return message.reply('맴버를 지정해주세요! `!경고 @맨션 이유')
        if (!reason) return message.reply('이유를 알려주세요! `!경고 @맨션 이유')
        const check = await profileModel.findOne({
            userID: member.id,
            serverID: message.guild.id
        })

        if (check.warning == 4) {
            message.channel.send(`${member.user.username}님이 너무 많은 경고로 퇴장되었습니다.`)
            member.kick()
        }

        if (check.warning == 9) {
            message.channel.send(`${member.user.username}님이 너무 많은 경고로 차단되었습니다.`)
            member.ban()
        }

        try {
            const response = await profileModel.findOneAndUpdate({
                userID: member.id,
                serverID: message.guild.id
            },
                {
                    $inc: {
                        warning: +1
                    },
                })

            const warn = response.warning + 1
            const embed = new Discord.MessageEmbed()
        .setColor('#00FF40')
        .setTitle('경고 지급')
        .addFields(
            {name: `경고 요청자`, value: `${message.author}`},
            {name: `경고 대상자`, value: `${member}`},
            {name: `경고 이유`, value: `${reason}`},
            {name: `경고 횟수`, value: `${warn}`},
        )
        message.channel.send(embed)
        } catch (err) { message.reply('에러가 발생했어요! 봇 스튜디오에 문의하세요!') }
        
    }
}