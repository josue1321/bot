module.exports = {
	name: 'ping',
	run: async (client, message) => {
		await message.channel.send(`${client.ws.ping} ms`);
	},
};