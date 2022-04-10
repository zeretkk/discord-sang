require('dotenv').config()
const fs = require('fs')
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const {token, storageChannel} = process.env
client.commands = new Collection()


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message=>{
    if(!message.content.startsWith('!')) return
    let [cmd, args] = [message.content.split(' ')[0].slice(1).toLowerCase(), message.content.split(' ').slice(1)]

    if(message.channelId === storageChannel.toString() && !client.commands.has(cmd)){
        message.reply('Форма подачи отчета: \`!отчет что взяли @кто-выдал(если кто-то выдавал)\`').then(()=>{
            message.delete()
        })

    }
    if(!client.commands.has(cmd)) return;

    client.commands.get(cmd).execute(message, args)

})

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    if(command.aliases.length>0){
        for(let alias of command.aliases){
            client.commands.set(alias, command)
        }
    }
}

client.login(token);