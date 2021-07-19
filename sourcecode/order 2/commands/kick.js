module.exports = {
	name: '킥',
	description: '맴버를 킥한다.',
	async execute(message, args, client, Discord, profileData) {
        if (!message.member.hasPermissions('KICK_MEMBERS')) return msg.reply('권한이 없어요!')
            const member = msg.mentions.users.first()
            const reason = args.slice(1).join(' ')
            if (!member) return msg.reply('맴버를 지정해주세요! `!킥 @맨션 이유`')
            if (!reason) return msg.reply('이유를 작성해주세요! `!킥 @맨션 이유`')
            try {
                member.send(`${reason}로 인해 서버에서 추방되었습니다.`)
                member.kick(reason)
                message.reply(`${reason}으로 인해 서버에서 성공적으로 추방되었습니다!`)
            } catch (error) {
                message.reply('**비상**\n에러 발생')
        }
	}
}