const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Replies with server info'),
	async execute(interaction) {
		await interaction.reply({ content: `Nome do servidor: ${interaction.guild.name}\nNúmero de membros: ${interaction.guild.memberCount}\nData de Criação: ${interaction.guild.createdAt}`, ephemeral: true });
	},
};