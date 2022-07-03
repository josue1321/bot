module.exports = {
	name: 'unmute',
	description: 'Tira o mute o membro mencionado',
	run: async (client, message) => {
		const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
		const member = message.mentions.members.first();

		await member.roles.remove(muteRole).catch(console.error());
		message.channel.send(`${member} não esta mais silenciado!`);
	},
};