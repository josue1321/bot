module.exports = {
	name: 'mute',
	description: 'Tira o mute do membro mencionado',
	run: async (client, message) => {
		const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
		const member = message.mentions.members.first();

		if (!member) {
			await message.reply('Nenhum membro foi mencionado!');
		}
		else if (member) {
			await member.roles.remove(muteRole).catch(console.error());
			message.reply(`${member} não esta mais silenciado silenciado!`);
		}
	},
};