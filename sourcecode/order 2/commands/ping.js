module.exports = {
	name: 'ping',
	description: 'testing',
	async execute(message, args, client, Discord, profileData) {
        message.reply('pong!')
	}
}