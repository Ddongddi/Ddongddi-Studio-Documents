module.exports = {
    name: '밴',
    description: 'ban member',
    async execute(message, args, client, Discord, profileData) {
        if (!message.member.hasPermissions('BAN_MEMBERS')) return msg.reply('권한이 없어요!')
        const member = msg.mentions.users.first()
        const reason = args.slice(1).join(' ')
        if (!member) return msg.reply('맴버를 지정해주세요! `!밴 @맨션 이유`')
        if (!reason) return msg.reply('이유를 작성해주세요! `!밴 @맨션 이유`')
        try {
            member.send(`${reason}로 인해 서버에서 밴되었습니다.`)
            member.ban(reason)
            message.reply(`${reason}으로 인해 서버에서 성공적으로 밴되었습니다!`)
        } catch (error) {
            message.reply('**비상**\n에러 발생')
        }
    }
}