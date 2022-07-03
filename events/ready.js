module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Bot: ${client.user.tag}\nId: ${client.user.id}\nServers: ${client.guilds.cache.size}`);
	},
};