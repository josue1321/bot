const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Limpa as mensagens'),
	async execute(interaction) {
		await interaction.reply('clear');
	},
};