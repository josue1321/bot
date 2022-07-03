module.exports = {
	name: 'mute',
	description: 'Silencia o membro mencionado',
	run: async (client, message) => {
		const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
		const member = message.mentions.members.first();

		if (!member) {
			await message.reply('Nenhum membro foi mencionado!');
		}
		else if (member) {
			await member.roles.add(muteRole).catch(console.error());
			message.reply(`${member} foi silenciado!`);
		}
	},
};