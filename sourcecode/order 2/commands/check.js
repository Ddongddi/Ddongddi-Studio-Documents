module.exports = {
	name: '경고확인',
	description: 'testing',
	async execute(message, args, client, Discord, profileData) {
	  message.reply(`${message.author}님의 경고 수 : ${profileData.warning}번`)
	}
}