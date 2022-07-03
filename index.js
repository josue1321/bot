const fs = require('node:fs');
const path = require('node:path');
const { Client, Intents, Collection } = require('discord.js');
const { token, prefix, wcid, lcid, guildId } = require('./config.json');

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
	],
});

const eventsPath = path.join(__dirname, 'events');
const eventFile = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFile) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.commands = new Collection();
const slashCommandsPath = path.join(__dirname, 'slashCommands');
const slashCommandFiles = fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.js'));

for (const file of slashCommandFiles) {
	const filePath = path.join(slashCommandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
		console.error(error);
		await interaction.reply({ content: 'Ocorreu um erro ao executar o comando!', ephemeral: true });
	}
});

/* client.on('ready', () => {

}); */

client.on('messageCreate', message => {
	if (message.channel.type === 'DM') {
		console.log(`${message.author}: ${message.content}`);
	}

	if (message.author.bot || !message.content.toLowerCase().startsWith(prefix)) return;
	if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

	const args = message.content
		.trim().slice(prefix.length)
		.split(/ +/g);
	const command = args.shift().toLowerCase();

	try {
		const commandFile = require(`./commands/${command}.js`);
		commandFile.run(client, message, args);
	}
	catch (error) {
		console.error(error);
	}

});

client.on('guildMemberAdd', member => {
	const wc = member.guild.channels.cache.find(channels => channels.id === wcid);
	if (member.guild.id === guildId) {
		const memberRole = member.guild.roles.cache.find(role => role.name === 'Crias da ASSC');
		const botRole = member.guild.roles.cache.find(role => role.name === 'bot');

		if (member.user.bot) {
			member.roles.add(botRole).catch(console.error());
		}
		else if (!member.user.bot) {
			member.roles.add(memberRole).catch(console.error());
		}

		wc.send(`${member.user} Entro pra ASSC`);
	}
});

client.on('guildMemberRemove', member => {
	console.log('gay');
	const lc = member.guild.channels.cache.find(channels => channels.id === lcid);
	if (member.guild.id === guildId) return lc.send(`${member.user.tag} saiu, já foi tarde fdp`);
});

client.login(token);