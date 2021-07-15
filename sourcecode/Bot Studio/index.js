const Discord = require('discord.js')
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
const { token } = require('./config.json')
const ticket = require('./ticket')

client.once('ready', () => {
    console.log('hello, welcome')
    ticket(client)
})

client.on('message', async msg => {
    if (msg.content == '!embed') {
        const embed = new Discord.MessageEmbed()
            .setTitle('상담 안내')
            .setColor('980000')
            .setDescription('밑에 ☎ 이모지를 클릭하여 상담을 신청해보세요!')
            .addFields(
                { name: 'AS 안내', value: 'AS 혹은 기능 추가 기간은 봇 스튜디오가 문을 닫거나 별도의 공지 없이는 계속됩니다.' },
                { name: '가격 안내', value: '저희 봇 스튜디오는 무료입니다!' },
                { name: '소요 시간', value: '소요 시간은 개발자의 일정에 따라 실시간으로 달라지며, 짧으면 2시간, 길면 한달까지 걸릴 수 있습니다.' },
                { name: '서비스 종료', value: '디스코드 ToS를 위반하시거나, 커뮤니티 가이드라인을 위반하는 경우에는 서비스가 종료됩니다.\n자세한 사항은 <#859005226962780160>을 확인하세요.' },
            )
        await msg.channel.send(embed).then(sentMessage => {
            sentMessage.react('☎')
        })
    }
    if (msg.content == '!봇신청완료') {
        if (msg.author.id == '유저 ID') {
            if (msg.channel.name.startsWith('신청-')) {
                var userid = msg.channel.name.split('신청-')[1]
                msg.channel.overwritePermissions(
                    [
                        {
                            id: msg.guild.roles.everyone.id,
                            deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                        },
                        {
                            id: userid,
                            allow: ['VIEW_CHANNEL'],
                            deny: ['SEND_MESSAGES']
                        }
                    ]
                )
                const embed = new Discord.MessageEmbed()
                    .setColor('872F00')
                    .setTitle('주문번호')
                    .setDescription(`당신의 주문번호는 **${userid}** 입니다.\n꼭 기억해주세요!`)
                    .setFooter('모든 주문번호는 고객의 아바타 id로 결정됩니다.')
                msg.channel.send(embed)
                const user = client.users.cache.get(userid)
                var channel = await msg.guild.channels.create(`${user.username}님의 봇 🔴- 0%`, {
                    type: 'voice',
                    parent: '카테고리 ID',
                })
                const rolepeople = msg.guild.members.cache.get(userid)
                const role = msg.guild.roles.cache.get('역할 ID')
                rolepeople.roles.add(role)
            }
        }
    }

    if (msg.content === '!rule') {
        msg.delete()
        const embed = new Discord.MessageEmbed()
            .setTitle('서비스 약관 안내')
            .setColor('980000')
            .setDescription('https://www.ddongddi.kro.kr 에서 확인 가능합니다.\n밑에 ✅ 이모지를 클릭해서 서비스를 이용해보세요!')
            .setFooter('밑의 이모지를 클릭하시면 서비스 약관에 동의하시는 겁니다.')
    await msg.channel.send(embed).then(sentMessage => {
        sentMessage.react('✅')
    })
}
})

client.login('토큰 입력')