module.exports = {
	name: '도움',
	description: 'show commands',
	async execute(message, args, client, Discord, profileData) {
        const embed = new Discord.MessageEmbed()
        .setColor('#00FF40')
        .setTitle('명령어 도움말')
        .addFields(
            {name: `!킥 @맨션 [이유]`, value: `맴버를 서버에서 추방합니다.\n**주의 : 권한을 가진 사람만 사용 가능합니다.**`},
            {name: `!밴 @맨션 [이유]`, value: `맴버를 서버에서 차단합니다.\n**주의 : 권한을 가진 사람만 사용 가능합니다.**`},
            {name: `!경고확인`, value: `자신이 받은 경고수를 확인합니다.`},
            {name: `!경고 @맨션 [이유]`, value: `맴버에게 경고를 부여합니다.\n**주의 : 권한을 가진 사람만 사용 가능합니다.**\n**경고 : 경고가 5번이 되면 추방, 10번이 되면 차단됩니다.**`},
            {name: `!도움`, value: `이 메시지를 표시합니다.`},
            {name: `!ping`, value: `봇의 작동 여부를 확인합니다.`},
        )
	}
}