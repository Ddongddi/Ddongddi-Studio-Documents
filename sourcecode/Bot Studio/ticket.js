const Discord = require('discord.js')
module.exports = (client) => {
    const messageID = '메시지 ID'
    const ASID = '메시지 ID'
    const ruleID = '메시지 ID'
    const guild = client.guilds.cache.get('서버 ID')
    client.on('messageReactionAdd', async (reaction, user) => {
        if (reaction.message.id === messageID) {
            var search = await guild.channels.cache.find(channel => channel.name === `신청-${user.id}`)
            if (!search) {
                var channel = await guild.channels.create(`신청-${user.id}`, {
                    type: 'text',
                    parent: '카테고리 ID',
                    permissionOverwrites: [
                        {
                            id: guild.roles.everyone.id,
                            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                        },
                        {
                            id: user.id,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                        }
                    ]
                })

                const embed = await new Discord.MessageEmbed()
                    .setTitle('신청 채널 생성됨')
                    .setColor('872F00')
                    .setDescription('원하는 봇의 기능과 이름 등을 알려주세요!')
                channel.send('@here', embed)
                reaction.users.remove(user.id)
            } else {
                user.send('한번만 신청하실 수 있습니다.')
                reaction.users.remove(user.id)
            }
        }
        if (reaction.message.id === ASID) {
            var search = await guild.channels.cache.find(channel => channel.name === `상담-${user.id}`)
            if (!search) {
                var channel = await guild.channels.create(`상담-${user.id}`, {
                    type: 'text',
                    parent: '카테고리 ID',
                    permissionOverwrites: [
                        {
                            id: guild.roles.everyone.id,
                            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                        },
                        {
                            id: user.id,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                        }
                    ]
                })

                const embed = await new Discord.MessageEmbed()
                    .setTitle('상담 채널 생성됨')
                    .setColor('872F00')
                    .setDescription('봇 서비스에 대해 물어보세요!')
                channel.send('@here', embed)
                reaction.users.remove(user.id)
            } else {
                user.send('한 채널로만 상담하실 수 있습니다.')
                reaction.users.remove(user.id)
            }
        }
        if (reaction.message.id === ruleID) {
            const role = guild.roles.cache.get('역할 ID');
            const member = guild.members.cache.get(user.id)
            member.roles.add(role)
        }
    })

    client.on('messageReactionRemove', async (reaction, user) => {
        if (reaction.message.id === ruleID) {
            const role = guild.roles.cache.get('역할 ID');
            const member = guild.members.cache.get(user.id)
            member.roles.remove(role)
        }
    })
}