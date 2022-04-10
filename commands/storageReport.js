const { MessageEmbed } = require('discord.js')
const moment = require("moment");
const getEmbed =(author, text, ref)=> {
    let desc = `**Имя Фамилия:**\n${author.username} | ${author.tag} (<@${author.id}>)\n\n**Действие:**\n${text}${ref?`\n\n**Кто выдал/принял:**\n${ref.username} (<@${ref.id}>)`:''}`
    return new MessageEmbed()
        .setTitle('Отчет по оружию')
        .setDescription(desc)
        .setFooter({
            text:moment().format('DD.MM.YYYY | HH:MM:ss')
        })
        .setColor(15914195)
}
module.exports ={
    name:'отчет',
    aliases: [
        'отчёт'
    ],
    async execute(message, args){
        await message.delete()
        const text =()=>{
            let prepared_string = args.toString().replaceAll(',', ' ')
            for(let [k, v] of message.mentions.users.concat(message.mentions.roles)){
                prepared_string = prepared_string.replace(`<${v.permissions?"@&":"@"}${k}>`, '')
            }
            return prepared_string
        }
        message.channel.send({
            embeds: [getEmbed(message.author, text(), message.mentions.users.first())]
        })
    }
}