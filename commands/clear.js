module.exports = {
	name: 'clear',
	description: 'Limpa as mensagens do chat',
	run: async (client, message, args) => {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			await message.reply('Você não colocou um número');
		}
		else if (amount < 1 || amount > 99) {
			await message.reply('Apenas é permitido números entre 1 e 99');
		}
		else {
			await message.channel.bulkDelete(amount, true)
				.catch(err => {
					console.log(err);
					// await message.reply('Ocorreu um erro ao executar o comando');
				});
		}
	},
};